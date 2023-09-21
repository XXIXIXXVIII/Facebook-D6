import { RepositoryFactory } from '../../apiConfig/RepositoryFactory'
const friendsRepository = RepositoryFactory.get('friendsRepository')
// const userRepository = RepositoryFactory.get('user')

const listFriendModule = {
  state() {
    return {
      listFriends: null
    }
  },
  mutations: {
    getAllFriends(state, payload){
      state.listFriends = payload.friendsWithMutual
    },
    setListFriends(state,payload){
      state.listFriends = payload
    }
  },

  actions: {
    async getAllFriends(context, {userId}){
      console.log(userId);
      try {
        const result = await friendsRepository.getFriends(userId)
        context.commit("getAllFriends",result.data)
        localStorage.setItem('listFriends', JSON.stringify(result.data.friendsWithMutual))
      } catch (error) {
        console.log(error);
      }
    }
  },
}

export default listFriendModule
