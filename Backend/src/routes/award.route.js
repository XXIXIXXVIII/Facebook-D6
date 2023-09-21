const { getAwards } = require('../controllers/award.controller')

const awardRouter = (app) => {
  app.get('/api/awards', getAwards)
}
module.exports = {
  awardRouter,
}
