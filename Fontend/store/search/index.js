const searchModule = {
  state() {
    return {
      searchResult: 'searchResult',
    }
  },
  mutations: {
    setSearchResult(state, value) {
      state.searchResult = value
    },
  },
}

export default searchModule
