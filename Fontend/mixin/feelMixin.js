import luffy from '../assets/img/lufyNgo.jpg'
import imgGroups from '../assets/img/imgGroups.png'
import { RepositoryFactory } from '../apiConfig/RepositoryFactory'
const groupApi = RepositoryFactory.get('groupsRepository')
const feelMixin = {
  data() {
    return {
      luffy,
      user: {},
      imgGroups,
      dataGroup: [],
    }
  },
  watch: {
    '$store.state.authModule.user': {
      handler(val) {
        this.user = val
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.dataGroups()
  },
  methods: {
    async dataGroups() {
      try {
        const response = await groupApi.getGroupAdminJoin(this.user.user_id)
        console.log(response.data)
        this.dataGroupAdminJoin = response.data
      } catch (error) {
        console.log(error)
      }
    },
    async postJoinGroup(groupId, creator) {
      console.log(groupId, creator)
      const newJoin = {
        groupId,
        creator,
      }
      try {
        const response = await groupApi.postJoinGroups(newJoin)
        console.log(response.data)
        this.fechDataNotJoinGroup()
        this.dataGroups()
      } catch (error) {
        console.log(error)
      }
    },
  },
}
export { feelMixin }
