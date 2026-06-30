const User = require("../src/users");
const assert = require("assert");

describe("reading users out of the database", () => {
  let joe, maria, alex, zach;
  beforeEach(async () => {
    await User.deleteMany({});

    await User.syncIndexes();

    joe = new User({ name: "Joe" });
    maria = new User({ name: "Maria" });
    alex = new User({ name: "Alex" });
    zach = new User({ name: "Ach" });
    await Promise.all([joe.save(), maria.save(), alex.save(), zach.save()]);
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
  it("can skip and limit the result set", async () => {
    const users = await User.find({}).sort({ name: 1 }).skip(1).limit(2);
    assert(users.length === 2);
  });
});
