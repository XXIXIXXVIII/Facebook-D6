<template lang="">
  <div class="w-[88%] mx-auto mt-8 flex gap-5 items-start justify-start">
    <div v-if="showCreateDetail">
      <CreatePostDetail1 @update:showCreateDetail="handleShowCreateDetail" />
    </div>
    <div class="w-3/5 bg-white shadowWrap rounded-lg p-5">
      <div class="flex items-center justify-between">
        <div class="text-2xl font-bold">Nội dung</div>
        <div class="flex items-center gap-3">
          <button
            class="px-3 h-9 rounded-md bg-[#E7F3FF] text-[#1877F2] font-medium text-[15px] hover:bg-slate-200 flex items-center gap-2"
          >
            90 ngày qua
            <i
              style="
                background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/PtCL9OtdbVg.png');
                background-position: 0px -160px;
                background-size: 22px 322px;
                width: 16px;
                height: 16px;
                background-repeat: no-repeat;
                display: inline-block;
                filter: invert(50%);
              "
            ></i>
          </button>

          <button
            class="px-3 h-9 rounded-md bg-[#E7F3FF] text-[#1877F2] font-medium text-[15px] hover:bg-slate-200 flex items-center gap-2"
          >
            Ngày
            <i
              style="
                background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/PtCL9OtdbVg.png');
                background-position: 0px -160px;
                background-size: 22px 322px;
                width: 16px;
                height: 16px;
                background-repeat: no-repeat;
                display: inline-block;
                filter: invert(50%);
              "
            ></i>
          </button>
        </div>
      </div>
      <div class="border-b border-gray-200 py-2"></div>
      <div class="">
        <!-- ==========item============= -->
        <div
          class="p-2 rounded-lg hover:bg-gray-200 cursor-pointer flex items-center justify-between"
        >
          <div class="flex items-center gap-2">
            <div
              class="w-16 h-16 rounded-md flex items-center justify-center overflow-hidden"
            >
              <img
                class="w-full h-full object-cover"
                src="https://kenh14cdn.com/2020/6/15/h12-15663026122221511972312-1592182216886970835768.jpg"
              />
            </div>
            <div>
              <div class="text-[13px] font-medium">22222</div>
              <div class="text-[13px] text-[#67636B]">T2, 28 tháng 8</div>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="flex flex-col justify-end items-end">
              <div class="text-[13px]">Số người bài viết tiếp cận</div>
              <div class="font-medium">441</div>
            </div>
            <div class="flex flex-col justify-end items-end">
              <div class="text-[13px]">Lượt tương tác</div>
              <div class="font-medium">--</div>
            </div>
          </div>
        </div>

        <div
          class="p-2 rounded-lg hover:bg-gray-200 cursor-pointer flex items-center justify-between"
        >
          <div class="flex items-center gap-2">
            <div
              class="w-16 h-16 rounded-md flex items-center justify-center overflow-hidden"
            >
              <img
                class="w-full h-full object-cover"
                src="https://kenh14cdn.com/2020/6/15/h12-15663026122221511972312-1592182216886970835768.jpg"
              />
            </div>
            <div>
              <div class="text-[13px] font-medium">22222</div>
              <div class="text-[13px] text-[#67636B]">T2, 28 tháng 8</div>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="flex flex-col justify-end items-end">
              <div class="text-[13px]">Số người bài viết tiếp cận</div>
              <div class="font-medium">441</div>
            </div>
            <div class="flex flex-col justify-end items-end">
              <div class="text-[13px]">Lượt tương tác</div>
              <div class="font-medium">--</div>
            </div>
          </div>
        </div>

        <!-- ==========item============= -->

        <button
          class="w-full h-9 rounded-md bg-[#E7F3FF] font-medium flex items-center justify-center mt-2 text-blue-500 hover:bg-slate-200"
        >
          Xem thêm
        </button>
      </div>
    </div>
    <div class="w-2/5 bg p-2 bg-white shadowWrap rounded-lg">
      <button class="font-semibold text-[15px] text-white bg-[#1B74E4] flex items-center justify-center w-full h-9 rounded-lg gap-2" @click="showCreateDetail=true">
        <i
          style="
            background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/Mjnp8b3hCAg.png');
            background-position: -18px -494px;
            background-size: 38px 548px;
            width: 16px;
            height: 16px;
            background-repeat: no-repeat;
            display: inline-block;
            filter: invert(100%)
          "
        ></i>
        Tạo bài viết
      </button>
    </div>
  </div>
</template>
<script>
import CreatePostDetail1 from '../../../components/post/CreatedPost/CreatePostDetail1.vue'
export default {
  components: { CreatePostDetail1 },
  layout: 'professionalDashboard',
  data() {
    return {
      showCreateDetail: false,
    }
  },
  methods: {
    handleShowCreateDetail(value) {
      this.showCreateDetail = value
    },
  },
}
</script>
<style scoped lang="css">
.shadowWrap {
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}
</style>
