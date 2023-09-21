/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const db = require("../services/db.service");
// Lưu history search khi người dùng bấm vào trang cá nhân
async function saveSearchHistoryForUserProfile(user_id, user_id_search) {
  try {
    await db("history_search").insert({
      user_id: user_id,
      user_id_search: user_id_search,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Lưu history search khi người dùng không bấm vào trang cá nhân
async function saveSearchHistory(search_data, user_id) {
  try {
    await db("history_search").insert({
      search_data: search_data,
      user_id: user_id,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function getHistorySearchById(id) {
  try {
    const searchHistory = await db("history_search")
      .leftJoin("users", "history_search.user_id_search", "users.user_id")
      .where("history_search.user_id", id)
      .orderBy("history_search.id", "desc")
      .limit(8)
      .select(
        "history_search.id",
        "history_search.search_data",
        "users.fullName",
        "users.user_id",
        "users.avatar",
        db.raw(
          "CASE WHEN history_search.search_data IS NULL THEN 'Bạn bè' END AS status"
        )
      );
    return searchHistory;
  } catch (error) {
    console.log(error);
  }
}

async function deleteSearch(id) {
  try {
    await db("history_search").where("id", id).del();
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  getHistorySearchById,
  deleteSearch,
  saveSearchHistoryForUserProfile,
  saveSearchHistory,
};
