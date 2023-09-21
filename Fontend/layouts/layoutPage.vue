<template>
  <div>
    <HeaderVue></HeaderVue>
    <div class="flex w-full bg-[#f0f2f5] ">
      <div className="w-[360px] min-h-screen mt-14 "></div>
      <div class="navbar w-[360px] fixed bg-white min-h-screen mt-14 h-screen overflow-y-auto">
        <div class="mt-3 mx-4 mb-3 flex items-center justify-between">
          <div class="text-2xl font-bold">Trang</div>
          <div
            class="w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center cursor-pointer"
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

        <div v-if="!user.check" class="px-4">
          <nuxt-link
            to="/pages/creation"
            class="w-full py-2 inline-block text-center rounded-md bg-[#E7F3FF] text-[#1877F2] text-base font-semibold"
          >
            + Tạo trang mới
          </nuxt-link>
        </div>

        <div v-if="user.check" class="px-2">
          <nuxt-link
            to="/pages"
            class="p-2 rounded-md bg-gray-200 flex items-center justify-between cursor-pointer"
            @click="handleDropdown"
          >
            <div class="flex items-center gap-2">
              <div
                class="w-9 h-9 rounded-full  flex items-center justify-center"
                :class="currentPath === '/pages' ?'bg-[#1877F2]'  : 'bg-gray-200'"
              >
                <i
                  style="
                    background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/kec8i1cihAm.png');
                    background-position: 0px -44px;
                    background-size: 22px 780px;
                    width: 20px;
                    height: 20px;
                    background-repeat: no-repeat;
                    display: inline-block;
                    filter: invert(currentPath === '/pages' ? 0 : 100%);
                  "
                  :style="currentPath === '/pages' ? { filter: 'invert(100%)' } : { filter: 'invert(0%)' }"
                ></i>
              </div>
              <div class="text-[17px] font-semibold">Trang của bạn</div>
            </div>
            <div
              class="w-9 h-9 rounded-full hover:bg-gray-300 flex items-center justify-center"
            >
              <i
                v-if="dropdown"
                style="
                  background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yu/r/KwWkX1HjBzT.png');
                  background-position: -110px -88px;
                  background-size: 190px 200px;
                  width: 20px;
                  height: 20px;
                  background-repeat: no-repeat;
                  display: inline-block;
                  filter: invert(50%);
                "
              ></i>
              <i
                v-if="!dropdown"
                style="
                  background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yu/r/KwWkX1HjBzT.png');
                  background-position: -22px -88px;
                  background-size: 190px 200px;
                  width: 20px;
                  height: 20px;
                  background-repeat: no-repeat;
                  display: inline-block;
                  filter: invert(50%);
                "
              ></i>
            </div>
          </nuxt-link>

          <div v-if="dropdown">
            <div class="ml-4">
              <div
                v-for="(page, index) in pages.slice(0, slice)"
                :key="index"
                class="px-2"
              >
                <nuxt-link
                  :to="`/${page.user_id}`"
                  class="h-[44px] px-2 flex items-center gap-3 rounded-lg hover:bg-gray-200 cursor-pointer mt-1"
                >
                  <div
                    class="w-[22px] h-[22px] rounded-full overflow-hidden flex items-center justify-center"
                  >
                    <img
                      class="w-full h-full object-cover"
                      :src="page.avatar"
                    />
                  </div>
                  <div class="text-sm font-semibold">{{ page.fullName }}</div>
                </nuxt-link>
              </div>
              <div
                class="flex items-center gap-3 h-11 rounded-md hover:bg-gray-200 p-2 cursor-pointer"
                @click.stop="handleAll"
              >
                <div
                  class="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center"
                >
                  <i
                    style="
                      background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yu/r/KwWkX1HjBzT.png');
                      background-position: -22px -110px;
                      background-size: 190px 200px;
                      width: 20px;
                      height: 20px;
                      background-repeat: no-repeat;
                      display: inline-block;
                    "
                  ></i>
                </div>
                <div v-if="!showAllPages" class="text-[15px] font-semibold">
                  Xem tất cả các Trang
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mx-4 my-2 border-b border-gray-300"></div>

        <div class="px-2">
          <nuxt-link
            to="/"
            :style="[
              currentPath === '/pages/discover1111'
                ? { background: '#F0F2F5' }
                : { background: 'white' },
            ]"
            class="flex items-center gap-3 px-2 h-[52px] rounded-lg hover:bg-[#F0F2F5]"
          >
            <div
              class="w-9 h-9 rounded-full flex items-center justify-center bg-[#E4E6EB]"
            >
              <i
                style="
                  background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/Nc_ujP8nGzI.png');
                  background-position: 0px -142px;
                  background-size: 42px 160px;
                  width: 16px;
                  height: 16px;
                  background-repeat: no-repeat;
                  display: inline-block;
                "
              ></i>
            </div>
            <div class="text-[17px] font-semibold">Meta Business Suite</div>
          </nuxt-link>
        </div>

        <div class="px-2">
          <nuxt-link
            to="/pages/discover"
            :style="[
              currentPath === '/pages/discover'
                ? { background: '#F0F2F5' }
                : { background: 'white' },
            ]"
            class="flex items-center gap-3 px-2 h-[52px] rounded-lg hover:bg-[#F0F2F5]"
          >
            <div
              class="w-9 h-9 rounded-full flex items-center justify-center"
              :style="{
                background:
                  currentPath === '/pages/discover' ? '#1877F2' : '#E4E6EB',
              }"
            >
              <i
                style="
                  background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yc/r/iqnqVCc0Owk.png');
                  background-position: 0px -226px;
                  background-size: 34px 618px;
                  width: 20px;
                  height: 20px;
                  background-repeat: no-repeat;
                  display: inline-block;
                  filter: invert(currentPath === '/pages/discover' ?0%%: 100%);
                "
                :style="{
                  filter:
                    currentPath === '/pages/discover'
                      ? 'invert(100%)'
                      : 'invert(0%)',
                }"
              ></i>
            </div>
            <div class="text-[17px] font-semibold">Khám phá</div>
          </nuxt-link>

          <nuxt-link
            to="/pages/liked"
            :style="[
              currentPath === '/pages/liked'
                ? { background: '#F0F2F5' }
                : { background: 'white' },
            ]"
            class="flex items-center gap-3 px-2 h-[52px] rounded-lg hover:bg-[#F0F2F5]"
          >
            <div
              class="w-9 h-9 rounded-full flex items-center justify-center"
              :style="{
                background:
                  currentPath === '/pages/liked' ? '#1877F2' : '#E4E6EB',
              }"
            >
              <i
                data-visualcompletion="css-img"
                class="x1b0d499 xaj1gnb"
                style="
                  background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/UMAvBmuqi-U.png');
                  background-position: -88px -110px;
                  background-size: 190px 200px;
                  width: 20px;
                  height: 20px;
                  background-repeat: no-repeat;
                  display: inline-block;
                  filter: invert(currentPath === '/pages/liked' ?0%%: 100%);
                "
                :style="{
                  filter:
                    currentPath === '/pages/liked'
                      ? 'invert(100%)'
                      : 'invert(0%)',
                }"
              ></i>
            </div>
            <div class="text-[17px] font-semibold">Trang đã thích</div>
          </nuxt-link>

          <nuxt-link
            to="/pages/invites"
            :style="[
              currentPath === '/pages/invites'
                ? { background: '#F0F2F5' }
                : { background: 'white' },
            ]"
            class="flex items-center gap-3 px-2 h-[52px] rounded-lg hover:bg-[#F0F2F5]"
          >
            <div
              class="w-9 h-9 rounded-full flex items-center justify-center"
              :style="{
                background:
                  currentPath === '/pages/invites' ? '#1877F2' : '#E4E6EB',
              }"
            >
              <i
                style="
                  background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yW/r/X5WLMPv-jaN.png');
                  background-position: 0px -92px;
                  background-size: 26px 402px;
                  width: 20px;
                  height: 20px;
                  background-repeat: no-repeat;
                  display: inline-block;
                  filter: invert(currentPath === '/pages/invites' ?0%%: 100%);
                "
                :style="{
                  filter:
                    currentPath === '/pages/invites'
                      ? 'invert(100%)'
                      : 'invert(0%)',
                }"
              ></i>
            </div>
            <div class="text-[17px] font-semibold">Lời mời</div>
          </nuxt-link>
        </div>
      </div>

      <div class="w-[calc(100vw-360px)] ml-[360px] mt-14">
        <nuxt />
      </div>
    </div>
  </div>
</template>
<script>
import HeaderVue from '../components/header/HeaderVue.vue'
export default {
  name: 'LayoutPages',
  components: {
    HeaderVue,
  },
  data() {
    return {
      user: null,
      dropdown: true,
      pages: null,
      showAllPages: false,
      slice: 4,
    }
  },
  computed: {
    currentPath() {
      return this.$route.path
    },
  },
  watch: {
    '$store.state.authModule.user': {
      handler(val) {
        this.user = val
      },
      immediate: true,
      deep: true,
    },
    '$store.state.authModule.pages': {
      handler(val) {
        this.pages = val
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    handleDropdown() {
      this.dropdown = !this.dropdown
      this.slice = 4
    },
    handleAll() {
      this.slice = this.pages.length
    },
  },
}
</script>
<style scoped lang="css">
.navbar {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
