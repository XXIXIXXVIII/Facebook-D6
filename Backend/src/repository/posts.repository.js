/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const db = require("../services/db.service");
const { getPageAndUserFollowArray } = require("./page_followers.repository");
async function getPosts(userId) {
  try {
    const posts = await db("posts")
      .select("posts.*", "users.fullName", "users.avatar", "users.biography")
      .join("users", "posts.user_id", "=", "users.user_id")
      .where("posts.user_id", userId)
      // .orWhere("posts.page_id", userId)
      .orderBy("posts.createdAt", "desc");
    return posts;
  } catch (error) {
    console.log(error);
  }
}
async function getPostsByPage(userId) {
  try {
    const posts = await db("posts")
      .select("*")
      .join("pages", "posts.page_id", "=", "pages.page_id")
      .where("posts.page_id", userId)
      // .orWhere("posts.page_id", userId)
      .orderBy("posts.createdAt", "desc");
    return posts;
  } catch (error) {
    console.log(error);
  }
}
async function getPostsByGroup(groupId) {
  try {
    const posts = await db("posts")
      .select("posts.*", "grouppages.*", "users.avatar", "users.fullName")
      .join("grouppages", "grouppages.groupId", "=", "posts.group_id")
      .join("users", "posts.user_id", "=", "users.user_id")
      .where("posts.group_id", groupId)
      // .orWhere("posts.page_id", userId)
      .orderBy("posts.createdAt", "desc");
    return posts;
  } catch (error) {
    console.log(error);
  }
}
async function getPostsVideo() {
  try {
    const posts = await db("posts")
      .join("media_post", "media_post.post_id", "=", "posts.post_id")
      .join("pages", "posts.page_id", "=", "pages.page_id")
      .select("*")
      .where("media_post.media_type", "video")
      .whereNotNull("media_post.page_id");
    // .andWhereNotNull("media_post.page_id");
    return posts;
  } catch (error) {
    console.log(error);
  }
}
async function getPostsByStatus(userId) {
  try {
    const find = await getPageAndUserFollowArray(userId);
    const userFollower = find.length;
    const posts = await db("posts")
      .select(
        "posts.*",
        "users.fullName",
        "users.avatar",
        "users.position",
        "users.biography"
      )
      .join("users", "posts.user_id", "=", "users.user_id")
      .where("posts.user_id", userId)
      .andWhereNot("posts.typePost", "=", "Chỉ mình tôi")
      .orderBy("posts.createdAt", "desc");
    const postsWithFollower = posts.map((post) => ({
      ...post,
      follower: userFollower,
    }));
    return postsWithFollower;
  } catch (error) {
    console.log(error);
  }
}
async function getPostsByPageId(page_id) {
  try {
    const find = await getPageAndUserFollowArray(page_id);
    const following = find.length;

    const posts = await db("posts")
      .select(
        "posts.*",
        "pages.fullName",
        "pages.avatar",
        "pages.describe",
        "pages.address",
        "pages.category"
      )
      .join("pages", "posts.page_id", "=", "pages.page_id")
      .where("posts.page_id", page_id)
      .orderBy("posts.createdAt", "desc");
    const postsWithFollower = posts.map((post) => ({
      ...post,
      follower: following,
    }));
    return postsWithFollower;
  } catch (error) {
    console.log(error);
  }
}
async function getPostById(post_id) {
  try {
    const post = await db("posts")
      .select("*")
      .where("post_id", post_id)
      .first();
    return post;
  } catch (error) {
    console.log(error);
  }
}
async function getPostHint() {
  try {
    const find = await db("posts")
      .select("*")
      .join("pages", "posts.page_id", "=", "pages.page_id")
      .whereNotNull("posts.page_id")
      .orderBy("posts.createdAt", "desc");
    const posts = find.map((post) => {
      return {
        ...post,
        title: "Gợi ý",
      };
    });
    return posts;
  } catch (error) {
    console.log(error);
  }
}
async function getPostsByParentId(post_id) {
  try {
    const posts = await db("posts")
      .select("post_id")
      .where("parent_post_id", post_id);
    return posts;
  } catch (error) {
    console.log(error);
  }
}
async function createPost(
  content,
  background,
  user_id,
  typePost,
  view,
  createdAt,
  feeling,
  icon,
  typeWrap,
  position,
  checkIn
) {
  try {
    const mainPost = await db("posts").insert({
      content,
      background,
      user_id,
      typePost,
      view,
      createdAt,
      feeling,
      icon,
      typeWrap,
      position,
      checkIn,
    });
    return mainPost;
  } catch (error) {
    console.log(error);
  }
}
async function createPostGroup(
  content,
  background,
  user_id,
  group_id,
  typePost,
  view,
  createdAt,
  status
) {
  try {
    const mainPost = await db("posts").insert({
      content,
      background,
      user_id,
      group_id,
      typePost,
      view,
      createdAt,
      status,
    });
    return mainPost;
  } catch (error) {
    console.log(error);
  }
}
async function createPostByPage(
  content,
  background,
  page_id,
  typePost,
  view,
  createdAt,
  user_id,
  feeling,
  icon,
  typeWrap,
  position,
  checkIn
) {
  try {
    const mainPost = await db("posts").insert({
      content,
      background,
      page_id,
      typePost,
      view,
      createdAt,
      user_id,
      feeling,
      icon,
      position,
      typeWrap,
      checkIn,
      interact: 0,
      react: 0,
    });
    return mainPost;
  } catch (error) {
    console.log(error);
  }
}
async function deletePost(id) {
  try {
    const deletedPost = await db("posts")
      .where("post_id", id)
      .orWhere("parent_post_id", id)
      .del();
    if (deletedPost > 0) {
      return deletedPost;
    } else {
      return { error: "Có lỗi xảy ra khi xóa bài viết" };
    }
  } catch (error) {
    console.log(error);
    return { error: "An error occurred while deleting the post" };
  }
}
async function updateInteractPost(post_id) {
  try {
    const post = await db("posts")
      .where("post_id", post_id)
      .select("*")
      .first();

    if (post) {
      const newInteract = post.interact + 1;
      await db("posts")
        .where("post_id", post_id)
        .update({ interact: newInteract });

      return newInteract;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}
async function updateReactPost(post_id) {
  try {
    const post = await db("posts")
      .where("post_id", post_id)
      .select("*")
      .first();

    if (post) {
      const newReact = post.react + 1;
      await db("posts").where("post_id", post_id).update({ react: newReact });

      return newReact;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  getPosts,
  getPostHint,
  getPostsByStatus,
  getPostsByPageId,
  getPostsByPage,
  getPostsByGroup,
  getPostsByParentId,
  createPost,
  createPostGroup,
  createPostByPage,
  getPostById,
  getPostsVideo,
  updateInteractPost,
  updateReactPost,
  deletePost,
};
