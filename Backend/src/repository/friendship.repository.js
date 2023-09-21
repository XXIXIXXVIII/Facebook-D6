/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const db = require("../services/db.service");

async function getFriendshipById(user_id) {
  try {
    const userFriendship = await db("friendships")
      .where("user_id", user_id)
      .select("friendship")
      .first();
    return userFriendship;
  } catch (error) {
    console.log(error);
  }
}

async function createFriendship(user_id) {
  try {
    await db("friendships").insert({
      user_id,
      friendship: JSON.stringify([]),
    });
  } catch (error) {
    console.log(error);
  }
}

async function updateFriendship(user_id, parsedFriendship) {
  try {
    await db("friendships")
      .where("user_id", user_id)
      .update({ friendship: JSON.stringify(parsedFriendship) });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createFriendship,
  getFriendshipById,
  updateFriendship,
};
