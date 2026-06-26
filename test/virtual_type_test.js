const assert = require("assert");
const User = require("../src/users");

describe("virual types", () => {
  it("postcount return number of posts", async () => {
    const asin = new User({
      name: "asin",
      posts: [{ title: "1st title" }, { title: "2nd title" }],
    });
    await asin.save();
    const user = await User.findOne({ name: "asin" });
    assert(user.postCount === 2);
  });
});
