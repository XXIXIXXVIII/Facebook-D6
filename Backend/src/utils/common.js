const { getFriendshipById } = require('../repository/friendship.repository')
const { getUserById } = require('../repository/users.repository')
const { deleteStory } = require('../repository/stories.repository')
const schedule = require('node-schedule')

function scheduleStoryDeletion(story_id) {
  const job = schedule.scheduleJob(new Date(Date.now() + 1200000), async () => {
    try {
      await deleteStory(story_id)
      console.log("Câu chuyện đã được xóa sau 20'.")
    } catch (error) {
      console.error('Lỗi khi xóa câu chuyện:', error)
    }
  })
  return job
}

async function getCommonFriends(user_id_1, user_id_2) {
  try {
    const friendship1 = await getFriendshipById(user_id_1)
    const parsedFriendship1 = JSON.parse(friendship1.friendship)
    const friendIds1 = parsedFriendship1.map((friend) => friend.user_id)
    const friendship2 = await getFriendshipById(user_id_2)
    const parsedFriendship2 = JSON.parse(friendship2.friendship)
    const friendIds2 = parsedFriendship2.map((friend) => friend.user_id)

    const commonFriendIds = friendIds1.filter((friendId) =>
      friendIds2.includes(+friendId),
    )
    const commonFriends = await Promise.all(
      commonFriendIds.map(async (friendId) => {
        const user = await getUserById(friendId)
        return {
          user_id: user.user_id,
          fullName: user.fullName,
          avatar: user.avatar,
        }
      }),
    )
    return commonFriends
  } catch (error) {
    console.log(error)
  }
}
async function getCommonFriendsObject(user_id_1, user_id_2) {
  try {
    const infoUser = await getUserById(user_id_2)
    const friendship1 = await getFriendshipById(user_id_1)
    const parsedFriendship1 = JSON.parse(friendship1.friendship)
    const friendIds1 = parsedFriendship1.map((friend) => friend.user_id)

    const friendship2 = await getFriendshipById(user_id_2)
    const parsedFriendship2 = JSON.parse(friendship2.friendship)
    const friendIds2 = parsedFriendship2.map((friend) => friend.user_id)

    // Tìm các bạn chung giữa hai người dùng
    const commonFriendIds = friendIds1.filter((friendId) =>
      friendIds2.includes(friendId),
    )

    const commonFriends = await Promise.all(
      commonFriendIds.map(async (friendId) => {
        const user = await getUserById(friendId)
        return {
          user_id: user.user_id,
          fullName: user.fullName,
          avatar: user.avatar,
        }
      }),
    )
    return {
      user_id: user_id_2,
      fullName: infoUser.fullName,
      avatar: infoUser.avatar,
      commonFriend: commonFriends,
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getCommonFriends,
  scheduleStoryDeletion,
  getCommonFriendsObject,
}
