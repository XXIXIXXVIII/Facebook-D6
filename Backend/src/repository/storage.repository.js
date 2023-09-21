const db = require('../services/db.service')
async function getStorageByUser(id) {
  try {
    const storage = await db('storage')
      .select(
        'users.user_id as current_user_id',
        'users.fullName as current_fullName',
        'users.avatar as current_avatar',
        'storage.*',
        'posts.*',
      )
      .join('users', 'users.user_id', '=', 'storage.user_id')
      .join('posts', 'posts.post_id', '=', 'storage.post_id')
      .where('storage.user_id', id)
    return storage
  } catch (error) {
    console.log(error)
  }
}
async function getStorageExist(id) {
  try {
    const storage = await db('storage')
      .select('*')
      .where('storage.user_id', id)
    return storage
  } catch (error) {
    console.log(error)
  }
}
async function createStorage(user_id, post_id) {
  try {
    const check = await db('storage')
      .select('*')
      .where('user_id', user_id)
      .andWhere('post_id', post_id)
      .first()
    if (!check) {
      const newStorage = {
        user_id: user_id,
        post_id: post_id,
      }
      const arrayNewStorage = await db('storage').insert(newStorage)
      return arrayNewStorage[0]
    } else {
    }
  } catch (error) {
    console.log(error)
  }
}
async function deleteStorage(id) {
  try {
    const deletedStorage = await db('storage').where('id', id).del()
    return deletedStorage
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  getStorageByUser,
  getStorageExist,
  createStorage,
  deleteStorage,
}
