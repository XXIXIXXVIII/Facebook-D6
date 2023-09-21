import Repository from "./Repository";
const resourse = "/reaction"

export default {
   postLike({userId, postId, type}){
    console.log(userId, postId, type)
    return  Repository.post(`${resourse}`,{userId, postId, type})
  },
  getLikePost(postId){
    return Repository.get(`${resourse}/${postId}`)
  },
  deleteLikePost({userId, postId}){
    return Repository.put(`${resourse}`, {user_id:userId, post_id:postId})
  }

}