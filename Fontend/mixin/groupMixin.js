import axios from 'axios'
import { RepositoryFactory } from '../apiConfig/RepositoryFactory'
import imgGruop from '../assets/img/imgGroups.png'
const apiPutDataGroup = RepositoryFactory.get('groupsRepository')
export const groupMixin = {
  watch: {
    '$store.state.groupModule.detailGroup': {
      handler(val) {
        this.dataDetailGroup = val
      },
      immediate: true,
      deep: true,
    },
    '$store.state.authModule.user': {
      handler(val) {
        this.currentUser = val
      },
      immediate: true,
      deep: true,
    },
    '$store.state.groupModule.statusImgCover': {
      handler(val) {
        this.statusImgCover = val
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {
    groupId() {
      return this.$route.params.id
    },
  },
  data() {
    return {
      dataDetailGroup: null,
      popupListImg: false,
      currentUser: '',
      isImgCover: '',
      dataImg: '',
      statusImgCover: false,
      statusImg: false,
      imgGruop,
      idAdmin: {},
    }
  },
  methods: {
    async handlerApiPut(groupId, newdata) {
      try {
        await apiPutDataGroup.updateGroups(groupId, newdata)
      } catch (error) {
        console.log(error)
      }
    },

    handleCoverImg(file) {
      if (file instanceof Object) {
        this.isImgCover = file
        const urlImg = file
        urlImg.preview = URL.createObjectURL(urlImg)
        this.dataImg = this.dataDetailGroup.coverAvatar
        this.dataDetailGroup.coverAvatar = urlImg.preview
        this.$store.commit('setStatusImgCover', true)
        this.initialState()
      } else if (typeof file === 'string') {
        this.popupListImg = false
        this.dataDetailGroup.coverAvatar = file
        this.$store.commit('setStatusImgCover', true)
        this.initialState()
      }

      this.$store.commit('setStatusImgCover', true)
      this.statusImg = false
    },

    handleCancel() {
      this.$store.commit('setStatusImgCover', false)
      this.dataDetailGroup.coverAvatar = this.dataImg
    },
    initialState() {
      this.popupListImg = false
      this.statusImgCover = false
      this.statusImg = false
    },
    async handleSave() {
      if (typeof this.dataDetailGroup.coverAvatar === 'string') {
        this.handlerApiPut(this.dataDetailGroup.groupId, {
          coverAvatar: this.dataDetailGroup.coverAvatar,
        })
        this.$store.commit('setStatusImgCover', false)
        this.initialState()
        return
      }
      this.dataDetailGroup.coverAvatar = this.isImgCover
      const dataimgCover = new FormData()
      dataimgCover.append('file', this.dataDetailGroup.coverAvatar)
      dataimgCover.append('upload_preset', 'dinoEnglish')
      try {
        const result = await axios.post(
          'https://api.cloudinary.com/v1_1/dlb1ac5xw/image/upload',
          dataimgCover
        )
        this.dataDetailGroup.coverAvatar = result.data.secure_url
        this.handlerApiPut(this.dataDetailGroup.groupId, {
          coverAvatar: this.dataDetailGroup.coverAvatar,
        })
        this.$store.commit('setStatusImgCover', false)
        this.initialState()
      } catch (error) {
        console.log(error)
      }
    },
  },
}
