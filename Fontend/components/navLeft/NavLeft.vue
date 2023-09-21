<template>
  <div
    class="max-[1300px]:hidden fixed left-0 max-h-full w-[360px] font-medium text-sm pl-2 pr-2 pb-20 mt-4 hover:overflow-y-auto overflow-y-hidden"
  >
    <div>
      <!-- Avatar và tên người dùng -->
      <nuxt-link
        :to="`/${user?.user_id}`"
        class="left-block flex items-center h-[48px] pl-2 mr-2 rounded-lg"
      >
        <div
          class="w-9 h-9 overflow-hidden rounded-full mr-3 mt-[6px] mb-[6px] bg-black"
        >
          <img class="w-full h-full object-cover" :src="user?.avatar" alt="" />
        </div>
        <div class="text-black dark:text-white">{{ user?.fullName }}</div>
      </nuxt-link>
      <!-- List ứng dụng -->

      <nuxt-link
        v-for="(icon, index) in !toggle.showMore
          ? !user.check
            ? icons.slice(0, 5)
            : iconsPage.slice(0, 5)
          : !user?.check
          ? icons
          : iconsPage"
        :key="index"
        :to="icon.path"
        class="left-block flex items-center h-[48px] pl-2 mr-2 rounded-lg"
      >
        <div
          class="w-9 h-9 overflow-hidden rounded-full mr-3 mt-[6px] mb-[6px]"
        >
          <i
            :style="{ 'background-position': icon.backgroundPosition }"
            style="
              background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/y6/r/MXx87JcFKzH.png');
              background-size: 38px 570px;
              width: 36px;
              height: 36px;
              background-repeat: no-repeat;
              display: inline-block;
            "
          ></i>
        </div>
        <div class="text-black dark:text-white" >{{ icon.title }}</div>
      </nuxt-link>
      <nuxt-link
        v-if="toggle.showMore"
        to="/messages"
        class="left-block flex items-center h-[48px] pl-2 mr-2 rounded-lg"
      >
        <div
          class="w-9 h-9 overflow-hidden rounded-full mr-3 mt-[6px] mb-[6px]"
        >
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="messengerLeftIcon"></span>
        </div>
        <div class="text-black dark:text-white">Messenger</div>
      </nuxt-link>
      <div
        v-if="toggle.showMore && !user.check"
        class="left-block flex items-center h-[48px] pl-2 mr-2 rounded-lg"
      >
        <div
          class="w-9 h-9 overflow-hidden rounded-full mr-3 mt-[6px] mb-[6px]"
        >
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="messengerKid"></span>
        </div>
        <div class="text-black dark:text-white">Messenger Kids</div>
      </div>
      <!-- Xem thêm -->
      <div
        v-if="!toggle.showMore"
        class="left-block flex items-center h-[48px] pl-2 mr-2 rounded-lg"
        @click="() => (toggle.showMore = !toggle.showMore)"
      >
        <div class="w-9 h-9 overflow-hidden rounded-full p-2 bg-[#e4e6eb] mr-3">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="showMore"></span>
        </div>
        <div class="text-black dark:text-white">{{$t('home.showMore')}}</div>
      </div>
      <!-- Ẩn bớt -->
      <div
        v-if="toggle.showMore"
        class="left-block flex items-center h-[48px] pl-2 mr-2 rounded-lg"
        @click="() => (toggle.showMore = !toggle.showMore)"
      >
        <div class="w-9 h-9 overflow-hidden rounded-full p-2 bg-[#e4e6eb] mr-3">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="hide"></span>
        </div>
        <div class="text-black dark:text-white">Ẩn bớt</div>
      </div>
    </div>
    <!-- Vạch ngăn cách -->
    <div
      class="w-[328px] mt-2 mb-2 ml-2"
      style="border-bottom: 1px rgb(203, 203, 203) solid"
    ></div>
    <!-- p2 -->
    <div class="bottom">
      <div class="flex items-center pl-2">
        <div class="mr-[152px] pt-2 pb-2 text-base text-gray-500">
          {{$t('home.sortCut')}}
        </div>
        <div
          class="edit font-normal text-blue-600 p-2 rounded-lg cursor-pointer hover:bg-slate-200"
        >
        {{$t('home.edit')}}
        </div>
      </div>
      <div v-if="shortCuts">
        <nuxt-link
          v-for="(shortCut, index) in !toggle.showMoreShortCut
            ? shortCuts.slice(0, 5)
            : shortCuts"
          :key="index"
          class="left-block flex items-center h-[48px] pl-2 mr-2 rounded-lg overflow-hidden"
          :to="`/${shortCut?.page_id}`"
        >
          <div
            style="border: 1px rgb(206, 206, 206) solid"
            class="w-9 h-9 overflow-hidden rounded-lg mr-3 mt-[6px] mb-[6px] bg-white"
          >
            <img
              class="w-full h-full object-cover"
              :src="shortCut?.avatar"
              alt=""
            />
          </div>
          <div
            class="w-[80%] whitespace-nowrap text-ellipsis overflow-hidden text-black dark:text-white"
          >
            {{ shortCut?.fullName }}
          </div>
        </nuxt-link>
      </div>

      <!-- Xem thêm -->
      <div
        v-if="!toggle.showMoreShortCut"
        class="left-block flex items-center h-[48px] pl-2 mr-2 rounded-lg"
        @click="() => (toggle.showMoreShortCut = !toggle.showMoreShortCut)"
      >
        <div class="w-9 h-9 overflow-hidden rounded-full p-2 bg-[#e4e6eb] mr-3">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="showMore"></span>
        </div>
        <div class="text-black dark:text-white">{{$t('home.showMore')}}</div>
      </div>
      <!-- Ẩn bớt -->
      <div
        v-if="toggle.showMoreShortCut"
        class="left-block flex items-center h-[48px] pl-2 mr-2 rounded-lg"
        @click="() => (toggle.showMoreShortCut = !toggle.showMoreShortCut)"
      >
        <div class="w-9 h-9 overflow-hidden rounded-full p-2 bg-[#e4e6eb] mr-3">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="hide"></span>
        </div>
        <div class="text-black dark:text-white">Ẩn bớt</div>
      </div>
    </div>
    <div class="font-normal p-2"><small-footer /></div>
  </div>
</template>

<script>
import {
  messengerLeftIcon,
  showMore,
  hide,
  messengerKid,
} from '../../assets/icons/icons'
import { icons, iconsPage } from '../../utils/navLeft/icons'
import SmallFooter from '../header/notifications_settings/settings/SmallFooter.vue'
export default {
  name: 'NavLeft',
  components: { SmallFooter },
  data() {
    return {
      messengerLeftIcon,
      showMore,
      hide,
      messengerKid,
      icons,
      iconsPage,
      toggle: {
        showMore: false,
        showMoreShortCut: false,
      },
      shortCuts: [],
      user: null,
    }
  },
  watch: {
    '$store.state.authModule.user': {
      handler(val) {
        this.user = val
      },
      immediate: true,
    },
    '$store.state.authModule.pages': {
      handler(val) {
        this.shortCuts = val
      },
      immediate: true,
    },
  },
}
</script>

<style scoped>
.left-block {
  transition-duration: 0.3s;
}
.left-block:hover {
  background-color: #7a7a7a30;
  cursor: pointer;
  transition-duration: 0.1s;
}

.edit {
  display: none;
}

.bottom:hover .edit {
  display: block;
}
</style>
