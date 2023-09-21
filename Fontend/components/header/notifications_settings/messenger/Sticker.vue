<template>
  <div class="w-full h-full">
    <div
      v-if="stickers"
      style="border-bottom: 1px solid rgb(220, 220, 220)"
      class="w-full h-[43px] flex ml-1 mr-1 relative"
    >
      <!-- Nút sang trái -->
      <div
        style="border-right: 1px solid rgb(220, 220, 220)"
        class="absolute flex justify-center items-center mr-1 h-full"
        @click.stop="handleLeftSlice"
      >
        <i
          class="_5r84 img"
          alt=""
          data-visualcompletion="css-img"
          style="
            background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/y_/r/16OHq4dI4ny.png');
            background-position: 0px -82px;
            background-size: 82px 174px;
            width: 24px;
            height: 24px;
            background-repeat: no-repeat;
            display: inline-block;
          "
        ></i>
      </div>
      <!-- Chủ đề -->
      <div class="flex ml-[29px]">
        <div
          v-for="(sticker, sessionIndex) in stickers.slice(sliceOne, sliceTwo)"
          :key="sessionIndex"
          :style="{
            backgroundColor:
              stickerType != sticker.name ? 'transparent' : 'rgb(226 232 240)',
          }"
          class="w-[40px] h-[40px] flex justify-center items-center rounded-md cursor-pointer"
          @click="() => (stickerType = sticker.name)"
        >
          <img class="w-[25px] h-[25px]" :src="sticker.images[2]" alt="" />
        </div>
      </div>

      <!-- Nút sang phải -->
      <div
        style="border-left: 1px solid rgb(220, 220, 220)"
        class="absolute flex justify-center items-center ml-1 h-full right-2"
        @click.stop="handleRightSlice"
      >
        <i
          class="_5r84 img"
          alt=""
          data-visualcompletion="css-img"
          style="
            background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/y_/r/16OHq4dI4ny.png');
            background-position: -26px -82px;
            background-size: 82px 174px;
            width: 24px;
            height: 24px;
            background-repeat: no-repeat;
            display: inline-block;
          "
        ></i>
      </div>
    </div>
    <!--  -->
    <div v-for="(sticker, stickerIndex) in stickers" :key="stickerIndex">
      <div
        v-if="stickerType === sticker.name"
        class="grid grid-cols-4 gap-[2px] p-1 w-full h-[300px] overflow-y-auto"
      >
        <div
          v-for="(image, imageIndex) in sticker.images"
          :key="imageIndex"
          class="sticker w-[64px] h-[64px] rounded-md cursor-pointer hover:bg-slate-200"
          @click="handleSendSticker(image)"
        >
          <img class="w-full h-full" :src="image" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { stickers } from '../../../../utils/messenger/sticker'
export default {
  name: 'StickerVue',
  data() {
    return {
      stickers,
      stickerType: 'Hyper Usagi',
      sliceOne: 0,
      sliceTwo: 5,
      mySticker: undefined,
    }
  },
  methods: {
    handleLeftSlice() {
      if (this.sliceOne > 0) {
        this.sliceOne = this.sliceOne - 5
        this.sliceTwo = this.sliceTwo - 5
      }
      console.log('kakaka')
    },

    handleRightSlice() {
      if (this.stickers.length >= this.sliceTwo) {
        this.sliceOne = this.sliceOne + 5
        this.sliceTwo = this.sliceTwo + 5
      }
      console.log('kakaka2')
    },

    handleSendSticker(value) {
      this.mySticker = value
      this.$emit('handle-send-sticker', this.mySticker)
    },
  },
}
</script>

<style scoped></style>
