const {
  handleTakeNotification,
  handleSeenNotification,
} = require('../controllers/notifications.controller')
const notificationRoute = (app) => {
  app.get('/api/notification', handleTakeNotification)
  app.post('/api/notification', handleSeenNotification)
}
module.exports = { notificationRoute }
