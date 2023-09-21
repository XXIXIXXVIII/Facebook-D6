const { getImages } = require('../controllers/media_post.controller')

const mediaRouter = (app) => {
  app.get('/api/user/images/:user_id', getImages)
}
module.exports = {
  mediaRouter,
}
