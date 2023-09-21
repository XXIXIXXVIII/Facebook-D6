<template>
  <div aria-hidden="false" class="block cursor-auto">
    <div class="bg-white flex flex-col box-border relative justify-end">
      <div aria-label="Facebook" class="flex justify-center" role="navigation">
        <ul
          class="max-[700px]:justify-start flex items-end justify-center dark:bg-[#242526]"
        >
          <!-- Trang chủ -->
          <nuxt-link
            v-tippy="{
              content: 'Trang chủ',
              theme: 'material',
              placement: 'bottom',
            }"
            to="/"
            class="li li-responsive max-[1100px]:min-w-[25px] max-[890px]:hidden grow min-w-[50px]"
          >
            <div :class="{ 'nav-btn': currentPath !== '/' }" class="flex-1">
              <div class="flex relative align-middle">
                <div
                  v-if="currentPath === '/'"
                  class="absolute bottom-0 bg-[#1b74e4] h-[3px] w-full"
                ></div>
                <span
                  aria-label="Trang chủ"
                  class="flex flex-col bg-transparent touch-manipulation p-0 m-0 justify-center items-center w-[111.6px] h-[56px]"
                  href="/"
                  role="link"
                  tabindex="0"
                >
                  <span v-if="currentPath !== '/'">
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <span class="relative" v-html="icon?.home"></span>
                  </span>

                  <span v-if="currentPath === '/'">
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <span class="relative" v-html="icon?.homeActive"></span>
                  </span>
                </span>
              </div>
            </div>
          </nuxt-link>
          <!-- Trang Page -->
          <nuxt-link
            v-if="user.check"
            v-tippy="{
              content: 'Trang',
              theme: 'material',
              placement: 'bottom',
            }"
            to="/pages"
            class="li li-responsive max-[890px]:hidden grow min-w-[50px]"
          >
            <div
              :class="{ 'nav-btn': currentPath !== '/pages' }"
              class="flex-1"
            >
              <div class="flex relative align-middle">
                <div
                  v-if="currentPath === '/pages'"
                  class="absolute bottom-0 bg-[#1b74e4] h-[3px] w-full"
                ></div>
                <span
                  aria-label="pages"
                  class="flex flex-col bg-transparent touch-manipulation p-0 m-0 justify-center items-center w-[111.6px] h-[56px]"
                >
                  <span v-if="currentPath !== '/pages'">
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <span class="relative" v-html="icon.page"></span>
                  </span>

                  <span v-if="currentPath === '/pages'">
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <span class="relative" v-html="icon.pageActive"> </span>
                  </span>
                </span>
              </div>
            </div>
          </nuxt-link>
          <!-- Trang Bảng điều khiển chuyên nghiệp -->
          <nuxt-link
            v-if="user?.check"
            v-tippy="{
              content: 'Bảng điều khiển chuyên nghiệp',
              theme: 'material',
              placement: 'bottom',
            }"
            to="/professional_dashboard"
            class="li li-responsive max-[890px]:hidden grow min-w-[50px]"
          >
            <div
              :class="{ 'nav-btn': currentPath !== '/professional_dashboard' }"
              class="flex-1"
            >
              <div class="flex relative align-middle">
                <div
                  v-if="currentPath === '/professional_dashboard'"
                  class="absolute bottom-0 bg-[#1b74e4] h-[3px] w-full"
                ></div>
                <span
                  aria-label="professional_dashboard"
                  class="flex flex-col bg-transparent touch-manipulation p-0 m-0 justify-center items-center w-[111.6px] h-[56px]"
                >
                  <span v-if="currentPath !== '/professional_dashboard'">
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <span class="relative" v-html="icon?.dashboard"></span>
                  </span>

                  <span v-if="currentPath === '/professional_dashboard'">
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <span class="relative" v-html="icon?.dashboardActive">
                    </span>
                  </span>
                </span>
              </div>
            </div>
          </nuxt-link>
          <!-- Trang Video -->
          <nuxt-link
            v-tippy="{
              content: 'Video',
              theme: 'material',
              placement: 'bottom',
            }"
            to="/watch"
            class="li li-responsive max-[890px]:hidden grow min-w-[50px]"
          >
            <div
              :class="{ 'nav-btn': currentPath !== '/watch' }"
              class="flex-1"
            >
              <div class="flex relative align-middle">
                <div
                  v-if="currentPath === '/watch'"
                  class="absolute bottom-0 bg-[#1b74e4] h-[3px] w-full"
                ></div>
                <span
                  aria-label="Watch"
                  class="flex flex-col bg-transparent touch-manipulation p-0 m-0 justify-center items-center w-[111.6px] h-[56px]"
                >
                  <span v-if="currentPath !== '/watch'">
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <span class="relative" v-html="icon?.watch"></span>
                  </span>

                  <span v-if="currentPath === '/watch'">
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <span class="relative" v-html="icon?.watchActive"> </span>
                  </span>
                </span>
              </div>
            </div>
          </nuxt-link>
          <!-- Trang bạn bè -->
          <nuxt-link
            v-if="!user.check"
            v-tippy="{
              content: 'Bạn bè',
              theme: 'material',
              placement: 'bottom',
            }"
            to="/friends"
            class="li li-responsive max-[890px]:hidden grow min-w-[50px]"
          >
            <div
              :class="{ 'nav-btn': currentPath !== '/friends' }"
              class="flex-1"
            >
              <div class="flex relative align-middle">
                <div
                  v-if="currentPath === '/friends'"
                  class="absolute bottom-0 bg-[#1b74e4] h-[3px] w-full"
                ></div>
                <span
                  aria-label="Bạn bè"
                  class="flex flex-col bg-transparent touch-manipulation p-0 m-0 justify-center items-center w-[111.6px] h-[56px]"
                >
                  <span v-if="currentPath !== '/friends'">
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <span class="relative" v-html="icon?.friend"></span>
                  </span>

                  <span v-if="currentPath === '/friends'">
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <span class="relative" v-html="icon?.friendActive"> </span>
                  </span>
                </span>
              </div>
            </div>
          </nuxt-link>
          <!-- Nhóm -->
          <nuxt-link
            v-if="!user.check"
            v-tippy="{
              content: 'Nhóm',
              theme: 'material',
              placement: 'bottom',
            }"
            to="/groups"
            class="li li-responsive max-[890px]:hidden grow min-w-[50px]"
          >
            <div
              :class="{ 'nav-btn': currentPath !== '/groups' }"
              class="flex-1"
            >
              <div class="flex relative align-middle">
                <div
                  v-if="currentPath === '/groups'"
                  class="absolute bottom-0 bg-[#1b74e4] h-[3px] w-full"
                ></div>
                <span
                  aria-label="Nhóm"
                  class="flex flex-col bg-transparent touch-manipulation p-0 m-0 justify-center items-center w-[111.6px] h-[56px]"
                >
                  <span v-if="currentPath !== '/groups'">
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <span class="relative" v-html="icon?.group"></span>
                  </span>
                  <span v-if="currentPath === '/groups'">
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <span class="relative" v-html="icon?.groupActive"></span>
                  </span>
                </span>
              </div>
            </div>
          </nuxt-link>
          <!-- Trò chơi -->
          <nuxt-link
            v-if="!user.check"
            v-tippy="{
              content: 'Trò chơi',
              theme: 'material',
              placement: 'bottom',
            }"
            to="/gaming/play/?store_visit_source=gaming_tab"
            class="li game grow min-w-[50px]"
          >
            <div
              :class="{ 'nav-btn': currentPath !== '/gaming' }"
              class="flex-1"
            >
              <div class="flex relative align-middle">
                <div
                  v-if="currentPath === '/gaming'"
                  class="absolute bottom-0 bg-[#1b74e4] h-[3px] w-full"
                ></div>
                <span
                  aria-label="Trò chơi"
                  class="flex flex-col bg-transparent touch-manipulation p-0 m-0 justify-center items-center w-[111.6px] h-[56px]"
                >
                  <span v-if="currentPath !== '/gaming'">
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <span class="relative" v-html="icon?.game"></span>
                  </span>

                  <span v-if="currentPath === '/gaming'">
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <span class="relative" v-html="icon?.gameActive"></span>
                  </span>
                </span>
              </div>
            </div>
          </nuxt-link>
          <!-- Phần xem thêm -->
          <nuxt-link
            v-if="!showSearch"
            v-tippy="{
              content: 'Xem thêm',
              theme: 'material',
              placement: 'bottom',
            }"
            :to="currentPath === '/' ? '/bookmarks' : '/'"
            class="li bookmark grow min-w-[50px] cursor-pointer"
          >
            <div
              :class="{ 'bookmark-btn': currentPath !== '/bookmarks' }"
              class="flex-1"
            >
              <div class="flex relative align-middle">
                <div
                  v-if="currentPath === '/bookmarks'"
                  class="absolute bottom-0 bg-[#1b74e4] h-[3px] w-full"
                ></div>
                <span
                  aria-label="Mở rộng"
                  class="flex flex-col bg-transparent touch-manipulation p-0 m-0 justify-center items-center w-full h-[56px]"
                >
                  <span v-if="currentPath !== '/bookmarks'">
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <span class="relative" v-html="icon?.bookmark"></span>
                  </span>

                  <span v-if="currentPath === '/bookmarks'">
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <span class="relative" v-html="icon?.bookmarkActive"></span>
                  </span>
                </span>
              </div>
            </div>
          </nuxt-link>
        </ul>
      </div>
      <div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import { socket } from '../../../plugins/socket.io'
import {
  home,
  homeActive,
  friend,
  friendActive,
  watch,
  watchActive,
  group,
  groupActive,
  game,
  gameActive,
  bookmark,
  bookmarkActive,
  page,
  pageActive,
  dashboard,
  dashboardActive,
} from '../../../assets/icons/icons'
export default {
  name: 'HeaderNavigation',
  props: {
    showSearch: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      icon: {
        page,
        pageActive,
        home,
        homeActive,
        watch,
        watchActive,
        friend,
        friendActive,
        group,
        groupActive,
        game,
        gameActive,
        bookmark,
        bookmarkActive,
        dashboard,
        dashboardActive,
      },
      user: null,
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
        this.user = val.user_id
      },
      immediate: true,
      deep: true,
    },
  },
  beforeDestroy() {
    socket.emit('before_disconnect', this.user)
  },
  destroyed() {
    setTimeout(() => {
      socket.disconnect()
    }, 1000)
  },
}
</script>

<style scoped>
.li {
  width: 111.6px;
  height: 56px;
  display: list-item;
  color: #65676b !important;
  display: flex;
  align-items: center;
  margin: 0 2.5px;
}

.bookmark {
  display: none;
}

.nav-btn {
  transition-duration: 0.75s;
}

.nav-btn:hover {
  display: flex;
  align-items: center;
  height: 50px;
  background-color: #f2f3f5;
  border-radius: 10px;
  transition-duration: 0.1s;
}

@media (max-width: 1100px) {
  .bookmark {
    display: block !important;
    transition-duration: 0.75s;
  }

  .bookmark-btn:hover {
    display: flex;
    margin-top: 3px;
    align-items: center;
    height: 50px;
    background-color: #f2f3f5;
    border-radius: 10px;
    justify-content: center;
  }

  .game {
    display: none !important;
  }
}

@media (max-width: 890px) {
  .li-responsive {
    display: none !important;
  }

  .li {
    width: 24px;
  }
}
</style>
