<template>
  <div class="flex w-full justify-center mt-14 bg-[#f0f2f5] dark:bg-[#18191A] min-h-screen">
    <nav-left />
    <div class="mt-4">
      <div>
        <div class="px-8">
          <story-and-reels v-if="typeof user.user_id === 'number'" />
          <div class="">
            <CreatePostContainer1
              :user="user"
              @update:showCreateDetail="updateShowCreateDetail"
            />
          </div>
          <div v-if="showCreateDetail">
            <CreatePostDetail1
              @update:showCreateDetail="updateShowCreateDetail"
            />
          </div>
          <div
            v-for="post in dataPosts"
            :key="post.post_id"
            class="w-[576px] mt-4 rounded-xl bg-white dark:bg-[#242526] dark:border-none border border-gray-200 shadow-xl"
          >
            <ExternalPost :post="post" />
          </div>
        </div>
      </div>
    </div>

    <nav-right />
  </div>
</template>

<script>
import storyAndReels from '../components/StoryAndReels/StoryReels/StoryAndReels.vue'
import CreatePostContainer1 from '../components/post/CreatedPost/CreatePostContainer1.vue'
import CreatePostDetail1 from '../components/post/CreatedPost/CreatePostDetail1.vue'
import ExternalPost from '../components/post/ExternalPost.vue'
import NavLeft from '../components/navLeft/NavLeft.vue'
import NavRight from '../components/navRight/NavRight.vue'

import { RepositoryFactory } from '../apiConfig/RepositoryFactory'
export const postsRepository = RepositoryFactory.get('posts')
export default {
  name: 'Home',
  components: {
    storyAndReels,
    CreatePostContainer1,
    CreatePostDetail1,
    ExternalPost,
    NavLeft,
    NavRight,
  },
  layout: 'default',
  data() {
    return {
      showCreateDetail: false,
      page: 1,
      dataPosts: [],
      isLoading: false,
      user: null,
      idPost : 0,
      lang:""
    }
  },
  watch: {
    '$store.state.authModule.user': {
      handler(val) {
        this.user = val
        this.fetchPost()
        this.$store.dispatch('getAllFriends',{userId: this.user.user_id} )
      },
      immediate: true,
      deep: true,
    },

    '$store.state.postUserDetail.postId': {
      handler(val) {
        this.idPost = val
        this.dataPosts.filter((post) => post.this.post_id !== this.idPost)
      },
      immediate : true,
      deep: true,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleLoading)
  },
  created(){
    this.lang = JSON.parse(localStorage.getItem("lang"))
  },
  methods: {
    updateShowCreateDetail(newValue) {
      this.showCreateDetail = newValue
    },

    async fetchPostScroll() {
      const result = await postsRepository.get({
        userId: this.user.user_id,
        page: this.page,
        check: this.user.check,
      })
      this.dataPosts = [...this.dataPosts, ...result.data]
      console.log(this.dataPosts)
    },
    async fetchPost() {
      const result = await postsRepository.get({
        userId: this.user.user_id,
        page: this.page,
        check: this.user.check,
      })
      this.dataPosts = result.data
    },
    handleLoading() {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        this.page += 1
        this.fetchPostScroll()
      }
    },

  },
}
</script>
<style scoped></style>
