import Repository from './Repository'
const resourse = '/conversation'

export default {
  // Hiển thị tin nhắn
  renderMessengerBoard(userId) {
    return Repository.get(`${resourse}/${userId}`)
  },

  // Gửi cho bên backend id để trả về dữ liệu
  renderByConversationId({ accountHasLoginId, conversationId }) {
    return Repository.get(
      `/user_messages/?accountHasLoginId=${accountHasLoginId}&conversationId=${conversationId}`
    )
  },
  renderByToUserId({ accountHasLoginId, toUserId }) {
    return Repository.get(
      `/user_messages?accountHasLoginId=${accountHasLoginId}&toUserId=${toUserId}`
    )
  },

  // Gửi tin nhắn
  sendMessage(payload) {
    return Repository.post(`/user_messages`, payload)
  },

  // Thu hồi tin nhắn
  patchMessage(payload) {
    return Repository.patch(`/user_messages`, payload)
  },
}
