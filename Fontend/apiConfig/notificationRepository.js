import Repository from './Repository'
const resourse = '/notification'

export default {
  renderNotification({ userId }) {
    return Repository.get(`${resourse}?userId=${userId}`)
  },

  sendNotificationId(payload) {
    return Repository.patch(payload)
  },
}
