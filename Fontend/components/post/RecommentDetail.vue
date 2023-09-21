<template lang="">
      <div class="pl-4 pt-1 flex gap-2 my-1">
        <div class="w-8 h-8 rounded-full overflow-hidden">
          <img
            class="w-full h-full object-cover"
            :src="reComment.avatar"
          />
        </div>
        <div class="">
          <div class="px-3 py-1 bg-[#F0F2F5] rounded-2xl overflow-hidden">
            <div class="text-[13px] font-semibold">{{reComment.fullName}}</div>
            <div class="text-sm font-normal" v-html="reComment.content">
            </div>
          </div>
          <div class="flex">
            <div
              class="text-[#65676B] font-bold text-[11px] cursor-pointer hover:underline ml-3"
            >
              Thích
            </div>
            <div
              class="text-[#65676B] font-bold text-[11px] cursor-pointer hover:underline ml-3"
            >
              Phản hồi
            </div>
            <div
              class="text-[#65676B] font-bold text-[11px] cursor-pointer hover:underline ml-3"
            >
              Chia sẻ
            </div>
            <div
              class="text-[#65676B] text-[11px] cursor-pointer hover:underline ml-3"
            >
              {{reComment.created_at}}
            </div>
          </div>
        </div>
      </div>
</template>
<script>
export default {
  props:{
    reComment:{
      type:Object,
      default: ()=>{}
    }
  },
  created(){
    console.log(this.reComment);
  }
}
</script>
<style lang="">
  
</style>