/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const {
  handleTakeSessionMessage,
  handlePostMessage,
  handleTakeConversation,
  handleUpdateMessage,
} = require("../controllers/message.controller");
const messageRouter = (app) => {
  app.get("/api/conversation/:userId", handleTakeConversation);
  app.get("/api/user_messages", handleTakeSessionMessage);
  app.post("/api/user_messages", handlePostMessage);
  app.patch("/api/user_messages", handleUpdateMessage);
};
module.exports = {
  messageRouter,
};
