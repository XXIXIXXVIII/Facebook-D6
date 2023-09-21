import { RepositoryFactory } from '../../apiConfig/RepositoryFactory'
const postRepository = RepositoryFactory.get('posts')

const postUserDetail = {
  state() {
    return {
       postId : 0
    }
  }, 

  mutations : {
     idPost(state,{postId}){
      state.postId = postId
     }
  },

  actions : {
    deletePost(context,{postId}){
      console.log('dsfd',postId)
      postRepository.deletePost(postId)
      context.commit('idPost' , {postId})
    }
  }
}

export default postUserDetail