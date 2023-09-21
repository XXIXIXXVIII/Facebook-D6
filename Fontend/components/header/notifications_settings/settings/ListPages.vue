<template>
  <div v-if="!pages">Bạn chưa có trang web nào</div>
  <div v-else>
    <div class="radio h-[52px] p-2 flex justify-center w-full">
      <!-- Avatar người dùng -->
      <div
        class="flex w-full justify-between items-center"
        @click="
          user.check
            ? handleSelectPage(user, user.page_id)
            : handleSelectPage(user, user.user_id)
        "
      >
        <div class="flex">
          <div class="w-[40px] h-[40px] overflow-hidden rounded-full mr-4">
            <img :src="user.avatar" alt="" class="w-full h-full object-cover" />
          </div>
          <div class="text-[14px] font-medium flex items-center">
            {{ user.fullName }}
          </div>
        </div>
        <div v-if="user.check">
          <input v-model="selectedPage" type="radio" :value="user.page_id" />
        </div>
        <div v-else>
          <input v-model="selectedPage" type="radio" :value="user.user_id" />
        </div>
      </div>
    </div>
    <!--  -->
    <div
      v-if="user.check"
      class="radio h-[52px] p-2 flex justify-center w-full"
    >
      <!-- Avatar người dùng nếu có page -->
      <div
        class="flex w-full justify-between items-center"
        @click="handleSelectPage(currentUser, currentUser.user_id)"
      >
        <div class="flex">
          <div class="w-[40px] h-[40px] overflow-hidden rounded-full mr-4">
            <img
              :src="currentUser.avatar"
              alt=""
              class="w-full h-full object-cover"
            />
          </div>
          <div class="text-[14px] font-medium flex items-center">
            {{ currentUser.fullName }}
          </div>
        </div>
        <div>
          <input v-model="selectedPage" type="radio" :value="user.admin_id" />
        </div>
      </div>
    </div>
    <!-- Page của người dùng -->
    <div
      v-for="(page, index) in user.check
        ? pages.slice(1, 7)
        : pages.slice(0, 7)"
      :key="index"
      class="w-full"
    >
      <div class="radio h-[52px] p-2 flex justify-center w-full">
        <!-- radio -->
        <div
          class="flex justify-between w-full items-center"
          @click="handleSelectPage(page, page.page_id)"
        >
          <div class="flex">
            <div class="w-[40px] h-[40px] overflow-hidden rounded-full mr-4">
              <img
                :src="page.avatar"
                alt=""
                class="w-full h-full object-cover"
              />
            </div>
            <div class="text-[14px] font-medium flex items-center">
              {{ page.fullName }}
            </div>
          </div>
          <div>
            <input v-model="selectedPage" type="radio" :value="page.page_id" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { backArrow } from '../../../../assets/icons/icons'
export default {
  name: 'ListPages',
  data() {
    return {
      icons: {
        backArrow,
      },
      pages: [],
      selectedPage: undefined,
      currentUser: undefined,
    }
  },
  watch: {
    '$store.state.authModule.user': {
      handler(val) {
        this.user = val
        if (!this.user.check) {
          this.selectedPage = val.user_id
        } else {
          this.selectedPage = val.page_id
        }
      },
      immediate: true,
      deep: true,
    },
    '$store.state.authModule.pages': {
      handler(val) {
        this.pages = val
        console.log('pages ===>', val)
      },
      immediate: true,
    },
    '$store.state.authModule.currentUser': {
      handler(val) {
        this.currentUser = val
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
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
.radio {
  justify-content: space-between;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  transition-duration: 0.5s;
  cursor: pointer;
}

.radio:hover {
  transition-duration: 0.1s;
  background-color: #f2f3f5;
}
</style>
