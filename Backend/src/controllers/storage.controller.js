const {
  createStorage,
  getStorageByUser,
  deleteStorage,
  getPostReaction,
  getMediaPost,
  getAllComments,
  getUserById,
  getStorageExist,
} = require('../repository')
const moment = require('moment')

async function getStorage(req, res, next) {
  try {
    const { id } = req.params
    const storage = await getStorageByUser(id)
    const postsWithReactions = await Promise.all(
      storage.map(async (post) => {
        const timeAgo = moment(post.createdAt).fromNow()
        post.createdAt = timeAgo
        const infoUser = await getUserById(post.user_id)
        const reactions = await getPostReaction(post.post_id)
        const parsedReactions = JSON.parse(reactions.reaction)
        const userReaction = parsedReactions.find((reaction) =>
          reaction.user_id.includes(id),
        )
        if (userReaction) {
          post.status = userReaction.type
        } else {
          post.status = 'Unreact'
        }
        return {
          ...post,
          ...infoUser,
          reactions: parsedReactions,
        }
      }),
    )

    const storages = await Promise.all(
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
    res.json({ storages })
  } catch (error) {
    console.log(error)
  }
}
async function savePost(req, res, next) {
  try {
    const { id } = req.params
    const { postId } = req.body

    const storage = await getStorageExist(id)
    const postExists = storage.find((post) => post.post_id == postId)
    if (postExists) {
      res.status(400).json({
        message: 'Bạn đã lưu post này rồi',
      })
    } else {
      const idNewStorage = await createStorage(id, postId)
      res.status(200).json({
        idNewStorage,
        message: 'Thành công',
      })
    }
  } catch (error) {
    console.log(error)
  }
}

async function deletePostStorage(req, res, next) {
  try {
    const { id } = req.params
    await deleteStorage(id)
    res.status(200).json({
      message: 'Xóa thành công',
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = { getStorage, savePost, deletePostStorage }
