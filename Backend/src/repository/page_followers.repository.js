const db = require('../services/db.service')
const { getAllIdPages } = require('./pages.repository')
const { getAllIdUsers } = require('./users.repository')
async function getPagesFollowedByUser(userId) {
  try {
    const allTable = await db('page_followers').select('*')

    const followedPages = []

    allTable.forEach((row) => {
      const followers = JSON.parse(row.followers)
      if (followers.includes(userId) && row.page_id !== null) {
        followedPages.push(row.page_id)
      }
    })

    return followedPages
  } catch (error) {
    console.log(error)
  }
}
async function getFollowers(id) {
  try {
    const page = await db('page_followers')
      .select('*')
      .where({ page_id: id })
      .orWhere({ user_id: id })
      .first()
    let followers = []
    if (page) {
      followers = JSON.parse(page.followers)
    }
    return followers
  } catch (error) {
    console.log(error)
  }
}
function isIdInFollowers(id, followersArray) {
  return followersArray.includes(id)
}
async function getPageAndUserFollowArray(id) {
  try {
    const allTable = await db('page_followers').select('*')

    const followersInfo = []

    allTable.forEach((row) => {
      const followers = JSON.parse(row.followers)
      if (isIdInFollowers(id, followers)) {
        followersInfo.push({
          page_id: row.page_id,
          user_id: row.user_id,
        })
      }
    })
    const filteredFollowersInfo = followersInfo.map((item) => {
      const filteredItem = []
      if (item.user_id !== null) {
        filteredItem.push(item.user_id)
      }
      if (item.page_id !== null) {
        filteredItem.push(item.page_id)
      }
      return filteredItem
    })
    const followingStrings = filteredFollowersInfo
      .flat()
      .map((item) => String(item))

    return followingStrings
  } catch (error) {
    console.log(error)
  }
}
async function createdPageFollowers(pageId) {
  try {
    await db('page_followers').insert({
      page_id: pageId,
      followers: JSON.stringify([]),
    })
  } catch (error) {
    console.log(error)
  }
}
async function createdUserFollowers(userId) {
  try {
    await db('page_followers').insert({
      user_id: userId,
      followers: JSON.stringify([]),
    })
  } catch (error) {
    console.log(error)
  }
}
async function follow(id, follower_id) {
  try {
    const idUsers = await getAllIdUsers()
    const findUser = idUsers.find((user) => user.user_id == id)
    const idPages = await getAllIdPages()
    const findPage = idPages.find((page) => page.page_id == id)
    if (findPage) {
      const arrayFollowers = await getFollowers(id)
      const find = arrayFollowers.find((id) => id == follower_id)
      if (!find) {
        arrayFollowers.push(follower_id)
        await updateFollowerPage(id, arrayFollowers)
      } else {
        return false
      }
    } else if (findUser) {
      const arrayFollowers = await getFollowers(id)
      const find = arrayFollowers.find((id) => id == follower_id)
      if (!find) {
        arrayFollowers.push(follower_id)
        await updateFollowerUser(id, arrayFollowers)
      } else {
        return false
      }
    }
  } catch (error) {
    console.log(error)
  }
}

async function unfollow(id, follower_id) {
  try {
    const idUsers = await getAllIdUsers()
    const findUser = idUsers.find((user) => user.user_id == id)
    const idPages = await getAllIdPages()
    const findPage = idPages.find((page) => page.page_id == id)
    if (findPage) {
      const arrayFollowers = await getFollowers(id)
      const find = arrayFollowers.find((id) => id == follower_id)
      if (find) {
        const updatedFollowers = arrayFollowers.filter(
          (follower) => follower != follower_id,
        )
        await updateFollowerPage(id, updatedFollowers)
      } else {
        return false
      }
    } else if (findUser) {
      const arrayFollowers = await getFollowers(id)
      const find = arrayFollowers.find((id) => id == follower_id)
      if (find) {
        const updatedFollowers = arrayFollowers.filter(
          (follower) => follower != follower_id,
        )
        await updateFollowerUser(id, updatedFollowers)
      } else {
        return false
      }
    }
  } catch (error) {
    console.log(error)
  }
}

async function updateFollowerPage(id, followers) {
  try {
    await db('page_followers')
      .where('page_id', '=', id)
      .update({ followers: JSON.stringify(followers) })
  } catch (error) {
    console.log(error)
  }
}
async function updateFollowerUser(id, followers) {
  try {
    console.log(followers)
    await db('page_followers')
      .where({ user_id: id })
      .update({ followers: JSON.stringify(followers) })
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  getPagesFollowedByUser,
  createdPageFollowers,
  getPageAndUserFollowArray,
  getFollowers,
  follow,
  createdUserFollowers,
  unfollow,
}
