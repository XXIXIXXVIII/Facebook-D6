<template>
  <div v-if="requestQuantity > 0">
    <div class="flex items-center">
      <div class="mr-[152px] pt-2 pb-2 text-base text-gray-500 font-medium">
        Lời mời kết bạn
      </div>
      <nuxt-link
        to="/friends/requests"
        class="edit font-normal text-sm text-blue-600 p-2 rounded-lg cursor-pointer hover:bg-slate-200"
      >
        Xem tất cả
      </nuxt-link>
    </div>
    <div class="w-full overflow-y-auto px-2">
      <div v-for="user in request" :key="user.sender_id">
        <item-friend :id="id" :request="user" />
      </div>
    </div>
    <div
      class="w-[336px] mt-2 mb-2"
      style="border-bottom: 1px rgb(203, 203, 203) solid"
    ></div>
  </div>
</template>

<script>
import { RepositoryFactory } from '../../../apiConfig/RepositoryFactory'
import ItemFriend from '../../navBarFriends/Request/ItemFriend.vue'
const friendsRepository = RepositoryFactory.get('friendsRepository')
export default {
  name: 'FriendRequests',
  components: { ItemFriend },
  data() {
    return {
      request: [],
      requestQuantity: 0,
      id: 0,
      status: '',
    }
  },
  computed: {
    userId() {
      return this.$store.state.authModule.user.user_id
    },
  },
  watch: {
    '$store.state.idFriendModule.userDetail': {
      handler(val) {
        if (val) {
          this.id = val?.user_id
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.fetchRequestFriends()
  },
  methods: {
    async fetchRequestFriends() {
      try {
        const result = await friendsRepository.requestsFriends({
          userId: this.userId,
        })
        this.request = result.data
        this.requestQuantity = this.request.length
        console.log('111111', this.request.length)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped>
.right-block {
  transition-duration: 0.3s;
}
.right-block:hover {
  background-color: #7a7a7a30;
  cursor: pointer;
  transition-duration: 0.1s;
}
</style>
