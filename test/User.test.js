const { User } = require("../db/models");

describe("Users Table", () => {
  it("should have an id column", () => {
    expect(User.find({ where: { id: 1 } })).toBeTruthy();
  });
  it("should store the users email", () => {
    expect(User.find({ where: { email: "test_1_email" } })).toBeTruthy();
  });
  it("should store a master provider account api key or other identification", () => {
    expect(
      User.find({
        where: { master_provider_API: "test_1_master_provider_API" }
      })
    ).toBeTruthy();
  });
  it("should store a slave provider account api key or other identification", () => {
    expect(
      User.find({
        where: { slave_provider_API: "test_1_slave_provider_API" }
      })
    ).toBeTruthy();
  });
});

describe("creating a new user", () => {
  it("should throw an error if no name is provided");
  it("should throw an error if no email is provided");
  it("should request a master provider api key or identification");
  it("should request a slave provider api key or identification");
  it("should receive a master provider api key or identification");
  it("should receive a slave provider api key or identification");
  it("should request all relevant information be stored in our users database");
  it("should post all relevant information in our users database");
});

describe("getting a user ", () => {
  it("should request the correct user given an id");
  it("should respond with the correct information");
});

describe("updating a user", () => {
  it("should select to the right row in the users table");
  it("should update the email");
});

describe("deleting a user", () => {
  it("should select to the right row in the users table");
  it("should responded");
});
