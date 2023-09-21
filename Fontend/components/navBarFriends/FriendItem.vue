<template lang="">
  <div>
    <nuxt-link
      to="/friends/requests"
      class="flex items-center justify-center w-[228px] h-[228px] overflow-hidden"
    >
      <img
        class="object-cover w-full h-full"
        :src="user.avatar"
        @click="handleIdFriend(user.sender_id)"
      />
    </nuxt-link>
    <div class="p-3 bg-white flex flex-col justify-between h-[170px]">
      <div>
        <nuxt-link to="/friends/requests" class="text-[17px] font-semibold">
          <div class="hover:underline" @click="handleIdFriend(user.sender_id)">
            {{ user.fullName }}
          </div>
          
        </nuxt-link>
        <div class="flex items-center gap-1">
        <div class="flex items-center gap-2">
          <div class="flex items-center">
            <div
              v-if="user.commonFriends[0]"
              class="w-6 h-6 relative border-2 border-white rounded-full overflow-hidden z-10"
            >
              <img
                class="w-full h-full object-cover"
                :src="user.commonFriends[0].avatar"
              />
            </div>
            <div
              v-if="user.commonFriends[1]"
              class="w-6 h-6 relative -ml-2 border-2 border-white rounded-full overflow-hidden"
            >
              <img
                class="w-full h-full object-cover"
                :src="user.commonFriends[1].avatar"
              />
            </div>
            <div v-if="user.commonFriends.length>0" class="text-[#65676B] text-[15px]">
              {{ user.commonFriends.length }} bạn chung
            </div>
          </div>
        </div>
        <div class="text-[#65676B]"></div>
      </div>
      </div>

      <div v-if="!access" class="flex flex-col gap-2 mt-3">
        <button
          class="w-full bg-blue-600 text-white rounded-md py-2 font-semibold"
          @click="addFriend($event, user)"
        >
          Xác nhận
        </button>
        <button class="w-full bg-gray-200 font-semibold rounded-md py-2">
          Xóa
        </button>
      </div>
      <div v-if="access">
        <button
          class="w-full bg-[#E4E6EB] font-semibold rounded-md py-2 pointer-events-none"
        >
          Đã chập nhận lời mời
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { RepositoryFactory } from '../../apiConfig/RepositoryFactory'
const friendsRepository = RepositoryFactory.get('friendsRepository')
export default {
  props: {
    userId: {
      type: String,
      default: '0',
    },
    user: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      access: false,
    }
  },

  methods: {
    addFriend(event, user) {
      event.stopPropagation()
      friendsRepository.agreeRequestFriend({
        senderId: user.sender_id,
        receiverId: this.userId,
      })
      this.access = true
    },
    handleIdFriend(id){
      console.log(id);
    }
  },

}
</script>
<style lang=""></style>
