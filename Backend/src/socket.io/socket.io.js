const { Server } = require('socket.io')
const {
  takeSessionMessages,
  updateSessionMessage,
  addMoreNotification,
  createNotifications,
  takeNotifications,
  getPostById,
  addAnOnlineUser,
  // removeOnlineUser,
  getOnlineUser,
  updateOnlineUser,
  getFollowers,
  // getUserById,
} = require('../repository/index')
const { v4: uuidv4 } = require('uuid')
const { getListFriendsId } = require('../controllers/friendship.controller')
function socket(server) {
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  })
  io.on('connection', (socket) => {
    socket.on('start_connecting', async (userId) => {
      try {
        if (userId && userId * 1 !== NaN) {
          socket.join(String(userId))
          const onlineUser = await getOnlineUser(userId)
          if (onlineUser) {
            const socketId = JSON.parse(onlineUser.socket_id)
            socketId.push(socket.id)
            await updateOnlineUser(userId * 1, JSON.stringify(socketId))
          } else {
            await addAnOnlineUser(userId * 1, JSON.stringify([socket.id]))
          }
        }
      } catch (error) {
        console.log(error)
      }
    })
    socket.on('send_message', (userId) => {
      try {
        socket.broadcast.to(String(userId)).emit('receive_messages')
      } catch (error) {
        console.log(error)
      }
    })
    socket.on('seen_messages', async (data) => {
      if (!data.userConversationId) {
        return
      }
      try {
        const result = await takeSessionMessages(data.userConversationId)
        await Promise.all(
          result.map(async (e) => {
            const messages = JSON.parse(e.messages)
            const messagesHasSeen = messages.map((e) => {
              if (e.user_id * 1 !== data.accountHasLogin * 1) {
                return { ...e, status: 'seen' }
              } else {
                return { ...e }
              }
            })
            await updateSessionMessage(
              e.session_id,
              JSON.stringify(messagesHasSeen),
            )
          }),
        )
        socket.emit('seen_message_already')
      } catch (error) {
        console.log(error)
      }
    })
    socket.on('start_typing', (data) => {
      socket.to(data.userId).emit('someone_typing', { name: data.userName })
    })
    socket.on('stop_type', (data) => {
      socket
        .to(data.userId)
        .emit('someone_stop_typing', { name: data.userName })
    })
    // socket for friend request
    socket.on('send_friend_request', async (data) => {
      const { toUserId, fromUserId } = data
      console.log(toUserId, fromUserId, 'line 79 socket')
      const response = await takeNotifications(toUserId)
      if (response !== undefined) {
        const notifications = JSON.parse(response.notifications)
        const newNotification = {
          from_user_id: fromUserId,
          type: 'friend request',
          time: Date.now(),
          notification_id: uuidv4(),
        }
        notifications.unshift(newNotification)
        await addMoreNotification(JSON.stringify(notifications), toUserId)
      } else {
        await createNotifications(toUserId)
        const notifications = [
          {
            from_user_id: fromUserId,
            type: 'friend request',
            time: Date.now(),
            notification_id: uuidv4(),
          },
        ]
        await addMoreNotification(JSON.stringify(notifications), toUserId)
      }
      socket.broadcast.to(toUserId).emit('recive_new_notification')
      socket.broadcast.to(toUserId).emit('receive_friend_request')
    })
    // socket for notification
    // post
    socket.on('post_notification', async (data) => {
      const { postId, ownerId } = data
      console.log(postId, ownerId, '<-- line 105')
      try {
        const listFriend = await getListFriendsId(ownerId)
        listFriend.forEach(async (userId) => {
          const response = await takeNotifications(userId)
          if (response !== undefined) {
            const notifications = JSON.parse(response.notifications)
            const newNotification = {
              post_id: postId,
              type: 'friend post',
              time: Date.now(),
              unread: true,
              notification_id: uuidv4(),
            }
            notifications.unshift(newNotification)
            await addMoreNotification(JSON.stringify(notifications), userId)
          } else {
            await createNotifications(userId)
            const notifications = [
              {
                post_id: postId,
                type: 'friend post',
                time: Date.now(),
                unread: true,
                notification_id: uuidv4(),
              },
            ]
            await addMoreNotification(JSON.stringify(notifications), userId)
          }
          socket.broadcast.to(userId).emit('recive_new_notification')
        })
      } catch (error) {
        console.log(error)
      }
    })
    socket.on('comment_notification', async (data) => {
      const { commentId, postId } = data
      if (!commentId) {
        return
      }
      try {
        const post = await getPostById(postId)
        if (post) {
          const response = await takeNotifications(post.user_id)

          if (response !== undefined) {
            const notifications = JSON.parse(response.notifications)
            const newNotification = {
              comment_id: commentId,
              post_id: postId,
              type: 'comment your post',
              time: Date.now(),
              unread: true,
              notification_id: uuidv4(),
            }
            notifications.unshift(newNotification)
            await addMoreNotification(
              JSON.stringify(notifications),
              post.user_id,
            )
          } else {
            await createNotifications(post.user_id)
            const notifications = [
              {
                comment_id: commentId,
                post_id: postId,
                type: 'comment your post',
                time: Date.now(),
                unread: true,
                notification_id: uuidv4(),
              },
            ]
            await addMoreNotification(
              JSON.stringify(notifications),
              post.user_id,
            )
          }

          socket.to(String(post.user_id)).emit('recive_new_notification')
        } else {
          console.log('nothing there')
        }
      } catch (error) {
        console.log(error)
      }
    })
    socket.on('react_post_notification', async (data) => {
      const { postId, ownerId, ownerAction } = data
      try {
        const post = await getPostById(postId)
        if (post) {
          const response = await takeNotifications(post.user_id)
          if (response) {
            const notifications = JSON.parse(response.notifications)
            const newNotification = {
              owner_id: ownerId,
              post_id: postId,
              type: 'react your post',
              time: Date.now(),
              unread: true,
              ownerAction,
              notification_id: uuidv4(),
            }
            notifications.unshift(newNotification)
            await addMoreNotification(
              JSON.stringify(notifications),
              post.user_id,
            )
          } else {
            console.log(post.user_id, 'line 227')
            await createNotifications(post.user_id)
            const notifications = [
              {
                owner_id: ownerId,
                post_id: postId,
                type: 'react your post',
                time: Date.now(),
                unread: true,
                ownerAction,
                notification_id: uuidv4(),
              },
            ]
            await addMoreNotification(
              JSON.stringify(notifications),
              post.user_id,
            )
          }
          socket.to(String(post.user_id)).emit('recive_new_notification')
        } else {
          console.log('nothing there')
        }
      } catch (error) {
        console.log(error)
      }
    })
    // accept friend request
    socket.on('accept_friend_request', async (data) => {
      console.log('running in to line 255')
      const { userId, toUserId } = data
      const response = await takeNotifications(toUserId)
      if (response) {
        const notifications = JSON.parse(response.notifications)
        const newNotification = {
          owner_id: userId,
          type: 'accept your friend request',
          time: Date.now(),
          unread: true,
          notification_id: uuidv4(),
        }
        notifications.unshift(newNotification)
        await addMoreNotification(JSON.stringify(notifications), toUserId)
      } else {
        await createNotifications(post.user_id)
        const notifications = [
          {
            owner_id: userId,
            type: 'accept your friend request',
            time: Date.now(),
            unread: true,
            notification_id: uuidv4(),
          },
        ]
        await addMoreNotification(JSON.stringify(notifications), toUserId)
      }
      socket.broadcast.to(String(userId)).emit('recive_new_notification')
    })
    // page notification
    socket.on('page_post_notification', async (data) => {
      const { pageId, postId } = data
      const pageFollower = await getFollowers(pageId)
      const noftification = {
        page_id: pageId,
        post_id: postId,
        unread: true,
        notificationType: 'page post',
        time: Date.now(),
        notification_id: uuidv4(),
      }
      pageFollower.forEach(async (e) => {
        const response = await takeNotifications(e)
        if (response !== undefined) {
          const notifications = JSON.parse(response.notifications)
          notifications.unshift(noftification)
          await addMoreNotification(JSON.stringify(notifications), e)
        } else {
          await createNotifications(e)
          const notifications = [noftification]
          await addMoreNotification(JSON.stringify(notifications), e)
        }
        socket.to(String(e)).emit('recive_new_notification')
      })
    })

    socket.on('story_notification', (data) => {})
    socket.on('before_disconnect', async (userId) => {
      const userSocket = await getOnlineUser(userId)
      if (userSocket) {
        const socketId = JSON.parse(userSocket.socket_id)
        const index = socketId.findIndex((e) => e === socket.id)
        const newSocketID = socketId.splice(index, 1)
        updateOnlineUser(userId, JSON.stringify(newSocketID))
      }
    })
    socket.on('disconnect', async () => {
      console.log(socket.id, '<--- id disconnect')
    })
  })
}

module.exports = socket
