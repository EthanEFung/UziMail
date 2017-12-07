describe("Service functionality", () => {
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
