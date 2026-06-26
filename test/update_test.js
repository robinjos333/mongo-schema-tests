const User = require("../src/users");
const assert = require("assert");

describe("Updating user", () => {
  let robin;

  beforeEach(async () => {
    await User.deleteMany({});
    robin = new User({ name: "Robin", likes: 11 });
    await robin.save();
  });

  const assertName = async (name) => {
    const users = await User.find({});
    assert(users.length === 1);
    assert(users[0].name === name);
  };

  it("instance set n save", async () => {
    robin.set("name", "Anoop");
    await robin.save();
    await assertName("Anoop");
  });

  it("modal instance can update", async () => {
    await robin.updateOne({ name: "Rah" });
    await assertName("Rah");
  });

  it("modal class updateMany", async () => {
    await User.updateMany({ name: "Robin" }, { name: "Saji" });
    await assertName("Saji");
  });
  it("modal class findOneAndUpdate", async () => {
    await User.findOneAndUpdate({ name: "Robin" }, { name: "Ros" });
    await assertName("Ros");
  });
  it("modal class findByIdAndUpdate", async () => {
    await User.findByIdAndUpdate(robin._id, { name: "Das" });
    await assertName("Das");
  });
  it("post count incrementing using $inc", async () => {
    await User.updateMany({ name: "Robin" }, { $inc: { likes: 1 } });
    const users = await User.find({});
    assert(users[0].likes === 12);
  });
});
