<script>
import {
  messengerAll,
  messengerNew,
  backArrow,
  messengerWaitIcon,
  messengerWaitArrow,
} from '../../../../assets/icons/icons'
import MessengerBlock from './MessengerBlock.vue'
export default {
  name: 'MessengerBoard',
  components: { MessengerBlock },
  data() {
    return {
      icon: {
        messengerAll,
        messengerNew,
        backArrow,
        messengerWaitIcon,
        messengerWaitArrow,
      },
      togggle: {
        showSearch: false,
      },
      waitingInbox: [],
    }
  },
  methods: {
    // Hiển thị bảng tìm kiếm
    handleSearch() {
      this.togggle.showSearch = !this.togggle.showSearch
    },
  },
}
</script>

<template>
  <div class="bg-white dark:bg-[#242526] dark:text-white">
    <div>
      <!-- Phần header messenger -->
      <div
        class="flex justify-between items-center w-full z-10 bg-white dark:bg-[#242526]"
      >
        <div class="text-2xl font-bold dark:text-white">Chat</div>
        <div class="flex justify-center items-center">
          <nuxt-link
            to="/messages"
            class="small-btn flex justify-center items-center w-8 h-8 rounded-full pt-1 pl-0.5"
          >
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="icon.messengerAll"></span>
          </nuxt-link>
          <div
            class="small-btn flex justify-center items-center w-8 h-8 rounded-full pt-1 pl-0.5"
          >
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="icon.messengerNew"></span>
          </div>
        </div>
      </div>

      <!-- Phần search messenger -->
      <div
        class="relative flex items-center w-full h-[56px] cursor-pointer overflow-hidden z-10"
      >
        <!-- Nút back -->
        <span
          v-if="togggle.showSearch"
          class="back flex w-100 items-center shrink-0 text-black p-2 rounded-full"
          @click="handleSearch"
        >
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="icon.backArrow"></span>
        </span>

        <!-- Tìm kiếm -->
        <label
          class="min-h-[40px] w-[89%] box-border flex items-center relative rounded-[50px] cursor-default align-middle bg-[#f0f2f5] dark:bg-[#242526] dark:text-white"
          @click="handleSearch"
        >
          <!-- Search icon -->
          <span
            v-if="!togggle.showSearch"
            class="pl-3 cursor-pointer"
            @click="handleSearch"
          >
            <svg
              fill="currentColor"
              viewBox="0 0 16 16"
              class="w-[1em] h-[1em] block text-[#65676b]"
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
          </span>
          <span v-if="togggle.showSearch">&nbsp;&nbsp;</span>

          <!-- Input -->
          <input
            ref="searchInput"
            placeholder="Tìm kiếm trên Messenger"
            style="padding: 7px 8px 9px"
            class="h-10 outline-none text-[.9375rem] text-[#050505] placeholder:text-[#707276] bg-transparent"
          />
        </label>
      </div>

      <!-- Hộp thư -->
      <div class="flex items-center h-9">
        <div
          class="pl-3 pr-3 text-sm font-semibold h-[36px] flex justify-center items-center rounded-[18px] mr-2 cursor-pointer bg-[#e3ebfd] text-blue-500 dark:bg-[#283a4d]"
        >
          Hộp thư
        </div>
      </div>

      <!-- Phần tin nhắn chờ  -->
      <div
        v-if="waitingInbox.length > 0"
        class="messenger w-full flex justify-between items-center z-10s"
      >
        <div
          class="flex justify-center items-center pt-1 w-[56px] h-[56px] bg-[#e4e6eb] rounded-full dark:bg-[#242526] dark:text-white"
        >
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="icon.messengerWaitIcon"></span>
        </div>
        <div class="flex w-[80%] justify-between items-center">
          <div class="font-medium">
            <div class="text-sm">Tin nhắn đang chờ mới</div>
            <div class="text-xs">
              Từ <span>Trực Tiếp Game</span>
              <span>và<span> 2</span> người khác</span>
            </div>
          </div>
          <div>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="icon.messengerWaitArrow"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Danh sách tin nhắn -->
    <div class="w-full mt-2">
      <messenger-block />
    </div>
  </div>
</template>

<style scoped>
.small-btn:hover {
  cursor: pointer;
  background-color: #e0e3e9db;
}

.messenger {
  cursor: pointer;
  height: 68px;
  border-radius: 8px;
  padding: 6px;
  background-color: white;
}

.messenger:hover {
  background-color: #eceef4a3;
  transition-duration: 0.1s;
}
</style>
