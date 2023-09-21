const {
  getFollowersPage,
  getPageAndUserFollow,
  createFollow,
  userUnfollow,
} = require('../controllers/page_followers.controller')

const pageFollowersRouter = (app) => {
  app.get('/api/followers/:page_id', getFollowersPage)
  app.get('/api/followers/page_user/:id', getPageAndUserFollow)
  app.post('/api/followers/follow', createFollow)
  app.post('/api/followers/unfollow', userUnfollow)
}

module.exports = {
  pageFollowersRouter,
}
