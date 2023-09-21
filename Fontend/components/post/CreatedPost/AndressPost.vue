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
          <span>Tìm kiếm vị trí</span>
          <div
            class="absolute cursor-pointer top-1/2 -translate-y-1/2 left-4 w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
            @click="handleBack"
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

      <div class="mt-[76px]">
        <div class="w-full px-4">
          <InputSearch
            placeholder="Bạn đang ở đâu"
            @handleSearch="handleSearch"
          />
        </div>
        <div class="px-2 max-h-[374px] overflow-y-auto mt-5">
          <div>
            <div
              v-for="(item, index) in andressSearch"
              :key="index"
              class="p-[6px] flex items-center gap-4 hover:bg-gray-200 rounded-md cursor-pointer"
              :class="{'pick':pickCheckIn===item.title }"
              @click="handlePickAndress(item)"
            >
              <div
                class="w-8 h-8 flex items-center justify-center rounded-2xl bg-gray-700 overflow-hidden"
              >
                <img
                  height="24"
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/yN/r/5AmCdexsMi-.png"
                  width="24"
                  alt=""
                />
              </div>
              <div class="flex flex-col">
                <div class="text-[15px] font-medium">{{ item.title }}</div>
                <div class="text-xs">{{ item.reTittle }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import InputSearch from '../../pages/InputSearch'
import { andress } from '../../../utils/createPost/andress'
export default {
  components: { InputSearch },
  props:{
    pickCheckIn:{
      type:String,
      default: ''
    }
  },
  data() {
    return {
      andress,
      andressSearch: [],
    }
  },
  watch: {
    andress: {
      handler(val) {
        this.andressSearch = val
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    handleBack() {
     this.$emit("backAndress")
    },
    handleSearch(value) {
      this.andressSearch = this.andress.filter((item) =>
        item.title.trim().toUpperCase().includes(value.trim().toUpperCase())
      )
    },
    handlePickAndress(andress){
      this.$emit("handleAndress", andress)
    }
  },
}
</script>
<style lang="css">
.pick{
  color: #1876F2
}
</style>