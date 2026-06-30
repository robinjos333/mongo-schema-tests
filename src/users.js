const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = require("./posts");

const UserSchema = new Schema({
  name: {
    type: String,
    minLength: [3, "Name must be longer than 2 char"],
    required: [true, "Name is required"],
    validate: {
      validator: (name) => /^[A-Za-z]+$/.test(name),
      // another method
      // validator: function (v) {
      //   return /^[A-Za-z]+$/.test(v);
      // },
      message: "Name must only contain chars",
    },
  },
  // postCount: Number,
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: "blogPost"
  }]
});

UserSchema.virtual("postCount").get(function () {
  return this.posts.length;
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
