const moment = require('moment')
const { v4: uuidv4 } = require('uuid')
const {
  createNewPage,
  getPageById,
  createdPageFollowers,
  getPageByUserId,
  updateImagePage,
  updateTypePostPageDefault,
  updateProfilePageId,
  getFollowers,
  getAllPage,
  getPagesFollowedByUser,
} = require('../repository/index')
async function allPages(req, res, next) {
  try {
    const { userId } = req.params
    const array = await getPagesFollowedByUser(userId)
    const allPages = await getAllPage()
    const pages = allPages.filter((page) => !array.includes(page.page_id))
    res.json({ pages })
  } catch (error) {
    console.log(error)
  }
}
async function getPageByUser(req, res, next) {
  try {
    const { user_id } = req.params
    const pages = await getPageById(user_id)
    res.json({
      pages,
    })
  } catch (error) {
    console.log(error)
  }
}
async function createPage(req, res, next) {
  try {
    const {
      namePage,
      category,
      web,
      phone,
      describe,
      avatar,
      coverImg,
      userId,
      email,
      address,
    } = req.body
    const created_at = moment().format('YYYY-MM-DD HH:mm:ss')
    const page_id = uuidv4()
    await createNewPage(
      page_id,
      namePage,
      category,
      web,
      phone,
      describe,
      avatar,
      coverImg,
      userId,
      created_at,
      email,
      address,
    )
    const page = await getPageById(page_id)
    await createdPageFollowers(page_id)
    const pages = await getPageByUserId(userId)
    res.status(201).json({ user: { ...page, user_id: page_id }, pages })
  } catch (err) {
    console.log(err)
  }
}
async function getDashBoardPage(req, res, next) {
  try {
    const { id } = req.params
    const page = await getPageById(id)
    const followers = await getFollowers(id)
    res.json({ page, followers })
  } catch (error) {
    console.log(error)
  }
}
async function updateImage(req, res, next) {
  try {
    const { id } = req.params
    const { avatar, type, admin_id } = req.body

    await updateImagePage(id, avatar, type, admin_id)
    res.status(200).json({
      message: 'Cập nhật thành công',
    })
  } catch (error) {
    console.log(error)
  }
}
async function updateProfilePage(req, res, next) {
  try {
    const { id } = req.params
    const { company, position, city, biography } = req.body
    await updateProfilePageId(id, company, position, city, biography)
    res.status(200).json({
      message: 'Thành công rồi nà',
    })
  } catch (error) {
    console.log(error)
  }
}
async function updatePageTypePost(req, res, next) {
  try {
    const { id } = req.params
    const { typePost } = req.body
    const updatedUser = await updateTypePostPageDefault(id, typePost)
    res.status(200).json(updatedUser)
  } catch (error) {
    console.error(error)
    next(error)
  }
}
module.exports = {
  allPages,
  getPageByUser,
  getDashBoardPage,
  createPage,
  updateImage,
  updateProfilePage,
  updatePageTypePost,
}
