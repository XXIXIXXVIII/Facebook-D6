<template lang="">
  <div>
    <div
      class="fixed w-screen h-screen top-0 z-[80] bg-[rgba(244,244,244,0.8)]"
    ></div>
    <div
      class="wraper w-[500px] bg-white rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[81]"
    >
      <div class="fixed top-0 w-full">
        <div
          class="text-xl font-bold flex items-center justify-center w-full h-[60px] relative border-b border-gray-200"
        >
          Chọn phông nền
          <div
            class="absolute cursor-pointer top-1/2 -translate-y-1/2 left-4 w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
            @click="handlePickBg"
            >
            <i
              style="
                background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yQ/r/shzFU_6ZHy9.png');
                background-position: -52px -62px;
                background-size: 190px 190px;
                width: 20px;
                height: 20px;
                background-repeat: no-repeat;
                display: inline-block;
              "
            ></i>
          </div>
        </div>
      </div>
      <div class="mt-16">
        <div class="p-4">
          <div class="px-2 py-4 text-[17px] font-semibold">Phổ biến</div>
          <div class="grid grid-cols-5 gap-2">
            <div
              v-for="(bg, index) in moreBackGround"
              :key="index"
              :style="{ background: bg.represent }"
              class="w-20 h-20 rounded-lg overflow-hidden p-[5px] bg-cover cursor-pointer"
              @click="handlePickBg(bg)"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { moreBackGround } from '../../../utils/createPost/background'
export default {
  data() {
    return {
      moreBackGround,
    }
  },
  methods:{
    handlePickBg(bg){
      this.$emit('pickBgMore', bg)
    }
  }
}
</script>
<style scoped lang="css">
.wraper {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>
