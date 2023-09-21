const {
  getStorage,
  savePost,
  deletePostStorage,
} = require('../controllers/storage.controller')

const storageRoute = (app) => {
  app.get('/api/storage/:id', getStorage)
  app.post('/api/storage/:id', savePost)
  app.delete('/api/storage/:id', deletePostStorage)
}

module.exports = {
  storageRoute,
}
