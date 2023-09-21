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
          <span v-if="nav === 'Cảm xúc'">Bạn đang cảm thấy thế nào?</span>
          <span v-if="nav === 'Hoạt động'">Bạn đang làm gì?</span>
          <div
            class="absolute cursor-pointer top-1/2 -translate-y-1/2 left-4 w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
            @click="handlePickFeeling"
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
      <div class="mt-[60px]">
        <div class="">
          <div
            class="text-[15px] font-semibold flex items-center justify-start h-[60px]"
          >
            <div
              :class="{ pick: nav === 'Cảm xúc' }"
              class="px-4 h-full flex items-center justify-center cursor-pointer w-fit"
              @click="nav = 'Cảm xúc'"
            >
              Cảm xúc
            </div>
            <div
              :class="{ pick: nav === 'Hoạt động' }"
              class="px-4 h-full flex items-center justify-center cursor-pointer w-fit"
              @click="nav = 'Hoạt động'"
            >
              Hoạt động
            </div>
          </div>
          <div
            v-if="nav === 'Cảm xúc'"
            class="grid grid-cols-2 p-2 max-h-[374px] overflow-y-auto"
          >
            <div
              v-for="(feeling, index) in feelings"
              :key="index"
              class="p-2 cursor-pointer rounded-lg hover:bg-gray-300 flex items-center gap-4"
              @click="handlePickFeeling(feeling)"
            >
              <div
                class="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center"
              >
                <div
                  class="w-5 h-5 flex items-center justify-center overflow-hidden"
                >
                  <img class="w-full h-full object-cover" :src="feeling.icon" />
                </div>
              </div>
              <div>{{ feeling.title }}</div>
            </div>
          </div>

          
          <div
            v-if="nav === 'Hoạt động'"
            class="p-2 max-h-[374px] overflow-y-auto"
          >
            <div v-show="!typeWork">
              <div
                v-for="(work, index) in works"
                :key="index"
                class="p-2 cursor-pointer rounded-lg hover:bg-gray-300 flex items-center justify-between gap-4"
                @click="handlePickWork(work)"
              >
                <div class="flex items-center gap-4">
                  <div
                    class="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center"
                  >
                    <div
                      class="w-5 h-5 flex items-center justify-center overflow-hidden"
                    >
                      <img class="w-full h-full object-cover" :src="work.icon" />
                    </div>
                  </div>
                  <div>{{ work.title }}</div>
                </div>
                <div>
                  <i
                    style="
                      background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yQ/r/shzFU_6ZHy9.png');
                      background-position: -44px -88px;
                      background-size: 190px 190px;
                      width: 20px;
                      height: 20px;
                      background-repeat: no-repeat;
                      display: inline-block;
                      filter: invert(50%)
                    "
                  ></i>
                </div>
              </div>
            </div>
                <div><DefaultWorks :type-work="typeWork" @handleBack="handleBack" @handlePickWorkDetail="handlePickWorkDetail"/></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { feelings } from '../../../utils/createPost/feeling'
import { works } from '../../../utils/createPost/work'
import DefaultWorks from './DefaultWorks.vue'
export default {
  components:{DefaultWorks}
  ,
  data() {
    return {
      feelings,
      works,
      nav: 'Cảm xúc',
      typeWork:'',
    }
  },

  methods: {
    handlePickFeeling(feeling) {
      this.$emit('pickFeeling', feeling)
    },
    handlePickWork(work){
      console.log( work.title);
      this.typeWork = work.title
    },
    handleBack(){
      this.typeWork=""
    },
    handlePickWorkDetail(data){
      this.$emit("handlePickWorkDetail", data)
      this.typeWork=""
    }
    
  },
}
</script>
<style scoped lang="css">
.wraper {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.pick {
  color: #1876f2;
  border-bottom: 3px solid #1876f2;
}
</style>
