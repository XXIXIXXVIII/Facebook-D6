<template>
  <div>
    <div
      v-if="customStatus === 'Myself' && !userDetail?.check"
      class="flex justify-end gap-2"
    >
      <nuxt-link
        to="/StoryAndReels/CreateStory"
        class="h-[36px] px-4 flex bg-blue-600 rounded-md mt-6 hover:bg-blue-700"
      >
        <div
          class="text-white font-semibold flex justify-center items-center text-[15px] gap-2"
        >
          +
        </div>
        <div
          class="h-[36px] text-white font-semibold flex justify-center items-center text-[15px]"
        >
          Thêm vào tin
        </div>
      </nuxt-link>
      <div
        class="h-[36px] px-3 rounded-md bg-[#ECF3FF] flex justify-end items-center mt-6 hover:bg-[#e6eefc] gap-1"
      >
        <div
          class="w-[16px] h-[16px] flex justify-center items-center mr-[-12px]"
        >
          <img
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/tmaz0VO75BB.png"
            height="16"
            width="16"
          />
        </div>
        <button
          class="w-[193px] h-[16px] text-black font-semibold flex justify-center items-center text-[15px]"
        >
          Chỉnh sửa trang cá nhân
        </button>
      </div>
    </div>
    <!-- =============== Page My self =============== -->
    <div
      v-if="customStatus === 'Myself' && userDetail?.check"
      class="flex justify-end gap-2"
    >
      <nuxt-link
        to="/StoryAndReels/CreateStory"
        class="h-[36px] px-3 bg-[#1B74E4] rounded-md mt-6 hover:bg-blue-700 flex justify-center items-center gap-2"
      >
        <div class="">
          <img
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yQ/r/arSmdDAxf-Q.png"
            alt=""
            height="16"
            width="16"
            style="filter:invert(100%)"
          />
        </div>
        <div class="text-white font-semibold text-[15px]">Quảng cáo</div>
      </nuxt-link>
      <nuxt-link
        to="/professional_dashboard"
        class="h-[36px] px-3 bg-[#E4E6EB] rounded-md mt-6 hover:bg-gray-200 flex justify-center items-center gap-2"
      >
        <div class="">
          <img
            class="x1b0d499 xep6ejk"
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/zmBsOCLJzBR.png"
            alt=""
            height="16"
            width="16"
          />
        </div>
        <div class="font-semibold text-[15px]">Quản lý</div>
      </nuxt-link>
      <nuxt-link
        to="/StoryAndReels/CreateStory"
        class="h-[36px] px-3 bg-[#E4E6EB] rounded-md mt-6 hover:bg-gray-200 flex justify-center items-center gap-2"
      >
        <div class="">
          <img
            class="x1b0d499 xep6ejk"
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/tmaz0VO75BB.png"
            alt=""
            height="16"
            width="16"
          />
        </div>
        <div class="font-semibold text-[15px]">Chỉnh sửa</div>
      </nuxt-link>
    </div>

    <!-- =============== Page Chưa follow  =============== -->
    <div
      v-if="customStatus === 'Chưa follow' && userDetail?.check"
      class="flex justify-end gap-2"
    >
      <nuxt-link
        to="/StoryAndReels/CreateStory"
        class="h-[36px] px-3 bg-[#1B74E4] rounded-md mt-6 hover:bg-blue-700 flex justify-center items-center gap-2"
      >
        <div class="">
          <img
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yQ/r/arSmdDAxf-Q.png"
            alt=""
            height="16"
            width="16"
            style="filter:invert(100%)"
          />
        </div>
        <div class="text-white font-semibold text-[15px]">Quảng cáo</div>
      </nuxt-link>
      <div
        to="/StoryAndReels/CreateStory"
        class="h-[36px] px-3 bg-[#E4E6EB] rounded-md mt-6 hover:bg-gray-200 flex justify-center items-center gap-2 cursor-pointer"
        @click="handleButton('follow')"
      >
        <div>
          <img
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yn/r/yDipalkSE-s.png"
            alt=""
            height="16"
            width="16"
          />
        </div>
        <div class="font-semibold text-[15px]">Theo dõi</div>
      </div>
      <nuxt-link
        to="/StoryAndReels/CreateStory"
        class="h-[36px] px-3 bg-[#E4E6EB] rounded-md mt-6 hover:bg-gray-200 flex justify-center items-center gap-2"
      >
        <div>
          <img
            src="https://static.xx.fbcdn.net/rsrc.php/v3/ym/r/qxDZ_oUxwuU.png"
            alt=""
            height="16"
            width="16"
          />
        </div>
        <div class="font-semibold text-[15px]">Tìm kiếm</div>
      </nuxt-link>
    </div>

        <!-- =============== Page đã follow  =============== -->
    <div
      v-if="customStatus === 'Đã follow' && userDetail?.check"
      class="flex justify-end gap-2"
    >
      <nuxt-link
        to="/StoryAndReels/CreateStory"
        class="h-[36px] px-3 bg-[#1B74E4] rounded-md mt-6 hover:bg-blue-700 flex justify-center items-center gap-2"
      >
        <div class="">
          <img
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yQ/r/arSmdDAxf-Q.png"
            alt=""
            height="16"
            width="16"
            style="filter:invert(100%)"
          />
        </div>
        <div class="text-white font-semibold text-[15px]">Quảng cáo</div>
      </nuxt-link>
      <div
        to="/StoryAndReels/CreateStory"
        class="h-[36px] px-3 bg-[#E4E6EB] rounded-md mt-6 hover:bg-gray-200 flex justify-center items-center gap-2 cursor-pointer"
        @click="handleButton('Đã follow')"
      >
        <div>
          <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yg/r/oPqPOJ6Z3Gk.png" alt="" height="16" width="16">
        </div>
        <div class="font-semibold text-[15px]">Đang theo dõi</div>
      </div>
      <nuxt-link
        to="/StoryAndReels/CreateStory"
        class="h-[36px] px-3 bg-[#E4E6EB] rounded-md mt-6 hover:bg-gray-200 flex justify-center items-center gap-2"
      >
        <div>
          <img
            src="https://static.xx.fbcdn.net/rsrc.php/v3/ym/r/qxDZ_oUxwuU.png"
            alt=""
            height="16"
            width="16"
          />
        </div>
        <div class="font-semibold text-[15px]">Tìm kiếm</div>
      </nuxt-link>
    </div>

    <div
      class="flex justify-end gap-2"
      v-if="customStatus === 'Unknown' && !userDetail?.check"
    >
      <div
        class="w-[134px] h-[36px] px-3 flex bg-blue-600 rounded-md mt-6 hover:bg-blue-700"
      >
        <div class="flex justify-center items-center mr-[-7px]">
          <img
            class="x1b0d499 xaj1gnb"
            src="https://static.xx.fbcdn.net/rsrc.php/v3/y1/r/ImGMiWz-mEy.png"
            alt=""
            height="16"
            width="16"
            style="filter: invert(100%)"
          />
        </div>
        <button
          class="w-[110px] h-[36px] text-white font-semibold flex justify-center items-center text-[15px]"

          @click="handleAddFriend"
        >
          Thêm bạn bè
        </button>

      </div>
      <div
        class="w-[105px] h-[36px] px-4 rounded-md bg-[#ECF3FF] flex justify-end items-center mt-6 hover:bg-[#e6eefc] gap-5"
      >
        <div
          class="w-[16px] h-[16px] flex justify-center items-center mr-[-38px]"
        >
          <img
            class="x1b0d499 xep6ejk"
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yE/r/1z-5F6qDswz.png"
            alt=""
            height="16"
            width="16"
          />
        </div>
        <button
          class="w-[105px] h-[16px] text-black font-semibold flex justify-center items-center text-[15px] mr-[-24px]"
        >
          Nhắn tin
        </button>
      </div>
    </div>

    <div
      class="flex justify-end gap-2"
      v-if="customStatus === 'Sent' && !userDetail?.check"
    >
      <div
        class="w-[134px] h-[36px] px-3 flex bg-blue-600 rounded-md mt-6 hover:bg-blue-700"
      >
        <div class="flex justify-center items-center mr-[-7px]">
          <img
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/aIwEkzr3XFI.png"
            alt=""
            height="16"
            width="16"
            style="filter: invert(100%)"
          />
        </div>
        <button
          class="w-[110px] h-[36px] text-white font-semibold flex justify-center items-center text-[15px]"
          @click="cancelFriend"
        >
          Hủy lời mời
        </button>
      </div>
      <div
        class="w-[105px] h-[36px] px-4 rounded-md bg-blue-600 flex justify-end items-center mt-6 hover:hover:bg-blue-700 gap-5"
      >
        <div
          class="w-[16px] h-[16px] flex justify-center items-center mr-[-38px]"
        >
          <img
            class="x1b0d499 xep6ejk"
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yE/r/1z-5F6qDswz.png"
            alt=""
            height="16"
            width="16"
            style="filter: invert(100%)"
          />
        </div>
        <button
          class="w-[105px] h-[16px] text-white font-semibold flex justify-center items-center text-[15px] mr-[-24px]"
        >
          Nhắn tin
        </button>
      </div>
    </div>

    <div
      class="flex justify-end gap-2"
      v-if="customStatus === 'Received' && !userDetail?.check"
    >
      <div
        class="w-[110px] h-[36px] px-3 flex bg-blue-600 rounded-md mt-6 hover:bg-blue-700 relative"
      >
        <div class="flex justify-center items-center mr-[-5px]">
          <img
            class="x1b0d499 xaj1gnb"
            src="https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/c9BbXR9AzI1.png"
            alt=""
            height="16"
            width="16"
            style="filter: invert(100%)"
          />
        </div>
        <button
          @click="toggleDropdown"
          class="w-[87px] h-[36px] text-white font-semibold flex justify-center items-center text-[15px]"
        >
          Phản hồi
        </button>

        <!-- Dropdown -->
        <div
          v-if="showDropdown"
          class="dr absolute top-[38px] right-[-189px] mt-3 bg-white rounded-md w-[250px] h-[80px]"
        >
          <ul>
            <li class="ml-3 font-semibold mt-2">
              <div
                class="cursor-pointer"
                @click="agreeFriend()"
              >
                Xác nhận lời mời
              </div>
            </li>
            <li class="ml-3 font-semibold mt-2">
              <div class="cursor-pointer" @click="deleteFriend()">
                Xóa lời mời
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="w-[105px] h-[36px] px-4 rounded-md bg-[#ECF3FF] flex justify-end items-center mt-6 hover:bg-[#e6eefc] gap-5"
      >
        <div
          class="w-[16px] h-[16px] flex justify-center items-center mr-[-38px]"
        >
          <img
            class="x1b0d499 xep6ejk"
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yE/r/1z-5F6qDswz.png"
            alt=""
            height="16"
            width="16"
          />
        </div>
        <button
          class="w-[105px] h-[16px] text-black font-semibold flex justify-center items-center text-[15px] mr-[-24px]"
        >
          Nhắn tin
        </button>
      </div>
    </div>

    <div
      v-if="customStatus === 'Friend' && !userDetail?.check"
      class="flex justify-end gap-2"
    >
      <div
        class="w-[110px] h-[36px] px-3 flex bg-[#ECF3FF] rounded-md mt-6 hover:bg-[#e6eefc] relative"
      >
        <div class="flex justify-center items-center mr-[-5px]">
          <img
            class="x1b0d499 xaj1gnb"
            src="https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/c9BbXR9AzI1.png"
            alt=""
            height="16"
            width="16"
          />
        </div>
        <button
          class="w-[87px] h-[36px] text-black font-semibold flex justify-center items-center text-[15px]"
          @click="toggleDropdown"
        >
          Bạn bè
        </button>
        <div
          v-if="showDropdown"
          class="dr absolute top-[32px] right-[-39px] mt-3 bg-white rounded-md w-[150px] h-[40px]"
        >
          <ul>
            <li class="flex justify-center font-semibold mt-2 gap-2">
              <div class="flex justify-center items-center ml-[-9px]">
                <i data-visualcompletion="css-img" class="x1b0d499 xep6ejk" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/yN/r/dcMqyRU8loV.png&quot;); background-position: 0px -110px; background-size: 22px 308px; width: 20px; height: 20px; background-repeat: no-repeat; display: inline-block;"></i>
              </div>
              <div class="cursor-pointer" @click="unFriend()">
                 Hủy kết bạn
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="w-[105px] h-[36px] px-4 rounded-md bg-blue-500 flex justify-end items-center mt-6 hover:bg-blue-600 gap-5"
      >
        <div
          class="w-[16px] h-[16px] flex justify-center items-center mr-[-38px]"
        >
          <img
            class="x1b0d499 xep6ejk"
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yE/r/1z-5F6qDswz.png"
            alt=""
            height="16"
            width="16"
            style="filter: invert(100%)"
          />
        </div>
        <button
          class="w-[105px] h-[16px] text-white font-semibold flex justify-center items-center text-[15px] mr-[-24px]"
        >
          Nhắn tin
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { RepositoryFactory } from '../../apiConfig/RepositoryFactory'
const followerRepository = RepositoryFactory.get("followRepository")
export default {
  data() {
    return {
      customStatus: null,
      showDropdown: false,
      senderId: 0,
      flag: 'themban',
      userDetail: null,
    }
  },
  computed: {
    user_Id() {
      return this.$store.state.authModule.user.user_id
    },
  },

  watch: {
    '$store.state.idFriendModule.status': {
      handler(val) {
        console.log(val);
        this.customStatus = val
      },
      immediate: true,
      deep: true,
    },

    '$store.state.idFriendModule.userDetail': {
      handler(val) {
        this.senderId = val?.user_id
        this.userDetail = val
      },
      deep: true,
    },
  },

  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    },

    async agreeFriend() {
      this.customStatus='Friend'
      await this.$store.dispatch('agreeRequests', {
        senderId: this.senderId,
        receiverId: this.user_Id,
      })
    },

    async handleAddFriend() {
      this.customStatus= 'Sent'
      await this.$store.dispatch('addFriend', {
        senderId: this.user_Id,
        receiverId: this.senderId,
      })
    },

    async cancelFriend() {
      this.customStatus='Unknown'
      await this.$store.dispatch('rejectedFriend', {
        senderId: this.user_Id,
        receiverId: this.senderId,
      })
    },

    async deleteFriend() {
      this.customStatus='Unknown'
      await this.$store.dispatch('rejectedFriend', {
        senderId: this.senderId,
        receiverId: this.user_Id,
      })
    },

    async unFriend() {
      this.customStatus='Unknown'
      await this.$store.dispatch('unFriend', {currentUser: this.user_Id, friendId: this.senderId,})
    },

    handleButton(status) {
      if(status==="follow"){
        this.customStatus = 'Đã follow'
        followerRepository.followPage({id: this.senderId , followerId: this.user_Id})
      }
      if(status==="Đã follow"){
        this.customStatus = 'Chưa follow'
        console.log("ottttttttbject");
        followerRepository.unFollowPage({id: this.senderId , followerId: this.user_Id})
      }
    },
  },
}
</script>
<style>
.dr {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>
