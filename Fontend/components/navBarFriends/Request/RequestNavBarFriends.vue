<template lang="">
  <div>
    <div class="flex items-center gap-2 mt-3 pb-2">
      <nuxt-link to="/friends">
        <div
          class="w-9 h-9 rounded-full flex items-center justify-center hover:bg-slate-200 cursor-pointer"
        >
          <i
            style="
              background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/UMAvBmuqi-U.png');
              background-position: -78px -62px;
              background-size: 190px 200px;
              width: 20px;
              height: 20px;
              background-repeat: no-repeat;
              display: inline-block;
              filter: invert(40%);
            "
          ></i>
        </div>
      </nuxt-link>
      <div>
        <div class="text-[#65676B] text-xs">Bạn bè</div>
        <div class="text-2xl font-bold">Lời mời kết bạn</div>
      </div>
    </div>
    <div>
      <div class="pt-3 pb-1 border-t border-gray-300 font-semibold px-4">
        {{ request.length }} lời mời kết bạn
      </div>
      <div class="text-[11px] cursor-pointer text-blue-500 px-4">
        Xem lời mời đã gửi
      </div>

      <!-- =============== item ================ -->
      <div class="h-[calc(100vh-190px)] w-full overflow-y-auto px-2">
        <div v-for="user in request" :key="user.sender_id">
          <ItemFriend :id="id" :request="user" />
        </div>
      </div>

      <!-- =============== item ================ -->
    </div>
  </div>
</template>
<script>
import { RepositoryFactory } from '../../../apiConfig/RepositoryFactory'
import ItemFriend from './ItemFriend.vue'
const friendsRepository = RepositoryFactory.get('friendsRepository')
export default {
  name: 'RequestNavBarFriends',
  components: { ItemFriend },
  data() {
    return {
      request: [],
      id: 0,
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
        console.log(this.request)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
<style lang=""></style>
