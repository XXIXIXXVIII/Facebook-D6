<template>
  <div>
    <div>
      <Headers />
    </div>
    <div class="flex w-full">
      <div v-if="userDetail?.check && status==='Myself'">
        <div
          v-if="!pageManagement"
          class="fixed top-16 z-50 left-3 w-9 h-9 rounded-full overflow-hidden flex items-center justify-center bg-[#E4E6EB] hover:bg-gray-300 cursor-pointer"
          @click="pageManagement = true"
        >
          <i
            data-visualcompletion="css-img"
            class="x1b0d499 xep6ejk"
            style="
              background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/cm9_3hGilr0.png');
              background-position: 0px -34px;
              background-size: 34px 186px;
              width: 20px;
              height: 20px;
              background-repeat: no-repeat;
              display: inline-block;
            "
          ></i>
        </div>
        <div
          v-if="pageManagement"
          class="navbar w-[360px] fixed bg-white min-h-screen mt-14 z-20"
        >
          <div class="mx-4 my-3 flex items-center justify-between">
            <div class="text-2xl font-bold">Quản lý trang</div>
            <div
              class="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center bg-[#E4E6EB] hover:bg-gray-300 cursor-pointer"
              @click="pageManagement = false"
            >
              <i
                data-visualcompletion="css-img"
                class="x1b0d499 xep6ejk"
                style="
                  background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/cm9_3hGilr0.png');
                  background-position: 0px -34px;
                  background-size: 34px 186px;
                  width: 20px;
                  height: 20px;
                  background-repeat: no-repeat;
                  display: inline-block;
                "
              ></i>
            </div>
          </div>

          <div class="px-4 pb-2 flex items-center gap-3">
            <div
              class="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden"
            >
              <img
                class="w-full h-full object-cover"
                :src="user.avatar"
              />
            </div>
            <div class="text-[17px] font-medium">{{ user.fullName }}</div>
          </div>

          <div class="mx-4 my-2 border-b border-[#CED0D4]"></div>

          <div>
            <div
              v-for="item in pageManagementConst"
              :key="item.id"
              class="px-2"
            >
              <nuxt-link
                :to="`${item.nuxtLink}`"
                class="flex items-center gap-3 px-2 hover:bg-gray-200 rounded-md cursor-pointer"
              >
                <div
                  class="w-6 h-6 flex items-center justify-center overflow-hidden"
                >
                  <img class="w-full h-full object-cover" :src="item.url" />
                </div>
                <div class="text-[17px] font-medium py-3">
                  {{ item.title }}
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
        <div v-if="pageManagement" class="w-[360px] h-screen"></div>
      </div>
      <div
        class="mt-14 relative"
        :class="{
          showPageManagement: pageManagement && !userDetail?.check,
          hidePageManagement: !pageManagement || !userDetail?.check || status !=='Myself',
        }"
      >
        <HeaderUserDetail />
        <nuxt />
      </div>
    </div>
  </div>
</template>
<script>
import HeaderUserDetail from '../components/userDetail/HeaderUserDetail.vue'
import Headers from '../components/header/HeaderVue.vue'
import { pageManagementConst } from '../utils/page/PageManagement'
export default {
  name: 'UserDetailLayout',
  components: {
    HeaderUserDetail,
    Headers,
  },

  middleware: 'mydo',

  data() {
    return {
      pageManagement: true,
      pageManagementConst,
      idParam: 0,
      userDetail: null,
      status: null,
      user: null
    }
  },
  watch: {
    '$store.state.idFriendModule.userDetail': {
      handler: 'handler',
      immediate: true,
      deep: true,
    },
    '$store.state.idFriendModule.status': {
      handler: 'handlerStatus',
      immediate: true,
      deep: true,
    },
    '$store.state.authModule.user': {
      handler(val) {
        this.user = val
      },
      immediate: true,
      deep:true
    },
  },

  created(){
    this.$store.dispatch('setId', {
        userDetail: this.idParam,
        curentUser: this.$store.state.authModule.user.user_id,
      })
  },

  methods: {
    handler(value) {
      this.idParam = this.$route.params.id || value
      this.userDetail = value
      console.log(this.userDetail);
    },
    handlerStatus(value) {
      this.status = value
    }
  },
}
</script>
<style scoped lang="css">
.navbar {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.showPageManagement {
  width: calc(100vw - 360px);
}
.hidePageManagement {
  width: 100%;
}
</style>
