<template>
  <div
    class="w-[360px] sticky top-0 left-0 bottom-0 flex flex-col bg-white wp-sidebar h-screen"
  >
    <div class="mx-4 mt-5 nb-3">
      <p class="text-sm opacity-80">Create a reel</p>
      <h1 class="font-bold text-2xl">Upload video</h1>
    </div>
    <div class="">
      <label v-if="isDescribe" for="describe" class="wpTextarea">
        <textarea
          id="describe"
          v-model="describe"
          placeholder="Describe..."
        ></textarea>
      </label>
      <label v-else for="video" class="label-video">
        <div class="wp-content-video">
          <div class="wp-icon-video">
            <div class="icon-video"></div>
          </div>
          <p class="font-semibold text-xl">Add video</p>
          <p class="text-sm opacity-80">or drag and drop</p>
        </div>
        <input
          id="video"
          type="file"
          accept="video/*"
          hidden
          @change="changeVideo"
        />
      </label>
    </div>
    <div class="wp-bottom-side-video">
      <div v-if="checkTime" class="flex gap-2 my-0 mx-auto w-[80%]">
        <div class="danger-video"></div>
        <p class="text-red-500">Video cannot exceed 60 seconds.</p>
      </div>
      <div class="wp-side-video">
        <div style="background-color: #1b74e4"></div>
        <div :style="{ backgroundColor: isDescribe ? '#1b74e4' : '' }"></div>
      </div>
      <div class="wp-btn-reels">
        <button v-if="isVideo || checkTime" class="btn-previous" @click="handlePrevious">
          Previous
        </button>
        <button
          class="btn-next"
          :disabled="!isVideo"
          :style="{
            backgroundColor: isVideo ? '#1b74e4' : '',
            color: isVideo ? 'white' : '',
          }"
          @click="handleReels"
        >
          <div v-if="isLoading" :class="{ ringLoading: isLoading }"></div>
          <p v-else>Next</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    isVideo: {
      type: Boolean,
      require: true,
    },
    isDescribe: {
      type: Boolean,
      require: true,
    },
    isLoading: {
      type: Boolean,
      require: true,
    },
    checkTime: {
      type: Boolean,
      require: true,
    },
    // eslint-disable-next-line vue/require-default-prop
  },
  data() {
    return {
      describe: '',
    }
  },
  watch: {
    describe() {
      this.$emit('describe', this.describe)
    },
  },
  methods: {
    changeVideo(event) {
      const file = event.target.files[0]
      this.$emit('change-video', file)
    },
    handlePrevious() {
      this.$emit('handle-previous')
    },
    handleReels() {
      this.$emit('handle-reels')
    },
  },
}
</script>

<style lang="scss" scoped>
.wp-sidebar {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  .label-video {
    margin: 15px 12px;
    border: 1px solid #cacaca;
    width: 336px;
    height: 240px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    .wp-content-video {
      display: flex;
      flex-direction: column;
      align-items: center;
      .wp-icon-video {
        width: 40px;
        background-color: #e4e6eb;
        height: 40px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon-video {
          background-image: url(../../../assets/img/img-list-icon-video.png);
          background-position: -22px -208px;
          background-size: 74px 434px;
          width: 20px;
          height: 20px;
          background-repeat: no-repeat;
          display: inline-block;
        }
      }
    }
  }
  .wpTextarea {
    display: block;
    border-radius: 5px;
    border: 1px solid #ced0d4;
    padding: 4px;
    height: 140px;
    margin: 15px 12px;
    textarea {
      width: 100%;
      height: 100%;
      outline: none;
      font-size: 14px;
    }
  }
  .wp-bottom-side-video {
    position: relative;
    background-color: white;
    padding: 16px 12px 20px 12px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    position: absolute;
    width: 360px;
    bottom: 0;
    z-index: 10;
    .danger-video {
      background-image: url(/_nuxt/assets/img/icon-FaceBook.png);
      background-position: -122px -62px;
      background-size: 190px 182px;
      width: 20px;
      height: 20px;
      background-repeat: no-repeat;
      display: inline-block;
      filter: hue-rotate(90deg);
      -webkit-filter: invert(25%) sepia(33%) saturate(200%) saturate(200%)
        saturate(200%) saturate(200%) saturate(200%) saturate(200%)
        saturate(110%) hue-rotate(345deg) brightness(132%) contrast(96%);
    }

    .wp-side-video {
      display: flex;
      justify-content: space-between;
      align-items: center;
      div {
        width: 49%;
        height: 8px;
        border-radius: 4px;
        background-color: #f0f2f5;
      }
    }
    .wp-btn-reels {
      display: flex;
      gap: 10px;
      button {
        width: 100%;
        height: 40px;
        color: #85878b;
        background-color: #e4e6eb;
        margin-top: 4px;
        text-align: center;
        line-height: 40px;
        font-weight: bold;
        border-radius: 10px;
      }
    }
    .ringLoading {
      width: 20px;
      height: 20px;
      opacity: 0.8;
      border-radius: 50%;
      border: 3px solid white;
      margin: 0 auto;
      border-right: 3px solid transparent;
      border-left: 3px solid transparent;
      animation: spinner 1s infinite linear;
      @keyframes spinner {
        to {
          transform: rotate(360deg);
        }
      }
    }
  }
}
</style>
