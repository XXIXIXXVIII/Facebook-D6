const {
  getFollowers,
  getPageAndUserFollowArray,
  follow,
  unfollow,
} = require('../repository/index')
async function getFollowersPage(req, res, next) {
  try {
    const { page_id } = req.params
    const page_followers = await getFollowers(page_id)
    res.json({
      page_followers,
    })
  } catch (error) {
    console.log(error)
  }
}
async function getPageAndUserFollow(req, res, next) {
  try {
    const { id } = req.params
    const followersInfo = await getPageAndUserFollowArray(id.toString())
    res.json({
      followersInfo,
    })
  } catch (error) {
    console.log(error)
  }
}
async function createFollow(req, res, next) {
  try {
    const { id, follower_id } = req.body
    console.log(req.body)
    if (!id || !follower_id) {
      return res.status(400).json({
        message: 'Có lỗi zì đó',
      })
    }
    if (id == follower_id) {
      return res.json({ message: 'Bạn không thể follow chính mình' })
    }

    const check = await follow(id.toString(), follower_id.toString())
    if (check === false) {
      return res.json({
        message: 'Bạn đã follow người dùng rồi!',
      })
    } else {
      return res.json({
        message: 'Follow thành công',
      })
    }
  } catch (error) {
    console.log(error)
  }
}
async function userUnfollow(req, res, next) {
  try {
    const { id, follower_id } = req.body
    const check = await unfollow(id.toString(), follower_id.toString())
    if (!check) {
      return res.json({
        message: 'Bạn đã unfollow!',
      })
    } else {
      return res.json({
        message: 'Bạn chưa follow người dùng',
      })
    }
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  getFollowersPage,
  getPageAndUserFollow,
  createFollow,
  userUnfollow,
}
