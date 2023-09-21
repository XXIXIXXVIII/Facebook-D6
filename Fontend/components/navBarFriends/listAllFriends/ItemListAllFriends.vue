<template lang="">
  <div>
    <div
      :style="id === friend.user_id ? { background: '#F0F2F5' } : {}"
      class="flex gap-4 px-2 py-2 hover:bg-[#F0F2F5] cursor-pointer rounded-md mt-2"
      @click="handlePick(friend.user_id)"
    >
      <div
        class="w-[60px] h-[60px] rounded-full overflow-hidden flex items-center justify-center"
      >
        <img class="w-full h-full object-cover" :src="friend?.avatar" />
      </div>
      <div class="flex justify-between w-[75%]">
        <div class="flex flex-col justify-center gap-2">
          <div class="w-full">
            <div class="text-sm font-medium">{{ friend?.fullName }}</div>
          </div>

          <div v-if="friend.mutualFriends.length > 0" class="">
            <div class="text-xs text-[#65676B]">
              {{ friend.mutualFriends.length }} bạn chung
            </div>
          </div>
        </div>
        <div class="flex justify-center items-center">
          <div
            class="w-9 h-9 rounded-full flex justify-center items-center hover:bg-gray-300"
          >
            <i
              style="
                background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/mXNAp7NN6zb.png');
                background-position: -108px -154px;
                background-size: 190px 200px;
                width: 16px;
                height: 16px;
                background-repeat: no-repeat;
                display: inline-block;
                filter: invert(50%);
              "
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    friend: {
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
    async agreeRequestFriend(senderId) {
      console.log('senderId, this.userId', senderId, this.userId)
      await this.$store.dispatch('agreeRequests', {
        senderId,
        receiverId: this.userId,
      })
      await this.$store.dispatch('getAllFriends', {
        userId: this.userId,
      })
      this.agree = false
    },
    handlePick(id) {
      this.$store.dispatch('setId', { userDetail: id, curentUser: this.userId })
    },
  },
}
</script>
<style lang=""></style>
