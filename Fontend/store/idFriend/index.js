import { socket } from '../../plugins/socket.io'
// import { Socket } from 'socket.io-client'
import { RepositoryFactory } from '../../apiConfig/RepositoryFactory'
const friendsRepository = RepositoryFactory.get('friendsRepository')
const userRepository = RepositoryFactory.get('user')

const idFriendModule = {
  state() {
    return {
      userDetail: null,
      friends: [],
      status: 'null',
    }
  },
  mutations: {
    setId(state, payload) {
      console.log(payload)
      state.userDetail = payload
    },
    setfriends(state, payload) {
      state.friends = payload
    },
    setStatus(state, payload) {
      state.status = payload
    },
    resetUserDetai(state) {
      state.userDetail = null
      state.friends = null
    },
    addFriend(state) {
      state.status = 'Sent'
    },
    agreeRequests(state) {
      state.status = 'Friend'
    },
  },

  actions: {
    async setId(context, { userDetail, curentUser }) {
      const result = await userRepository.getUserById({
        userDetail,
        curentUser,
      })
      context.commit('setId', result.data.user_info)
      context.commit('setStatus', result.data.status)
      context.commit('setfriends', result.data.friends)
    },
    resetUserDetai(context) {
      context.commit('resetUserDetai')
    },
    agreeRequests(context, { senderId, receiverId }) {
      context.commit('agreeRequests')
      friendsRepository.agreeRequestFriend({ senderId, receiverId })
      if (socket.connected === false) {
        socket.connect()
      }
      socket.emit('accept_friend_request', {
        toUserId: receiverId,
        fromUserId: senderId,
      })
      console.log('active', socket.connected)
    },

    addFriend(context, { senderId, receiverId }) {
      context.commit('addFriend')
      friendsRepository.addFriend({ senderId, receiverId })
      if (socket.connected === false) {
        socket.connect()
      }
      socket.emit('send_friend_request', {
        toUserId: receiverId,
        fromUserId: senderId,
      })
      console.log('active', socket.connected)
    },

    rejectedFriend(context, { senderId, receiverId }) {
      friendsRepository.rejectedAddFriend({ senderId, receiverId })
      if (socket.connected === false) {
        socket.connect()
      }
      console.log('active', socket.connected)
    },

    unFriend(context, { currentUser, friendId }) {
      friendsRepository.unfriend({ currentUser, friendId })
      if (socket.connected === false) {
        socket.connect()
      }
      console.log('active', socket.connected)
    },
  },
}

export default idFriendModule
