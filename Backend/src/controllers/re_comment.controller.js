const { getRecomment, createReComment } = require('../repository')

async function getRecommentById(req, res, next) {
  try {
    const { id } = req.params
    const reComment = await getRecomment(id)
    res.json(reComment)
  } catch (error) {
    console.log(error)
  }
}
async function reComment(req, res, next) {
  try {
    const { id } = req.params
    const { user_id, page_id, content, media } = req.body
    await createReComment(id, content, media, user_id, page_id)
    res.status(200).json({
      message: 'Thành công',
    })
  } catch (error) {
    console.log(error)
  }
}
module.exports = { getRecommentById, reComment }
