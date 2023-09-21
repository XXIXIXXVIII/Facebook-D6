<template>
  <div class="container-preview-video">
    <div class="wp-preview-video">
      <p class="font-bold">Preview</p>
      <div class="wp-video overflow-hidden">
        <div v-if="isVideo" class="video-center">
          <video
            ref="videoPlayer"
            width="200"
            controls
            autoplay
            @loadedmetadata="getVideoDuration"
          >
            <source :src="dataReels.video" />
          </video>
        </div>
        <div v-else class="text-center">
          <p class="font-bold text-xl">Your video preview</p>
          <p>Upload your video in order to see a preview here.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    dataReels: {
      type: Object,
      require: true,
    },
    isVideo: {
      type: Boolean,
      require: true,
    },
  },
  data() {
    return {}
  },
  methods: {
    getVideoDuration() {
      const videoDuration = this.$refs.videoPlayer.duration
      this.$emit('video-duration', videoDuration)
    },
  },
}
</script>

<style lang="scss" scoped>
.container-preview-video {
  background-color: #f0f2f5;
  width: calc(100% - 360px);
  height: 100vh;
  .wp-preview-video {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    height: 80%;
    margin: 32px auto;
    width: 80%;

    .wp-video {
      background-color: #f0f2f5;
      margin: 4px 0;
      border: 1px solid #e5e5e5;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 95%;
      .video-center {
        width: 200px;
        overflow: hidden;
        border-radius: 10px;
      }
    }
  }
}
</style>
