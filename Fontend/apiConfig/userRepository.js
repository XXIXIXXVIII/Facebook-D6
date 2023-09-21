import Repository from "./Repository";
const resourse = '/user';

export default {
  getUserById({userDetail, curentUser}){
   return Repository.post(`${resourse}/${userDetail}`, {curentUser})
  },

  getUserDetail({id}){
    return Repository.get(`${resourse}/check/${id}`)
  },

  updateImgUserDetail({userId, avatar , type}) {
    return Repository.put(`${resourse}/image/${userId}`, {avatar, type});
  },
  updateImgPageDetail({userId, avatar , type, adminId}) {
    console.log(`$pages/image/${userId}`, {avatar, type});
    return Repository.put(`pages/image/${userId}`, {avatar, type, admin_id:adminId});
  },

  getImgUser(userId){
    return Repository.get(`${resourse}/images/${userId}`)
  },

  profileUser(userId,payload){
    return Repository.put(`${resourse}/profile/${userId}`,payload)
  },
  profilePage(userId,payload){
    return Repository.put(`pages/profile/${userId}`,payload)
  }
}