const db = require('../services/db.service')
const moment = require('moment')

const {
  getGroupPages,
  getGroupPagesById,
  getGroupCreator,
  createNewGroupPage,
  // updateTypePostDefault,
  getJointGroupPages,
  getjoinGroupPageIsUser,
  getUnjoinedGroupPages,
  checkMember,
  joinGroup,
  getUserInGroup,
  updateImageGroup,
} = require('../repository/index')

async function getAll(req, res, next) {
  try {
    const groupPages = await getGroupPages()
    res.json(groupPages)
  } catch (err) {
    console.error(err)
    next(err)
  }
}

async function getGroupByUserJoined(req, res, next) {
  try {
    const user_id = req.params.user_id // Lấy user_id từ request params
    const jointGroups = await getJointGroupPages(user_id) // Truyền userId vào hàm getJointGroupPages
    res.json(jointGroups)
  } catch (err) {
    console.error(err)
    next(err)
  }
}

async function getjoinGroupIsUser(req, res, next) {
  try {
    const user_id = req.params.user_id // Lấy user_id từ request params
    const jointGroupsIsUser = await getjoinGroupPageIsUser(user_id) // Truyền userId vào hàm getjoinGroupPageIsUser
    res.json(jointGroupsIsUser)
  } catch (err) {
    console.error(err)
    next(err)
  }
}

async function getUnJoinGroupByUserId(req, res, next) {
  try {
    const user_id = req.params.user_id
    console.log(req.params)
    const unJoinedGroups = await getUnjoinedGroupPages(user_id)
    const limitedUnJoinedGroups = unJoinedGroups.slice(0, 5)
    res.json(limitedUnJoinedGroups)
  } catch (err) {
    console.error(err)
    next(err)
  }
}

async function getGroupByCreator(req, res, next) {
  try {
    const { user_id } = req.params
    const groupCreator = await getGroupCreator(user_id)
    res.json({
      groupCreator,
    })
  } catch (error) {
    console.log(error)
  }
}
async function getUserInEachGroup(req, res, next) {
  try {
    const { groupId } = req.params
    const user = await getUserInGroup(groupId)
    res.json({ user })
  } catch (error) {
    console.log(error)
  }
}
async function getDetail(req, res, next) {
  try {
    const groupId = req.params.groupId
    const groupPageDetail = await getGroupPagesById(groupId)
    if (groupPageDetail) {
      res.json(groupPageDetail)
    } else {
      res.status(404).json({ message: 'Không tìm thấy group với ID đã cho.' })
    }
  } catch (err) {
    console.error(err)
    next(err)
  }
}

async function createGroupPage(req, res, next) {
  try {
    const { nameGroups, privace, adminId } = req.body
    const creationDate = moment().format('YYYY-MM-DD HH:mm:ss')
    const newGroupPage = await createNewGroupPage(
      nameGroups,
      privace,
      creationDate,
      adminId,
    )
    res.status(201).json({ newGroupPage })
  } catch (err) {
    console.error(err)
    next(err)
  }
}

async function updateGroupTypePost(req, res, next) {
  try {
    const { groupId } = req.params
    const { descriptions, coverAvatar, welcomeMessage } = req.body
    const updatedGroup = await updateImageGroup(
      groupId,
      descriptions,
      coverAvatar,
      welcomeMessage,
    )
    res.status(200).json(updatedGroup)
  } catch (error) {
    console.error(error)
    next(error)
  }
}

async function userJoinGroup(req, res, next) {
  try {
    const { groupId, creator } = req.body
    console.log(req.body)
    const check = await checkMember(groupId, creator)
    if (!check) {
      await joinGroup(groupId, creator)
      return res.json({ message: 'Tham gia nhóm thành công' })
    }
    res.json({
      message: 'Bạn đã ở trong nhóm',
    })
  } catch (error) {
    console.log(error)
  }
}

async function remove(req, res, next) {
  try {
    const groupId = req.params.id

    const group = await db('groupPages')
      .where('groupId', groupId)
      .select('*')
      .first()

    if (group) {
      await db('groupPages').where('groupId', groupId).del()
      res.json({ message: 'Xóa group thành công' })
    } else {
      res.status(404).json({ message: 'Không tìm thấy group với ID đã cho.' })
    }
  } catch (err) {
    console.error(err)
    next(err)
  }
}

module.exports = {
  getAll,
  getDetail,
  getUserInEachGroup,
  userJoinGroup,
  getGroupByCreator,
  createGroupPage,
  remove,
  updateGroupTypePost,
  getGroupByUserJoined,
  getjoinGroupIsUser,
  getUnJoinGroupByUserId,
}
