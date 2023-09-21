const {
  getPostReaction,
  updatePostReaction,
  updateReact,
  getPostById,
  updateReactPost,
} = require('../repository/index')
async function user_reaction(req, res, next) {
  try {
    const { userId, postId, type } = req.body
    const findPost = await getPostById(postId)
    if (findPost.page_id) {
      await updateReact(findPost.page_id)
      await updateReactPost(findPost.post_id)
    }
    const post = await getPostReaction(postId)
    const array_reactions = JSON.parse(post.reaction)
    const updatedReactions = array_reactions.map((reaction) => {
      const userIndex = reaction.user_id.indexOf(userId)
      if (userIndex > -1) {
        reaction.user_id.splice(userIndex, 1)
      }
      if (reaction.type === type) {
        reaction.user_id.push(userId)
      }
      return reaction
    })
    await updatePostReaction(postId, updatedReactions)
  } catch (error) {
    console.error(error)
    next(error)
  }
}
async function unreaction(req, res, next) {
  try {
    const { post_id, user_id } = req.body
    console.log('unreaction', req.body)
    if (!post_id || !user_id) {
      return res.status(400).json({
        message: 'có lỗi zì đó',
      })
    }
    const postReactions = await getPostReaction(post_id)

    if (!postReactions) {
      return res
        .status(404)
        .json({ message: 'Bài viết không tồn tại hoặc không có phản ứng.' })
    }

    const reactions = JSON.parse(postReactions.reaction)
    const updatedReactions = reactions.map((reaction) => {
      const userIndex = reaction.user_id.indexOf(+user_id)
      if (userIndex > -1) {
        reaction.user_id.splice(userIndex, 1)
      }
      return reaction
    })
    await updatePostReaction(post_id, updatedReactions)
    res.status(200).json({
      message: 'Success',
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = { user_reaction, unreaction }
