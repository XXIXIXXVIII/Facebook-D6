const groupModule = {
  state() {
    return {
      detailGroup: {},
      statusImgCover: false,
    }
  },
  getters: {
    getDetailGroup(state) {
      return state.detailGroup
    },
    getStatusImgCover(state) {
      console.log(state.statusImgCover)
      return state.statusImgCover
    },
  },
  mutations: {
    setDetailGroup(state, payload) {
      state.detailGroup = payload
    },
    setStatusImgCover(state, payload) {
      state.statusImgCover = payload
    },
  },
}
export default groupModule
