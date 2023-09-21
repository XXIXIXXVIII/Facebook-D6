const {
  getPageByUser,
  createPage,
  updateImage,
  updateProfilePage,
  updatePageTypePost,
  getDashBoardPage,
  allPages,
} = require('../controllers/pages.controller')

const pagesRouter = (app) => {
  app.get('/api/pages/:user_id', getPageByUser)
  app.get('/api/pages/dashboard/:id', getDashBoardPage)
  app.get('/api/pages/allpages/info/:userId', allPages)
  app.post('/api/pages/createPage', createPage)
  app.put('/api/page/:id', updatePageTypePost)
  app.put('/api/pages/image/:id', updateImage)
  app.put('/api/pages/profile/:id', updateProfilePage)
}

module.exports = {
  pagesRouter,
}
