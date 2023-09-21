const {
  getAllComments,
  createCommentsPost,
  createCommentsReels,
  getAllCommentsReels,
} = require('../repository/index')
const moment = require('moment')
async function getComments(req, res, next) {
  try {
    const { post_id } = req.params
    const comments = await getAllComments(post_id)
    const allComments = comments.map((comment) => {
      const timeAgo = moment(comment.created_at).fromNow()
      return {
        ...comment,
        created_at: timeAgo,
      }
    })

    res.json({
      allComments,
    })
  } catch (error) {
    console.log(error)
  }
}
async function getCommentsReels(req, res, next) {
  try {
    const { story_id } = req.params
    const comments = await getAllCommentsReels(story_id)
    const allComments = comments.map((comment) => {
      const timeAgo = moment(comment.created_at).fromNow()
      return {
        ...comment,
        created_at: timeAgo,
      }
    })
    res.json({
      allComments,
    })
  } catch (error) {
    console.log(error)
  }
}
async function commentInPost(req, res, next) {
  try {
    const { userId, postId, commentValue } = req.body
    const id = await createCommentsPost(commentValue, postId, userId)
    res.status(201).json({
      messages: 'Comment successfully created',
      id,
    })
  } catch (error) {
    console.log(error)
  }
}
async function commentInReels(req, res, next) {
  try {
    const { userId, story_id, commentValue } = req.body
    const id = await createCommentsReels(commentValue, story_id, userId)
    res.status(201).json({
      messages: 'Comment successfully created',
      id,
    })
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  getComments,
  getCommentsReels,
  commentInPost,
  commentInReels,
}
