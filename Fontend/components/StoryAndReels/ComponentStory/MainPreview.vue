<template>
  <div class="container-preview">
    <div class="wp-preview">
      <p class="title-preview">Preview</p>
      <div class="preview">
        <div class="background">
          <img :src="story.background" class="item-background" />
          <div
            v-if="story.contentStory"
            class="content-story"
            :style="{ fontFamily: story.fontFamily, color: story.textColor }"
          >
            {{ story.contentStory }}
          </div>
          <div
            v-else
            class="content-story"
            :style="{ fontFamily: story.fontFamily }"
          >
            Start typing
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    story: {
      type: Object,
      require: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.container-preview {
  width: 100%;
  height: 100%;
  .wp-preview {
    background-color: white;
    margin: 32px 24px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
    padding: 20px;
    display: flex;
    justify-items: center;
    flex-direction: column;
    border-radius: 8px;
    gap: 5px;
    .title-preview {
      font-weight: 500;
    }
    .preview {
      width: 100%;
      height: 100%;
      border-radius: 8px;
      background-color: black;
      .background {
        position: relative;
        margin: 4px auto;
        width: 220px;
        height: 400px;
        border-radius: 8px;
        .item-background {
          width: 220px;
          height: 400px;
          object-fit: cover;
          border-radius: 8px;
        }
        .content-story {
          position: absolute;
          color: white;
          top: 0;
          width: 220px;
          height: 100%;
          font-weight: bold;
          padding: 0 28px;
          word-break: break-word;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
