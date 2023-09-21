const { getAllImageByUser } = require('../repository/index')

/* eslint-disable quotes */
async function getImages(req, res, next) {
  try {
    const { user_id } = req.params
    const images = await getAllImageByUser(user_id)
    res.json({
      images,
    })
  } catch (err) {
    console.error(err)
    next(err)
  }
}
module.exports = { getImages }
