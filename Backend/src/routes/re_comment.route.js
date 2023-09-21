const {
  getRecommentById,
  reComment,
} = require('../controllers/re_comment.controller')

const reCommentRoute = (app) => {
  app.get('/api/posts/recomment/getReComment/:id', getRecommentById)
  app.post('/api/posts/recomment/createReComment/:id', reComment)
}

module.exports = {
  reCommentRoute,
}
