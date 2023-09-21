const db = require('../services/db.service')
const moment = require('moment')
const { createReaction } = require('./reaction.repository')
async function getAllUsers() {
  try {
    const users = await db('users').select('*')
    delete users.password
    return users
  } catch (error) {
    console.log(error)
  }
}
async function getAllIdUsers() {
  try {
    const idUsers = await db('users').select('user_id')
    return idUsers
  } catch (error) {
    console.log(error)
  }
}
async function searchAll(searchValue) {
  try {
    const users = await db('users')
      .select('user_id', 'fullName', 'avatar')
      .where('fullName', 'like', `%${searchValue}%`)

    const posts = await db('posts')
      .select('posts.*', 'users.fullName', 'users.avatar')
      .join('users', 'posts.user_id', '=', 'users.user_id')
      .where('content', 'like', `%${searchValue}%`)

    const pages = await db('pages')
      .select('page_id', 'fullName', 'avatar')
      .where('fullName', 'like', `%${searchValue}%`)
    const groups = await db('grouppages')
      .select('groupName', 'coverAvatar', 'groupId')
      .where('groupName', 'like', `%${searchValue}%`)
    return { users, posts, pages, groups }
  } catch (error) {
    console.log(error)
  }
}

async function getUserById(user_id) {
  try {
    const user = await db('users')
      .where('user_id', user_id)
      .select(
        'user_id',
        'fullName',
        'avatar',
        'cover_img',
        'firstName',
        'typePost',
      )
      .first()
    return user
  } catch (error) {
    console.log(error)
  }
}
async function getUserDetails(user_id) {
  try {
    const find = await db('users')
      .leftJoin('online_users', 'online_users.user_id', '=', 'users.user_id')
      .where('users.user_id', user_id)
      .select('users.*', 'online_users.socket_id')
      .first()
    const user = { ...find, hobbies: JSON.parse(find.hobbies) }
    delete user.password
    return user
  } catch (error) {
    console.log(error)
  }
}
async function getUserByEmail(email) {
  try {
    const find = await db('users').where('email', email).first()
    let hobbies = []
    if (find.hobbies) {
      hobbies = JSON.parse(find.hobbies)
    }
    const user = { ...find, hobbies }
    return user
  } catch (error) {
    console.log(error)
  }
}
async function checkUserByEmail(email) {
  try {
    const user = await db('users').where('email', email).first()
    return user
  } catch (error) {
    console.log(error)
  }
}

async function getUsersBySearching(searchValue, friendIds) {
  try {
    const friends = await db('users')
      .select('user_id', 'fullName', 'avatar')
      .whereIn('user_id', friendIds)
      .andWhere('fullName', 'like', `%${searchValue}%`)
    return friends
  } catch (error) {
    console.log(error)
  }
}
async function createUser(
  firstName,
  lastName,
  fullName,
  email,
  password,
  birthday,
  gender,
  createdAt,
  avatar,
  cover_img,
) {
  try {
    const newUserId = await db('users').insert({
      firstName,
      lastName,
      email,
      password,
      birthday,
      gender,
      fullName,
      createdAt,
      avatar,
      cover_img,
      typePost: 'Công khai',
    })
    const user_id = newUserId[0]
    const newUser = await getUserById(user_id)
    return newUser
  } catch (error) {
    console.log(error)
  }
}
async function getInfoFriends(user_id) {
  try {
    const friends = await db('users')
      .whereIn('user_id', user_id)
      .select('user_id', 'fullName', 'avatar')
    return friends
  } catch (error) {
    console.log(error)
  }
}
async function updateTypePostDefault(user_id, typePost) {
  try {
    await db('users').where('user_id', user_id).update({ typePost })

    // Lấy thông tin người dùng sau khi cập nhật
    const updatedUser = await getUserById(user_id)

    return updatedUser
  } catch (error) {
    console.error(error)
  }
}
async function updateImageUser(user_id, avatar, type) {
  try {
    if (type === 'avatar') {
      await db('users').where('user_id', user_id).update({ avatar })
    } else if (type === 'coverImg') {
      await db('users').where('user_id', user_id).update({ cover_img: avatar })
    }
    const createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
    const content =
      type === 'avatar' ? 'Đã cập nhật ảnh đại diện.' : 'Đã cập nhật ảnh bìa.'

    const newPost = await db('posts').insert({
      user_id,
      feeling: content,
      createdAt,
      typePost: 'Công khai',
    })
    await createReaction(newPost[0])
    await db('media_post').insert({
      media_type: 'image',
      url: avatar,
      user_id,
      post_id: newPost[0],
    })
  } catch (error) {
    console.error(error)
  }
}
async function updateProfileUser(
  company,
  position,
  city,
  describe,
  schoolName,
  university,
  specialized_1,
  specialized_2,
  relationship,
  homeTown,
  biography,
  hobbies,
  user_id,
) {
  try {
    const findUser = await db('users')
      .select('*')
      .where('user_id', user_id)
      .first()
    const hobbiesJson = JSON.stringify(hobbies)
    findUser.biography = biography
    findUser.company = company
    findUser.position = position
    findUser.city = city
    findUser.describe = describe
    findUser.schoolName = schoolName
    findUser.university = university
    findUser.specialized_1 = specialized_1
    findUser.specialized_2 = specialized_2
    findUser.relationship = relationship
    findUser.homeTown = homeTown
    findUser.hobbies = hobbiesJson
    await db('users').where('user_id', user_id).update({
      company,
      position,
      city,
      describe,
      schoolName,
      university,
      specialized_1,
      specialized_2,
      relationship,
      homeTown,
      biography,
      hobbies: hobbiesJson,
    })
  } catch (error) {
    console.log(error)
  }
}
// async function getUserByEmail(email) {
//   try {
//     const find = await db("users").where("email", email).first();
//     const user = { ...find, hobbies: JSON.parse(find.hobbies) };
//     return user;
//   } catch (error) {
//     console.log(error);
//   }
// }
module.exports = {
  getAllUsers,
  getAllIdUsers,
  getUserByEmail,
  getUserById,
  getInfoFriends,
  getUserDetails,
  searchAll,
  getUsersBySearching,
  createUser,
  updateTypePostDefault,
  updateImageUser,
  updateProfileUser,
  checkUserByEmail,
}
