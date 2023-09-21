const {
  takeNotifications,
  createNotifications,
  getPostNotification,
  getOwnerCommentPostNotification,

  getFriendRequestNotification,
  getUserById,
  getAcceptFriendRequest,
  getPageNotification,
  addMoreNotification,
} = require('../repository/index')
const moment = require('moment/moment')
// const { v4: uuidv4 } = require("uuid");
moment.locale('vi')
const handleTakeNotification = async (req, res) => {
  const { userId } = req.query
  try {
    const response = await takeNotifications(userId)
    if (response) {
      const notifications = JSON.parse(response.notifications)
      const dataForFontend = await Promise.all(
        notifications.map(async (e) => {
          if (e?.type === 'friend post') {
            const dataOfNotification = await getPostNotification(e.post_id)
            const date = new Date(e.time)
            const notificationForFontend = {
              postId: dataOfNotification.post_id,
              ownerId: dataOfNotification.user_id,
              ownerFullName: dataOfNotification.fullName,
              ownerAvatar: dataOfNotification.avatar,
              notificationTime: moment(date).fromNow(),
              notificationType: e.type,
              notificationId: e.notification_id,
              unread: e.unread,
            }
            return notificationForFontend
          } else if (e?.type === 'friend request') {
            const dataOfNotification = await getFriendRequestNotification(
              e.from_user_id,
            )
            if (dataOfNotification) {
              const date = new Date(e.time)
              const notificationForFontend = {
                ownerId: dataOfNotification.user_id,
                ownerFullName: dataOfNotification.fullName,
                ownerAvatar: dataOfNotification.avatar,
                requestId: dataOfNotification.request_id,
                senderId: dataOfNotification.sender_id,
                notificationTime: moment(date).fromNow(),
                notificationType: e.type,
                notificationId: e.notification_id,
                unread: e.unread,
              }
              return notificationForFontend
            }
          } else if (e?.type === 'comment your post') {
            const dataOfNotification = await getOwnerCommentPostNotification(
              e.comment_id,
            )

            const date = new Date(e.time)
            const notificationForFontend = {
              ownerId: dataOfNotification.user_id,
              ownerFullName: dataOfNotification.fullName,
              ownerAvatar: dataOfNotification.avatar,
              commentId: dataOfNotification.id,
              postId: dataOfNotification.post_id,
              notificationTime: moment(date).fromNow(),
              notificationType: e.type,
              notificationId: e.notification_id,
              unread: e.unread,
            }
            return notificationForFontend
          } else if (e?.type === 'react your post') {
            const date = new Date(e.time)
            const user = await getUserById(e.owner_id)
            const notification = {
              ownerId: e.owner_id,
              ownerFullName: user.fullName,
              unread: e.unread,
              ownerAvatar: user.avatar,
              notificationTime: moment(date).fromNow(),
              postId: e.post_id,
              ownerAction: e.ownerAction,
              notificationId: e.notification_id,
              notificationType: e.type,
            }
            return notification
          } else if (e?.type === 'accept your friend request') {
            const dataOfNotification = await getAcceptFriendRequest(e.owner_id)
            const date = new Date(e.time)
            const notification = {
              ownerId: e.owner_id,
              ownerFullName: dataOfNotification.fullName,
              ownerAvatar: dataOfNotification.avatar,
              unread: e.unread,
              notificationTime: moment(date).fromNow(),
              notificationId: e.notification_id,
              notificationType: e.type,
            }
            return notification
          } else if (e?.type === 'page post') {
            const page = await getPageNotification(e.page_id)
            const date = new Date(e.time)
            const notification = {
              pageId: page.page_id,
              pageFullName: page.fullName,
              pageAvatar: page.avatar,
              postId: page.postId,
              unread: e.unread,
              notificationId: e.notification_id,
              notificationType: e.type,
              notificationTime: moment(date).fromNow(),
            }
            return notification
          }
        }),
      )
      console.log(dataForFontend, '<--- line 127')
      return res.status(200).json(dataForFontend)
    } else {
      await createNotifications(userId)
      res.status(200).json([])
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
const handleSeenNotification = async (req, res) => {
  const { userId, notificationId } = req.body
  console.log(userId, notificationId, 'LINE 133')

  try {
    const result = await takeNotifications(userId)
    const notifications = JSON.parse(result.notifications)
    const index = notifications.findIndex((e) => {
      return e.notification_id === notificationId
    })
    notifications[index] = { ...notifications[index], unread: false }
    await addMoreNotification(JSON.stringify(notifications), userId)
    res.status(200).json('success')
  } catch (error) {
    console.log(error)
  }
}
module.exports = { handleTakeNotification, handleSeenNotification }
