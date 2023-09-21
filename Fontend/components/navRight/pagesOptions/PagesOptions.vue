<template>
  <div v-if="changePage" class="pt-3 font-medium">
    <div class="flex items-center">
      <div class="mr-20 font-medium pt-2 pb-2 text-base text-gray-500">
        {{$t('home.pageAndMyPage')}}
      </div>
      <!-- Tippy trang cá nhân -->
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
          <!-- Mở rộng bảng điều khiển -->
          <div
            v-if="!toggle.showPageOption"
            class="right-block text-sm flex items-center h-[48px] w-[312px] pl-2 mr-2 rounded-lg"
            @click="() => (toggle.showPageOption = !toggle.showPageOption)"
          >
            <div
              style="border: 1px solid rgb(200, 200, 200)"
              class="w-9 h-9 overflow-hidden flex justify-center items-center rounded-full mr-3 mt-[6px] mb-[6px] bg-[#e4e6eb] pt-1"
            >
              <!-- eslint-disable-next-line vue/no-v-html -->
              <span v-html="icons.showPageOption"></span>
            </div>
            <div>Mở rộng bảng điều khiển</div>
          </div>
          <!-- Thu gọn bảng điều khiển -->
          <div
            v-if="toggle.showPageOption"
            class="right-block text-sm flex items-center h-[48px] w-[312px] pl-2 mr-2 rounded-lg"
            @click="() => (toggle.showPageOption = !toggle.showPageOption)"
          >
            <div
              style="border: 1px solid rgb(200, 200, 200)"
              class="w-9 h-9 overflow-hidden flex justify-center items-center rounded-full mr-3 mt-[6px] mb-[6px] bg-[#e4e6eb] pt-1"
            >
              <!-- eslint-disable-next-line vue/no-v-html -->
              <span v-html="icons.hidePageOption"></span>
            </div>
            <div>Thu gọn bảng điều khiển</div>
          </div>
          <!-- Dòng ngăn cách -->
          <div
            class="w-[310px] m-1"
            style="border-bottom: 1px rgb(203, 203, 203) solid"
          ></div>
          <!-- Trang cá nhân hiện tại  -->
          <div
            class="right-block relative flex items-center h-[48px] w-[312px] pl-2 mr-2 rounded-lg"
          >
            <div
              style="border: 1px solid rgb(191, 191, 191)"
              class="w-9 h-9 overflow-hidden rounded-full mr-3 mt-[6px] mb-[6px] bg-black"
            >
              <img
                class="w-full h-full object-cover"
                :src="changePage.avatar"
                alt=""
              />
            </div>
            <div class="text-sm">
              {{ changePage.fullName }}
            </div>
            <!-- Dấu check -->
            <div class="absolute right-2">
              <img
                class="w-[20px] h-[20px]"
                src="https://www.freeiconspng.com/uploads/blue-check-mark-transparent-png-21.png"
                alt=""
              />
            </div>
          </div>
        </span>
      </tippy>
    </div>
    <!-- Avatar và trang cá nhân -->
    <div
      v-if="toggle.showPageOption"
      class="right-block flex items-center h-[48px] pl-2 mr-2 rounded-lg"
    >
      <div
        style="border: 1px solid rgb(191, 191, 191)"
        class="w-9 h-9 overflow-hidden rounded-full mr-3 mt-[6px] mb-[6px] bg-black"
      >
        <img
          class="w-full h-full object-cover"
          :src="changePage.avatar"
          alt=""
        />
      </div>
      <div class="text-sm text-black dark:text-white">
        {{ changePage.fullName }}
      </div>
    </div>
    <!-- Chuyển trang -->
    <div
      v-if="toggle.showPageOption"
      class="right-block text-xs text-[#65676B] flex items-center h-8 p-2 rounded-lg"
    >
      <div class="p-[6px]">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-html="icons.turnPage"></span>
      </div>
      <div class="pb-[6px] pl-[6px]">{{ $t('home.changePage') }}</div>
    </div>
    <!-- Tạo quảng cáo -->
    <div
      v-if="toggle.showPageOption"
      class="right-block text-xs text-[#65676B] flex items-center h-8 p-2 rounded-lg"
    >
      <div class="p-[6px]">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-html="icons.speaker"></span>
      </div>
      <div class="pb-[6px] pl-[6px]">{{ $t('home.CreatePromotion') }}</div>
    </div>
  </div>
</template>

<script>
import {
  smallThreeDot,
  turnPage,
  speaker,
  hidePageOption,
  showPageOption,
} from '../../../assets/icons/icons'
export default {
  name: 'PagesOptions',
  data() {
    return {
      icons: {
        smallThreeDot,
        turnPage,
        speaker,
        hidePageOption,
        showPageOption,
      },
      toggle: {
        showPageOption: true,
      },
      user: null,
      changePage: null,
    }
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
        if (val) {
          this.changePage = val[1]
        }
      },
      immediate: true,
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
</style>
