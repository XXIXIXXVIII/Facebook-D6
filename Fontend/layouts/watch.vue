<template>
  <div>
    <HeaderVue></HeaderVue>
    <div class="flex w-full">
      <div className="w-[360px] min-h-screen mt-14"></div>
      <div class="navbar w-[360px] fixed bg-white min-h-screen mt-10">
        <div class="p-2">
          <div
            class="mt-5 mx-4 mb-3 flex items-center justify-between bg-white"
          >
            <div class="text-2xl font-bold">Video</div>
            <div
              class="w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer flex items-center justify-center"
            >
              <i
                data-visualcompletion="css-img"
                class="x1b0d499 xep6ejk"
                style="
                  background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/L1k-kkbTA1u.png');
                  background-position: -88px -110px;
                  background-size: 190px 182px;
                  width: 20px;
                  height: 20px;
                  background-repeat: no-repeat;
                  display: inline-block;
                "
              ></i>
            </div>
          </div>
          <div class="px-2"><InputSearch placeholder="Tìm kiếm video" /></div>

          <div class="mt-4">
            <div
              v-for="nav in navBar"
              :key="nav.title"
              :style="[
                currentPath === nav.link
                  ? { background: 'rgb(229 231 235 / var(--tw-bg-opacity))' }
                  : { background: 'rgb(255 255 255)' },
              ]"
              class="rounded-md hover:bg-gray-200"
            >
              <nuxt-link
                exact
                class="flex items-center gap-3 px-2 py-2 rounded-md"
                :to="nav.link"
              >
                <div
                  :style="[
                    currentPath === nav.link
                      ? { background: nav.bgPick, filter: 'invert(100%)' }
                      : {
                          background: 'rgb(229 231 235 / var(--tw-bg-opacity))',
                          filter: 'invert(0%)',
                        },
                  ]"
                  class="w-9 h-9 rounded-full flex items-center justify-center"
                  v-html="nav.icon"
                ></div>
                <div class="text-base font-medium">{{ nav.title }}</div>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div
        class="w-[calc(100vw-360px)] ml-[360px] mt-14 bg-[#F0F2F5] min-h-screen"
      >
        <nuxt />
      </div>
    </div>
  </div>
</template>
<script>
import HeaderVue from '../components/header/HeaderVue.vue'
import InputSearch from '../components/pages/InputSearch.vue'
import { navBar } from '../utils/watch/NavBar'

export default {
  name: 'LayoutWatch',
  components: {
    HeaderVue,
    InputSearch,
  },
  data() {
    return {
      navBar,
    }
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
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
