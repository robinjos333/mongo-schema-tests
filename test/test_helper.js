const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
// Example helper connection logic
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/test_db";

before((done) => {
  mongoose.connect(mongoUri);
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
