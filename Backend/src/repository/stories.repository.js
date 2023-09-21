/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const db = require("../services/db.service");
async function getStoriesByUserId(userId) {
  try {
    const stories = await db("stories")
      .where("stories.user_id", userId)
      .join("users", "stories.user_id", "=", "users.user_id")
      .select("stories.*", "users.fullName", "users.avatar")
      .orderBy("created_at", "desc");

    return stories;
  } catch (error) {
    console.log(error);
  }
}
async function getReelsByUserId(userId) {
  try {
    const stories = await db("stories")
      .where("stories.user_id", userId)
      .andWhere("stories.type", "Reels")
      .join("users", "stories.user_id", "=", "users.user_id")
      .select("stories.*", "users.fullName", "users.avatar")
      .orderBy("created_at", "desc");

    return stories;
  } catch (error) {
    console.log(error);
  }
}
async function getStoryByStoryId(storyId) {
  try {
    const story = await db("stories")
      .select("*")
      .where("story_id", storyId)
      .first();
    return story;
  } catch (error) {
    console.log(error);
  }
}
async function getStoryDetail(user_id, type) {
  try {
    const stories = await db("stories")
      .select("*")
      .join("users", "users.user_id", "=", "stories.user_id")
      .where("users.user_id", user_id)
      .andWhere("stories.type", type);

    return stories.reverse();
  } catch (error) {
    console.log(error);
  }
}
async function createStory(
  user_id,
  content,
  background,
  color_text,
  font,
  created_at,
  type
) {
  try {
    const newStory = await db("stories").insert({
      user_id,
      content,
      background,
      color_text,
      font,
      created_at,
      type,
    });
    return newStory;
  } catch (error) {
    console.log(error);
  }
}
async function deleteStory(story_id) {
  try {
    await db("stories").where("story_id", story_id).del();
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  getStoriesByUserId,
  getReelsByUserId,
  getStoryByStoryId,
  createStory,
  getStoryDetail,
  deleteStory,
};
