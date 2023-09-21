const { getCommonFriends } = require('../utils/common')
const moment = require('moment')
const {
  saveSearchHistoryForUserProfile,
  saveSearchHistory,
  getFriendshipById,
  getUsersBySearching,
  getInfoFriends,
  updateTypePostDefault,
  getUserDetails,
  getFriendSentById,
  getFriendRequestsById,
  searchAll,
  updateImageUser,
  getMediaPost,
  getAllComments,
  getPostReaction,
  getPageById,
  getAllIdUsers,
  updateProfileUser,
  getAllIdPages,
  getFollowers,
} = require('../repository/index')
const { checkFriendshipStatus } = require('./friend_requests.controller')

async function searchUser(user_id, searchValue) {
  try {
    const userFriendship = await getFriendshipById(user_id)
    const parsedFriendship = JSON.parse(userFriendship.friendship)
    const friendIds = parsedFriendship.map((friend) => friend.user_id)

    const friends = await getUsersBySearching(searchValue, friendIds)

    const friendsWithStatus = friends.map((friend) => {
      const matchingFriend = parsedFriendship.find(
        (parsedFriend) => parsedFriend.user_id == friend.user_id,
      )
      if (matchingFriend) {
        return {
          ...friend,
          status: matchingFriend.status,
        }
      }
      return friend
    })
    return friendsWithStatus
  } catch (error) {
    console.log(error)
  }
}

async function getUsersBySearch(req, res, next) {
  try {
    const { searchValue, user_id } = req.query
    const { user_id_search, search_value, search_type } = req.body

    if (user_id_search) {
      await saveSearchHistoryForUserProfile(user_id, user_id_search)
    } else if (search_value) {
      await saveSearchHistory(search_value, user_id)
    }
    if (search_type === 'All') {
      const result = await searchAll(searchValue)
      const users = result.users
      const groups = result.groups
      const usersWithFriend = await Promise.all(
        users.map(async (user) => {
          const commonFriend = await getCommonFriends(user_id, user.user_id)
          const isFriend = await checkFriendshipStatus(user_id, +user.user_id)
          return { ...user, commonFriend, isFriend }
        }),
      )

      const pages = result.pages
      const posts = result.posts
      const filterPosts = posts.filter((post) => post.parent_post_id === null)
      const postsWithReactions = await Promise.all(
        filterPosts.map(async (post) => {
          const timeAgo = moment(post.createdAt).fromNow()
          post.createdAt = timeAgo

          const reactions = await getPostReaction(post.post_id)
          const parsedReactions = JSON.parse(reactions.reaction)
          const userReaction = parsedReactions.find((reaction) =>
            reaction.user_id.includes(+user_id),
          )
          if (userReaction) {
            post.status = userReaction.type
          } else {
            post.status = 'Unreact'
          }

          return {
            ...post,
            reactions: parsedReactions,
          }
        }),
      )

      const postsWithMedia = await Promise.all(
        postsWithReactions.map(async (post) => {
          const media = await getMediaPost(post.post_id)
          const comments = await getAllComments(post.post_id)
          return {
            ...post,
            media,
            comments,
          }
        }),
      )
      res.json({ usersWithFriend, pages, postsWithMedia, groups })
    } else if (search_type === 'User') {
      const result = await searchAll(searchValue)
      const users = result.users
      const usersWithFriend = await Promise.all(
        users.map(async (user) => {
          const commonFriend = await getCommonFriends(user_id, user.user_id)
          return { ...user, commonFriend }
        }),
      )
      res.json({
        usersWithFriend,
      })
    } else if (search_type === 'Post') {
      const result = await searchAll(searchValue)
      const posts = result.posts
      const filterPosts = posts.filter((post) => post.parent_post_id === null)
      const postsWithReactions = await Promise.all(
        filterPosts.map(async (post) => {
          const timeAgo = moment(post.createdAt).fromNow()
          post.createdAt = timeAgo

          const reactions = await getPostReaction(post.post_id)
          const parsedReactions = JSON.parse(reactions.reaction)
          const userReaction = parsedReactions.find((reaction) =>
            reaction.user_id.includes(+user_id),
          )
          if (userReaction) {
            post.status = userReaction.type
          } else {
            post.status = 'Unreact'
          }

          return {
            ...post,
            reactions: parsedReactions,
          }
        }),
      )

      const postsWithMedia = await Promise.all(
        postsWithReactions.map(async (post) => {
          const media = await getMediaPost(post.post_id)
          const comments = await getAllComments(post.post_id)
          return {
            ...post,
            media,
            comments,
          }
        }),
      )
      res.json({
        postsWithMedia,
      })
    } else if (search_type === 'Page') {
      const result = await searchAll(searchValue)
      return res.json({
        result,
      })
    } else if (search_type === 'Group') {
      const result = await searchAll(searchValue)
      return res.json({
        result,
      })
    } else if (search_type === 'Home') {
      const friendsWithStatus = await searchUser(user_id, searchValue)
      res.json(friendsWithStatus)
    }
  } catch (err) {
    console.error(err)
    next(err)
  }
}

async function getUserDetail(req, res, next) {
  try {
    const { user_id } = req.params
    const { curentUser } = req.body
    const idUsers = await getAllIdUsers()
    const findUser = idUsers.find((user) => user.user_id == user_id)
    const idPages = await getAllIdPages()
    const findPage = idPages.find((page) => page.page_id == curentUser)

    if (!findPage) {
      if (!findUser) {
        const findPage = await getPageById(user_id)
        let status = ''
        const followers = await getFollowers(user_id)
        if (user_id === curentUser) {
          status = 'Myself'
        } else {
          const find = followers?.find((user_id) => user_id == curentUser)
          if (find) {
            status = 'Đã follow'
          } else {
            status = 'Chưa follow'
          }
        }
        const user_info = { ...findPage, user_id: findPage.page_id, followers }
        return res.json({ user_info, status })
      }

      let status = 'Unknown'
      if (+user_id === +curentUser) {
        status = 'Myself'
      } else {
        const friendshipRow = await getFriendshipById(curentUser)
        const friendCurrentUser = JSON.parse(friendshipRow.friendship)
        const isFriend = friendCurrentUser.some(
          (friend) => friend.user_id == +user_id,
        )
        if (isFriend) {
          status = 'Friend'
        } else {
          const sentRequest = await getFriendSentById(curentUser)
          const receivedRequest = await getFriendRequestsById(curentUser)

          const isSentRequest = sentRequest.some(
            (sent) => sent.receiver_id === +user_id,
          )
          const isReceivedRequest = receivedRequest.some(
            (sent) => sent.sender_id === +user_id,
          )

          if (isSentRequest) {
            status = 'Sent'
          } else if (isReceivedRequest) {
            status = 'Received'
          }
        }
      }

      let user = await getUserDetails(user_id)
      if (user.socket_id) {
        const socket_id = JSON.parse(user.socket_id)
        if (socket_id.length > 0) {
          user = { ...user, online: true }
        } else {
          user = { ...user, online: false }
        }
      } else {
        user = { ...user, online: false }
      }
      if (!user) {
        return res.json({ message: 'Not found' })
      }
      const friendshipRow = await getFriendshipById(user_id)

      if (!friendshipRow) {
        return res
          .status(404)
          .json({ message: 'Người dùng không có danh sách bạn bè.' })
      }

      const parsedFriendship = JSON.parse(friendshipRow.friendship)
      const friendIds = parsedFriendship.map((friend) => friend.user_id)
      // Lấy thông tin của bạn bè
      const friends = await getInfoFriends(friendIds)

      const friendsWithStatus = friends.map((friend) => {
        const matchingFriend = parsedFriendship.find(
          (parsedFriend) => parsedFriend.user_id == friend.user_id,
        )
        if (matchingFriend) {
          return {
            ...friend,
            status: matchingFriend.status,
          }
        }
        return friend
      })
      const userDetail = {
        user_info: user,
        friends: friendsWithStatus,
        status,
      }
      return res.status(200).json(userDetail)
    } else {
      if (!findUser) {
        const findPage = await getPageById(user_id)
        let status = ''
        if (user_id == curentUser) {
          status = 'Myself'
        } else {
          const followers = await getFollowers(user_id)
          const find = followers.find((user_id) => user_id == curentUser)
          if (find) {
            status = 'Đã follow'
          } else {
            status = 'Chưa follow'
          }
        }
        const user_info = { ...findPage, user_id: findPage.page_id }
        return res.json({ user_info, status })
      }
      const user = await getUserDetails(user_id)
      let status = ''
      if (!user) {
        return res.json({ message: 'Not found' })
      }
      const followers = await getFollowers(user_id)
      const find = followers.find((user_id) => user_id == curentUser)
      if (find) {
        status = 'Đã follow'
      } else {
        status = 'Chưa follow'
      }

      const friendshipRow = await getFriendshipById(user_id)

      if (!friendshipRow) {
        return res
          .status(404)
          .json({ message: 'Người dùng không có danh sách bạn bè.' })
      }

      const parsedFriendship = JSON.parse(friendshipRow.friendship)
      const friendIds = parsedFriendship.map((friend) => friend.user_id)
      // Lấy thông tin của bạn bè
      const friends = await getInfoFriends(friendIds)

      const friendsWithStatus = friends.map((friend) => {
        const matchingFriend = parsedFriendship.find(
          (parsedFriend) => parsedFriend.user_id == friend.user_id,
        )
        if (matchingFriend) {
          return {
            ...friend,
            status: matchingFriend.status,
          }
        }
        return friend
      })

      res.json({
        user_info: user,
        friends: friendsWithStatus,
        status,
      })
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

async function check(req, res, next) {
  try {
    const { id } = req.params
    const idUsers = await getAllIdUsers()
    const idPages = await getAllIdPages()
    const check = idUsers.concat(idPages)
    const find = check.find(
      (check) => check.user_id == id || check.page_id == id,
    )
    if (!find) {
      res.json({
        message: 'Not found',
      })
    } else {
      res.json({
        message: 'Success',
      })
    }
  } catch (error) {
    console.log(error)
  }
}
async function checkStatus(req, res, next) {
  try {
    const { user_id } = req.params
    const { curentUser } = req.body
    let status = 'Unknown'
    if (+user_id === +curentUser) {
      status = 'Myself'
    } else {
      const friendshipRow = await getFriendshipById(curentUser)
      const friendCurrentUser = JSON.parse(friendshipRow.friendship)
      const isFriend = friendCurrentUser.some(
        (friend) => friend.user_id == +user_id,
      )
      if (isFriend) {
        status = 'Friend'
      } else {
        const sentRequest = await getFriendSentById(curentUser)
        const receivedRequest = await getFriendRequestsById(curentUser)

        const isSentRequest = sentRequest.some(
          (sent) => sent.receiver_id === +user_id,
        )
        const isReceivedRequest = receivedRequest.some(
          (sent) => sent.sender_id === +user_id,
        )

        if (isSentRequest) {
          status = 'Sent'
        } else if (isReceivedRequest) {
          status = 'Received'
        }
      }
    }
    res.json(status)
  } catch (error) {
    console.log(error)
  }
}
async function updateUserTypePost(req, res, next) {
  try {
    const { id } = req.params
    const { typePost } = req.body
    const updatedUser = await updateTypePostDefault(id, typePost)
    res.status(200).json(updatedUser)
  } catch (error) {
    console.error(error)
    next(error)
  }
}
async function updateImage(req, res, next) {
  try {
    const { id } = req.params
    const { avatar, type } = req.body
    await updateImageUser(id, avatar, type)
    res.status(200).json({
      message: 'Cập nhật thành công',
    })
  } catch (error) {
    console.log(error)
  }
}
async function updateProfile(req, res, next) {
  try {
    const { id } = req.params
    const {
      company,
      position,
      city,
      description,
      schoolName,
      university,
      specialized_1,
      specialized_2,
      relationship,
      homeTown,
      biography,
      selectedHobbies,
    } = req.body
    await updateProfileUser(
      company,
      position,
      city,
      description,
      schoolName,
      university,
      specialized_1,
      specialized_2,
      relationship,
      homeTown,
      biography,
      selectedHobbies,
      id,
    )
    res.status(200).json({
      message: 'Thành công rồi nà',
    })
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  getUsersBySearch,
  getUserDetail,
  check,
  updateUserTypePost,
  updateImage,
  checkStatus,
  updateProfile,
  checkStatus,
}
