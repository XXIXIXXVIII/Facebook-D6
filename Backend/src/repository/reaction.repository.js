const db = require('../services/db.service')
async function getPostReaction(post_id) {
  try {
    const post = await db('reaction')
      .select('*')
      .where('post_id', post_id)
      .first()
    return post
  } catch (error) {
    console.log(error)
  }
}

async function createReaction(post_id) {
  try {
    await db('reaction').insert({
      post_id,
      reaction: JSON.stringify([
        { type: 'like', user_id: [] },
        { type: 'haha', user_id: [] },
        { type: 'love', user_id: [] },
        { type: 'sad', user_id: [] },
        { type: 'wow', user_id: [] },
        { type: 'angry', user_id: [] },
        { type: 'dear', user_id: [] },
      ]),
    })
  } catch (error) {
    console.log(error)
  }
}
async function updatePostReaction(postId, updatedReactions) {
  try {
    const updatedReactionJSON = JSON.stringify(updatedReactions)

    await db('reaction')
      .where('post_id', postId)
      .update({ reaction: updatedReactionJSON })

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

module.exports = {
  createReaction,
  getPostReaction,
  updatePostReaction,
}
