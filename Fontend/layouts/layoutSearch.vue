<template>
  <div>
    <HeaderVue></HeaderVue>
    <div class="flex w-full">
      <div className="max-[900px]:w-[88px] w-[357px] min-h-screen mt-14"></div>
      <div
        style="box-shadow: rgba(71, 71, 71, 0.24) 0px 3px 8px"
        class="navbar max-[900px]:hidden w-[357px] fixed mt-14 h-[655px] overflow-y-auto p-3"
      >
        <div class="text-2xl font-bold ml-1">Kết quả tìm kiếm</div>
        <!-- Vạch ngăn cách -->
        <div
          class="w-[328px] mt-4 mb-3 ml-1"
          style="border-bottom: 2px rgb(203, 203, 203) solid"
        ></div>
        <div class="text-base font-semibold mb-2 ml-1">Bộ lọc</div>
        <!-- Danh sách bộ lọc -->
        <div>
          <!-- Tất cả -->
          <div @click="handleSendType('All')">
            <nuxt-link
              :to="'/search/top?q=' + currentSearchValue"
              :class="{ 'my-block': currentPath !== '/search/top' }"
              class="flex items-center h-[48px] p-1 rounded-lg"
              :style="{
                backgroundColor:
                  currentPath === '/search/top' ? '#cbcbcb44' : 'transparent',
              }"
            >
              <div
                :style="{
                  backgroundColor:
                    currentPath === '/search/top' ? '#1877f2' : '#e4e6eb',
                }"
                class="w-9 h-9 flex justify-center items-center rounded-full mr-3 mt-[6px] mb-[6px]"
              >
                <i
                  v-if="currentPath === '/search/top'"
                  style="
                    background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yQ/r/645gC9GTyZD.png');
                    background-position: 0px -332px;
                    background-size: 26px 588px;
                    width: 20px;
                    height: 20px;
                    background-repeat: no-repeat;
                    display: inline-block;
                    filter: invert(100%);
                  "
                ></i>
                <i
                  v-if="currentPath !== '/search/top'"
                  style="
                    background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yQ/r/645gC9GTyZD.png');
                    background-position: 0px -332px;
                    background-size: 26px 588px;
                    width: 20px;
                    height: 20px;
                    background-repeat: no-repeat;
                    display: inline-block;
                  "
                ></i>
              </div>
              <div class="text-sm font-medium">Tất cả</div>
            </nuxt-link>
          </div>
          <!-- Bài viết -->
          <div @click="handleSendType('Post')">
            <nuxt-link
              :to="'/search/posts?q=' + currentSearchValue"
              :class="{ 'my-block': currentPath !== '/search/posts' }"
              class="flex items-center h-[48px] p-1 rounded-lg"
              :style="{
                backgroundColor:
                  currentPath === '/search/posts' ? '#cbcbcb44' : 'transparent',
              }"
            >
              <div
                :style="{
                  backgroundColor:
                    currentPath === '/search/posts' ? '#1877f2' : '#e4e6eb',
                }"
                class="w-9 h-9 flex justify-center items-center rounded-full mr-3 mt-[6px] mb-[6px]"
              >
                <i
                  v-if="currentPath === '/search/posts'"
                  data-visualcompletion="css-img"
                  class="x1b0d499 xep6ejk"
                  style="
                    background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yB/r/5Ohp902ZdAr.png');
                    background-position: 0px -834px;
                    background-size: 26px 1174px;
                    width: 20px;
                    height: 20px;
                    background-repeat: no-repeat;
                    display: inline-block;
                    filter: invert(100%);
                  "
                ></i>
                <i
                  v-if="currentPath !== '/search/posts'"
                  style="
                    background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yB/r/5Ohp902ZdAr.png');
                    background-position: 0px -834px;
                    background-size: 26px 1174px;
                    width: 20px;
                    height: 20px;
                    background-repeat: no-repeat;
                    display: inline-block;
                  "
                ></i>
              </div>
              <div class="text-sm font-medium">Bài viết</div>
            </nuxt-link>
          </div>
          <!-- Mọi người -->
          <div @click="handleSendType('User')">
            <nuxt-link
              :to="'/search/people?q=' + currentSearchValue"
              :class="{ 'my-block': currentPath !== '/search/people' }"
              class="flex items-center h-[48px] p-1 rounded-lg"
              :style="{
                backgroundColor:
                  currentPath === '/search/people'
                    ? '#cbcbcb44'
                    : 'transparent',
              }"
            >
              <div
                :style="{
                  backgroundColor:
                    currentPath === '/search/people' ? '#1877f2' : '#e4e6eb',
                }"
                class="w-9 h-9 flex justify-center items-center rounded-full mr-3 mt-[6px] mb-[6px]"
              >
                <i
                  v-if="currentPath === '/search/people'"
                  style="
                    background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yQ/r/645gC9GTyZD.png');
                    background-position: 0px -354px;
                    background-size: 26px 588px;
                    width: 20px;
                    height: 20px;
                    background-repeat: no-repeat;
                    display: inline-block;
                    filter: invert(100%);
                  "
                ></i>
                <i
                  v-if="currentPath !== '/search/people'"
                  style="
                    background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yQ/r/645gC9GTyZD.png');
                    background-position: 0px -354px;
                    background-size: 26px 588px;
                    width: 20px;
                    height: 20px;
                    background-repeat: no-repeat;
                    display: inline-block;
                  "
                ></i>
              </div>
              <div class="text-sm font-medium">Mọi người</div>
            </nuxt-link>
          </div>
          <!-- Trang -->
          <div @click="handleSendType('Page')">
            <nuxt-link
              :to="'/search/pages?q=' + currentSearchValue"
              :class="{ 'my-block': currentPath !== '/search/pages' }"
              class="flex items-center h-[48px] p-1 rounded-lg"
              :style="{
                backgroundColor:
                  currentPath === '/search/pages' ? '#cbcbcb44' : 'transparent',
              }"
            >
              <div
                :style="{
                  backgroundColor:
                    currentPath === '/search/pages' ? '#1877f2' : '#e4e6eb',
                }"
                class="w-9 h-9 flex justify-center items-center rounded-full mr-3 mt-[6px] mb-[6px]"
              >
                <i
                  v-if="currentPath === '/search/pages'"
                  style="
                    background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yB/r/5Ohp902ZdAr.png');
                    background-position: 0px -174px;
                    background-size: 26px 1174px;
                    width: 20px;
                    height: 20px;
                    background-repeat: no-repeat;
                    display: inline-block;
                    filter: invert(100%);
                  "
                ></i>
                <i
                  v-if="currentPath !== '/search/pages'"
                  style="
                    background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yB/r/5Ohp902ZdAr.png');
                    background-position: 0px -174px;
                    background-size: 26px 1174px;
                    width: 20px;
                    height: 20px;
                    background-repeat: no-repeat;
                    display: inline-block;
                  "
                ></i>
              </div>
              <div class="text-sm font-medium">Trang</div>
            </nuxt-link>
          </div>
          <!-- Nhóm -->
          <div @click="handleSendType('Group')">
            <nuxt-link
              :to="'/search/groups?q=' + currentSearchValue"
              :class="{ 'my-block': currentPath !== '/search/groups' }"
              class="flex items-center h-[48px] p-1 rounded-lg"
              :style="{
                backgroundColor:
                  currentPath === '/search/groups'
                    ? '#cbcbcb44'
                    : 'transparent',
              }"
            >
              <div
                :style="{
                  backgroundColor:
                    currentPath === '/search/groups' ? '#1877f2' : '#e4e6eb',
                }"
                class="w-9 h-9 flex justify-center items-center rounded-full mr-3 mt-[6px] mb-[6px]"
              >
                <i
                  v-if="currentPath === '/search/groups'"
                  style="
                    background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/CBzEZmbq4RG.png');
                    background-position: 0px -248px;
                    background-size: 74px 408px;
                    width: 20px;
                    height: 20px;
                    background-repeat: no-repeat;
                    display: inline-block;
                    filter: invert(100%);
                  "
                ></i>
                <i
                  v-if="currentPath !== '/search/groups'"
                  style="
                    background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/CBzEZmbq4RG.png');
                    background-position: 0px -248px;
                    background-size: 74px 408px;
                    width: 20px;
                    height: 20px;
                    background-repeat: no-repeat;
                    display: inline-block;
                  "
                ></i>
              </div>
              <div class="text-sm font-medium">Nhóm</div>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div
        style="box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px"
        class="navbar max-[900px]:block hidden w-[88px] fixed mt-14 h-[655px] overflow-y-auto"
      ></div>
      <div
        class="max-[900px]:ml-[88px] max-[900px]:w-full w-[76.2%] ml-[23.8%] mt-14 bg-[#f0f2f5]"
      >
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderVue from '../components/header/HeaderVue.vue'

export default {
  name: 'LayoutSearch',
  components: { HeaderVue },
  data() {
    return {
      typeOfPage: undefined,
    }
  },

  computed: {
    currentPath() {
      return this.$route.fullPath.split('?')[0]
    },
    currentSearchValue() {
      return this.$route.fullPath.split('?q=')[1]
    },
  },

  methods: {
    handleSendType(value) {
      console.log(value)
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

.my-block {
  transition-duration: 0.3s;
}
.my-block:hover {
  background-color: #cbcbcb44;
  cursor: pointer;
  transition-duration: 0.1s;
}
</style>
