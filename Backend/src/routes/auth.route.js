const { login, register } = require('../controllers/auth.controller')
const middleware = require('../middleware/middleware')
const authRouter = (app) => {
  app.post('/api/auth/login', middleware.validateLogin, login)
  app.post('/api/auth/register', middleware.validateRegister, register)
}

module.exports = {
  authRouter,
}
