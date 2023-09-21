const {
  user_reaction,
  unreaction,
} = require('../controllers/reaction.controller')

const reactionRoute = (app) => {
  app.post('/api/reaction', user_reaction)
  app.put('/api/reaction', unreaction)
}

module.exports = {
  reactionRoute,
}
