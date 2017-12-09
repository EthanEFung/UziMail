const {
  createUser,
  getUser,
  updateUser,
  deleteUser
} = require("../server/controllers/userController");

describe("the userController", () => {
  describe("creating a new user", () => {
    it("should throw an error if no body is provided");
    it("should throw an error if no email is provided");
    it("should request all relevant information be stored in our users db");
    it("should post all relevant information in our users database");
  });

  describe("getting a user ", () => {
    it("should request the correct user given an id");
    it("should respond with the correct information");
  });

  describe("updating a user", () => {
    it("should select to the right row in the users table");
    it("should update the email");
    it("should throw if credentials are not provided");
  });

  describe("deleting a user", () => {
    it("should select to the right row in the users table");
    it("should responded");
  });
});
