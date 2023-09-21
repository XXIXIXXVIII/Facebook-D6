<template lang="">
  <div>
    <div
      :style="id === request.sender_id ? { background: '#F0F2F5' } : {}"
      class="flex gap-4 px-2 py-2 hover:bg-[#F0F2F5] cursor-pointer rounded-md mt-2"
      @click="handlePick(request.sender_id)"
    >
      <div
        class="w-[60px] h-[60px] rounded-full overflow-hidden flex items-center justify-center"
      >
        <img class="w-full h-full object-cover" :src="request.avatar" />
      </div>
      <div class="w-[75%]">
        <div class="flex items-center justify-between w-full">
          <div class="text-sm font-medium">{{ request.fullName }}</div>
          <div v-if="!status" class="text-xs text-[#65676B] flex-1">
            {{
              request.createdAt.charAt(0).toUpperCase() +
              request.createdAt.slice(1)
            }}
          </div>
        </div>

        <div v-if="!status" class="flex items-center relative mt-1">
          <div
            v-if="request.commonFriends[0]"
            class="w-5 h-5 rounded-full overflow-hidden border-2 border-white flex items-center justify-center left-0 z-10"
          >
            <img
              class="w-full h-full object-cover"
              :src="request.commonFriends[0].avatar"
            />
          </div>
          <div
            v-if="request.commonFriends[1]"
            class="w-5 h-5 rounded-full overflow-hidden border-2 border-white flex items-center justify-center left-[14px] absolute"
          >
            <img
              class="w-full h-full object-cover"
              :src="request.commonFriends[1].avatar"
            />
          </div>
          <div
            v-if="request.commonFriends.length > 0"
            class="text-xs text-[#65676B] ml-5"
          >
            {{ request.commonFriends.length }} bạn chung
          </div>
        </div>

        <div v-if="status === 'agree'" class="text-[#65676B] text-[13px]">
          Đã chấp nhận lời mời kết bạn
        </div>

        <div
          v-if="status === 'deleteRequest'"
          class="text-[#65676B] text-[13px]"
        >
          Đã gỡ lời mời kết bạn
        </div>

        <div v-if="!status" class="flex items-center gap-3 mt-2 pr-2">
          <div class="flex w-1/2 items-center gap-3">
            <button
              class="px-3 w-full h-9 text-[15px] font-semibold text-white bg-[#1B74E4] rounded-md hover:bg-blue-600"
              @click="agreeRequestFriend(request.sender_id)"
            >
              Xác nhận
            </button>
          </div>
          <div class="flex w-1/2 items-center gap-3">
            <button
              class="px-3 w-full h-9 text-[15px] font-semibold bg-[#E4E6EB] rounded-md hover:bg-gray-300"
              @click="deleteRequest(request.sender_id)"
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { RepositoryFactory } from '../../../apiConfig/RepositoryFactory'
const friendsRepository = RepositoryFactory.get('friendsRepository')
export default {
  props: {
    request: {
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
      status: '',
    }
  },
  computed: {
    userId() {
      return this.$store.state.authModule.user.user_id
    },
  },
  methods: {
    async agreeRequestFriend(senderId) {
      await this.$store.dispatch('agreeRequests', {
        senderId,
        receiverId: this.userId,
      })
      this.status = 'agree'
    },
    handlePick(id) {
      this.$store.dispatch('setId', { userDetail: id, curentUser: this.userId })
    },
    deleteRequest(senderId) {
      this.status = 'deleteRequest'
      friendsRepository.rejectedAddFriend({ senderId, receiverId: this.userId })
    },
  },
}
</script>
<style lang=""></style>
