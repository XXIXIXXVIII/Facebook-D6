<template lang="">
  <div class="overflow-y-auto w-full h-full pb-10">
    <div>
      <div
        id="iconFace"
        ref="iconsFace"
        class="text-[#65676B] text-[13px] font-semibold ml-[6px] mb-1"
      >
        Mặt cười & hình người
      </div>
      <div class="pt-1 px-2 grid grid-cols-8 gap-2">
        <div
          v-for="(iconFace, index) in iconsFace"
          :key="index"
          class="w-[36px] h-[33px] rounded-md hover:bg-gray-200 flex items-center justify-center"
          @click="handlePickIcon(iconFace.urlIcon)"
        >
          <img
            height="30"
            width="30"
            alt="🤔"
            referrerpolicy="origin-when-cross-origin"
            :src="iconFace.urlIcon"
          />
        </div>
      </div>
    </div>
    <div>
      <div
        id="iconAnimal"
        ref="iconsAnimal"
        class="text-[#65676B] text-[13px] font-semibold mt-4 ml-[6px] mb-1"
      >
        Động vật & thiên nhiên
      </div>
      <div class="pt-1 px-2 grid grid-cols-8 gap-2">
        <div
          v-for="(iconAnimal, index) in iconsAnimal"
          :key="index"
          class="w-[36px] h-[33px] rounded-md hover:bg-gray-200 flex items-center justify-center"
        >
          <img
            height="30"
            width="30"
            alt="🤔"
            referrerpolicy="origin-when-cross-origin"
            :src="iconAnimal.urlIcon"
          />
        </div>
      </div>
    </div>
    <div class="w-full h-[40px] bg-white fixed bottom-0">
      <div class="relative flex items-center gap-4 mx-4 w-full h-full">
        <div class="absolute w-full h-[2px] bg-gray-300 top-0 -left-4"></div>
        <div class="iconFace" @click="scrolltoIconFace"></div>
        <div class="iconAnimal" @click="scrolltoIconAnimal"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { iconsFace, iconsAnimal } from '../../utils/createPost/icon'
export default {
  name: 'ListIcon',
  props: {
    showIcon: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      iconsFace,
      iconsAnimal,
    }
  },
  methods: {
    scrolltoIconFace() {
      this.$refs.iconsFace.scrollIntoView({ behavior: 'smooth' })
    },
    scrolltoIconAnimal() {
      this.$refs.iconsAnimal.scrollIntoView({ behavior: 'smooth' })
    },
    handlePickIcon(url) {
      this.$emit('update:addIcon', url)
    },
  },
}
</script>
<style lang="css" scoped>
.iconFace {
  background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/ZmoMjCYR8zJ.png);
  background-position: 0px -454px;
  background-size: 26px 644px;
  width: 16px;
  height: 16px;
  background-repeat: no-repeat;
  display: inline-block;
}

.iconAnimal {
  background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yQ/r/n0-il_xfwOx.png);
  background-position: 0px -90px;
  background-size: 18px 144px;
  width: 16px;
  height: 16px;
  background-repeat: no-repeat;
  display: inline-block;
}
</style>
