const mongoose = require("mongoose");
const assert = require("assert");
const User = require("../src/users");
const Comment = require("../src/comment");
const BlogPost = require("../src/blogPost");

describe("Associations", () => {
  let robin, blogPost, comment;
  beforeEach(async () => {
    robin = new User({ name: "robins" });
    blogPost = new BlogPost({
      title: "blog title",
      content: "my blog content",
    });
    comment = new Comment({ content: "great post" });

    robin.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = robin;

    await Promise.all([robin.save(), blogPost.save(), comment.save()]);
  });
  it("saves a relation between user and blogpost", async () => {
    const user = await User.findOne({ name: "robins" }).populate("blogPosts");
    const post = user.blogPosts[0];
    assert(post.title === "blog title");

    const populatedPost = await BlogPost.findById(post._id).populate(
      "comments",
    );
    const comment = populatedPost.comments[0];
    assert(comment.content === "great post");

    const populatedComment = await Comment.findById(comment._id).populate(
      "user",
    );
    assert(populatedComment.user.name === "robins");
  });

  it("saves a full a relation graph", async () => {
    const blogComments = await User.findOne({ name: "robins" }).populate({
      path: "blogPosts",
      populate: {
        path: "comments",
        model: "comment",
        populate: {
          path: "user",
          model: "user",
        },
      },
    });
    assert(blogComments.name === "robins");
    assert(blogComments.blogPosts[0].comments[0].content === "great post");
  });
});
