import Repository from './Repository'
const resourse = '/groupPage'
export default {
  // tạo group
  createGroups(payload) {
    return Repository.post(`${resourse}`, payload)
  },

  // các group của admin
  getGroupsAdmin(userId) {
    return Repository.get(`${resourse}/groupCreator/${userId}`)
  },

  // group chi tiết admin
  getDetaiAdmin(groupId) {
    return Repository.get(`${resourse}/detailGroup/${groupId}`)
  },

  // getAllGroups() {
  //   return Repository.get(resourse)
  // },
  updateGroups(gropsId, payload) {
    return Repository.put(`${resourse}/${gropsId}`, payload)
  },

  // Tất cả các nhóm add đã tham gia có cả group của admin trang join
  getJoinGroups(userId) {
    return Repository.get(`${resourse}/${userId}`)
  },

  // group admin chưa tham gia trang discover
  getNotJoinGroups(userId) {
    console.log(userId)
    return Repository.get(`${resourse}/unJoinGroupPage/${userId}`)
  },
  // group admin tham gia không bao gồm group admin
  getGroupAdminJoin(userId) {
    return Repository.get(`${resourse}/joinGroupIsUser/${userId}`)
  },
  // tham gia nhóm
  postJoinGroups(joinGroup) {
    return Repository.post(`${resourse}/joinGroup`, joinGroup)
  },

  // thành viên tham gia nhóm
  getMemberGroup(groupId) {
    return Repository.get(`${resourse}/group/userInGroup/${groupId}`)
  },
}
