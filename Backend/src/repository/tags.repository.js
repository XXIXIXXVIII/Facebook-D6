const db = require('../services/db.service')
async function getTagPost(post_id) {
  try {
    const find = await db('tags').select('*').where('post_id', post_id).first()
    let tags = []
    if (find) {
      tags = JSON.parse(find.user_id)
      return tags
    }
    return tags
  } catch (error) {
    console.log(error)
  }
}

async function createTagsPost(post_id, tags) {
  try {
    const arrayUser = JSON.stringify(tags)
    const newTags = {
      post_id,
      user_id: arrayUser,
    }
    const tag_post = await db('tags').insert(newTags)
    return tag_post[0]
  } catch (error) {
    console.log(error)
  }
}

module.exports = { getTagPost, createTagsPost }
