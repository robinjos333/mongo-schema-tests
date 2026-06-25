const assert = require("assert");
const User = require("../src/users");

describe("deleting a user", () => {
  let robin;
  beforeEach(async () => {
    robin = new User({ name: "Robin" });
    await robin.save();
  });

  it("modal instance deleteOne", async () => {
    await robin.deleteOne();
    const user = await User.findOne({ name: "Robin" });
    assert(user === null);
  });
  it("class method deleteMany", async () => {
    await User.deleteMany({ name: "Robin" });
    const user = await User.findOne({ name: "Robin" });
    assert(user === null);
  });
  it("class method findOneAndDelete", async () => {
    await User.findOneAndDelete({ name: "Robin" });
    const user = await User.findOne({ name: "Robin" });
    assert(user === null);
  });
  it("class method findByIdAndRemove", async () => {
    await User.findByIdAndDelete(robin._id);
    const user = await User.findOne({ name: "Robin" });
    assert(user === null);
  });
});
