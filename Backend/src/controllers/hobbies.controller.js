const { getAllHobbies } = require('../repository/index')

/* eslint-disable quotes */
async function getHobbies(req, res, next) {
  try {
    const hobbies = await getAllHobbies()
    res.json({
      hobbies,
    })
  } catch (err) {
    console.error(err)
    next(err)
  }
}
module.exports = { getHobbies }
