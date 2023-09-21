const db = require('../services/db.service')
const addMoreNotification = (notifications, userId) => {
  const result = db('notifications')
    .update({ notifications })
    .where('user_id', '=', userId)
  return result
}
const createNotifications = (user_id) => {
  const result = db('notifications').insert({
    user_id: user_id * 1,
    notifications: JSON.stringify([]),
  })
  return result
}
const takeNotifications = (userId) => {
  const result = db('notifications')
    .select('*')
    .where('user_id', '=', userId)
    .first()
  return result
}
const getPostNotification = (postId) => {
  const result = db('posts')
    .join('users', 'posts.user_id', '=', 'users.user_id')
    .select(
      'posts.post_id',
      'users.user_id',
      'users.avatar',
      'users.fullName',
      'posts.createdAt',
    )
    .where('posts.post_id', '=', postId)
    .first()
  return result
}
const getOwnerCommentPostNotification = (commentId) => {
  const result = db('comments')
    .join('users', 'users.user_id', '=', 'comments.user_id')
    .join('posts', 'posts.post_id', '=', 'comments.post_id')
    .select(
      'users.avatar',
      'users.fullName',
      'users.user_id',
      'posts.post_id',
      'comments.id',
    )
    .where('comments.id', '=', commentId)
    .first()
  return result
}
const getOwerReactPostNotification = (postId) => {
  const result = db('reaction')
    .join('posts', 'posts.post_id', '=', 'reaction.post_id')
    .select('posts.content', 'posts.post_id', 'reaction.reaction')
    .where('reaction.post_id', '=', postId)
    .first()
  return result
}
const getFriendRequestNotification = (sender_id) => {
  const result = db('friend_request')
    .join('users', 'friend_request.sender_id', '=', 'users.user_id')
    .select(
      'users.user_id',
      'friend_request.request_id',
      'users.fullName',
      'users.avatar',
    )
    .where('friend_request.sender_id', '=', sender_id)
    .first()

  return result
}
const getPageNotification = (pageId) => {
  const result = db('pages')
    .join('posts', 'posts.page_id', '=', 'pages.page_id')
    .select('pages.page_id', 'posts.post_id', 'pages.fullName', 'pages.avatar')
    .where('pages.page_id', '=', pageId)
    .first()
  return result
}
const getAcceptFriendRequest = (userId) => {
  const result = db('users').where('users.user_id', '=', userId).first()
  return result
}
module.exports = {
  addMoreNotification,
  createNotifications,
  takeNotifications,
  getPostNotification,
  getFriendRequestNotification,
  getOwnerCommentPostNotification,
  getOwerReactPostNotification,
  getAcceptFriendRequest,
  getPageNotification,
}
