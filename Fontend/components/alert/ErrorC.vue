<template lang="">
      <div v-if="title" class=" min-w-[300px] bg-[#FCE8DB] rounded-lg border border-[#EF665B] px-4 py-5">
      <div class="w-full flex gap-2">
         <div class="w[30px] h-[30px] overflow-hidden">
           <img src="../../assets//user_detail_img/error.png" class="w-full h-full">
         </div>
         <div class="font-medium text-sm text-[#71192F] mt-1">
          {{title}}
         </div>
      </div>
    </div>
</template>
<script>
export default {
  name: "ErrorAlert",
  props: {
    title:{
      type: String,
      default: ""
    }
  },
  watch: {
    title(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.$store.dispatch('resetError')
        }, 3000);  
      }
    },
  },

}
</script>
<style lang="">
  
</style>