const assert = require("assert");
const User = require("../src/users");
const { title } = require("process");

describe("Subdouments", () => {
  it("can create a subdocument", async () => {
    const robin = new User({
      name: "robin",
      posts: [{ title: "my first post" }],
    });
    await robin.save();
    const user = await User.findOne({ name: "robin" });
    assert(user.posts[0].title === "my first post");
  });
  it("can add subdouments to an existing record", async () => {
    const abin = new User({
      name: "Abin",
      posts: [],
    });
    await abin.save();
    const user = await User.findOne({ name: "Abin" });
    user.posts.push({ title: "my second post" });
    await user.save();

    const updatedUser = await User.findOne({ name: "Abin" });
    assert(updatedUser.posts[0].title === "my second post");
  });

  it("can can remove subdouments to an existing record", async () => {
    const savin = new User({
      name: "Savin",
      posts: [{ title: "new title" }],
    });
    await savin.save();
    const user = await User.findOne({ name: "Savin" });
    // user.posts.pull(user.posts[0]); // -- old method
    user.posts[0].deleteOne();
    await user.save();

    const updatedUser = await User.findOne({ name: "Savin" });
    assert(updatedUser.posts.length === 0);
  });
});
