const {
  getComments,
  commentInPost,
  commentInReels,
  getCommentsReels,
} = require('../controllers/comment.controller')
const commentRoute = (app) => {
  app.get('/api/posts/getComments/comments/:post_id', getComments)
  app.get('/api/stories/getComments/comments/:story_id', getCommentsReels)
  app.post('/api/posts/comment', commentInPost)
  app.post('/api/stories/comments', commentInReels)
}

module.exports = { commentRoute }
