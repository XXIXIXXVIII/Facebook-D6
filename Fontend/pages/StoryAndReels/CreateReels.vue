<template>
  <div class="flex relative">
    <!-- eslint-disable-next-line vue/attribute-hyphenation -->
    <input-video
      :is-video="isVideo"
      :is-describe="isDescribe"
      :data-reels="dataReels"
      :is-loading="isLoading"
      :check-time="checkTime"
      @change-video="onChangeVideo"
      @describe="onDescribe"
      @handle-reels="handleReels"
      @handle-previous="handlePrevious"
    />
    <view-video
      :is-video="isVideo"
      :data-reels="dataReels"
      @video-duration="videoDuration"
    />
  </div>
</template>

<script>
import axios from 'axios'
import { RepositoryFactory } from '../../apiConfig/RepositoryFactory'
import InputVideo from '../../components/StoryAndReels/ComponentReels/InputVideo.vue'
import ViewVideo from '../../components/StoryAndReels/ComponentReels/ViewVideo.vue'
const repositoryReels = RepositoryFactory.get('StoryAndReels')
export default {
  components: { InputVideo, ViewVideo },
  data() {
    return {
      isVideo: false,
      isDescribe: false,
      videoCloudinary: '',
      isLoading: false,
      checkTime: false,
      currenUser: this.$store.getters.getUser,
      dataReels: {
        video: undefined,
        describe: '',
      },
    }
  },
  methods: {
    onChangeVideo(file) {
      if (file) {
        this.videoCloudinary = file
        const previewVideo = file
        previewVideo.preview = URL.createObjectURL(previewVideo)
        this.dataReels.video = previewVideo.preview
        this.isVideo = true
        this.isDescribe = true
      }
    },
    onDescribe(describe) {
      this.dataReels.describe = describe
    },
    videoDuration(duration) {
      const durationVideo = Math.floor(duration)
      if (durationVideo > 60) {
        this.checkTime = true
        this.isVideo = false
      }
    },
    handlePrevious() {
      this.isVideo = false
      this.isDescribe = false
      this.checkTime = false
      URL.revokeObjectURL(this.dataReels.video)
    },
    async handleReels() {
      this.isLoading = true
      console.log(this.isVideo)
      const videoData = new FormData()
      videoData.append('file', this.videoCloudinary)
      videoData.append('upload_preset', 'dinoEnglish')
      try {
        const result = await axios.post(
          'https://api.cloudinary.com/v1_1/dlb1ac5xw/video/upload',
          videoData
        )
        const newReels = {
          type: 'Reels',
          content: this.dataReels.describe,
          background: result.data.secure_url,
          user_id: this.currenUser.user_id,
        }
        await repositoryReels.createStory(newReels)
        this.isLoading = false
        this.$router.push('/')
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss"></style>
