import Repository from "./Repository";
const resourse = "/followers"

export default {
   followPage({id, followerId}){
    console.log(id, followerId);
    return  Repository.post(`${resourse}/follow`,{id,follower_id:followerId})
  },
  unFollowPage({id, followerId}){
    return  Repository.post(`${resourse}/unfollow`,{id,follower_id:followerId})
  },
  deleteLikePost({userId, postId}){
    return Repository.put(`${resourse}`, {user_id:userId, post_id:postId})
  }

}