const db = require('../services/db.service')
const addAnOnlineUser = (user_id, socket_id) => {
  const result = db('online_users').insert({ user_id, socket_id })
  return result
}
const removeOnlineUser = (socketId) => {
  const result = db('online_users').where('socket_id', '=', socketId).del()
  return result
}
const getOnlineUser = (user_id) => {
  const result = db('online_users')
    .select('*')
    .where('user_id', '=', user_id)
    .first()
  return result
}
const updateOnlineUser = (user_id, socket_id) => {
  const result = db('online_users')
    .update({ socket_id })
    .where('user_id', '=', user_id)
  return result
}
module.exports = {
  addAnOnlineUser,
  removeOnlineUser,
  getOnlineUser,
  updateOnlineUser,
}
