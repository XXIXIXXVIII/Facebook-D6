<template>
  <div v-if="friends">
    <div class="flex justify-between items-center">
      <div class="mr-[183px] pt-2 pb-2 text-base text-gray-500 font-medium">
        {{ $t('home.contacts') }}
      </div>
      <div class="flex items-center">
        <!-- Icon tìm kiếm -->
        <!-- <div
          v-tippy="{
            content: 'Tìm kiếm theo tên',
            theme: 'material',
            placement: 'bottom',
          }"
          class="mr-3"
        >
          <svg
            fill="currentColor"
            viewBox="0 0 16 16"
            width="1em"
            height="1em"
            class="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6 xlup9mm x1kky2od"
          >
            <g fill-rule="evenodd" transform="translate(-448 -544)">
              <g fill-rule="nonzero">
                <path
                  d="M10.743 2.257a6 6 0 1 1-8.485 8.486 6 6 0 0 1 8.485-8.486zm-1.06 1.06a4.5 4.5 0 1 0-6.365 6.364 4.5 4.5 0 0 0 6.364-6.363z"
                  transform="translate(448 544)"
                ></path>
                <path
                  d="M10.39 8.75a2.94 2.94 0 0 0-.199.432c-.155.417-.23.849-.172 1.284.055.415.232.794.54 1.103a.75.75 0 0 0 1.112-1.004l-.051-.057a.39.39 0 0 1-.114-.24c-.021-.155.014-.356.09-.563.031-.081.06-.145.08-.182l.012-.022a.75.75 0 1 0-1.299-.752z"
                  transform="translate(448 544)"
                ></path>
                <path
                  d="M9.557 11.659c.038-.018.09-.04.15-.064.207-.077.408-.112.562-.092.08.01.143.034.198.077l.041.036a.75.75 0 0 0 1.06-1.06 1.881 1.881 0 0 0-1.103-.54c-.435-.058-.867.018-1.284.175-.189.07-.336.143-.433.2a.75.75 0 0 0 .624 1.356l.066-.027.12-.061z"
                  transform="translate(448 544)"
                ></path>
                <path
                  d="m13.463 15.142-.04-.044-3.574-4.192c-.599-.703.355-1.656 1.058-1.057l4.191 3.574.044.04c.058.059.122.137.182.24.249.425.249.96-.154 1.41l-.057.057c-.45.403-.986.403-1.411.154a1.182 1.182 0 0 1-.24-.182zm.617-.616.444-.444a.31.31 0 0 0-.063-.052c-.093-.055-.263-.055-.35.024l.208.232.207-.206.006.007-.22.257-.026-.024.033-.034.025.027-.257.22-.007-.007zm-.027-.415c-.078.088-.078.257-.023.35a.31.31 0 0 0 .051.063l.205-.204-.233-.209z"
                  transform="translate(448 544)"
                ></path>
              </g>
            </g>
          </svg>
        </div> -->
        <!-- Tippy người liên hệ -->
        <tippy
          interactive
          :animate-fill="false"
          placement="bottom"
          theme="light"
          animation="fade"
          trigger="click"
          arrow
        >
          <template #trigger>
            <div
              v-tippy="{
                content: 'Tùy chọn',
                theme: 'material',
                placement: 'bottom',
              }"
              class="right-block w-[32px] h-[32px] pt-1 rounded-full flex justify-center items-center"
            >
              <!-- eslint-disable-next-line vue/no-v-html -->
              <span v-html="icons.smallThreeDot"></span>
            </div>
          </template>

          <span>
            <div class="w-[328px] pl-2 pr-2">
              <div class="flex flex-col justify-center items-start pt-4 pb-4">
                <div class="text-base font-semibold pb-2">Cài đặt chat</div>
                <div class="text-xs text-gray-600">
                  Tùy chỉnh trải nghiệm trên Messenger.
                </div>
              </div>
              <!-- Dòng ngăn cách -->
              <div
                class="w-[310px] m-1"
                style="border-bottom: 1px rgb(203, 203, 203) solid"
              ></div>
              <!-- Hiển thị danh bạ -->
              <div class="flex items-center justify-between h-[39.5px]">
                <div class="flex items-center">
                  <div class="pt-1 pr-3">
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <span v-html="icons.contactList"></span>
                  </div>
                  <div class="font-semibold text-sm">Hiển thị danh bạ</div>
                </div>
                <!-- Công tắc -->
                <div>
                  <label class="switch">
                    <input
                      type="checkbox"
                      :checked="toggle.showList"
                      @change="handleSwitchChange"
                    />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
              <!-- Dòng ngăn cách -->
              <div
                class="w-[310px] m-1"
                style="border-bottom: 1px rgb(203, 203, 203) solid"
              ></div>
              <!-- Trạng thái online -->
              <div
                class="flex items-center justify-between h-[39.5px] cursor-pointer"
              >
                <div class="flex items-center">
                  <div class="pt-1 pr-3">
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <span v-html="icons.activeStatus"></span>
                  </div>
                  <div class="font-semibold text-sm">
                    Trạng thái hoạt động: <span>ĐANG BẬT</span>
                  </div>
                </div>
              </div>
            </div>
          </span>
        </tippy>
      </div>
    </div>
    <!-- List tin nhắn -->
    <div v-if="toggle.showList">
      <div
        v-for="(friend, index) in friends.slice(0, 20)"
        :key="index"
        class="right-block left-block flex items-center h-[48px] pl-2 mr-2 rounded-lg relative"
        @click="handleGetValue(friend)"
      >
        <div
          style="border: 1px solid rgb(191, 191, 191)"
          class="w-9 h-9 overflow-hidden rounded-full mr-3 mt-[6px] mb-[6px] bg-black"
        >
          <img
            class="w-full h-full object-cover"
            :src="friend?.avatar"
            alt=""
          />
        </div>
        <div
          class="text-sm font-semibold w-[80%] whitespace-nowrap text-ellipsis overflow-hidden text-black dark:text-white"
        >
          {{ friend?.fullName }}
        </div>
        <div
          style="border: 2px white solid"
          class="absolute w-[10px] h-[10px] rounded-full bg-green-600 left-9 bottom-2"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { RepositoryFactory } from '../../../apiConfig/RepositoryFactory'
import {
  smallThreeDot,
  contactList,
  activeStatus,
} from '../../../assets/icons/icons'
const friendRepository = RepositoryFactory.get('friendsRepository')
export default {
  name: 'MessengerList',
  data() {
    return {
      icons: {
        smallThreeDot,
        contactList,
        activeStatus,
      },
      toggle: {
        showList: true,
      },
      friends: [],
      isDuplicate: undefined,
    }
  },

  computed: {
    ...mapGetters(['getUser']),
    user() {
      return this.getUser
    },
    showMessengerBoard() {
      return this.$store.state.headerModule.showMessengerBoard
    },
    showInboxOne() {
      return this.$store.state.headerModule.showInboxOne
    },
    showInboxTwo() {
      return this.$store.state.headerModule.showInboxTwo
    },
    messengerValue() {
      return this.$store.state.headerModule.messengerValue
    },
  },
  created() {
    this.handleGetFriendList()
  },

  methods: {
    handleGetValue(value) {
      const newValue = {
        toUserId: value.user_id,
        toUserAvatar: value.avatar,
        toUserName: value.fullName,
      }
      this.isDuplicate = this.messengerValue.findIndex(
        (message) => message.toUserId === value.user_id
      )

      if (this.isDuplicate === -1) {
        // Nếu không trùng lặp, thêm phần tử vào cuối mảng messages của phần tử thứ nhất trong messagesList
        this.messengerValue.push(newValue)
        this.$store.commit('setShowInboxOne', true)
        this.$store.commit('setMessengerValue', this.messengerValue)
        this.$store.commit('setShowMessengerBoard', false)
      } else if (this.showInboxTwo === true && this.isDuplicate >= 1) {
        this.messengerValue.splice(this.isDuplicate, 1)
        this.messengerValue.push(newValue)
        this.$store.commit('setMessengerValue', this.messengerValue)
      }

      if (this.showInboxOne !== true) {
        this.$store.commit('setShowInboxOne', true)
      } else if (
        this.showInboxOne === true &&
        this.messengerValue.length >= 2
      ) {
        this.$store.commit('setShowInboxTwo', true)
        this.$store.commit('setShowMessengerBoard', false)
      }

      if (this.messengerValue.length < 2) {
        this.$store.commit('setShowInboxTwo', false)
      }
    },

    // Hàm Ẩn hiện người dùng
    handleSwitchChange(e) {
      this.toggle.showList = e.target.checked
    },

    // Hàm lấy danh sách bạn bè
    async handleGetFriendList() {
      try {
        const response = await friendRepository.getFriends(this.user.user_id)
        this.friends = response.data.friendsWithMutual
      } catch (error) {}
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
/* Css công tắc */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Ẩn css checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* Phần trượt công tắc */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Công tắc tròn */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
