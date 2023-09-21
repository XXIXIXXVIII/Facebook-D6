<template>
  <div class="w-full p-1 rounded-lg relative">
    <label for="content" :class="{ wpTextarea: true, wpErrorTexarea: isEmpty }">
      <textarea
        id="content"
        v-model="contentStory"
        placeholder="Start typing"
      ></textarea>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-if="isEmpty" class="icon-danger"></div>
    </label>
  </div>
</template>

<script>
export default {
  name: 'TextareaStory',
  props: {
    isEmpty: {
      type: Boolean,
      require: true,
    },
  },
  data() {
    return {
      contentStory: '',
    }
  },
  watch: {
    contentStory() {
      this.$emit('text-changed', this.contentStory)
      if (this.contentStory) {
        this.$emit('empty-false', this.$props.isEmpty)
      } else {
        this.$emit('empty-true', this.$props.isEmpty)
      }
    },
  },
}
</script>

<style scoped>
.wpTextarea {
  display: block;
  border-radius: 5px;
  border: 1px solid #ced0d4;
  padding: 4px;
  height: 140px;
}
.wpTextarea:hover {
  border: 1px solid black;
}
.wpErrorTexarea {
  border: 1px solid red;
}
textarea {
  width: 100%;
  height: 100%;
  outline: none;
  font-size: 14px;
}
.icon-danger {
  position: absolute;
  top: 10px;
  right: 10px;
  background-image: url(/_nuxt/assets/img/icon-FaceBook.png);
  background-position: -122px -62px;
  background-size: 190px 182px;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  display: inline-block;
  filter: hue-rotate(90deg);
  -webkit-filter: invert(25%) sepia(33%) saturate(200%) saturate(200%)
    saturate(200%) saturate(200%) saturate(200%) saturate(200%) saturate(110%)
    hue-rotate(345deg) brightness(132%) contrast(96%);
}
</style>
