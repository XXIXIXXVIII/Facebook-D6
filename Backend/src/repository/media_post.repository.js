/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const db = require("../services/db.service");
async function getMediaPost(post_id) {
  try {
    const media = await db("media_post")
      .select("media_type", "url", "post_id")
      .where("parent_post_id", post_id)
      .orWhere("post_id", post_id);
    return media;
  } catch (error) {
    console.log(error);
  }
}

async function getAllImageByUser(user_id) {
  try {
    const media = await db("media_post")
      .select("id", "url", "post_id")
      .where("user_id", user_id)
      .andWhere("page_id", null)
      .andWhere("media_type", "image");
    return media;
  } catch (error) {
    console.log(error);
  }
}

async function getAllImageByPage(user_id) {
  try {
    const media = await db("media_post")
      .select("id", "url")
      .where("page_id", user_id);
    return media;
  } catch (error) {
    console.log(error);
  }
}
module.exports = { getMediaPost, getAllImageByUser, getAllImageByPage };
