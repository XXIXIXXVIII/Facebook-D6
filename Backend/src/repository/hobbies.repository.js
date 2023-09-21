const db = require('../services/db.service')
async function getAllHobbies() {
  try {
    const hobbies = await db('hobbies').select('*')
    return hobbies
  } catch (error) {
    console.log(error)
  }
}
module.exports = { getAllHobbies }
