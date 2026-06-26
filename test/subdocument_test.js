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
});
