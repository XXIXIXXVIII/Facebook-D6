<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="w-1/2 h-full relative" @click="handleReels">
    <div
      class="gap-1 h-[85%] flex active:bg-[#eaebed] font-semibold justify-center items-center cursor-pointer dark:hover:bg-[#56585a] mt-1 rounded-md"
      :class="isReels ? 'text-blue-600' : ''"
    >
      <span v-if="isReels" v-html="imgReelsBlue"></span>
      <span v-else  v-html="imgReels"></span>
      <span class="dark:text-white">Reels</span>
    </div>
    <div v-if="isReels" class="bottom-story"></div>
  </div>
</template>

<script>
import { imgReels, imgReelsBlue } from '../../../../assets/img/svg'
export default {
  name: 'ActiveReels',
  
  props: {
    isReels: {
      type: Boolean,
      require: false,
    },
  },

  data: () => {
    return {
      imgReels,
      imgReelsBlue,
    }
  },

  methods: {
    handleReels() {
      this.$emit('handle-reels')
    },
  },
}
</script>

<style></style>
