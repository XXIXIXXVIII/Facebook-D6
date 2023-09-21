import Repository from './Repository'
const resourse = '/friends'

export default {
  getFriends(userId) {
    return Repository.get(`${resourse}/${userId}`)
  },
  requestsFriends({ userId }) {
    return Repository.get(`${resourse}/requests/${userId}`)
  },
  agreeRequestFriend({ senderId, receiverId }) {
    return Repository.put(`${resourse}/acceptedFriendRequest`, {
      sender_id: senderId,
      receiver_id: receiverId,
    })
  },
  rejectedAddFriend({ senderId, receiverId }) {
    return Repository.post(`${resourse}/rejectedAddFriend`, {
      sender_id: senderId,
      receiver_id: receiverId,
    })
  },
  unfriend({currentUser , friendId}){
    return Repository.patch(`${resourse}/unfriend`, {currentUser,friendId})
  },
  suggestionssFriends({ userId }) {
    return Repository.get(`${resourse}/suggests_friends/${userId}`)
  },
  addFriend({ senderId, receiverId }) {
    return Repository.post(`${resourse}/addFriend`, {
      sender_id: senderId,
      receiver_id: receiverId,
    })
  },
  allFriend({ userId }) {
    return Repository.get(`${resourse}/${userId}`)
  },
}
