<template lang="">
  <div class="">
    <div v-if="showPostDetail">
      <PostDetail :post="post" @showPostDetailt="handleShowPostDetailt" />
    </div>
    <div
      v-if="post.title === 'Gợi ý'"
      class="px-4 pt-4 pb-2 text-[15px] text-[#65676B] font-medium"
    >
    {{$t('home.goiy')}}
      <div class="w-full mx-auto border-b border-gray-300 mt-4"></div>
    </div>
    <HeaderExternalPost :post="post" />

    <div
      v-if="post?.background"
      class="w-full h-[410px] bg-cover bg-center flex items-center justify-center text-center"
      :style="{ backgroundImage: post?.background }"
    >
      <div
        class="px-4 pt-1 pb-4 text-white font-semibold text-3xl flex items-center justify-center text-center"
        v-html="post.content"
      ></div>
    </div>
    <div v-else>
      <div
        class="px-4 pt-1 pb-4 text-base dark:text-[#E4E6EB]"
        v-html="post.content"
      ></div>
    </div>

    <div>
      <ArrangePhotos
        :list-images="listImages"
        :list-videos="listVideos"
        height="700"
      />
    </div>

    <div class="mx-4 py-3 flex items-center justify-between">
      <div class="flex gap-4">
        <div class="flex items-center -gap-1">
          <div
            v-for="(icon, index) in threeLike"
            :key="index"
            :class="{ '-ml-[6px]': index > 0 }"
            :style="{ zIndex: 8 - index }"
          >
            <div
              v-if="icon.user_id.length > 0"
              class="w-[22px] h-[22px] flex items-center justify-center border-2 border-white rounded-full relative"
            >
              <img class="w-full h-full object-cover" :src="icon.icon" />
            </div>
          </div>
        </div>
        <div
          v-if="totalLike > 0"
          class="text-[#65676B] text-[15px] hover:underline cursor-pointer"
        >
          {{ totalLike }}
        </div>
      </div>
      <div class="flex items-center gap-4">
        <div class="text-[#65676B] text-sm hover:underline cursor-pointer">
          {{ comments.length }} {{$t('home.comment1')}}
        </div>
        <div class="text-[#65676B] text-sm hover:underline cursor-pointer">
          3 {{$t('home.share1')}}
        </div>
      </div>
    </div>

    <div class="mx-3 border-t dark:border-[#65676B] :border-[#3E4042]">
      <div class="relative grid grid-cols-3 items-center justify-between h-11">
        <LikeButton :post="post" @addLike="addLike" @Unlike="Unlike" />

        <div
          class="text-[#65676B] text-[15px] font-semibold flex items-center gap-2 justify-center hover:bg-gray-200 py-2 rounded cursor-pointer"
        >
          <div class="font-semibold flex items-center justify-center">
            <i
              data-visualcompletion="css-img"
              class="x1b0d499 x1d69dk1"
              style="
                background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yZ/r/WoftRVRTwaO.png');
                background-position: -170px -62px;
                background-size: 190px 204px;
                width: 18px;
                height: 18px;
                background-repeat: no-repeat;
                display: inline-block;
                filter: invert(40%);
              "
            ></i>
          </div>
          <div>{{$t('home.comment')}}</div>
        </div>

        <div
          class="text-[#65676B] text-[15px] font-semibold flex items-center gap-2 justify-center hover:bg-gray-200 py-2 rounded cursor-pointer"
        >
          <div class="font-semibold flex items-center justify-center">
            <i
              style="
                background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yZ/r/WoftRVRTwaO.png');
                background-position: -150px -132px;
                background-size: 190px 204px;
                width: 18px;
                height: 18px;
                background-repeat: no-repeat;
                display: inline-block;
                filter: invert(40%);
              "
            ></i>
          </div>
          <div>{{$t('home.share')}}</div>
        </div>
      </div>
    </div>

    <div class="mb-2">
      <div
        v-if="!showRecomment"
        class="mx-4 text-[#65676B] text-[15px] font-medium cursor-pointer hover:underline dark:text-[#B0B3B8]"
        @click="showPostDetail = true"
      >
      {{$t('home.moreComment')}}
      </div>
      <div v-for="(comment, index) in comments.slice(0, 1)" :key="index">
        <CommentDetail
          :comment="comment"
          @showPostDetail="showPostDetail = true"
        />
      </div>

      <div class="p-4 pt-1">
        <InputComment @addMess="addMess" />
      </div>
    </div>
  </div>
</template>
<script>
import { socket } from '../../plugins/socket.io'
import { staticIcon } from '../../utils/createPost/iconLikePost'
import { RepositoryFactory } from '../../apiConfig/RepositoryFactory'
import PostDetail from '../../components/post/PostDetail.vue'
import ArrangePhotos from './ArrangePhotos.vue'
import HeaderExternalPost from './HeaderExternalPost.vue'
import LikeButton from './LikeButton.vue'
import InputComment from './InputComment.vue'
import CommentDetail from './CommentDetail'
const postsRepository = RepositoryFactory.get('posts')

export default {
  name: 'ExternalPost',
  components: {
    ArrangePhotos,
    HeaderExternalPost,
    LikeButton,
    InputComment,
    CommentDetail,
    PostDetail,
  },
  middleware: 'darkMode',
  props: {
    post: {
      type: Object,
      default: () => ({
        background: '',
        content: '',
      }),
    },
    isGroups: {
      type: Boolean,
    },
  },

  data() {
    return {
      list: [
        'https://thibanglaixemay360.com/wp-content/uploads/2023/05/a4dd8599ac65f84eebce0091404a6ee4.jpg',
      ],
      showFiveIconLike: false,
      staticIcon,
      showSetting: false,
      totalLike: 0,
      listImages: [],
      listVideos: [],
      checkLike: false,
      postCopy: null,
      threeLike: [],
      comments: [],
      showPostDetail: false,
      user: null,
      firstPost: null,
      userId: null,
      showRecomment: false,
    }
  },

  watch: {
    post: {
      handler: 'handleListMedia',
      deep: true,
      immediate: true,
    },
    postCopy: {
      handler: 'handleThreeLike',
      deep: true,
    },

    '$store.state.authModule.user': {
      handler(val) {
        this.user = val
        this.userId = val.user_id
      },
      deep: true,
      immediate: true,
    },
  },

  created() {
    this.postCopy = this.post.reactions

    this.fetchGetComment()
    this.firstPost = this.post
    console.log(this.post)

    this.post.reactions.forEach((item) => {
      this.totalLike = item.user_id.length + this.totalLike
    })
    this.checkLike = this.post.reactions.some((item) =>
      item.user_id.some((item) => +item === +this.userId)
    )
    this.handleThreeLike()
  },

  methods: {
    handleListMedia() {
      this.postCopy = this.post.reactions
      this.post.media?.forEach((item) => {
        if (item.media_type === 'image') {
          this.listImages.push({ url: item.url, postId: item.post_id })
        }
        if (item.media_type === 'video') {
          this.listVideos.push({ url: item.url, postId: item.post_id })
        }
      })
    },
    addLike(icon) {
      socket.emit('react_post_notification', {
        postId: this.post.post_id,
        ownerId: this.userId,
        ownerAction: icon.name,
      })
      console.log(icon.name)

      if (!this.checkLike) {
        this.totalLike += 1
        this.checkLike = true
      }

      this.postCopy = this.postCopy.map((reaction) => {
        const userIndex = reaction.user_id.indexOf(this.userId)
        if (userIndex > -1) {
          reaction.user_id.splice(userIndex, 1)
        }
        if (reaction.type === icon.name) {
          reaction.user_id.push(this.userId)
        }
        return reaction
      })
    },
    Unlike() {
      this.totalLike = this.totalLike - 1
      this.threeLike = this.threeLike.map((item) =>
        item.user_id.filter((item) => item !== this.userId)
      )
    },

    handleThreeLike() {
      const result = staticIcon.map((item) => {
        const matchingIcon = this.postCopy.find(
          (icon) => icon.type === item.name
        )
        return { ...item, ...matchingIcon }
      })
      this.threeLike = result
        .sort((a, b) => b.user_id.length - a.user_id.length)
        .slice(0, 3)
    },
    async addMess({ value, innerText }) {
      const res = await postsRepository.createComment({
        commentValue: value,
        postId: this.post.post_id,
        userId: this.userId,
      })
      socket.emit('comment_notification', {
        commentId: res.data.id,
        postId: this.post.post_id,
      })
      console.log('comment ===> ', res.data)
      this.fetchGetComment()
    },

    async fetchGetComment() {
      const result = await postsRepository.getComment({
        postId: this.post.post_id,
      })
      this.comments = result.data.allComments
    },

    handleShowPostDetailt(value) {
      this.showPostDetail = value
    },
  },
}
</script>
<style scoped lang="css"></style>
