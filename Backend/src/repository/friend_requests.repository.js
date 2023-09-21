const db = require('../services/db.service')
const moment = require('moment')

const { getCommonFriends } = require('../utils/common')
async function getFriendRequestsById(id) {
  try {
    const friendRequests = await db('friend_request')
      .join('users', 'friend_request.sender_id', '=', 'users.user_id')
      .where('friend_request.receiver_id', id)
      .select('friend_request.sender_id', 'users.fullName', 'users.avatar')
    const friendRequestsWithCommonFriends = await Promise.all(
      friendRequests.map(async (request) => {
        const commonFriends = await getCommonFriends(request.sender_id, +id)
        return {
          ...request,
          createdAt: moment(request.createdAt).fromNow(),
          commonFriends,
        }
      }),
    )

    return friendRequestsWithCommonFriends
  } catch (error) {
    console.log(error)
  }
}
async function getFriendSentById(id) {
  try {
    const friendRequests = await db('friend_request')
      .join('users', 'friend_request.sender_id', '=', 'users.user_id')
      .where('friend_request.sender_id', id)
      .select('friend_request.receiver_id', 'users.fullName', 'users.avatar')
    const friendRequestsWithCommonFriends = await Promise.all(
      friendRequests.map(async (request) => {
        const commonFriends = await getCommonFriends(request.receiver_id, +id)
        return {
          ...request,
          createdAt: moment(request.createdAt).fromNow(),
          commonFriends,
        }
      }),
    )

    return friendRequestsWithCommonFriends
  } catch (error) {
    console.log(error)
  }
}
async function checkFriendRequest(sender_id, receiver_id) {
  try {
    const requestExists = await db('friend_request')
      .where({ sender_id, receiver_id })
      .orWhere({ sender_id: receiver_id, receiver_id: sender_id })
      .first()

    return requestExists
  } catch (error) {
    console.log(error)
  }
}
async function checkBeforeSuggests(userId) {
  try {
    // Lấy danh sách các yêu cầu kết bạn đã gửi
    const sentFriendRequests = await db('friend_request')
      .select('receiver_id')
      .where('sender_id', userId)

    // Lấy danh sách các yêu cầu kết bạn đã nhận
    const receivedFriendRequests = await db('friend_request')
      .select('sender_id')
      .where('receiver_id', userId)

    // Trả về một đối tượng chứa thông tin về các lời mời kết bạn đã gửi và nhận
    return {
      sentFriendRequests: sentFriendRequests.map(
        (request) => request.receiver_id,
      ),
      receivedFriendRequests: receivedFriendRequests.map(
        (request) => request.sender_id,
      ),
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}
async function createFriendRequest(sender_id, receiver_id, created_at) {
  try {
    await db('friend_request').insert({
      sender_id,
      receiver_id,
      created_at,
    })
  } catch (error) {
    console.log(error)
  }
}
async function removeFriendRequest(sender_id, receiver_id) {
  try {
    await db('friend_request').where({ sender_id, receiver_id }).del()
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  removeFriendRequest,
  createFriendRequest,
  checkFriendRequest,
  getFriendRequestsById,
  getFriendSentById,
  checkBeforeSuggests,
}
