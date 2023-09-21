const { getAllAwards } = require('../repository/award.repository')

async function getAwards(req, res, next) {
  try {
    const { search } = req.query
    const awards = await getAllAwards(search)
    res.json({ awards })
  } catch (error) {
    console.log(error)
  }
}

module.exports = { getAwards }
