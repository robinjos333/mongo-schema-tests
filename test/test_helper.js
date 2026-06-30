const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect("mongodb://localhost/users_test");
  mongoose.connection
    .once("open", () => {
      done();
    })
    .on("error", (error) => {
      console.warn("Warning", error);
    });
});

beforeEach(async () => {
  const { users, comments, blogposts } = mongoose.connection.collections;
  await users.drop();
  await comments.drop();
  await blogposts.drop();
});
