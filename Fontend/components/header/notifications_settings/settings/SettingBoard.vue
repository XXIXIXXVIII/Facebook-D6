<template>
  <div
    style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px"
    class="top-[52px] right-[17px] w-[360px] bg-white dark:bg-[#242526] dark:text-white rounded-lg absolute z-10 p-4"
  >
    <!-- Phần chuyển đổi -->
    <div
      v-if="!showMoreTitle && !showListPages"
      style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px"
      class="relative w-[328px] h-[120px] rounded-lg pt-[1px]"
    >
      <div
        class="hover flex justify-between items-center m-1 h-[64px] rounded-lg cursor-pointer"
      >
        <a :href="`/${userId}`" class="flex items-center p-2">
          <div
            style="border: 1px solid rgb(152, 152, 152)"
            class="rounded-full overflow-hidden w-[36px] h-[36px]"
          >
            <img
              class="w-full h-full object-cover"
              :src="userInfor?.avatar"
              alt=""
            />
          </div>
          <div class="pl-2 pr-2 w-[221px] break-words font-semibold">
            {{ userInfor?.fullName }}
          </div>
        </a>
        <div
          v-if="userInfor?.check"
          class="w-10 h-10 flex items-center justify-center overflow-hidden relative p-2 mr-2"
          @click="handleSelectPage(currentUser, currentUser.user_id)"
        >
          <span class="rotate z-30 absolute cursor-pointer">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="icons.rotate"></span
          ></span>
          <img
            style="border: 1px solid rgb(152, 152, 152)"
            class="w-full h-full object-cover rounded-full"
            :src="currentUser.avatar"
            alt=""
          />
        </div>
        <div
          v-if="!userInfor?.check && personalPageQuantity > 0"
          class="w-10 h-10 flex items-center justify-center overflow-hidden relative p-2 mr-2"
          @click="handleSelectPage(currentPage, currentPage?.page_id)"
        >
          <span class="rotate z-30 absolute cursor-pointer">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="icons.rotate"></span
          ></span>
          <img
            style="border: 1px solid rgb(152, 152, 152)"
            class="w-full h-full object-cover rounded-full"
            :src="currentPage?.avatar"
            alt=""
          />
        </div>
      </div>
      <hr class="mr-4 ml-4 h-[1px] bg-[#ced0d4]" />
      <div
        class="hover flex justify-between items-center m-1 h-[37px] rounded-lg cursor-pointer font-medium text-[14px]"
        @click="() => (showListPages = !showListPages)"
      >
        <div class="p-2 ml-1 break-words text-[#1876f2]">
          Xem tất cả trang cá nhân
        </div>
        <div
          v-if="personalPageQuantity > 0"
          style="display: flex; justify-content: center; align-items: center"
          class="w-[20px] h-[20px] text-white bg-red-600 mr-3 rounded-full cursor-pointer"
        >
          <span>{{ personalPageQuantity }}</span>
        </div>
      </div>
    </div>

    <!-- Tiêu đề cài đặt -->
    <div v-if="showMoreTitle && !showListPages" class="flex items-center">
      <span
        class="back flex items-center w-100 shrink-0 text-black p-2 rounded-full"
        @click="() => (showMoreTitle = null)"
      >
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-html="icons.backArrow"></span>
      </span>
      <div class="p-3 text-[1.43rem] font-bold">{{ showMoreTitle }}</div>
    </div>

    <div v-if="showListPages" class="flex items-center">
      <span
        class="back flex items-center w-100 shrink-0 text-black p-2 rounded-full"
        @click="() => (showListPages = false)"
      >
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-html="icons.backArrow"></span>
      </span>
      <div class="p-3 text-[1.43rem] font-bold">Chọn trang cá nhân</div>
    </div>

    <!-- Phần cài đặt chính -->
    <span v-if="!showMoreTitle && !showListPages">
      <setting-block
        :setting-values="settingValues"
        @show-more-title="handleShowMore"
      />
    </span>

    <span v-if="showMoreTitle === 'Cài đặt & quyền riêng tư' && !showListPages">
      <setting-block
        :setting-and-privacy-values="settingAndPrivacyValues"
        :handle-show-more="handleShowMore"
      />
    </span>

    <span v-if="showMoreTitle === 'Trợ giúp & hỗ trợ' && !showListPages">
      <setting-block
        :help-center="helpCenter"
        :handle-show-more="handleShowMore"
      />
    </span>

    <span v-if="showMoreTitle === 'Màn hình & trợ năng' && !showListPages">
      <display-setting />
      <setting-block
        :display-setting="displaySetting"
        :handle-show-more="handleShowMore"
      />
    </span>

    <span v-if="showListPages">
      <list-pages />
    </span>

    <!-- Phần footer -->
    <span v-if="!showMoreTitle && !showListPages">
      <small-footer />
    </span>
  </div>
</template>

<script>
import { rotate, backArrow } from '../../../../assets/icons/icons'
import {
  settingValues,
  settingAndPrivacyValues,
  helpCenter,
  displaySetting,
} from '../../../../utils/header/settings'
import SettingBlock from './SettingBlock.vue'
import SmallFooter from './SmallFooter.vue'
import DisplaySetting from './DisplaySetting.vue'
import ListPages from './ListPages.vue'

export default {
  name: 'SettingBoard',
  components: { SettingBlock, SmallFooter, DisplaySetting, ListPages },
  props: {
    userInfor: {
      type: Object,
      default: () => ({}), // Giá trị mặc định là một đối tượng rỗng
    },
  },
  data() {
    return {
      icons: {
        rotate,
        backArrow,
      },
      // Cài đặt chính
      settingValues,
      // Cài đặt & quyền riêng tư
      settingAndPrivacyValues,
      // Trợ giúp & hỗ trợ
      helpCenter,
      // Màn hình & trợ năng
      displaySetting,
      // Các giá trị khác
      showMoreTitle: null,
      showListPages: false,
      inforDetail: null,
      user: null,
      currentUser: null,
      pages: null,
      currentPage: null,
      personalPageQuantity: null,
      userId: null,
    }
  },

  watch: {
    '$store.state.authModule.user': {
      handler(val) {
        console.log(val)
        this.userId = val.user_id
      },
      immediate: true,
    },

    '$store.state.authModule.pages': {
      handler(val) {
        if (val) {
          this.pages = val
          if (val.length > 1) {
            this.currentPage = val[1]
          }
          this.currentPage = val[0]
          this.personalPageQuantity = val.length
        }
      },
      immediate: true,
    },

    '$store.state.authModule.currentUser': {
      handler(val) {
        this.currentUser = val
        console.log('current ===>', val)
      },
      deep: true,
      immediate: true,
    },
  },

  methods: {
    handleShowMore(value) {
      this.showMoreTitle = value
    },

    handleSelectPage(value, id) {
      console.log(value, id)
      this.$store.commit('setShowLoadingPage', {
        loadPageValue: value,
        showLoadingPage: true,
      })
      setTimeout(() => {
        this.$store.commit('setShowLoadingPage', {
          loadPageValue: value,
          showLoadingPage: false,
        })
        this.selectedPage = id
        this.$store.dispatch('changePage', { page: value, pages: this.pages })
      }, 1500)
    },
  },
}
</script>

<style scoped>
.hover {
  transition-duration: 0.75s;
}
.hover:hover {
  background-color: #e4e6ebcb;
  transition-duration: 0.1s;
}

.rotate:hover {
  transform: rotate(180deg);
  transition-duration: 0.75s;
}

.back:hover {
  background-color: #f2f3f5;
}
</style>
