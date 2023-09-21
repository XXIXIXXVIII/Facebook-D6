const notificationModule = {
  state() {
    return {
      unreadNotificationQuantity: 0,
    }
  },
  mutations: {
    setUnreadNotificationQuantity(state, value) {
      state.unreadNotificationQuantity = value
    },
  },
}

export default notificationModule
