describe("Service functionality", () => {
  describe("user functionality", () => {
    it("should have a function that creates a user");
    it("should have a function that gets a user");
    it("should have a function that updates a user");
    it("should have a function that deletes a user");
  });

  describe("contacts functionality", () => {
    it("should have a function that gets all the contacts for a user");
    it("should have a function that adds a collection of contacts for a user");
    it("should have a function that updates a contact for a user");
    it("should have a function that deletes a contact for a user");
  });

  describe("service functionality", () => {
    it("should expect an email text");
    it("should expect a user_id");
    it("should throw an error if no email message is specified");
    it("should throw an error if the user_id is not specified");
    it("should query the database to get Contacts");
    it("should receive the collection of recipients");

    describe("querying the master provider", () => {
      it("should send a query the provider with recipients and email payloads");
      it("should receive a response in a timely manner");
      it("should flag post if unsuccessful");
      it("should flag post if response is slow");
      it("should trigger a request to slave provider if flag is raised");
    });

    describe("querying the slave provider", () => {
      it("should send a query the provider with recipients and email payloads");
      it("should receive a response in a timely manner");
      it("should flag post if unsuccessful");
      it("should flag post if response is slow");
      it("should trigger a request to slave provider if flag is raised");
    });
  });
});
