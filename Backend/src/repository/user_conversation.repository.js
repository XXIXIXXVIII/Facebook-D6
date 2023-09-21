const db = require('../services/db.service')
const createUserConversation = (user_id_1, user_id_2, user_conversation_id) => {
  const result = db('user_conversation').insert({
    user_id_1,
    user_id_2,
    user_conversation_id,
  })
  return result
}
const getAllConversationUser = (user_id) => {
  const result = db('user_conversation')
    .where('user_id_1', '=', user_id)
    .orWhere('user_id_2', '=', user_id)
  return result
}
const getOneConversationUser = (user_id_1, user_id_2) => {
  const result = db('user_conversation')
    .where((builder) => {
      builder
        .where('user_id_1', '=', user_id_1)
        .orWhere('user_id_2', '=', user_id_1)
    })
    .andWhere((builder) => {
      builder
        .where('user_id_1', '=', user_id_2)
        .orWhere('user_id_2', '=', user_id_2)
    })
    .first()
  return result
}
module.exports = {
  createUserConversation,
  getAllConversationUser,
  getOneConversationUser,
}
