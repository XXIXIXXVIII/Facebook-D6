<template lang="">
  <div
    class="rounded-xl bg-white dark:bg-[#242526] dark:border-none border border-gray-200 shadow-xl w-full"
  >
    <div class="px-4 py-3">
      <div class="flex gap-2 items-center">
        <div
          class="w-10 h-10 flex items-center justify-end overflow-hidden rounded-full"
        >
          <img class="w-full h-full object-cover" :src="user?.avatar" />
        </div>
        <div
          class="px-4 py-2 dark:bg-[#3A3B3C] bg-[#f0f2f5] rounded-3xl cursor-pointer text-[17px] text-[#65676B] dark:text-[#B0B3B8] w-[90%]"
          @click="createPostDetail"
        >
          <span v-if="lang=='vi'">{{ user?.fullName }} {{$t('home.createPostContainerPlahoder')}} </span>
          <span v-if="lang=='en'"> {{$t('home.createPostContainerPlahoder')}} {{ user?.fullName }}?</span>
        </div>
      </div>
      <div
        class="flex justify-between items-center mt-3 p-2 border-t border-gray-300 dark:border-[rgba(255,255,255,.1)]"
      >
        <div
          class="text-[#65676B] dark:text-[#B0B3B8] flex gap-2 cursor-pointer font-semibold text-[15px] p-2"
        >
          <img
            class="w-6 h-6"
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yF/r/v1iF2605Cb5.png"
          /><span>{{$t('home.live')}}</span>
        </div>
        <div
          class="text-[#65676B] dark:text-[#B0B3B8] flex gap-2 cursor-pointer font-semibold text-[15px] p-2"
        >
          <img
            class="w-6 h-6"
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/a6OjkIIE-R0.png"
          /><span>{{$t('home.photo/video')}}</span>
        </div>
        <div
          class="text-[#65676B] dark:text-[#B0B3B8] flex gap-2 cursor-pointer font-semibold text-[15px] p-2"
        >
          <img
            class="w-6 h-6"
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/yMDS19UDsWe.png"
          /><span>{{$t('home.feeling')}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CreatePostContainer1',
  middleware: 'darkMode',
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      lang: ""
    }
  },
  created(){
    this.lang = JSON.parse(localStorage.getItem("lang"))
},
  methods: {
    createPostDetail() {
      this.$emit('update:showCreateDetail', true)
    },
  },
}
</script>
<style lang=""></style>
