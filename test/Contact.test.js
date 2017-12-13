const { Contact } = require("../db/models");
describe("Contacts table", () => {
  //   it("should have an id", () => {
  //     Contact.findOne({ where: { id: 1 } }).then(data => expect(data).toExist());
  //   });
  //   it("should have one user_id the contact belongs to", () => {
  //     Contact.findOne({ where: { userId: 1 } }).then(data =>
  //       expect(data).toExist()
  //     );
  //   });
  //   it("should have an email", () => {
  //     Contact.findOne({ where: { email: "ethanefung@gmail.com" } }).then(data =>
  //       expect(data).toExist()
  //     );
  //   });
  // });
  // describe("getting contacts", () => {
  //   it("should expect a user_id", () => {
  //     Contact.findAll({ where: { userId: 1 } }).then(data => {
  //       expect(data).toBeTruthy();
  //     });
  //   });
  //   it("should respond with a json object array", () => {
  //     Contact.findAll({ where: { userId: 1 } }).then(data => {
  //       expect(Array.isArray(data)).toBeTruthy();
  //     });
  //   });
});

describe("posting contacts", () => {
  it("should expect a user_id and a collection of emails", () => {});
  it("should throw an error if a user_id is not specified");
  it("should throw an error if no emails are specified");
  it("should auto increment an id");
  it("should respond on successes");
});

describe("updating contacts", () => {
  it("should expect a user_id, a select email, and an updated email");
  it("should select the correct row in the contacts table");
  it("should replace the cell of the select email with the updated email");
});

describe("deleting contacts", () => {
  it("should expect a user_id, and an email");
  it("should select the correct row in the contacts table");
  it("should remove the contact from the table");
});
