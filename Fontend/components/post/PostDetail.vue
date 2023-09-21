<template lang="">
  <div>
    <div
      class="fixed w-[700px] h-[90%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden z-[61] rounded-xl bg-white border border-gray-200 shadow-xl"
    >
      <div class="relative">
        <div
          class="w-full h-[60px] bg-white fixed top-0 text-xl font-bold text-center flex justify-center items-center border-b border-gray-300 z-50"
        >
          Bài viết của {{ post.fullName }}
        </div>
        <div
          class="w-9 h-9 rounded-full flex items-center justify-center bg-[#E4E6EB] absolute right-5 top-4 hover:bg-gray-300 cursor-pointer z-[51]"
          @click="handleHidePostDetailt"
        >
          <svg
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            class="x1lliihq x1k90msu x2h7rmj x1qfuztq x198g3q0 x1qx5ct2 xw4jnvo"
            width="20"
            height="20"
          >
            <path
              d="M18.707 5.293a1 1 0 0 0-1.414 0L12 10.586 6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 1 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12l5.293-5.293a1 1 0 0 0 0-1.414z"
              fill="#050505"
            ></path>
          </svg>
        </div>
      </div>
      <div class="overflow-y-auto w-full h-full pt-[60px]">
        <qqqq2 :post="post" />
        <!-- <Icon /> -->
      </div>
    </div>
    <div
      class="fixed w-screen h-screen bg-[rgba(244,244,244,0.8)] top-0 left-0 z-[60]"
    ></div>
  </div>
</template>
<script>
import qqqq2 from './Mydo.vue'
// import Icon from './Icon.vue';
export default {
  components: { qqqq2 },
  props: {
    post: {
      type: Object,
      default: () => {},
    },
  },

  methods: {
    handleHidePostDetailt() {
      this.$emit('showPostDetailt', false)
    },
  },
}
</script>
<style lang=""></style>
