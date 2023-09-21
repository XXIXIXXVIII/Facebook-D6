<template lang="">
  <div class="w-full px-4 pt-3 mb-4 relative">
    <div class="flex items-center gap-2">
      <div
        class="relative"
        @mouseover="showInAvatar = true"
        @mouseleave="showInAvatar = false"
      >
        <nuxt-link
          :to="`/${post.user_id}`"
          class="w-10 h-10 flex items-center justify-center overflow-hidden rounded-full"
        >
          <img
            class="w-full h-full object-cover cursor-pointer"
            :src="post.avatar"
          />
        </nuxt-link>

        <TippyAuthorVue v-if="showInAvatar" :post="post" />
      </div>

      <div class="relative w-[85%]">
        <div class="">
          <div class="text-[15px] font-normal dark:text-[#E4E6EB]">
            <span
              class="cursor-pointer hover:underline relative "
              @mouseover="showInFullName = true"
              @mouseleave="showInFullName = false"
              ><nuxt-link :to="`/${post.user_id}`" class="font-semibold">{{ post.fullName }}</nuxt-link>
              <TippyAuthorVue  v-if="showInFullName" :post="post" />
            </span>
            <span v-if="post.icon"
              >đang
              <img :src="post.icon" width="16px" height="16px" class="inline" />
              <span v-if="!post.typeWrap">cảm thấy {{ post.feeling }}</span>
              <span v-if="post.typeWrap"
                >{{ post.typeWrap.split(' ')[1] }} {{ post.feeling }}</span
              ></span
            >
            <span v-if="post.feeling==='Đã cập nhật ảnh đại diện.'" class='font-normal'
              >{{post.feeling}}
              </span
            >
            <span v-if="post.tags?.length > 0"
              ><span class="font-normal">cùng với</span>
              <span
                class="cursor-pointer hover:underline font-semibold"
                @click="showTag = true"
                @mouseover="showInAvatar0 = true"
                @mouseleave="showInAvatar0 = false"
                >{{ post.tags[0].fullName }}
        
                  <TippyAuthorVue v-if="showInAvatar0" :post="post.tags[0]" />
                 </span
            ></span>
            <span v-if="post.tags?.length > 0">
              <span v-for="(tag, index) in post.tags" :key="index"  class="cursor-pointer hover:underline font-semibold">
                <span v-if="index > 0">
                  <span class="font-normal">và</span>
                  <HeaderPostTagTippy :tag="tag" />
                </span>
              </span>
            </span>
            <span v-if="post.checkIn">tại <span  class="font-semibold">{{ post.checkIn }}</span></span>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute right-4 flex items-center gap-2 top-4">
      <div class="relative">
        <div
          class="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-200 cursor-pointer"
          @click="showSetting = !showSetting"
        >
          <img src="../../assets/post/threedot.svg" />
        </div>
        <div
          v-if="showSetting"
          class="settingPost absolute w-[344px] max-h-[594px] rounded-md bg-white right-0 z-10"
        >
          <SettingPost :post="post" />
        </div>
      </div>
      <div
        v-if="showDetele"
        class="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-200 cursor-pointer"
      >
        <i
          style="
            background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/LQN_b1yC9ub.png');
            background-position: -44px -110px;
            background-size: 190px 210px;
            width: 20px;
            height: 20px;
            background-repeat: no-repeat;
            display: inline-block;
          "
        ></i>
      </div>
    </div>
  </div>
</template>
<script>
import SettingPost from './CreatedPost/SettingPost.vue'
import HeaderPostTagTippy from './HeaderPostTagTippy.vue'
import TippyAuthorVue from './TippyAuthor.vue'

export default {
  name: 'HeaderExternalPost',
  components: { SettingPost, TippyAuthorVue, HeaderPostTagTippy },
  props: {
    post: {
      type: Object,
      default: () => ({
        avatar:
          'https://img6.thuthuatphanmem.vn/uploads/2022/11/18/anh-blackpink-rose-cute_021422109.jpg',
        fullName: 'Rose',
        createdAt: '7 giờ trước',
      }),
    },
    showDetele: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showSetting: false,
      showInFullName: false,
      showInAvatar: false,
      showInAvatar0: false,
    }
  },
  created() {
    console.log(this.post)
  },
}
</script>
<style scoped lang="css">
.settingPost {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}
</style>
