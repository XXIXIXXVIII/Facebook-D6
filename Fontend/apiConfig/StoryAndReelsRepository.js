import Repository from './Repository'
const resourse = '/stories'
export default {
  createStory(payload) {
    return Repository.post(`${resourse}`, payload)
  },
  getStory(storyId) {
    return Repository.get(`${resourse}/${storyId}`)
  },
  getStoryDetail(userId, payload) {
    return Repository.get(`${resourse}/user_stories/${userId}`, payload)
  },
  postCommonet(payload) {
    return Repository.post(`${resourse}/comments`, payload)
  },
  dataComment(idStory) {
    return Repository.get(`${resourse}/getComments/comments/${idStory}`)
  },
}
