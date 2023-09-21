/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const {
  getAllPostsByUserId,
  getPostInHome,
  getPostDetail,
  createNewPost,
  updateUserPost,
  deleteUserPost,
  getAllPostsByPageId,
  getPostVideoMedia,
  createNewPostGroup,
  getAllPostByGroup,
} = require("../controllers/posts.controller");

const postsRouter = (app) => {
  app.get("/api/posts/user_posts/:userId", getAllPostsByUserId);
  app.get("/api/posts/page_posts/:userId", getAllPostsByPageId);
  app.get("/api/posts/video/:userId", getPostVideoMedia);
  app.post("/api/posts/home_posts/:userId/:page", getPostInHome);
  app.get("/api/posts/:post_id/:user_id", getPostDetail);
  app.get(
    "/api/posts/group_posts/allposts/:groupId/:userId",
    getAllPostByGroup
  );
  app.post("/api/posts", createNewPost);
  app.post("/api/posts/postGroup", createNewPostGroup);
  app.put("/api/posts/:post_id", updateUserPost);
  app.delete("/api/posts/:postId", deleteUserPost);
};

module.exports = {
  postsRouter,
};
