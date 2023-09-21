/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
module.exports = {
  ...require("./users.route"),
  ...require("./auth.route"),
  ...require("./posts.route"),
  ...require("./friend_requests.route"),
  ...require("./friendship.route"),
  ...require("./search_history.route"),
  ...require("./pages.route"),
  ...require("./page_follower.route"),
  ...require("./stories.route"),
  ...require("./hobbies.route"),
  ...require("./reaction.route"),
  ...require("./message.route"),
  ...require("./notification.route"),
  ...require("./award.route"),
  ...require("./media_post.route"),
  ...require("./comment.route"),
  ...require("./re_comment.route"),
  ...require("./storage.route"),
  ...require("./groupPages.route"),
};
