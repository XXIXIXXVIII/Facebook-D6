const db = require('../services/db.service')
const moment = require('moment')
const { createReaction } = require('./reaction.repository')
async function checkPageCompleteness(id) {
  try {
    const page = await db('pages').where('page_id', id).select('*').first()
    if (!page) {
      return false
    }
    let step = 8
    const missingFields = []

    if (!page.fullName) {
      missingFields.push('fullName')
      step--
    }
    if (
      !page.avatar ||
      page.avatar ==
        'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg'
    ) {
      missingFields.push('avatar')
      step--
    }
    if (
      !page.coverImg ||
      page.coverImg ==
        'https://img4.thuthuatphanmem.vn/uploads/2020/05/12/hinh-anh-xam-don-gian_103624444.jpg'
    ) {
      missingFields.push('coverImg')
      step--
    }
    if (!page.email) {
      missingFields.push('email')
      step--
    }
    if (!page.category) {
      missingFields.push('category')
      step--
    }
    if (!page.describe) {
      missingFields.push('describe')
      step--
    }
    if (!page.web) {
      missingFields.push('web')
      step--
    }
    if (!page.biography) {
      missingFields.push('biography')
      step--
    }

    return { step, missingFields }
  } catch (error) {
    console.log(error)
  }
}
async function getAllPage(id) {
  try {
    const pages = db('pages').select('*')
    return pages
  } catch (error) {
    console.log(error)
  }
}
async function getPageById(id) {
  try {
    const page = await db('pages').where('page_id', id).select('*').first()
    const step = await checkPageCompleteness(id)
    return { ...page, step }
  } catch (error) {
    console.log(error)
  }
}
async function getPageByUserId(id) {
  try {
    const page = await db('pages').where('admin_id', id).select('*')
    return page
  } catch (error) {
    console.log(error)
  }
}
async function getAllIdPages() {
  try {
    const idPages = await db('pages').select('page_id')
    return idPages
  } catch (error) {
    console.log(error)
  }
}
async function createNewPage(
  page_id,
  fullName,
  award,
  web,
  phone,
  describe,
  avatar,
  cover_img,
  admin_id,
  created_at,
  email,
  address,
) {
  try {
    const check = true
    const pageId = await db('pages').insert({
      page_id,
      fullName,
      category: JSON.stringify(award),
      web,
      phone,
      describe,
      avatar,
      cover_img,
      admin_id,
      created_at,
      check,
      email,
      typePost: 'Công khai',
      interact: 0,
      react: 0,
      approach: 0,
      address,
    })
    return pageId
  } catch (error) {
    console.log(error)
  }
}
async function updateImagePage(page_id, avatar, type, user_id) {
  try {
    if (type === 'avatar') {
      await db('pages').where('page_id', page_id).update({ avatar })
    } else if (type === 'coverImg') {
      await db('pages').where('page_id', page_id).update({ cover_img: avatar })
    }
    const createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
    const content =
      type === 'avatar' ? 'Đã cập nhật ảnh đại diện.' : 'Đã cập nhật ảnh bìa.'

    const newPost = await db('posts').insert({
      user_id,
      feeling: content,
      createdAt,
      typePost: 'Công khai',
      page_id,
    })
    await createReaction(newPost[0])
    await db('media_post').insert({
      media_type: 'image',
      url: avatar,
      page_id,
      post_id: newPost[0],
    })
  } catch (error) {
    console.error(error)
  }
}
async function updateProfilePageId(id, company, address, city, biography) {
  try {
    const findUser = await db('pages').select('*').where('page_id', id).first()
    findUser.biography = biography
    findUser.company = company
    findUser.address = address
    findUser.city = city
    await db('pages').where('page_id', id).update({
      company,
      address,
      city,
      biography,
    })
  } catch (error) {
    console.log(error)
  }
}
async function updateTypePostPageDefault(user_id, typePost) {
  try {
    await db('pages').where('page_id', user_id).update({ typePost })

    const updatedUser = await getPageById(user_id)

    return updatedUser
  } catch (error) {
    console.error(error)
  }
}
async function updateInteract(page_id) {
  try {
    const page = await db('pages')
      .where('page_id', page_id)
      .select('*')
      .first()

    if (page) {
      const newInteract = page.interact + 1
      await db('pages')
        .where('page_id', page_id)
        .update({ interact: newInteract })

      return newInteract
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
  }
}
async function updateReact(page_id) {
  try {
    const page = await db('pages')
      .where('page_id', page_id)
      .select('*')
      .first()

    if (page) {
      const newReact = page.react + 1
      await db('pages').where('page_id', page_id).update({ react: newReact })

      return newReact
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  getAllPage,
  createNewPage,
  getPageById,
  getPageByUserId,
  getAllIdPages,
  updateImagePage,
  updateProfilePageId,
  updateTypePostPageDefault,
  updateInteract,
  updateReact,
}
