<template>
  <div>
    <div
      v-if="showModal"
      class="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-slate-50 opacity-70"
    ></div>
    <div
      v-if="showModal"
      style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px"
      class="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] bg-white rounded-lg"
    >
      <div>
        <div class="px-4 py-[10px] border-b border-gray-300 pt-1 mb-2">
          <div
            class="flex justify-end absolute right-[10px] top-3 w-6 h-6 cursor-pointer"
            @click="closeModal"
          >
            <img
              class="w-full h-full object-cover"
              src="../../../assets/loginImg/C6QZ-pcv3Bd.png"
            />
          </div>
          <div
            class="text-[#1c1e21] text-center text-[20px] leading-[38px] mb-0 font-bold"
          >
            Chỉnh sửa phần đáng chú ý
          </div>
        </div>
        <div class="scrollable-content max-h-[400px] overflow-y-auto">
          <div class="w-full px-7 py-4">
            <div class="flex justify-center">
            <i data-visualcompletion="css-img" class="" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/yM/r/Ql43NN0QN4C.png&quot;); background-position: 0px 0px; background-size: 336px 216px; width: 334px; height: 192px; background-repeat: no-repeat; display: inline-block;"></i>
          </div>
            <div class="text-center text-[#65676B] text-[15px]">Giới thiệu ảnh và tin bạn thích để tất cả bạn bè đều thấy.</div>
          </div>
        </div>
      </div>
      <div class="w-full px-3 py-4">
         <button class="w-full h-[40px] px-3 text-blue-400 bg-blue-50 hover:bg-blue-100 rounded-lg font-semibold">Thêm mới</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    showModal: Boolean,
  },
  methods: {
    closeModal() {
      this.$emit('close-modal') // Emit an event to parent component
    },
  },
}
</script>
<style>
  
</style>