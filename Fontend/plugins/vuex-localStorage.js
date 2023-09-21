export default ({ store }) => {
  if (process.client) {
    // Lấy dữ liệu từ localStorage (nếu có) và gán cho store
    const storedState = localStorage.getItem('user')
    const currentUserState = localStorage.getItem('currentUser')
    const pageState = localStorage.getItem('pages')
    const currentPageState = localStorage.getItem('currentPage')
    const listFriends = localStorage.getItem('listFriends')
    if (storedState) {
      store.commit('setUserLocal', JSON.parse(storedState))
    }
    if (pageState) {
      store.commit('setPagesLocal', JSON.parse(pageState))
    }
    if (currentUserState) {
      store.commit('setCurrentUserLocal', JSON.parse(currentUserState))
    }
    if (currentPageState) {
      store.commit('setCurrentUserLocal', JSON.parse(currentPageState))
    }
    if (listFriends) {
      store.commit('setListFriends', JSON.parse(listFriends))
    }

    // Lắng nghe các thay đổi trong trạng thái auth Vuex và lưu chúng vào localStorage
    store.watch(
      (state) => state.auth,
      (newState) => {
        localStorage.setItem('user', JSON.stringify(newState))
      }
    )
  }
}
