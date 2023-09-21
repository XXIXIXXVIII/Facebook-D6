<template lang="">
  <div>
    <div
      class="px-[10px] py-1 bg-[#E7F3FF] rounded-md text-[hsl(214,89%,52%)] font-medium w-fit flex items-center mb-6"
    >
      <div>{{ typeWork }}</div>
      <div class="w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-100 cursor-pointer" @click="handleBack">
        <div class="w-3 h-3 flex items-center justify-center overflow-hidden">
          <img class="w-full h-full object-cover" src="https://static.vecteezy.com/system/resources/previews/021/815/445/original/cross-close-icon-free-png.png"/>
        </div>
      </div>
    </div>
    <div>
      <div
        v-for="(work, index) in data"
        :key="index"
        class="p-4 cursor-pointer rounded-lg hover:bg-gray-300 flex items-center gap-4"
        @click="handlePickWorkDetail(work)"
      >
        <div
          class="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center"
        >
          <div
            class="w-[50px] h-[50px] flex items-center justify-center overflow-hidden"
          >
            <img class="w-full h-full object-cover" :src="work.icon" />
          </div>
        </div>
        <div class="text-[15px] font-semibold">{{ work.title }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { congratulations } from '../../../utils/createPost/workingDefault'
export default {
  props: {
    typeWork: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      data: null,
      congratulations,
    }
  },
  watch: {
    typeWork: {
      handler(val) {
        if (val === 'đang chúc mừng...') {
          this.data = this.congratulations
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    handlePickWorkDetail(work) {
      work.typeWrap = this.typeWork.split('.')[0]
      console.log(work);
      this.$emit("handlePickWorkDetail", work)
    },
    handleBack(){
      this.$emit("handleBack")
    }
  },
}
</script>
<style lang=""></style>
