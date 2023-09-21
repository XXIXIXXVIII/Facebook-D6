/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const {
  getAllFriend,
  acceptedFriendRequest,
  rejectedAddFriend,
  unfriend,
} = require("../controllers/friendship.controller");

const friendshipRouter = (app) => {
  app.get("/api/friends/:id", getAllFriend);
  app.post("/api/friends/rejectedAddFriend", rejectedAddFriend);
  app.put("/api/friends/acceptedFriendRequest", acceptedFriendRequest);
  app.patch("/api/friends/unfriend", unfriend);
};

module.exports = { friendshipRouter };
