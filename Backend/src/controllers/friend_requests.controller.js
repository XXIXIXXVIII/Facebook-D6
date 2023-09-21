/* eslint-disable linebreak-style */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const moment = require("moment");
const { getCommonFriendsObject } = require("../utils/common");
const {
  getUserById,
  getFriendshipById,
  createFriendRequest,
  checkFriendRequest,
  getFriendRequestsById,
  getFriendSentById,
  checkBeforeSuggests,
  getAllUsers,
} = require("../repository/index");
async function getFriendRequests(req, res, next) {
  try {
    const { id } = req.params;
    const friendRequests = await getFriendRequestsById(id);
    return res.json(friendRequests);
  } catch (error) {
    console.log(error);
    next(error);
  }
}
async function getFriendSent(req, res, next) {
  try {
    const { id } = req.params;
    const friendSent = await getFriendSentById(id);

    return res.json(friendSent);
  } catch (error) {
    console.log(error);
  }
}

async function checkFriendshipStatus(userId, friendId) {
  const friendshipData = await getFriendshipById(userId);

  const friendshipArray = JSON.parse(friendshipData.friendship);

  return friendshipArray.some(
    (friend) => friend.user_id == friendId && friend.status == "Bạn bè"
  );
}
async function getSuggestsFriends(req, res, next) {
  try {
    const { user_id } = req.params;
    // Lấy danh sách bạn bè của người dùng
    const friendshipRow = await getFriendshipById(user_id);
    if (!friendshipRow) {
      return res
        .status(404)
        .json({ message: "Người dùng không có danh sách bạn bè." });
    }
    const users = await getAllUsers();
    const parsedFriendship = JSON.parse(friendshipRow.friendship);
    const friendIds = parsedFriendship.map((friend) => +friend.user_id);
    const friendRequests = await checkBeforeSuggests(user_id);
    const friendsAndRequests = [
      ...friendIds,
      ...friendRequests.receivedFriendRequests,
      ...friendRequests.sentFriendRequests,
    ];
    friendsAndRequests.push(+user_id);
    const userIds = users.map((user) => +user.user_id);

    const filteredUserIds = userIds.filter(
      (userId) => !friendsAndRequests.includes(userId)
    );
    const suggestsFriends = await Promise.all(
      filteredUserIds.map(async (friendId) => {
        const common = await getCommonFriendsObject(user_id, friendId);
        return common;
      })
    );
    // const filteredSuggestsFriends = suggestsFriends.filter(
    //   (suggestFriend) => suggestFriend.commonFriend.length > 0
    // );
    const sortSuggestsFriends = suggestsFriends.sort(
      (a, b) => b.commonFriend.length - a.commonFriend.length
    );
    res.json({
      sortSuggestsFriends,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function createdFriendRequest(req, res, next) {
  try {
    const { sender_id, receiver_id } = req.body;
    const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");

    // Lấy thông tin người gửi và người nhận
    const senderInfo = await getUserById(+sender_id);
    const receiverInfo = await getUserById(+receiver_id);
    if (!senderInfo || !receiverInfo) {
      return res.status(404).json({ message: "Không tìm thấy người dùng." });
    }

    // Kiểm tra xem yêu cầu kết bạn đã tồn tại hay chưa
    const requestExists = await checkFriendRequest(sender_id, receiver_id);
    if (requestExists) {
      return res.status(400).json({ message: "Yêu cầu kết bạn đã tồn tại." });
    }
    // Kiểm tra đã có trạng thái bạn bè hay chưa
    const senderIsFriend = await checkFriendshipStatus(sender_id, receiver_id);
    const receiverIsFriend = await checkFriendshipStatus(
      receiver_id,
      sender_id
    );

    if (senderIsFriend || receiverIsFriend) {
      return res.status(400).json({
        message: "Không thể gửi yêu cầu kết bạn với người đã là bạn bè.",
      });
    }
    // Thêm yêu cầu kết bạn vào bảng request_friend
    await createFriendRequest(sender_id, receiver_id, createdAt);

    // Trả về thông tin cần thiết của người gửi và người nhận
    return res.status(200).json({
      message: "Đã gửi yêu cầu kết bạn.",
      sender_info: senderInfo,
      receiver_info: receiverInfo,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

module.exports = {
  createdFriendRequest,
  getFriendRequests,
  getFriendSent,
  getSuggestsFriends,
  checkFriendshipStatus,
};
