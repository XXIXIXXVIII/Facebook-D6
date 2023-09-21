const db = require('../services/db.service')
const createSessionMessage = (session_time, user_conversation_id, messages) => {
  const result = db('user_messages_session').insert({
    session_time,
    user_conversation_id,
    messages,
  })

  return result
}
const updateSessionMessage = (sessionId, messages) => {
  const result = db('user_messages_session')
    .update({ messages: messages })
    .where('session_id', '=', sessionId)
  return result
}
const takeSessionMessages = (user_conversation_id) => {
  const result = db('user_messages_session')
    .where('user_conversation_id', '=', user_conversation_id)
    .orderBy('session_time', 'desc')
  return result
}
const takeLastSessionMessages = (user_conversation_id) => {
  const result = db('user_messages_session')
    .where('user_conversation_id', '=', user_conversation_id)
    .orderBy('session_time', 'desc')
    .first()
  return result
}
const takeSessionMessageById = (sessionId) => {
  const result = db('user_messages_session')
    .where('session_id', '=', sessionId)
    .first()
  return result
}
module.exports = {
  createSessionMessage,
  updateSessionMessage,
  takeSessionMessages,
  takeLastSessionMessages,
  takeSessionMessageById,
}
