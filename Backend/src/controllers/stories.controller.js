const {
  getFriendshipById,
  getStoriesByUserId,
  createStory,
  getStoryDetail,
  getStoryByStoryId,
} = require('../repository/index')
const moment = require('moment')
const { scheduleStoryDeletion } = require('../utils/common')
async function getStoryByUser(req, res, next) {
  try {
    const { user_id, type } = req.query
    const stories = await getStoryDetail(user_id, type)
    res.json({
      stories,
    })
  } catch (error) {
    console.log(error)
  }
}
async function createStoryByUser(req, res, next) {
  try {
    const { user_id, content, background, color_text, font, type } = req.body
    const created_at = moment().format('YYYY-MM-DD HH:mm:ss')
    const newStory = await createStory(
      user_id,
      content,
      background,
      color_text,
      font,
      created_at,
      type,
    )
    const story = await getStoryByStoryId(newStory[0])
    if (story.type === 'Story') {
      scheduleStoryDeletion(story.story_id)
    }
    res.status(200).json({
      messages: 'Thành công',
      newStory,
    })
  } catch (error) {
    console.log(error)
  }
}
async function getStoryById(req, res, next) {
  try {
    const { id } = req.params

    const userFriendship = await getFriendshipById(id)
    if (!userFriendship) {
      console.log('ko co ban be ko render ra getStoryById')
      return res.json({
        message: 'To be continued',
      })
    }
    const parsedFriendship = JSON.parse(userFriendship.friendship)
    const friendIds = parsedFriendship.map((friend) => +friend.user_id)
    const idArray = friendIds.concat(+id)
    const storyMap = {}

    for (const userId of idArray) {
      const stories = await getStoriesByUserId(userId)
      if (stories && stories.length > 0) {
        if (!storyMap[userId]) {
          storyMap[userId] = []
        }
        storyMap[userId].push(...stories)
      }
    }

    // Chuyển đổi đối tượng storyMap thành mảng các giá trị
    const storyArray = Object.values(storyMap)

    res.json(storyArray)
  } catch (err) {
    console.error(err)
    next(err)
  }
}

module.exports = { getStoryById, getStoryByUser, createStoryByUser }
