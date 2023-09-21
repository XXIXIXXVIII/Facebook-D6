<template lang="">
  <div>
    <div class="p-9 bg-slate-100 min-h-screen">
      <div class="pb-4 text-xl font-bold">Lời mời kết bạn</div>
      <div
        v-if="request.length === 0"
        class="text-xl font-semibold w-full p-4 border border-gray-300 rounded-md text-center"
      >
        Bạn Chưa có lời mời kết bạn
      </div>
      <div class="grid grid-cols-5 gap-2">
        <div
          v-for="user in request"
          :key="user.sender_id"
          style="
            box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
              rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
          "
          class="rounded-xl overflow-hidden border border-gray-300"
        >
          <div>
            <FriendItem :user-id="userId" :user="user" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { RepositoryFactory } from '../../apiConfig/RepositoryFactory'
import FriendItem from '../../components/navBarFriends/FriendItem.vue'
const friendsRepository = RepositoryFactory.get('friendsRepository')
export default {
  name: 'FriendsHome',
  components: { FriendItem },
  layout: 'layoutFriends',
  data() {
    return {
      request: [],
      userId:null
    }
  },

  watch: {
    '$store.state.authModule.user': {
      handler(val){
        console.log(val);
        this.userId = val.user_id
        this.fetchRequestFriends()
      },
      deep: true,
      immediate: true,
    },
  },

  methods: {
    async fetchRequestFriends() {
      try {
        const result = await friendsRepository.requestsFriends({
          userId: this.userId,
        })
        this.request = result.data
        console.log(this.request)
      } catch (error) {
        console.log(error)
      }
    },
    handleIdFriend(id) {
      this.$store.dispatch('setId', { userDetail: id, curentUser: this.userId })
    },
  },
}
</script>
<style lang=""></style>
