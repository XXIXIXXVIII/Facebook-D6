<template lang="">
  <div
    class="bg-white w-[500px] rounded-md overflow-hidden"
    style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px"
  >
    <div class="relative">
      <div
        class="fixed top-0 h-[60px] w-full flex items-center justify-center border-b border-gray-200"
      >
        <span class="text-[20px] font-bold">Đối tượng của bài viết</span>
      </div>
      <div class="absolute top-3 left-3 cursor-pointer" @click="handleBack">
        <div
          class="w-9 h-9 bg-[#E4E6EB] hover:bg-gray-300 rounded-full flex items-center justify-center"
        >
          <i
            data-visualcompletion="css-img"
            class="x1b0d499 x1d69dk1"
            style="
              background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/a0-jMUNGH_Q.png');
              background-position: -104px -62px;
              background-size: 190px 204px;
              width: 20px;
              height: 20px;
              background-repeat: no-repeat;
              display: inline-block;
            "
          ></i>
        </div>
      </div>
    </div>

    <div class="mt-[60px] overflow-y-auto">
      <div class="pt-5 pb-1">
        <div class="text-[17px] font-semibold px-4">
          Ai có thể xem bài viết của bạn?
        </div>
      </div>
      <div class="">
        <div class="px-4 pb-4 text-[#65676B] text-sm">
          Bài viết của bạn sẽ hiển thị ở Bảng feed, trang cá nhân và kết quả tìm
          kiếm.
        </div>
      </div>
      <div class="">
        <div class="px-4 pb-4 text-[#65676B] text-sm">
          Tuy đối tượng mặc định là Chỉ mình tôi, nhưng bạn có thể thay đổi đối
          tượng của riêng bài viết này.
        </div>
      </div>

      <div class="px-2">
        <label
          for="default-radio-1"
          class="px-2 rounded-md hover:bg-slate-100 cursor-pointer py-2 flex items-center justify-between"
        >
          <div class="flex items-center gap-2">
            <div
              class="w-[60px] h-[60px] rounded-full bg-[#E4E6EB] flex items-center justify-center mr-3"
            >
              <div class="w-6 h-6 flex items-center justify-center">
                <img
                  class="w-full h-full object-cover"
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/yT/r/0QOZ5Rw18zW.png"
                />
              </div>
            </div>
            <div>
              <div class="text-[17px] font-medium">Công khai</div>
              <div class="text-[#65676B] text-[15px]">
                Bất kỳ ai ở trên hoặc ngoài Facebook
              </div>
            </div>
          </div>
          <input
            id="default-radio-1"
            type="radio"
            :checked="typePostDefault === 'Công khai'"
            value=""
            name="default-radio"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
            @change="postType = 'Công khai'"
          />
        </label>

        <label
          for="default-radio-2"
          class="px-2 rounded-md hover:bg-slate-100 cursor-pointer py-2 flex items-center justify-between"
        >
          <div class="flex items-center gap-2">
            <div
              class="w-[60px] h-[60px] rounded-full bg-[#E4E6EB] flex items-center justify-center mr-3"
            >
              <div class="w-6 h-6 flex items-center justify-center">
                <img
                  class="w-full h-full object-cover"
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/ym/r/GgYVAS1o2Dp.png"
                />
              </div>
            </div>
            <div>
              <div class="text-[17px] font-medium">Bạn bè</div>
              <div class="text-[#65676B] text-[15px]">
                Bạn bè của bạn trên Facebook
              </div>
            </div>
          </div>

          <input
            id="default-radio-2"
            type="radio"
            :checked="typePostDefault === 'Bạn bè'"
            value=""
            name="default-radio"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
            @change="postType = 'Bạn bè'"
          />
        </label>

        <label
          for="default-radio-3"
          class="px-2 rounded-md hover:bg-slate-100 cursor-pointer py-2 flex items-center justify-between"
        >
          <div class="flex items-center gap-2">
            <div
              class="w-[60px] h-[60px] rounded-full bg-[#E4E6EB] flex items-center justify-center mr-3"
            >
              <div class="w-6 h-6 flex items-center justify-center">
                <img
                  class="w-full h-full object-cover"
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/yw/r/fxRwLKfcAmo.png"
                />
              </div>
            </div>
            <div>
              <div class="text-[17px] font-medium">Chỉ mình tôi</div>
            </div>
          </div>

          <input
            id="default-radio-3"
            type="radio"
            :checked="typePostDefault === 'Chỉ mình tôi'"
            value=""
            name="default-radio"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
            @change="postType = 'Chỉ mình tôi'"
          />
        </label>
      </div>

      <div class="pb-3 w-full border-t py-2 px-2 border-gray-200 mt-4">
        <div>
          <div
            class="flex items-center gap-2"
            :class="{ 'disabled-button': postType === typePostDefault }"
          >
            <input
            v-model="ischecked"
              :checked="postType === typePostDefault"
              type="checkbox"
              :disabled="postType === typePostDefault"
              class="w-5 h-5 p-1"
            />
            <span class="text-sm font-semibold"
              >Đặt làm đối tượng mặc định.</span
            >
          </div>
        </div>
        <div class="pt-3 px-3 flex items-center justify-end gap-2">
          <button
            class="text-[#1877F2] text-sm font-semibold px-3 hover:bg-blue-100 rounded py-2"
            @click="handleBack"
          >
            Hủy
          </button>
          <button
            class="text-white bg-[#1B74E4] hover:bg-blue-500 text-sm font-semibold px-10 rounded py-2"
            @click="handlePickTypePostDefault"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      postType: '',
      ischecked: false,
      typePostDefault: null,
      userId:null,
      user:null
    }
  },
  watch:{
    "$store.state.authModule.user.typePost":{
      handler(val){
        this.typePostDefault = val
      },
      deep:true,
      immediate: true,
    },
    "$store.state.authModule.user":{
      handler(val){
        this.userId = val.user_id
        this.user = val
      },
      deep:true,
      immediate: true,
    }
  },

  mounted() {
    this.postType = this.typePostDefault
  },
  methods: {
    handleBack() {
      this.$emit('back', false)
    },
    async handlePickTypePostDefault() {
      if (this.ischecked) {
        if(!this.user.check){
          await this.$store.dispatch('putDefaultTypePost', {
          userId: this.userId,
          postType: this.postType,
        })
        }else{
          await this.$store.dispatch('putDefaultTypePost', {
          userId: this.userId,
          postType: this.postType,
          check: this.user.check
        })
        }

        this.$emit('back', false)
      } else {
        await this.$store.dispatch('typePost', this.postType)
        this.$emit('back', false)
      }
    },
  },
}
</script>
<style lang="css" scoped>
.disabled-button {
  pointer-events: none;
  color: #999;
  cursor: not-allowed;
}
</style>
