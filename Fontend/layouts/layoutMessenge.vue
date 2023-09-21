<template>
  <div>
    <HeaderVue></HeaderVue>
    <div class="flex w-full">
      <div className="max-[900px]:w-[88px] w-[357px] min-h-screen mt-14"></div>
      <div
        style="box-shadow: rgba(156, 156, 156, 0.24) 0px 3px 8px"
        class="navbar max-[900px]:hidden w-[357px] fixed mt-14 h-[655px] overflow-y-auto p-3 dark:bg-[#242526] dark:text-white"
      >
        <messenger-board />
      </div>
      <div
        style="box-shadow: rgba(139, 139, 139, 0.24) 0px 3px 8px"
        class="navbar max-[900px]:block hidden w-[88px] fixed mt-14 h-[655px] overflow-y-auto"
      >
        dsd
      </div>
      <div
        class="max-[900px]:ml-[88px] max-[900px]:w-full w-[76.2%] ml-[23.8%] mt-14 h-[655px] bg-[#f0f2f5]"
      >
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderVue from '../components/header/HeaderVue.vue'
import MessengerBoard from '../components/header/notifications_settings/messenger/MessengerBoard.vue'

export default {
  name: 'LayoutMessenge',
  components: { HeaderVue, MessengerBoard },
  data() {
    return {}
  },
  computed: {
    currentPath() {
      return this.$route.path
    },
  },
}
</script>
<style scoped lang="css">
.navbar {
  box-shadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px';
  background-color: white;
}
.nuxt-link-active {
  background: rgb(229 231 235 / var(--tw-bg-opacity));
}

.focus {
  background: rgb(37 99 235 / var(--tw-bg-opacity));
}
</style>
