const headerModule = {
  state() {
    return {
      showMessengerBoard: false,
      showInboxOne: false,
      showInboxTwo: false,
      showOtherInbox: false,
      messengerValue: [],
      messengerOtherValue: null,
      unreadMessagesQuantity: 0,
    }
  },
  mutations: {
    setShowMessengerBoard(state, value) {
      state.showMessengerBoard = value
    },
    setShowInboxOne(state, value) {
      state.showInboxOne = value
    },
    setShowInboxTwo(state, value) {
      state.showInboxTwo = value
    },
    setShowOtherInbox(state, value) {
      state.showOtherInbox = value
    },
    setMessengerValue(state, value) {
      state.messengerValue = value
    },
    setMessengerOtherValue(state, value) {
      state.messengerOtherValue = value
    },
    setUnreadMessagesQuantity(state, value) {
      state.unreadMessagesQuantity = value
    },
  },
}

export default headerModule
