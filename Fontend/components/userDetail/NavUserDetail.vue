<template>
  <div class="nav w-full h-[60px] border-b border-gray-300">
    <div class="w-[1047px] h-full mx-auto px-3">
      <div class="w-full h-full flex justify-center items-center">
        <div class="w-full h-full flex">
          <nuxt-link
            v-if="inforDetail && inforDetail.user_id"
            :to="`/${inforDetail.user_id}`"
            class="w-[81px] h-full"
          >
            <button
              :class="{
                'btn-nav-active': !currentPath ,
                'btn-nav': currentPath,
              }"
              class="w-[81px] h-full font-semibold text-[15px]"
            >
              Bài viết
            </button>
          </nuxt-link>
          <nuxt-link
            v-if="inforDetail"
            :to="`/${inforDetail.user_id}/about`"
            class="w-[81px] h-full px-4"
          >
            <button
              :class="{
                'btn-nav-active': currentPath === 'about',
                'btn-nav': currentPath !== 'about',
              }"
              class="w-[81px] h-full font-semibold text-[15px]"
            >
              Giới thiệu
            </button>
          </nuxt-link>

          <nuxt-link
            v-if="inforDetail"
            :to="`/${inforDetail.user_id}/friend`"
            class="w-[81px] h-full px-4"
          >
            <button
              :class="{
                'btn-nav-active': currentPath === 'friend',
                'btn-nav': currentPath !== 'friend',
              }"
              class="w-[81px] h-full font-semibold text-[15px]"
            >
              Bạn bè
            </button>
          </nuxt-link>

          <nuxt-link
            v-if="inforDetail"
            :to="`/${inforDetail.user_id}/photos`"
            class="w-[81px] h-full px-4"
          >
            <button
              :class="{
                'btn-nav-active': currentPath === 'photos',
                'btn-nav': currentPath !== 'photos',
              }"
              class="w-[81px] h-full font-semibold text-[15px] ml-[-10px]"
            >
              Ảnh
            </button>
          </nuxt-link>

          <nuxt-link
            v-if="inforDetail"
            :to="`/${inforDetail.user_id}/videos`"
            class="w-[81px] h-full px-4"
          >
            <button
              :class="{
                'btn-nav-active': currentPath === 'videos',
                'btn-nav': currentPath !== 'videos',
              }"
              class="w-[81px] h-full font-semibold text-[15px] ml-[-20px]"
            >
              Video
            </button>
          </nuxt-link>

          <nuxt-link
            v-if="inforDetail"
            :to="`/${inforDetail.user_id}/map`"
            class="w-[81px] h-full px-4"
          >
            <button
              :class="{
                'btn-nav-active': currentPath === 'map',
                'btn-nav': currentPath !== 'map',
              }"
              class="w-[81px] h-full font-semibold text-[15px] ml-[-15px]"
            >
              Check in
            </button>
          </nuxt-link>

          <div
            class="relative inline-block text-left mt-[11px] ml-[5px] h-full"
          >
            <button
              type="button"
              class="w-[150px] inline-flex justify-center items-center px-4 py-2 ml-[-15px] text-sm font-medium text-gray-500"
              @click="toggleDropdown"
            >
              Xem thêm
              <svg
                class="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <div
              v-show="isOpen"
              class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white z-30"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div class="py-1" role="none">
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-semibold"
                  role="menuitem"
                >
                  Thể thao
                </a>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-semibold"
                  role="menuitem"
                >
                  Âm nhạc
                </a>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-semibold"
                  role="menuitem"
                >
                  Chương trình TV
                </a>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-semibold"
                  role="menuitem"
                >
                  Phim
                </a>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-semibold"
                  role="menuitem"
                >
                  Sách
                </a>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-semibold"
                  role="menuitem"
                >
                  Thích
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          class="w-[48px] h-[36px] bg-[#ECF3FF] flex justify-center items-center rounded-md hover:bg-[#e6eefc] cursor-pointer"
        >
          <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            width="1em"
            height="1em"
            class="x1lliihq x1k90msu x2h7rmj x1qfuztq x198g3q0 xlup9mm x1kky2od"
          >
            <circle cx="12" cy="12" r="2.5"></circle>
            <circle cx="19.5" cy="12" r="2.5"></circle>
            <circle cx="4.5" cy="12" r="2.5"></circle>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isOpen: false,
      inforDetail: null,
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
  },

  watch: {
    '$store.state.idFriendModule.userDetail': {
      handler(val) {
        this.inforDetail = val
      },
      immediate: true,
    },
  },

  computed: {
    currentPath() {
      // Lấy đoạn cuối của path hiện tại
      return this.$route.path.split('/')[2]
     
      // return pathParts[pathParts.length - 1]
    },
  },
}
</script>
<style>
.nav {
  border-bottom: 1px solid rgb(213, 209, 209);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

.btn-nav-active {
  color: rgb(4, 117, 255) !important;
  border-bottom: 3px solid rgb(4, 117, 255);
}

.btn-nav {
  color: rgb(125, 125, 125) !important;
}

.btn-nav:hover {
  background-color: rgba(243, 239, 239, 0.801);
  border-radius: 8px;
}
</style>
