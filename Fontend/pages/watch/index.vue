<template lang="">
  <div>
    <div v-for="video in listVideos" :key="video.id">
      <VideoDetail :video="video"/>
    </div>
  </div>
</template>
<script>
import { RepositoryFactory } from '../../apiConfig/RepositoryFactory'
import VideoDetail from '../../components/watch/VideoDetail.vue'

const postRepository = RepositoryFactory.get('posts')
export default {
  name: 'Watch',
  components: { VideoDetail },
  layout: 'watch',
  data() {
    return {
      user: null,
      listVideos: null,
    }
  },
  watch: {
    '$store.state.authModule.user': {
      handler(val) {
        console.log(val)
        this.user = val
      },
      immediate: true,
      deep: true,
    },
  },
  created() {
    this.fetchData()
  },

  methods: {
    async fetchData() {
      const result = await postRepository.getVideosPage({
        userId: this.user.user_id,
      })
      console.log(result.data.postsWithReactions)
      this.listVideos = result.data.postsWithReactions
    },
  },
}
</script>
<style lang=""></style>
