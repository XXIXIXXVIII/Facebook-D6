<template>
  <div class="w-full min-h-screen flex flex-col items-center">
    <div class="w-[60%] min-w-[360px]">
      <div class="pt-5 text-[20px] font-bold">Trang mà {{ user.fullName }} quản lý</div>
      <div v-if="personalPageQuantity > 0" class="w-full">
        <div
          v-for="page in pages"
          :key="page.page_id"
          style="box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px"
          class="w-full bg-white mt-3 mb-3 p-4 rounded-lg"
        >
          <div class="flex items-center w-full mb-2">
            <div
              style="border: 1px solid rgb(221, 221, 221)"
              class="w-[60px] h-[60px] overflow-hidden rounded-full mr-5"
            >
              <img
                class="w-full h-full object-cover"
                :src="page.avatar"
                alt=""
              />
            </div>
            <div
              class="text-xl font-bold overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {{ page.fullName }}
            </div>
          </div>
          <div class="flex justify-between items-center w-full">
            <div
              style="box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px"
              class="w-[45%] min-w-[115px] h-[40px] text-[#1877f2] font-semibold bg-[#e7f3ff] flex justify-center items-center rounded-lg cursor-pointer hover:bg-blue-100"
            >
              + Tạo bài viết
            </div>
            <nuxt-link
              :to="`/${page.page_id}`"
              style="box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px"
              class="w-[45%] min-w-[145px] h-[40px] font-semibold bg-[#f0f2f5] flex justify-center items-center rounded-lg cursor-pointer hover:bg-slate-200"
            >
              Đến trang chi tiết
            </nuxt-link>
            <div
              style="box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px"
              class="w-[7%] min-w-[40px] h-[40px] font-semibold bg-[#f0f2f5] flex justify-center items-center rounded-lg cursor-pointer hover:bg-slate-200"
            >
              ...
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'layoutPage',
  data() {
    return {
      pages: null,
      personalPageQuantity: null,
      user: null
    }
  },
  watch: {
    '$store.state.authModule.pages': {
      handler(val) {
        this.pages = val
        this.personalPageQuantity = val.length
      },
      immediate: true,
      deep:true
    },
    '$store.state.authModule.currentUser': {
      handler(val) {
        this.user = val
      },
      immediate: true,
      deep:true
    },
  },
}
</script>

<style scoped></style>
