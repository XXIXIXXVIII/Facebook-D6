const db = require('../services/db.service')
const moment = require('moment')
const { getUserById } = require('./users.repository')
async function getUserInGroup(groupId) {
  try {
    const user = await db('groupmembers')
      .select('*')
      .join('users', 'groupmembers.user_id', '=', 'users.user_id')
      .join('grouppages', 'grouppages.groupId', '=', 'groupmembers.groupId')
      .where('grouppages.groupId', groupId)

    const admin = await getUserById(user[0].creator)
    return { user, admin }
  } catch (error) {
    console.log(error)
  }
}
async function checkMember(groupId, user_id) {
  try {
    const groups = await db('groupmembers')
      .select('*')
      .where('user_id', user_id)
    const check = await groups.find((group) => group.groupId == groupId)
    return check
  } catch (error) {
    console.log(error)
  }
}
async function joinGroup(groupId, user_id) {
  try {
    const joinedDate = moment().format('YYYY-MM-DD HH:mm:ss')
    const newMember = {
      user_id,
      groupId,
      joinedDate,
      memberRole: 'Thành viên',
    }
    await db('groupmembers').insert(newMember)
  } catch (error) {
    console.log(error)
  }
}

module.exports = { joinGroup, checkMember, getUserInGroup }
