const db = require('../services/db.service')
const moment = require('moment')
const {
  getPosts,
  getMediaPost,
  getFriendshipById,
  getPostsByStatus,
  createReaction,
  getPostReaction,
  getAllComments,
  getPostById,
  getPostsByParentId,
  createPost,
  getPageAndUserFollowArray,
  createPostByPage,
  getPostsByPage,
  getPostsByPageId,
  getPostHint,
  getPostsVideo,
  updateInteract,
  deletePost,
  createPostGroup,
  getPostsByGroup,
  updateInteractPost,
} = require('../repository/index')
const { createTagsPost, getTagPost } = require('../repository/tags.repository')
async function getAllPostsByUserId(req, res, next) {
  try {
    const { userId } = req.params
    const posts = await getPosts(userId)
    const filterPosts = posts.filter((post) => post.parent_post_id === null)
    const postsWithReactions = await Promise.all(
      filterPosts.map(async (post) => {
        const timeAgo = moment(post.createdAt).fromNow()
        post.createdAt = timeAgo
        const reactions = await getPostReaction(post.post_id)
        const parsedReactions = JSON.parse(reactions.reaction)
        const tags = await getTagPost(post.post_id)
        const userReaction = parsedReactions.find((reaction) =>
          reaction.user_id.includes(+userId),
        )
        if (userReaction) {
          post.status = userReaction.type
        } else {
          post.status = 'Unreact'
        }
        return {
          ...post,
          reactions: parsedReactions,
          tags,
        }
      }),
    )

    const postsWithMedia = await Promise.all(
      postsWithReactions.map(async (post) => {
        const media = await getMediaPost(post.post_id)
        const comments = await getAllComments(post.post_id)
        return {
          ...post,
          media,
          comments,
        }
      }),
    )
    res.json(postsWithMedia)
  } catch (error) {
    console.error(error)
    next(error)
  }
}
async function getAllPostByGroup(req, res, next) {
  try {
    const { groupId, userId } = req.params
    const posts = await getPostsByGroup(groupId)
    const postsWithReactions = await Promise.all(
      posts.map(async (post) => {
        const timeAgo = moment(post.createdAt).fromNow()
        post.createdAt = timeAgo
        const reactions = await getPostReaction(post.post_id)
        const parsedReactions = JSON.parse(reactions.reaction)
        const userReaction = parsedReactions.find((reaction) =>
          reaction.user_id.includes(userId),
        )
        if (userReaction) {
          post.status = userReaction.type
        } else {
          post.status = 'Unreact'
        }
        return {
          ...post,
          reactions: parsedReactions,
        }
      }),
    )

    const postsWithMedia = await Promise.all(
      postsWithReactions.map(async (post) => {
        const media = await getMediaPost(post.post_id)
        const comments = await getAllComments(post.post_id)
        return {
          ...post,
          media,
          comments,
        }
      }),
    )
    res.json({
      postsWithMedia,
    })
  } catch (error) {
    console.log(error)
  }
}
async function getAllPostsByPageId(req, res, next) {
  try {
    const { userId } = req.params
    const posts = await getPostsByPage(userId)
    const filterPosts = posts.filter((post) => post.parent_post_id == null)
    const postsWithReactions = await Promise.all(
      filterPosts.map(async (post) => {
        const timeAgo = moment(post.createdAt).fromNow()
        post.createdAt = timeAgo
        const reactions = await getPostReaction(post.post_id)
        const parsedReactions = JSON.parse(reactions.reaction)
        const userReaction = parsedReactions.find((reaction) =>
          reaction.user_id.includes(userId),
        )
        if (userReaction) {
          post.status = userReaction.type
        } else {
          post.status = 'Unreact'
        }
        return {
          ...post,
          reactions: parsedReactions,
        }
      }),
    )

    const postsWithMedia = await Promise.all(
      postsWithReactions.map(async (post) => {
        const media = await getMediaPost(post.post_id)
        const comments = await getAllComments(post.post_id)
        return {
          ...post,
          media,
          comments,
        }
      }),
    )
    res.json(postsWithMedia)
  } catch (error) {
    console.error(error)
    next(error)
  }
}
// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]]
//   }
//   return array
// }

// async function getPostAfterRegister() {
//   try {
//     const posts = await getPostHint()
//     return posts
//   } catch (error) {
//     console.log(error)
//   }
// }
async function getPostInHome(req, res, next) {
  try {
    const { userId, page } = req.params
    const { check } = req.body

    if (check) {
      const following = await getPageAndUserFollowArray(userId)
      let friendPosts = await Promise.all(
        following.map(async (friendId) => {
          const friendPost = await getPostsByStatus(friendId)
          const pagePost = await getPostsByPageId(friendId)
          return [...friendPost, ...pagePost]
        }),
      )
      if (friendPosts.length === 0) {
        friendPosts = await getPostHint()
      }
      const allPosts = [...friendPosts.flat()]
      const filterPosts = allPosts.filter(
        (post) => post.parent_post_id === null,
      )
      const postsWithReactions = await Promise.all(
        filterPosts.map(async (post) => {
          const timeAgo = moment(post.createdAt).fromNow()
          post.createdAt = timeAgo
          await updateInteract(post.page_id)
          await updateInteractPost(post.post_id)
          const reactions = await getPostReaction(post.post_id)
          const parsedReactions = JSON.parse(reactions.reaction)
          const userReaction = parsedReactions.find((reaction) =>
            reaction.user_id.includes(+userId),
          )
          if (userReaction) {
            post.status = userReaction.type
          } else {
            post.status = 'Unreact'
          }

          return {
            ...post,
            reactions: parsedReactions,
          }
        }),
      )

      const postsWithMedia = await Promise.all(
        postsWithReactions.map(async (post) => {
          const media = await getMediaPost(post.post_id)
          return {
            ...post,
            media,
          }
        }),
      )

      const items = 2

      let startIndex = 0
      if (page > 1) {
        startIndex = (page - 1) * items
      }
      const paginatedPosts = postsWithMedia.slice(
        startIndex,
        startIndex + items,
      )

      // const shuffledPosts = shuffleArray(paginatedPosts)

      return res.json(paginatedPosts)
    }
    const following = await getPageAndUserFollowArray(userId)
    const userFriendship = await getFriendshipById(userId)
    const parsedFriendship = JSON.parse(userFriendship?.friendship)

    const friendIds = parsedFriendship.map((friend) => friend.user_id)
    const friendIdsStrings = friendIds.map((item) => String(item))

    const uniqueIdsSet = new Set([...friendIdsStrings, ...following])
    const uniqueIdsArray = [...uniqueIdsSet]
    let friendPosts = await Promise.all(
      uniqueIdsArray.map(async (friendId) => {
        const friendPost = await getPostsByStatus(friendId)
        const pagePost = await getPostsByPageId(friendId)
        return [...friendPost, ...pagePost]
      }),
    )
    if (friendPosts.length === 0) {
      friendPosts = await getPostHint()
    }
    friendPosts.reverse()
    const allPosts = [...friendPosts.flat()]
    const filterPosts = allPosts.filter((post) => post.parent_post_id === null)
    const postsWithReactions = await Promise.all(
      filterPosts.map(async (post) => {
        const timeAgo = moment(post.createdAt).fromNow()
        post.createdAt = timeAgo
        await updateInteract(post.page_id)
        await updateInteractPost(post.post_id)
        const reactions = await getPostReaction(post.post_id)
        const parsedReactions = JSON.parse(reactions.reaction)
        const tags = await getTagPost(post.post_id)
        const userReaction = parsedReactions.find((reaction) =>
          reaction.user_id.includes(+userId),
        )
        if (userReaction) {
          post.status = userReaction.type
        } else {
          post.status = 'Unreact'
        }

        return {
          ...post,
          reactions: parsedReactions,
          tags,
        }
      }),
    )

    const postsWithMedia = await Promise.all(
      postsWithReactions.map(async (post) => {
        const media = await getMediaPost(post.post_id)
        return {
          ...post,
          media,
        }
      }),
    )
    const items = 2

    let startIndex = 0
    if (page > 1) {
      startIndex = (page - 1) * items
    }
    const paginatedPosts = postsWithMedia.slice(startIndex, startIndex + items)

    // const shuffledPosts = shuffleArray(paginatedPosts)

    res.json(paginatedPosts)
  } catch (error) {
    console.error(error)
    next(error)
  }
}

async function getPostDetail(req, res, next) {
  try {
    const { post_id, user_id } = req.params
    console.log(req.params)
    const postDetail = await getPostById(post_id)
    const brothersPost = await getPostsByParentId(postDetail.parent_post_id)
    const reactions = await getPostReaction(postDetail.post_id)
    const parsedReactions = JSON.parse(reactions.reaction)
    await updateInteractPost(post_id)
    const userReaction = parsedReactions.find((reaction) =>
      reaction.user_id.includes(+user_id),
    )
    if (userReaction) {
      postDetail.status = userReaction.type
    } else {
      postDetail.status = 'Unreact'
    }
    const media = await getMediaPost(postDetail.post_id)
    const comments = await getAllComments(postDetail.post_id)
    const post = {
      ...postDetail,
      createdAt: moment(postDetail.createdAt).fromNow(),
      reactions: parsedReactions,
      media: media[0],
      comments,
    }
    res.json({
      post,
      brothersPost,
    })
  } catch (error) {
    console.log(error)
  }
}
async function getPostVideoMedia(req, res, next) {
  try {
    const { userId } = req.params
    const posts = await getPostsVideo()
    const postsWithReactions = await Promise.all(
      posts.map(async (post) => {
        const timeAgo = moment(post.createdAt).fromNow()
        post.createdAt = timeAgo
        await updateInteract(post.page_id)
        const reactions = await getPostReaction(post.post_id)
        const parsedReactions = JSON.parse(reactions.reaction)
        const userReaction = parsedReactions.find((reaction) =>
          reaction.user_id.includes(+userId),
        )
        if (userReaction) {
          post.status = userReaction.type
        } else {
          post.status = 'Unreact'
        }
        return {
          ...post,
          reactions: parsedReactions,
        }
      }),
    )

    res.json({
      postsWithReactions,
    })
  } catch (error) {
    console.log(error)
  }
}
async function createNewPost(req, res, next) {
  try {
    const {
      content,
      background,
      userId,
      imagesUrl,
      videosUrl,
      typePost,
      admin_id,
      feeling,
      check,
      position,
      tags,
      checkIn,
    } = req.body

    if (check) {
      const createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
      const view = 0
      let title = ''
      let icon = ''
      if (feeling) {
        title = feeling.title
        icon = feeling.icon
        typeWrap = feeling.typeWrap
      }
      const mainPost = await createPostByPage(
        content,
        background,
        userId,
        typePost,
        view,
        createdAt,
        admin_id,
        title,
        icon,
        typeWrap,
        position,
        checkIn,
      )
      await createReaction(mainPost[0])
      if (imagesUrl.length + videosUrl.length > 1) {
        const mediaUrls = [...imagesUrl, ...videosUrl]
        for (const mediaUrl of mediaUrls) {
          let media_type = 'image'
          if (videosUrl.includes(mediaUrl)) {
            media_type = 'video'
          }
          const newPostMedia = await db('posts').insert({
            content: '',
            background: '',
            user_id: admin_id,
            typePost,
            view: 0,
            createdAt,
            parent_post_id: mainPost[0],
            page_id: userId,
            interact: 0,
            react: 0,
          })
          await createReaction(newPostMedia[0])

          await db('media_post').insert({
            media_type,
            url: mediaUrl,
            user_id: admin_id,
            post_id: newPostMedia[0],
            parent_post_id: mainPost[0],
            page_id: userId,
          })
        }
      } else if (imagesUrl.length + videosUrl.length > 0) {
        let mediaUrl
        if (imagesUrl.length > 0) {
          mediaUrl = imagesUrl[0]
        } else if (videosUrl.length > 0) {
          mediaUrl = videosUrl[0]
        } else if (imagesUrl.length + videosUrl.length === 0) {
          return
        }
        let media_type = 'image'
        if (videosUrl.includes(mediaUrl)) {
          media_type = 'video'
        }
        await db('media_post').insert({
          media_type,
          url: mediaUrl,
          user_id: admin_id,
          post_id: mainPost[0],
          page_id: userId,
        })
      }
      res.status(201).json(mainPost[0])
    } else {
      const createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
      const view = 0
      let title = ''
      let icon = ''
      let typeWrap = ''
      if (feeling) {
        title = feeling.title
        icon = feeling.icon
        typeWrap = feeling.typeWrap
      }

      const mainPost = await createPost(
        content,
        background,
        userId,
        typePost,
        view,
        createdAt,
        title,
        icon,
        typeWrap,
        position,
        checkIn,
      )
      if (tags) {
        await createTagsPost(mainPost[0], tags)
      }
      await createReaction(mainPost[0])
      if (imagesUrl.length + videosUrl.length > 1) {
        const mediaUrls = [...imagesUrl, ...videosUrl]
        for (const mediaUrl of mediaUrls) {
          let media_type = 'image'
          if (videosUrl.includes(mediaUrl)) {
            media_type = 'video'
          }
          const newPostMedia = await db('posts').insert({
            content: '',
            background: '',
            user_id: userId,
            typePost,
            view: 0,
            createdAt,
            parent_post_id: mainPost[0],
          })
          await createReaction(newPostMedia[0])

          await db('media_post').insert({
            media_type,
            url: mediaUrl,
            user_id: userId,
            post_id: newPostMedia[0],
            parent_post_id: mainPost[0],
          })
        }
      } else if (imagesUrl.length + videosUrl.length > 0) {
        let mediaUrl
        if (imagesUrl.length > 0) {
          mediaUrl = imagesUrl[0]
        } else if (videosUrl.length > 0) {
          mediaUrl = videosUrl[0]
        } else if (imagesUrl.length + videosUrl.length === 0) {
          return
        }
        let media_type = 'image'
        if (videosUrl.includes(mediaUrl)) {
          media_type = 'video'
        }
        await db('media_post').insert({
          media_type,
          url: mediaUrl,
          user_id: userId,
          post_id: mainPost[0],
        })
      }
      res.status(201).json(mainPost[0])
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
}
async function createNewPostGroup(req, res, next) {
  try {
    try {
      const {
        content,
        background,
        userId,
        groupId,
        imagesUrl,
        videosUrl,
        typePost,
      } = req.body
      const createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
      const view = 0
      const postStatus = 'Chờ duyệt'
      const mainPost = await createPostGroup(
        content,
        background,
        userId,
        groupId,
        typePost,
        view,
        createdAt,
        postStatus,
      )
      await createReaction(mainPost[0])
      if (imagesUrl.length + videosUrl.length > 1) {
        const mediaUrls = [...imagesUrl, ...videosUrl]
        for (const mediaUrl of mediaUrls) {
          let media_type = 'image'
          if (videosUrl.includes(mediaUrl)) {
            media_type = 'video'
          }
          const newPostMedia = await db('posts').insert({
            content: '',
            background: '',
            user_id: userId,
            typePost,
            view: 0,
            createdAt,
            parent_post_id: mainPost[0],
          })
          await createReaction(newPostMedia[0])

          await db('media_post').insert({
            media_type,
            url: mediaUrl,
            user_id: userId,
            post_id: newPostMedia[0],
            parent_post_id: mainPost[0],
          })
        }
      } else if (imagesUrl.length + videosUrl.length > 0) {
        let mediaUrl
        if (imagesUrl.length > 0) {
          mediaUrl = imagesUrl[0]
        } else if (videosUrl.length > 0) {
          mediaUrl = videosUrl[0]
        } else if (imagesUrl.length + videosUrl.length === 0) {
          return
        }
        let media_type = 'image'
        if (videosUrl.includes(mediaUrl)) {
          media_type = 'video'
        }
        await db('media_post').insert({
          media_type,
          url: mediaUrl,
          user_id: userId,
          post_id: mainPost[0],
        })
      }

      res.status(201).json({ message: 'Bài viết đã được tạo thành công.' })
    } catch (error) {
      console.error(error)
      next(error)
    }
  } catch (error) {
    console.log(error)
  }
}
async function updateUserPost(req, res, next) {
  try {
    // console.log(req.body)
  } catch (error) {
    // console.log(error)
  }
}
async function deleteUserPost(req, res, next) {
  try {
    const { postId } = req.params
    const deletedPost = await deletePost(postId)
    if (deletedPost > 0) {
      res.status(200).json({
        message: 'Thành công',
      })
    } else {
      res.status(400).json({
        message: 'Có lỗi xảy ra khi xóa post',
      })
    }
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  getAllPostsByUserId,
  getPostVideoMedia,
  getAllPostsByPageId,
  getAllPostByGroup,
  getPostInHome,
  getPostDetail,
  createNewPost,
  createNewPostGroup,
  updateUserPost,
  deleteUserPost,
}
