const User = require("../src/users");
const assert = require("assert");

describe("Creating records", () => {
  afterEach(async () => {
    await User.deleteMany({});
  });
  it("saves a user", (done) => {
    const joe = new User({ name: "Joye" });
    joe.save().then(() => assert(!joe.isNew));
    done();
  });
});
