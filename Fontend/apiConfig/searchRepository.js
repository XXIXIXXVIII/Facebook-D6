import Repository from './Repository'
const resourse = '/search_history'

export default {
  // Tìm kiếm gần đây
  searchRecently(userId) {
    return Repository.get(`${resourse}/${userId}`)
  },

  // Tìm kiếm người dùng
  searchUser({ value, userId }, payload) {
    return Repository.post(
      `users?searchValue=${value}&user_id=${userId}`,
      payload
    )
  },

  // Gửi giá trị tìm kiếm để tìm kiếm người dùng
  postSearchUserValue(userId, payload) {
    return Repository.post(`/users/?user_id=${userId}`, payload)
  },

  // Gửi giá trị tìm kiếm để tìm kiếm tất cả theo chữ
  postSearchValue(userId, payload) {
    return Repository.post(`/users/?user_id=${userId}`, payload)
  },

  // Xóa lịch sử tìm kiếm
  deleteSearch(searchId) {
    return Repository.delete(`${resourse}/${searchId}`)
  },
}
