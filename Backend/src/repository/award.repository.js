const db = require('../services/db.service')

async function getAllAwards(searchValue) {
  try {
    const awards = await db('award')
      .select('*')
      .where('award_name', 'like', `%${searchValue}%`)
    return awards
  } catch (error) {
    console.log(error)
  }
}

module.exports = { getAllAwards }
