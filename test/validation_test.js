const assert = require("assert");
const User = require("../src/users");

describe("validate records in collection", () => {
  it("requires a user name", async () => {
    const user = new User({ name: undefined });
    try {
      await user.validate();
    } catch (error) {
      //   console.info("abcc:", error.errors.name.message);
      assert(error.errors.name.message === "Name is required");
    }
  });
  it("user name must be 3 character", async () => {
    const user = new User({ name: "s" });
    try {
      await user.validate();
    } catch (error) {
      assert(error.errors.name.message === "Name must be longer than 2 char");
    }
  });

  it("dont save invalid records", async () => {
    const user = new User({ name: "sh" });
    try {
      await user.save();
    } catch (error) {
      assert(error.errors.name.message === "Name must be longer than 2 char");
    }
  });
  it("dont save user with number in name ", async () => {
    const user = new User({ name: "Ash1" });
    try {
      await user.save();
      assert.fail("Validation should have failed for alphanumeric name");
    } catch (error) {
      if (error.name === "AssertionError") throw error;
      console.log(error.errors);

      assert(error.errors.name.message === "Name must only contain chars");
    }
  });
});
