/* eslint-disable linebreak-style */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const {
  getFriendshipById,
  getUserById,
  removeFriendRequest,
  updateFriendship,
} = require("../repository/index");

async function getListFriendsId(user_id) {
  try {
    // Lấy danh sách bạn bè của người dùng
    const userFriendship = await getFriendshipById(user_id);
    if (!userFriendship) {
      return [];
    }
    // Chuyển đổi chuỗi JSON thành mảng
    const parsedFriendship = JSON.parse(userFriendship.friendship);

    // Lặp qua danh sách bạn bè và lấy các ID
    const friendIds = parsedFriendship.map((friend) => friend.user_id);
    return friendIds;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getAllFriend(req, res, next) {
  try {
    const { id } = req.params;
    const listFriends = await getListFriendsId(id);
    const friendPromises = listFriends.map(async (friendId) => {
      const user = await getUserById(friendId);
      const friendList = await getFriendshipById(friendId);
      const parsedFriendList = JSON.parse(friendList?.friendship);
      const mutualFriends = await Promise.all(
        parsedFriendList.map(async (friend) => {
          if (listFriends.includes(+friend.user_id)) {
            const friendUser = await getUserById(friend.user_id);
            return {
              user_id: friend.user_id,
              status: friend.status,
              fullName: friendUser.fullName,
              avatar: friendUser.avatar,
            };
          }
          return null;
        })
      );
      return {
        ...user,
        mutualFriends: mutualFriends.filter((friend) => friend !== null),
      };
    });
    const friendsWithMutual = await Promise.all(friendPromises);
    return res.status(200).json({ friendsWithMutual });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function acceptedFriendRequest(req, res, next) {
  try {
    const { sender_id, receiver_id } = req.body;
    // Xóa yêu cầu kết bạn khỏi bảng request_friend
    await removeFriendRequest(sender_id, receiver_id);
    // Lấy dữ liệu hiện tại từ bảng friendships
    const existingFriendshipSender = await getFriendshipById(sender_id);

    const existingFriendshipReceiver = await getFriendshipById(receiver_id);

    // Parse JSON để có thể làm việc với mảng trong dữ liệu
    const parsedFriendshipSender = JSON.parse(
      existingFriendshipSender.friendship
    );
    const parsedFriendshipReceiver = JSON.parse(
      existingFriendshipReceiver.friendship
    );
    // Cập nhật trạng thái bạn bè trong mảng friendship
    parsedFriendshipSender.push({
      user_id: +receiver_id,
      status: "Bạn bè",
    });

    parsedFriendshipReceiver.push({
      user_id: +sender_id,
      status: "Bạn bè",
    });
    // Cập nhật dữ liệu mới vào bảng friendships sau khi chuyển đổi thành chuỗi JSON
    await updateFriendship(sender_id, parsedFriendshipSender);
    await updateFriendship(receiver_id, parsedFriendshipReceiver);

    return res.status(200).json({ message: "Hai người đã trở thành bạn bè." });
  } catch (err) {
    console.error(err);
    next(err);
  }
}
async function rejectedAddFriend(req, res, next) {
  try {
    const { sender_id, receiver_id } = req.body;
    if (!sender_id || !receiver_id) {
      res.status(400).json({
        message: "Có lỗi trong quá trình hủy kết bạn",
      });
    }
    await removeFriendRequest(sender_id, receiver_id);
    res.status(200).json({
      message: "Thành công",
    });
  } catch (error) {
    console.log(error);
  }
}
async function unfriend(req, res, next) {
  try {
    const { currentUser, friendId } = req.body;
    const friend_current_user = await getFriendshipById(currentUser);
    const friend_friendId = await getFriendshipById(friendId);
    const friendCurrentUser = JSON.parse(friend_current_user.friendship);
    const friend = JSON.parse(friend_friendId.friendship);
    const updateFriendCurrentUser = friendCurrentUser.filter(
      (friend) => friend.user_id != friendId
    );
    const updateFriendofFriendId = friend.filter(
      (friend) => friend.user_id != currentUser
    );
    await updateFriendship(currentUser, updateFriendCurrentUser);
    await updateFriendship(friendId, updateFriendofFriendId);
    res.status(200).json({
      message: "Hủy kết bạn thành công",
    });
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  getAllFriend,
  getListFriendsId,
  acceptedFriendRequest,
  rejectedAddFriend,
  unfriend,
  getListFriendsId,
};
