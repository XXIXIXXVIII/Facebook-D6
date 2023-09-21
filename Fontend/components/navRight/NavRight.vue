<template>
  <div
    class="max-[1310px]:hidden fixed right-0 w-[360px] pb-16 pr-4 hover:overflow-y-auto overflow-x-hidden overflow-y-hidden max-h-full"
  >
    <!-- Trang và trang cá nhân của bạn-->
    <pages-options />
    <div
      v-if="pageLength != 0"
      class="w-[336px] mt-2 mb-2"
      style="border-bottom: 1px rgb(203, 203, 203) solid"
    ></div>
    <div v-else class="w-[336px] mt-2 mb-2"></div>
    <!-- Lời mời kết bạn -->
    <div v-if="!user.check">
      <friend-requests />
    </div>

    <!-- Danh sách tin nhắn  -->
    <messenger-list />
  </div>
</template>

<script>
import FriendRequests from './friendRequests/FriendRequests.vue'
import MessengerList from './messengerList/MessengerList.vue'
import PagesOptions from './pagesOptions/PagesOptions.vue'
export default {
  name: 'NavRight',
  components: { MessengerList, PagesOptions, FriendRequests },
  data() {
    return {
      user: null,
      pageLength: null,
    }
  },
  watch: {
    '$store.state.authModule.user': {
      handler(val) {
        this.user = val
      },
      immediate: true,
    },
    watch: {
      '$store.state.authModule.user': {
        handler(val) {
          this.user = val
        },
        immediate: true,
      },

      '$store.state.authModule.pages': {
        handler(val) {
          this.pageLength = val.length
        },
        immediate: true,
      },
    },
  },
}
</script>

<style scoped></style>
