<template>
  <div class="bg-white dark:bg-[#242526] dark:text-white w-full h-full">
    <!-- Tiêu đề thông báo -->
    <div class="flex items-center mb-1 justify-between">
      <div class="font-bold text-2xl">Thông báo</div>
      <div>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-html="icons.threeDot"></span>
      </div>
    </div>
    <!-- Thể loại thông báo -->
    <div class="flex items-center h-9">
      <div
        :class="{
          chooseBtn: !toggles.showAllNofication,
          chooseBtnActive: toggles.showAllNofication,
        }"
        class="pl-3 pr-3 text-sm font-semibold h-[36px] flex justify-center items-center rounded-[18px] mr-2 cursor-pointer"
        @click="handleShowUnReadNofication"
      >
        Tất cả
      </div>
      <div
        :class="{
          chooseBtn: toggles.showAllNofication,
          chooseBtnActive: !toggles.showAllNofication,
        }"
        class="pl-3 pr-3 text-sm font-semibold h-[36px] flex justify-center items-center rounded-[18px] cursor-pointer"
        @click="handleShowAllNofication"
      >
        Chưa đọc
      </div>
    </div>
    <!--  -->
    <div
      v-if="toggles.showAllNofication && currentPath !== 'notifications'"
      class="flex justify-between items-end"
    >
      <div class="font-semibold">Mới</div>
      <nuxt-link
        to="/notifications"
        class="show-all text-sm text-[#1876f2] cursor-pointer rounded-lg p-2"
      >
        Xem tất cả
      </nuxt-link>
    </div>

    <!-- list thông báo -->
    <div>
      <nofication-all :show-all-nofication="toggles.showAllNofication" />
    </div>
  </div>
</template>

<script>
import { threeDot } from '../../../../assets/icons/icons'
import NoficationAll from './NoficationAll.vue'

export default {
  name: 'NoficationBoard',
  components: { NoficationAll },
  data() {
    return {
      icons: {
        threeDot,
      },
      toggles: {
        showAllNofication: true,
      },
    }
  },
  computed: {
    currentPath() {
      return this.$route.fullPath.split('/')[1]
    },
  },
  methods: {
    handleShowAllNofication() {
      this.toggles.showAllNofication = false
    },
    handleShowUnReadNofication() {
      this.toggles.showAllNofication = true
    },
  },
}
</script>

<style scoped>
.chooseBtn:hover,
.nofication-item:hover,
.show-all:hover {
  background-color: #e0e3e9db;
}

.chooseBtnActive {
  background-color: #e7f3ff;
  color: #2680f3;
}
</style>
s
