const {
  createSessionMessage,
  takeSessionMessages,
  updateSessionMessage,
  createUserConversation,
  getOneConversationUser,
  getAllConversationUser,
  getUserById,
  takeLastSessionMessages,
  takeSessionMessageById,
} = require('../repository/index')
const moment = require('moment/moment')
const { v4: uuidv4 } = require('uuid')
moment.locale('vi')
const handlePostMessage = async (req, res) => {
  const {
    messageContent,
    fromUserId,
    toUserId,
    messageImg,
    replyMessageId,
    replyMessageContent,
    messageSticker,
  } = req.body
  try {
    // check does it have any conversation
    const conversation = await getOneConversationUser(fromUserId, toUserId)
    const message_id = uuidv4()

    if (conversation) {
      // if conversation exited
      const sessions = await takeSessionMessages(
        conversation.user_conversation_id,
      )
      const currentTime = Date.now()
      const messages = JSON.parse(sessions[0].messages).sort(
        (a, b) => a.time - b.time,
      )
      const lastTimeOfSession = messages[messages.length - 1].time
      const rangeTime = (currentTime - lastTimeOfSession) / 1000 / 60
      if (rangeTime > 10) {
        // if 2 message have range time > 10 save it as a new session
        const newSession = []
        if (messageImg) {
          const newMessage = {
            time: currentTime,
            message_id,
            user_id: fromUserId,
            readable_of_owner: 'normal',
            readable_of_viewer: 'normal',
            message_img: messageImg,
            status: 'sent',
            reply_message_id: replyMessageId,
            reply_message_content: replyMessageContent,
          }
          newSession.push(newMessage)
        }
        if (messageContent) {
          const newMessage = {
            time: currentTime,
            message_id,
            user_id: fromUserId,
            readable_of_owner: 'normal',
            readable_of_viewer: 'normal',
            message_content: messageContent,
            status: 'sent',
            reply_message_id: replyMessageId,
            reply_message_content: replyMessageContent,
          }
          newSession.push(newMessage)
        }

        if (messageSticker) {
          const newMessage = {
            time: currentTime,
            message_id,
            user_id: fromUserId,
            readable_of_owner: 'normal',
            readable_of_viewer: 'normal',
            message_sticker: messageSticker,
            status: 'sent',
            reply_message_id: replyMessageId,
            reply_message_content: replyMessageContent,
          }
          newSession.push(newMessage)
        }
        if (newSession.length === 0) {
          return res.status(400).json('nothing to save')
        }
        console.log(newSession, '<--- line 102')
        await createSessionMessage(
          currentTime,
          conversation.user_conversation_id,
          JSON.stringify(newSession),
        )
        if (messages.length === 0) {
          return res.status(400).json('nothing to save')
        }
      } else {
        // if  range of time of two message < 10 save it like new messages in last session

        if (messageImg) {
          const newMessageImg = {
            time: currentTime,
            message_id,
            user_id: fromUserId,
            readable_of_owner: 'normal',
            readable_of_viewer: 'normal',
            message_img: messageImg,
            status: 'sent',
            reply_message_id: replyMessageId,
            reply_message_content: replyMessageContent,
          }
          messages.push(newMessageImg)
        }
        if (messageContent) {
          const newMessageContent = {
            time: currentTime + 1,
            message_id,
            user_id: fromUserId,
            readable_of_owner: 'normal',
            readable_of_viewer: 'normal',
            message_content: messageContent,
            status: 'sent',
            reply_message_id: replyMessageId,
            reply_message_content: replyMessageContent,
          }
          messages.push(newMessageContent)
        }
        if (messageSticker) {
          const newMessage = {
            time: currentTime,
            message_id,
            user_id: fromUserId,
            readable_of_owner: 'normal',
            readable_of_viewer: 'normal',
            message_sticker: messageSticker,
            status: 'sent',
            reply_message_id: replyMessageId,
            reply_message_content: replyMessageContent,
          }
          messages.push(newMessage)
        }
        if (messages.length === 0) {
          return res.status(400).json('nothing to save')
        }
        await updateSessionMessage(
          sessions[0].session_id,
          JSON.stringify(messages),
        )
      }
    } else {
      // if them has any conversation create new conversation an session
      const sessionTime = Date.now()
      const conversationId = uuidv4()
      await createUserConversation(fromUserId, toUserId, conversationId)
      const messages = [
        {
          time: sessionTime,
          message_id,
          message_content: messageContent,
          user_id: fromUserId,
          readable_of_owner: 'normal',
          readable_of_viewer: 'normal',
          message_img: messageImg,
          status: 'sent',
          reply_message_id: replyMessageId,
          reply_message_content: replyMessageContent,
        },
      ]
      await createSessionMessage(
        sessionTime,
        conversationId,
        JSON.stringify(messages),
      )
    }
    res.status(200).json('send message sucessfully')
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
const handleTakeConversation = async (req, res) => {
  const { userId } = req.params
  try {
    const conversations = await getAllConversationUser(userId)
    const conversationForFontend = await Promise.all(
      conversations.map(async (e) => {
        let lastActivity
        let lastUserAvatar
        const lastSessions = await takeLastSessionMessages(
          e.user_conversation_id,
        )
        let lastMessage
        const messages = JSON.parse(lastSessions.messages)
        let unread = 0
        messages.forEach((e) => {
          if (
            e.status === 'sent' &&
            e.user_id !== userId * 1 &&
            e.readable_of_viewer !== 'remove'
          ) {
            return (unread += 1)
          }
        })
        for (let i = messages.length - 1; i >= 0; i--) {
          if (
            messages[i].user_id === userId &&
            messages[i].readable_of_owner !== 'remove'
          ) {
            lastMessage = messages[i]
            break
          } else if (
            messages[i].user_id !== userId &&
            messages[i].readable_of_viewer !== 'remove'
          ) {
            lastMessage = messages[i]
            break
          }
        }
        if (!lastMessage) {
          return
        }
        let toUser
        if (e.user_id_1 === userId * 1) {
          toUser = await getUserById(e.user_id_2)
        } else {
          toUser = await getUserById(e.user_id_1)
        }

        if (lastMessage.user_id === userId * 1) {
          if (lastMessage.status === 'seen') {
            lastUserAvatar = toUser.avatar
          }
          if (lastMessage.readable_of_owner === 'normal') {
            if (lastMessage.message_content) {
              lastActivity = 'Bạn: ' + lastMessage.message_content
            } else if (lastMessage.message_img || lastMessage.message_sticker) {
              lastActivity = 'Bạn: đã gửi một file đính kèm'
            }
          } else {
            lastActivity = 'Bạn đã thu hồi một tin nhắn'
          }
        } else {
          if (lastMessage.readable_of_viewer === 'normal') {
            if (lastMessage.message_content) {
              lastActivity = lastMessage.message_content
            } else if (lastMessage.message_img || lastMessage.message_sticker) {
              lastActivity = toUser.firstName + ' đã gửi một file đính kèm'
            }
          } else {
            lastActivity = toUser.firstName + ' đã thu hồi một tin nhắn'
          }
        }
        return {
          lastActivity,
          lastTime: lastMessage.time,
          toUserAvatar: toUser.avatar,
          unread,
          toUserName: toUser.fullName,
          lastUserAvatar,
          toUserId: toUser.user_id,
          conversationId: e.user_conversation_id,
        }
      }),
    )
    const lastConvertConversationForFontend = conversationForFontend
      .filter((e) => e !== undefined)
      .sort((a, b) => b.lastTime * 1 - a.lastTime * 1)
      .map((e) => {
        const dateTime = new Date(e.lastTime)
        const momentDate = moment(dateTime).fromNow().split(' ')
        if (momentDate[0] === 'một') {
          momentDate[0] = '1'
        }
        const converLastTime = momentDate[0] + ' ' + momentDate[1]
        return { ...e, lastTime: converLastTime }
      })
    res.status(200).json(lastConvertConversationForFontend)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
const handleTakeSessionMessage = async (req, res) => {
  const { accountHasLoginId, toUserId } = req.query
  let { conversationId } = req.query
  try {
    if (!conversationId) {
      const conversation = await getOneConversationUser(
        accountHasLoginId,
        toUserId,
      )
      if (conversation) {
        conversationId = conversation.user_conversation_id
      } else {
        return res.status(200).json([])
      }
    }
    const session = await takeSessionMessages(conversationId)
    const dataForClient = []
    // convert data for client
    for (let i = 0; i < session.length; i++) {
      const messages = JSON.parse(session[i].messages).sort(
        (a, b) => a.time - b.time,
      )
      const time = moment(session[i].session_time).format('LLL')
      const messageSendForFontend = await Promise.all(
        // conver message
        messages.map(async (e) => {
          const messageTimeForFontend = moment(e.time).format('LLL')
          if (e.user_id == accountHasLoginId) {
            if (e.readable_of_owner === 'normal') {
              return {
                messageContent: e.message_content,
                userId: e.user_id,
                time: messageTimeForFontend,
                messageId: e.message_id,
                messageImg: e.message_img,
                messageSticker: e.message_sticker,
                status: e.status,
                messageReplyId: e.reply_message_id,
                messageReplyContent: e.reply_message_content,
              }
            } else if (e.readable_of_owner === 'evicted') {
              return {
                messageNote: 'Bạn đã thu hồi một tin nhắn',
                time: messageTimeForFontend,
                messageId: e.message_id,
                status: e.status,
                userId: e.user_id,
              }
            } else {
              return undefined
            }
          } else {
            const messageOfUser = await getUserById(e.user_id)
            if (e.readable_of_viewer === 'normal') {
              return {
                messageContent: e.message_content,
                time: messageTimeForFontend,
                messageId: e.message_id,
                messageImg: e.message_img,
                messageSticker: e.message_sticker,
                status: e.status,
                messageReplyId: e.reply_message_id,
                messageReplyContent: e.reply_message_content,
                userId: e.user_id,
              }
            } else if (e.readable_of_viewer === 'evicted') {
              return {
                messageNote:
                  messageOfUser.firstName + ' đã thu hồi một tin nhắn',
                time: messageTimeForFontend,
                messageId: e.message_id,
                status: e.status,
                userId: e.user_id,
              }
            } else {
              return undefined
            }
          }
        }),
      )
      dataForClient.unshift({
        messages: messageSendForFontend.filter((e) => {
          return e !== undefined
        }),
        time,
        sessionId: session[i].session_id,
      })
    }
    res.status(200).json(dataForClient.filter((e) => e.messages.length !== 0))
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
const handleUpdateMessage = async (req, res) => {
  const { action, messageId, sessionId, accountHasLoginId } = req.body
  try {
    const session = await takeSessionMessageById(sessionId)

    let indexOfMessage
    const messages = JSON.parse(session.messages).sort(
      (a, b) => a.time - b.time,
    )
    const message = messages.find((e, index) => {
      indexOfMessage = index
      return e.message_id == messageId
    })
    if (action === 'remove') {
      if (accountHasLoginId == message.user_id) {
        messages[indexOfMessage] = { ...message, readable_of_owner: action }
      } else {
        messages[indexOfMessage] = { ...message, readable_of_viewer: action }
      }
      res.status(200).json(action + ' successfully')
    } else if (action == 'evicted') {
      if (accountHasLoginId == message.user_id) {
        messages[indexOfMessage] = {
          ...message,
          readable_of_owner: action,
          readable_of_viewer: action,
        }
        res.status(200).json(action + ' successfully')
      } else {
        res.status(400).json("you can't do this activiy")
      }
    } else {
      res.status(400).json("you can't do this activiy")
    }
    await updateSessionMessage(sessionId, JSON.stringify(messages))
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

module.exports = {
  handlePostMessage,
  handleTakeSessionMessage,
  handleTakeConversation,
  handleUpdateMessage,
}
