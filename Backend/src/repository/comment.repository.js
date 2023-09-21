const db = require('../services/db.service')
const moment = require('moment')

async function getAllComments(id) {
  try {
    const comments = await db('comments')
      .join('users', 'comments.user_id', '=', 'users.user_id')
      .select(
        'users.fullName',
        'users.avatar',
        'comments.content',
        'comments.id',
        'users.user_id',
      )
      .where('post_id', id)
      .orderBy('created_at', 'desc')
    return comments
  } catch (error) {
    console.log(error)
  }
}
async function getAllCommentsReels(id) {
  try {
    const comments = await db('comments')
      .join('users', 'comments.user_id', '=', 'users.user_id')
      .select(
        'users.fullName',
        'users.avatar',
        'comments.content',
        'comments.id',
        'users.user_id',
      )
      .where('story_id', id)
      .orderBy('created_at', 'desc')
    return comments
  } catch (error) {
    console.log(error)
  }
}
async function createCommentsPost(content, post_id, user_id) {
  try {
    const created_at = moment().format('YYYY-MM-DD HH:mm:ss')
    const newComment = {
      content: content,
      post_id: post_id,
      user_id: user_id,
      created_at: created_at,
    }
    const id = await db('comments').insert(newComment)
    return id[0]
  } catch (error) {
    console.log(error)
  }
}
async function createCommentsReels(content, story_id, user_id) {
  try {
    const created_at = moment().format('YYYY-MM-DD HH:mm:ss')
    const newComment = {
      content: content,
      story_id: story_id,
      user_id: user_id,
      created_at: created_at,
    }
    const id = await db('comments').insert(newComment)
    return id[0]
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  getAllComments,
  getAllCommentsReels,
  createCommentsPost,
  createCommentsReels,
}
