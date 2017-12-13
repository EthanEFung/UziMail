const contactController = require("../server/controllers/contactController");

describe("contacts functionality", async () => {
  describe("fetchContacts", () => {
    const { fetchContacts } = contactController;
    it("should have a function that gets all the contacts for a user", () => {
      expect(typeof fetchContacts).toEqual("function");
    });
    it("should make a call to our database", async () => {
      let wasCalled = false;
      const request = {
        params: {
          userId: 1
        }
      };
      const response = {
        send: obj => {
          this.body = obj;
        },
        body: null
      };
      const fakeContact = {
        findAll: () => Promise.resolve((wasCalled = true))
      };

      await fetchContacts(request, response, fakeContact);
      expect(wasCalled).toBeTruthy();
    });

    it("should append a journal to the response stream", async () => {
      //Define dependencies
      const request = {
        params: {
          userId: 1
        }
      };
      const response = {
        send: obj => {
          result = obj;
        }
      };
      const fakeContact = {
        findAll: () =>
          Promise.resolve([
            {
              email: "coffeeequalsgood@gmail.com",
              userId: 1
            },
            {
              email: "ethanefung@gmail.com",
              userId: 1
            }
          ])
      };

      //Define expected behavior
      let result = null;
      const expected = [
        {
          email: "coffeeequalsgood@gmail.com",
          userId: 1
        },
        {
          email: "ethanefung@gmail.com",
          userId: 1
        }
      ];

      //Run Test
      await fetchContacts(request, response, fakeContact);
      expect(result.body).toEqual(expected);
    });
  });
  describe("create contacts", () => {
    const { createContacts } = contactController;
    it("should have a function that adds a collection of contacts for a user", async () => {
      //Define dependencies
      const request = {
        body: {
          contacts: [
            { email: "coffeeequalsgood@gmail.com", userId: 1 },
            { email: "ethanefung@gmail.com", userId: 1 }
          ]
        }
      };
      const response = {
        send: obj => (result = obj)
      };
      const fakeContact = {
        bulkCreate: () => Promise.resolve(request.body.contacts)
      };

      //Define expected behavior
      let result = null;
      const expected = [
        {
          email: "coffeeequalsgood@gmail.com",
          userId: 1
        },
        {
          email: "ethanefung@gmail.com",
          userId: 1
        }
      ];

      //Run Test
      await createContacts(request, response, fakeContact);
      expect(result.body).toEqual(expected);
    });
  });

  describe("update contact", async () => {
    const { updateContact } = contactController;
    it("should have a function that updates a contact for a user", () => {
      expect(typeof updateContact).toBe("function");
    });

    it("should call our database", async () => {
      //define dependencies
      const request = {
        body: {
          contactId: 1,
          email: "ethanefung@gmail.com",
          group: null
        }
      };
      const response = {
        send: obj => {
          result = obj;
        }
      };
      const fakeContact = {
        update: () => Promise.resolve((wasCalled = true))
      };

      //Define expected behavior
      let wasCalled = false; //should change

      await updateContact(request, response, fakeContact);
      expect(wasCalled).toBeTruthy();
    });
    it("should change a contact", async () => {
      //define dependencies
      const contact = {
        id: 1,
        email: "coffeeequalsgood@gmail.com",
        group: null
      };
      const request = {
        body: {
          id: 1,
          email: "ethanefung@gmail.com",
          group: "coworkers"
        }
      };
      const response = {
        send: obj => {
          result = obj;
        }
      };
      const fakeContact = {
        update: (obj, params) => {
          contact.email = request.body.email;
          contact.group = request.body.group;
          return Promise.resolve(contact);
        }
      };

      await updateContact(request, response, fakeContact);
      expect(contact.email).toEqual("ethanefung@gmail.com");
    });
  });
  describe("delete contact", () => {
    const { deleteContact } = contactController;

    it("should have a function that deletes a contact for a user", () => {
      expect(typeof deleteContact).toEqual("function");
    });

    it("should call the database", async () => {
      const request = {
        body: {
          contactId: 1
        }
      };
      const response = {};
      const fakeContact = {
        destroy: () => Promise.resolve((wasCalled = true))
      };

      let wasCalled = false;
      await deleteContact(request, response, fakeContact);
      expect(wasCalled).toBeTruthy();
    });

    it("should delete a contact", async () => {
      let contact = {
        contactId: 1
      };
      const request = {
        body: {
          contactId: 1
        }
      };
      const response = {
        send: obj => {
          result = obj;
        }
      };
      const fakeContact = {
        destroy: () => Promise.resolve((contact = null))
      };

      await deleteContact(request, response, fakeContact);
      expect(contact).toBeNull();
    });
  });
});
