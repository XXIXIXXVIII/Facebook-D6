<template>
  <div
    style="box-shadow: 0px 2px 5px 0px rgba(157, 157, 157, 0.35)"
    class="max-[890px]:justify-start flex w-full fixed items-center justify-between bg-white dark:bg-[#242526] box-border z-40 top-0"
    role="navigation"
  >
    <logo-and-search @showSearch="showSearchToggle" />
    <header-navigation :show-search="showSearch" />
    <nofication-and-settings :show-search="showSearch" />
    <div
      v-if="showLoadingPage"
      class="fixed w-full h-full bg-white dark:bg-[#242526] top-0 left-0 z-50 flex justify-center items-center"
    >
      <div class="w-full h-full flex justify-center items-center flex-col">
        <div class="relative w-full flex justify-center items-center flex-col">
          <div class="w-[165px] h-[165px] overflow-hidden rounded-full">
            <img
              class="w-full h-full object-cover"
              :src="loadPageValue?.avatar"
              alt=""
            />
          </div>
          <div class="absolute flex justify-center items-center">
            <img
              class="rotating w-[195px] h-[195px]"
              src="../../assets/icons/rotate.png"
              alt=""
            />
          </div>
        </div>

        <div
          class="font-bold text-lg mt-8 flex justify-center items-center dark:text-white"
        >
          Đổi sang {{ loadPageValue?.fullName }}...
        </div>
        <div class="mt-16 flex justify-center items-center">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <a v-html="logo"> </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { socket } from '../../plugins/socket.io'
import { logo } from '../../assets/icons/icons'
import LogoAndSearch from './logo_search/LogoAndSearch.vue'
import HeaderNavigation from './navigation/HeaderNavigation.vue'
import NoficationAndSettings from './notifications_settings/NoficationAndSettings.vue'
export default {
  name: 'HeaderVue',
  components: {
    LogoAndSearch,
    HeaderNavigation,
    NoficationAndSettings,
  },
  data() {
    return {
      logo,
      showSearch: false,
      showLoadingPage: null,
      loadPageValue: null,
    }
  },
  watch: {
    '$store.state.authModule.showLoadingPage': {
      handler(val) {
        this.showLoadingPage = val
      },
      immediate: true,
    },
    '$store.state.authModule.loadPageValue': {
      handler(val) {
        this.loadPageValue = val
      },
      immediate: true,
    },
  },

  mounted() {
    const user = JSON.parse(localStorage.getItem('user'))
    socket.connect()
    socket.emit('start_connecting', user?.user_id)
    if (socket.connected === false) {
      socket.connect()
      socket.emit('start_connecting', user?.user_id)
    }
  },
  methods: {
    showSearchToggle(value) {
      this.showSearch = value
    },
  },
}
</script>

<style scoped>
.rotating {
  animation: spin 3s linear infinite;
  -webkit-animation: spin 3s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>
