const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../src/users");
const BlogPost = require("../src/blogPost");
const assert = require("assert");

describe("Middleware", () => {
  let robin, blogPost;
  beforeEach(async () => {
    robin = new User({ name: "robins" });
    blogPost = new BlogPost({
      title: "blog title",
      content: "my blog content",
    });

    robin.blogPosts.push(blogPost);

    await Promise.all([robin.save(), blogPost.save()]);
  });

  it("user cleanup dangling blogposts on remove", async () => {
    await robin.deleteOne();
    const count = await BlogPost.countDocuments({});
    assert(count === 0);
  });
});
