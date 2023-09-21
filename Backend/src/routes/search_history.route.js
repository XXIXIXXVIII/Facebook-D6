const {
  getHistorySearch,
  deleteSearchHistory,
} = require('../controllers/search_history.controller')

const searchHistoryRoute = (app) => {
  app.get('/api/search_history/:id', getHistorySearch)
  app.delete('/api/search_history/:id', deleteSearchHistory)
}

module.exports = {
  searchHistoryRoute,
}
