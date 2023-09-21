<template lang="">
  <div
    class="relative text-[#65676B] text-[15px] font-semibold flex items-center gap-2 justify-center hover:bg-gray-200 py-2 rounded cursor-pointer"
    @mouseover="showFiveIconLike = true"
    @mouseleave="showFiveIconLike = false"
   
  >
    <!-- ============= icon ===================== -->
    <div
      v-if="newPost.status === 'Unreact'"
      class="font-semibold flex items-center justify-center"
      
    >
      <i
        style="
          color: red;
          background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yZ/r/WoftRVRTwaO.png');
          background-position: -130px -132px;
          background-size: 190px 204px;
          width: 18px;
          height: 18px;
          background-repeat: no-repeat;
          display: inline-block;
          filter: invert(40%);
        "
      ></i>
    </div>

    <div
      v-if="newPost.status === 'like'"
      class="w-[18px] h-[18px] flex items-center justify-center overflow-hidden -ml-1 rounded-full"
    >
      <img class="w-full h-full object-cover" :src="staticIcon[0].icon" />
    </div>

    <div
      v-if="newPost.status === 'love'"
      class="w-[18px] h-[18px] flex items-center justify-center overflow-hidden -ml-1 rounded-full"
    >
      <img class="w-full h-full object-cover" :src="staticIcon[1].icon" />
    </div>

    <div
      v-if="newPost.status === 'dear'"
      class="w-[18px] h-[18px] flex items-center justify-center overflow-hidden -ml-1 rounded-full"
    >
      <img class="w-full h-full object-cover" :src="staticIcon[2].icon" />
    </div>

    <div
      v-if="newPost.status === 'haha'"
      class="w-[18px] h-[18px] flex items-center justify-center overflow-hidden -ml-1 rounded-full"
    >
      <img class="w-full h-full object-cover" :src="staticIcon[3].icon" />
    </div>

    <div
      v-if="newPost.status === 'wow'"
      class="w-[18px] h-[18px] flex items-center justify-center overflow-hidden -ml-1 rounded-full"
    >
      <img class="w-full h-full object-cover" :src="staticIcon[4].icon" />
    </div>

    <div
      v-if="newPost.status === 'sad'"
      class="w-[18px] h-[18px] flex items-center justify-center overflow-hidden -ml-1 rounded-full"
    >
      <img class="w-full h-full object-cover" :src="staticIcon[5].icon" />
    </div>
    <div
      v-if="newPost.status === 'angry'"
      class="w-[18px] h-[18px] flex items-center justify-center overflow-hidden -ml-1 rounded-full"
    >
      <img class="w-full h-full object-cover" :src="staticIcon[6].icon" />
    </div>
    <!-- ============= icon ===================== -->

    <!-- ============= title ===================== -->

    <div v-if="newPost.status === 'Unreact'" class="text-[15px]" @click="handleAddLike1">{{$t('home.like')}}</div>
    <div
      v-if="newPost.status === 'like'"
      class="text-[rgb(32,120,244)] font-semibold text-[15px]"
      @click="handleUnLike"
    >
    {{$t('home.like')}}
    </div>
    <div v-if="newPost.status === 'love'" class="text-[rgb(243,62,88)]" @click="handleUnLike">
      {{$t('home.love')}}
    </div>
    <div v-if="newPost.status === 'dear'" class="text-[rgb(247,177,37)]" @click="handleUnLike">
      {{$t('home.care')}}
    </div>
    <div v-if="newPost.status === 'haha'" class="text-[rgb(247,177,37)]" @click="handleUnLike">
      {{$t('home.haha')}}
    </div>
    <div v-if="newPost.status === 'wow'" class="text-[rgb(247,177,37)]" @click="handleUnLike">
      {{$t('home.wow')}}
    </div>
    <div v-if="newPost.status === 'sad'" class="text-[rgb(247,177,37)]" @click="handleUnLike">
      {{$t('home.sad')}}
    </div>
    <div v-if="newPost.status === 'angry'" class="text-[rgb(233,113,15)]" @click="handleUnLike">
      {{$t('home.angry')}}
    </div>

    <!-- ============= title ===================== -->
    <div
      v-if="showFiveIconLike"
      class="absolute z-30 -top-[48px] left-0 bg-white rounded-3xl shadow-xl border border-gray-300"
      @mouseover="showFiveIconLike = true"
      @mouseleave="showFiveIconLike = false"
    >
      <IconLikePost :id="post.post_id" @handleAddLike="handleAddLike" />
    </div>
  </div>
</template>
<script>
import { RepositoryFactory } from '../../apiConfig/RepositoryFactory'
import { staticIcon } from '../../utils/createPost/iconLikePost'
import IconLikePost from './IconLikePost.vue'
const likePostRepository = RepositoryFactory.get('likePostRepository')

export default {
  name: 'LikeButton',
  components: { IconLikePost },
  props: {
    post: {
      type: Object,
      default: () => ({
        status: '',
      }),
    },
  },
  data() {
    return {
      showFiveIconLike: false,
      staticIcon,
      newPost: {},
      user: null,
    }
  },
  watch: {
    post: {
      handler(val) {
        this.newPost = val
      },
      immediate: true,
      deep: true,
    },
    '$store.state.authModule.user': {
      handler(val) {
        this.user = val
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    handleAddLike(icon) {
      if (this.newPost.status === 'Unreact') {
        if (icon.name) {
          this.newPost.status = icon.name
        } else {
          icon.icon = '/_nuxt/assets/post/IconLike/like.gif'
          icon.name = 'like'
          icon.id = 1
          this.newPost.status = 'like'
        }

        this.$emit('addLike', icon)
      }

      if (this.newPost.status !== 'Unreact') {
        if (icon.name) {
          this.newPost.status = icon.name
          this.$emit('addLike', icon)
        } else {
          this.newPost.status = 'Unreact'
          likePostRepository.deleteLikePost({
            postId: this.newPost.post_id,
            userId: this.user.user_id,
          })
        }
      }
    },
    handleAddLike1() {
      this.newPost.status = "like"
      const icon = {
        name: 'like',
        icon: '/_nuxt/assets/post/IconLike/like.gif',
        id: 1,
      }
      
      likePostRepository.postLike({
        userId: this.user.user_id,
        postId: this.newPost.post_id,
        type: icon.name,
      })
      this.handleAddLike(icon)
    },

    handleUnLike(){
      likePostRepository.deleteLikePost({userId:this.user.user_id, postId:this.newPost.post_id})
      this.$emit("Unlike")
      this.newPost.status= "Unreact"
    }
  },
}
</script>
<style lang=""></style>
