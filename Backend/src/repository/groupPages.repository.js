const db = require('../services/db.service')

async function getGroupPages() {
  try {
    const groupPages = await db('groupPages').select('*')
    return groupPages
  } catch (error) {
    console.log(error)
  }
}

async function getGroupPagesById(groupId) {
  try {
    // Sử dụng ID của trang nhóm để lấy thông tin chi tiết
    const groupPageDetail = await db('groupPages')
      .select('*')
      .where('groupId', groupId)
      .first() // Lấy bản ghi đầu tiên (nếu tồn tại)

    if (!groupPageDetail) {
      // Xử lý trường hợp không tìm thấy trang nhóm
      return { error: 'Không tìm thấy trang nhóm' }
    }
    const memberCount = await db('groupMembers')
      .count('memberId as memberCount')
      .where('groupId', groupId)
      .first()
    // Thêm thông tin số lượng thành viên vào dữ liệu trang nhóm
    groupPageDetail.memberCount = memberCount.memberCount

    return groupPageDetail
  } catch (error) {
    console.error(error)
    throw error
  }
}
async function getGroupCreator(user_id) {
  try {
    const groupCreator = await db('groupPages')
      .select('*')
      .where('creator', user_id)
    return groupCreator
  } catch (error) {
    console.log(error)
  }
}
async function getjoinGroupPageIsUser(user_id) {
  try {
    const jointGroupsIsUser = await db('groupPages')
      .select('*')
      .join('groupMembers', 'groupMembers.groupId', 'groupPages.groupId')
      .where('groupMembers.user_id', user_id)
      .andWhere('groupMembers.memberRole', 'user')

    return jointGroupsIsUser
  } catch (error) {
    console.log(error)
    throw error
  }
}

async function getJointGroupPages(user_id) {
  try {
    const jointGroups = await db('groupMembers')
      .select(
        'groupPages.groupId',
        'groupPages.groupName',
        'groupPages.descriptions',
        'groupPages.coverAvatar',
        'groupPages.creationDate',
      )
      .join('groupPages', 'groupMembers.groupId', 'groupPages.groupId')
      .where('groupMembers.user_id', user_id)
    return jointGroups
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function getUnjoinedGroupPages(user_id) {
  try {
    const unJointGroups = await db('groupPages')
      .select('*')
      .whereNotExists(function(builder) {
        builder
          .select('*')
          .from('groupMembers')
          .whereRaw('groupMembers.groupId = groupPages.groupId')
          .andWhere('groupMembers.user_id', user_id)
      })
      .limit(5) // Giới hạn số lượng bản ghi trả về thành 5
    return unJointGroups
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function createNewGroupPage(groupName, privacy, creationDate, creator) {
  try {
    const newGroupPage = await db('groupPages').insert({
      groupName,
      privacy,
      creationDate,
      creator,
      coverAvatar:
        'https://img4.thuthuatphanmem.vn/uploads/2020/05/12/hinh-anh-xam-don-gian_103624444.jpg',
    })
    return newGroupPage[0]
  } catch (error) {
    console.log(error)
  }
}

async function updateImageGroup(
  groupId,
  descriptions,
  coverAvatar,
  welcomeMessages,
) {
  try {
    await db('groupPages')
      .where('groupId', groupId)
      .update({ descriptions, coverAvatar, welcomeMessages })

    const updatedGroup = await getGroupPagesById(groupId)

    return updatedGroup
  } catch (error) {
    console.error(error)
  }
}
module.exports = {
  getGroupPages,
  getGroupPagesById,
  getjoinGroupPageIsUser,
  getGroupCreator,
  getJointGroupPages,
  getUnjoinedGroupPages,
  createNewGroupPage,
  updateImageGroup,
}
