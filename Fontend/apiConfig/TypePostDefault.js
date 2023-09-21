import Repository from './Repository'
const resourse = '/user'

export default {
  async putTypePostDefault({ userId, payload }) {
    console.log(userId, payload)
    return await Repository.put(`${resourse}/${userId}`, { typePost: payload })
  },
  async putPageTypePostDefault({ userId, payload }) {
    console.log(userId, payload)
    return await Repository.put(`page/${userId}`, { typePost: payload })
  },
}
