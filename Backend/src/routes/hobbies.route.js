const { getHobbies } = require('../controllers/hobbies.controller')

const hobbiesRouter = (app) => {
  app.get('/api/hobbies', getHobbies)
}

module.exports = {
  hobbiesRouter,
}
