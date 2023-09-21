import Repository from './Repository'
const resourse = '/storage'

export default {
  savePost({id,postId}){
    return Repository.post(`${resourse}/${id}`, {postId})
  },

  getSavePost({id}){
    return Repository.get(`${resourse}/${id}`)
  },

  deleteStorage({id}){
    return Repository.delete(`${resourse}/${id}`)
  }
}