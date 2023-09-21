<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="w-1/2 h-full relative" @click="handleStory">
    <div
      class="h-[85%] gap-1 active:bg-[#eaebed] font-semibold flex justify-center items-center cursor-pointer dark:hover:bg-[#56585a] mt-1 rounded-md"
      :class="isStory ? 'text-blue-600' : ''"
    >
      <span v-if="isStory" v-html="imgStoryBlue"></span>
      <span v-else v-html="imgStory"></span>
      <span class="dark:text-white">Stories</span>
    </div>
    <div v-if="isStory" class="bottom-story"></div>
  </div>
</template>

<script>
import { imgStory, imgStoryBlue } from '../../../../assets/img/svg'
export default {
  name: 'ActiveStory',
  props: {
    isStory: {
      type: Boolean,
      require: true,
    },
  },
  data: () => {
    return {
      imgStory,
      imgStoryBlue,
    }
  },

  methods: {
    handleStory() {
      return this.$emit('handle-story')
    },
  },
}
</script>

<style></style>
