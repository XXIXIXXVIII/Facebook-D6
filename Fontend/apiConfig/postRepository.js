import Repository from './Repository'
const resourse = '/posts'

export default {
  get({ userId, page, check }) {
    return Repository.post(`${resourse}/home_posts/${userId}/${page}`, {
      check,
    })
  },

  getPost({ postId, userId }) {
    console.log(postId, userId)
    return Repository.get(`${resourse}/${postId}/${userId}`)
  },
  createPost(payload) {
    return Repository.post(`${resourse}`, payload)
  },

  updatedPost(postId, payload) {
    return Repository.put(`${resourse}/${postId}`, payload)
  },
  getPostforUser({ userId }) {
    return Repository.get(`${resourse}/user_posts/${userId}`)
  },
  getPostforPage({ pageId }) {
    return Repository.get(`${resourse}/page_posts/${pageId}`)
  },
  deletePost(postId) {
    return Repository.delete(`${resourse}/${postId}`)
  },
  createComment({ commentValue, postId, userId }) {
    return Repository.post(`${resourse}/comment`, {
      commentValue,
      postId,
      userId,
    })
  },
  getComment({ postId }) {
    return Repository.get(`${resourse}/getComments/comments/${postId}`)
  },

  createReComment({ commentId, content, userId }) {
    console.log(commentId, content, userId);
    return Repository.post(`${resourse}/recomment/createReComment/${commentId}`, {
      content,
      user_id: userId,
    })
  },
  getReComment({ commentId }) {
    return Repository.get(`${resourse}/recomment/getReComment/${commentId}`)
  },


  getPostGroup(groupId,userId) {
    return Repository.get(`${resourse}/group_posts/allposts/${groupId}/${userId}`)
  },
  getVideosPage({ userId }) {
    console.log(userId)
    return Repository.get(`${resourse}/video/${userId}`)
  },
  postGroups(payload) {
    return Repository.post(`${resourse}/postGroup`, payload)
  },
}



