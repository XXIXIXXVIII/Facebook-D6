const db = require('../services/db.service')
async function getRecomment(id) {
  try {
    const reComment = await db('re_comment')
      .select('re_comment.*', 'users.fullName', 'users.user_id', 'users.avatar')
      .join('users', 'users.user_id', '=', 're_comment.user_id')
      .where('re_comment.comment_id', id)
    return reComment
  } catch (error) {
    console.log(error)
  }
}
async function createReComment(comment_id, content, media, user_id, page_id) {
  try {
    const newReComment = {
      comment_id: comment_id,
      content: content,
      media: media,
      user_id: user_id,
      page_id: page_id,
    }
    const insertedReComment = await db('re_comment').insert(newReComment)
    if (insertedReComment.length > 0) {
      return insertedReComment[0]
    } else {
      throw new Error('Failed to create recomment')
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}
module.exports = { getRecomment, createReComment }
