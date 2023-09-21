<template lang="">
  <div>
    <div
      :style="id === suggestions.user_id ? { background: '#F0F2F5' } : {}"
      class="flex gap-4 px-2 py-2 hover:bg-[#F0F2F5] cursor-pointer rounded-md mt-2"
      @click="handlePick(suggestions.user_id)"
    >
      <div
        class="w-[60px] h-[60px] rounded-full overflow-hidden flex items-center justify-center"
      >
        <img class="w-full h-full object-cover" :src="suggestions.avatar" />
      </div>
      <div class="w-[75%]">
        <div class="flex items-center justify-between w-full">
          <div class="text-sm font-medium">{{ suggestions.fullName }}</div>
        </div>

        <div v-if="agree" class="flex items-center relative mt-1">
          <div
            v-if="suggestions.commonFriend[0]"
            class="w-5 h-5 rounded-full overflow-hidden border-2 border-white flex items-center justify-center left-0 z-10"
          >
            <img
              class="w-full h-full object-cover"
              :src="suggestions.commonFriend[0].avatar"
            />
          </div>
          <div
            v-if="suggestions.commonFriend[1]"
            class="w-5 h-5 rounded-full overflow-hidden border-2 border-white flex items-center justify-center left-[14px] absolute"
          >
            <img
              class="w-full h-full object-cover"
              :src="suggestions.commonFriend[1].avatar"
            />
          </div>
          <div
            v-if="suggestions.commonFriend.length > 0"
            class="text-xs text-[#65676B] ml-5"
          >
            {{ suggestions.commonFriend.length }} bạn chung
          </div>
        </div>

        <div v-if="agree" class="flex items-center gap-3 mt-2 pr-2">
          <div class="flex w-1/2 items-center gap-3">
            <button
              class="px-3 w-full h-9 text-[15px] font-semibold text-white bg-[#1B74E4] rounded-md hover:bg-blue-600"
              @click.stop="sendFriendInvitations(suggestions.user_id)"
            >
              Thêm bạn bè
            </button>
          </div>
          <div class="flex w-1/2 items-center gap-3">
            <button
              class="px-3 w-full h-9 text-[15px] font-semibold bg-[#E4E6EB] rounded-md hover:bg-gray-300"
            >
              Xóa, gỡ
            </button>
          </div>
        </div>
        <div v-if="agree === false" class="text-[#65676B] text-[13px]">
          Đã gửi lời mời kết bạn
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    suggestions: {
      type: Object,
      default: () => {},
    },
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      agree: true,
    }
  },
  computed: {
    userId() {
      return this.$store.state.authModule.user.user_id
    },
  },
  methods: {
    async sendFriendInvitations(receiverId) {
      await this.$store.dispatch('addFriend', {
        senderId: this.userId,
        receiverId,
      })
      this.agree = false
    },
    handlePick(id) {
      console.log(id)
      this.$store.dispatch('setId', { userDetail: id, curentUser: this.userId })
    },
  },
}
</script>
<style lang=""></style>
