<template lang="">
  <div class="flex h-screen">
    <div
      class="w-[76%] bg-black h-full flex items-center justify-center relative overflow-hidden"
    >
      <img class="h-full max-w-full object-cover" :src="post.media?.url" />
      <div
        class="absolute top-1/2 -translate-y-1/2 right-4 w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-400 cursor-pointer"
        @click="handleNext"
      >
        <i
          data-visualcompletion="css-img"
          class="x1b0d499 xep6ejk"
          style="
            background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/UMAvBmuqi-U.png');
            background-position: -138px -28px;
            background-size: 190px 200px;
            width: 24px;
            height: 24px;
            background-repeat: no-repeat;
            display: inline-block;
          "
        ></i>
      </div>
      <div
        class="absolute top-1/2 -translate-y-1/2 left-4 w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-400 cursor-pointer"
        @click="handlePrev"
      >
        <i
          style="
            background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/UMAvBmuqi-U.png');
            background-position: -86px -28px;
            background-size: 190px 200px;
            width: 24px;
            height: 24px;
            background-repeat: no-repeat;
            display: inline-block;
          "
        ></i>
      </div>
    </div>
    <div class="w-[24%] min-h-screen bg-white h-full">
      <div>
        <div
          class="mt-14 border-t border-gray-300 px-4 pt-3 flex items-center justify-between"
        >
          <div class="flex items-center gap-2">
            <i
              style="
                background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yh/r/w5HRkHSSN-4.png');
                background-position: 0px -260px;
                background-size: 26px 414px;
                width: 16px;
                height: 16px;
                background-repeat: no-repeat;
                display: inline-block;
                filter: invert(50%);
              "
            ></i>
            <span class="text-[#65676B] text-[13px]"
              >Ảnh này nằm trong một bài viết.
            </span>
          </div>
          <div class="text-[13px] cursor-pointer hover:underline font-semibold">
            Xem bài viết
          </div>
        </div>

        <div class="px-2 pt-4 pb-3">
          <HeaderExternalPost />
          <button
            class="bg-[#E4E6EB] font-semibold text-[15px] px-5 py-2 rounded-md ml-3 mt-2 inline-block"
          >
            Chỉnh sửa
          </button>
        </div>

        <div
          class="flex items-center justify-center px-4 border-t border-gray-300 mt-4"
        >
          <div class="w-1/2 border-b border-gray-300">
            <LikeButton :post="post" />
          </div>
          <div
            class="text-[#65676B] w-1/2 text-[15px] font-semibold flex items-center gap-2 justify-center hover:bg-gray-200 py-2 rounded cursor-pointer border-b border-gray-300"
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
            <div>Bình Luận</div>
          </div>
        </div>

        <div class="px-4 py-2 mt-1 flex items-start gap-2">
          <div
            class="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center"
          >
            <img
              class="w-full h-full object-cover"
              src="https://i.ex-cdn.com/mientay.giadinhonline.vn/files/content/2022/04/12/1-1047.jpg"
            />
          </div>
          <div class="w-[90%]"><InputComment /></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderExternalPost from '../../components/post/HeaderExternalPost.vue'
import LikeButton from '../../components/post/LikeButton.vue'
import InputComment from '../../components/post/InputComment.vue'
import { RepositoryFactory } from '../../apiConfig/RepositoryFactory'
const postRepository = RepositoryFactory.get('posts')

export default {
  components: { HeaderExternalPost, LikeButton, InputComment },
  layout: 'headerTransparent',
  data() {
    return {
      post: {},
      brothersPost: [],
      next: 0,
      prev: 0,
    }
  },
  computed: {
    param() {
      return this.$route.params.id
    },
    user() {
      return this.$store.state.authModule.user
    },
  },
  watch: {
    brothersPost: {
      handler: 'finIndex',
      deep: true,
    },
  },
  created() {
    this.fetchPost()
  },
  methods: {
    async fetchPost() {
      const result = await postRepository.getPost({
        postId: this.param,
        userId: this.user.user_id,
      })
      this.post = result.data.post
      this.brothersPost = result.data.brothersPost
    },
    finIndex() {
      const index = this.brothersPost.findIndex(
        (item) => +item.post_id === +this.param
      )

      if (index === this.brothersPost.length - 1) {
        this.next = this.brothersPost[0]
      } else {
        this.next = this.brothersPost[index + 1]
      }

      if (index === 0) {
        this.prev = this.brothersPost[this.brothersPost.length - 1]
      } else {
        this.prev = this.brothersPost[index - 1]
      }
    },
    handleNext() {
      this.$router.push(`/photo/${this.next.post_id}`)
    },
    handlePrev() {
      this.$router.push(`/photo/${this.prev.post_id}`)
    },
  },
}
</script>
<style lang=""></style>
