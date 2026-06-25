const User = require("../src/users");
const assert = require("assert");

describe("reading users out of the database", () => {
  let joe;
  beforeEach(async () => {
    await User.deleteMany({});

    await User.syncIndexes();

    joe = new User({ name: "Joe" });
    await joe.save();
  });

  it("find all the users with a name of joe", async () => {
    const users = await User.find({ name: "Joe" });
    assert(users.length === 1);
    assert(users[0]._id.toString() === joe._id.toString());
  });
  it("find the first user with a name of joe", async () => {
    const user = await User.findOne({ name: "Joe" });
    assert(user !== null);
    assert(user._id.toString() === joe._id.toString());
  });
});
