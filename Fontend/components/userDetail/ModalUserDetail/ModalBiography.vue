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
            Chỉnh sửa chi tiết
          </div>
        </div>
        <div class="scrollable-content max-h-[400px] overflow-y-auto">
          <div class="w-full px-7 py-4">
            <div class="text-[17px] font-semibold">
              Chỉnh sửa phần giới thiệu
            </div>
            <div class="text-[15px] text-[#65676B] mb-5">
              Chi tiết bạn chọn sẽ hiển thị công khai
            </div>
            <div class="mb-8">
              <div class="text-[17px] font-semibold mb-3">Danh xưng</div>
              <nuxt-link :to="`${inforDetail}/about_contact_and_basic_info`">
                <div class="flex items-center gap-2">
                  <div>
                    <i
                      data-visualcompletion="css-img"
                      class="x1b0d499 xi3auck"
                      style="
                        background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yJ/r/CrWaDzbo5ce.png');
                        background-position: 0px 0px;
                        background-size: 34px 34px;
                        width: 32px;
                        height: 32px;
                        background-repeat: no-repeat;
                        display: inline-block;
                        filter: hue-rotate(120deg);
                      "
                    ></i>
                  </div>
                  <div
                    class="text-[15px] text-[#1876F2] hover:underline pb-1 cursor-pointer"
                  >
                    Thêm danh xưng vào trang cá nhân
                  </div>
                </div>
              </nuxt-link>
            </div>
            <div class="mb-8">
              <div class="text-[17px] font-semibold mb-3">Công việc</div>
              <nuxt-link :to="`${inforDetail}/about_work_and_education`">
                <div class="flex items-center gap-2">
                  <div>
                    <i
                      data-visualcompletion="css-img"
                      class="x1b0d499 xi3auck"
                      style="
                        background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yJ/r/CrWaDzbo5ce.png');
                        background-position: 0px 0px;
                        background-size: 34px 34px;
                        width: 32px;
                        height: 32px;
                        background-repeat: no-repeat;
                        display: inline-block;
                      "
                    ></i>
                  </div>
                  <div
                    class="text-[15px] text-[#1876F2] hover:underline pb-1 cursor-pointer"
                  >
                    Thêm nơi làm việc
                  </div>
                </div>
              </nuxt-link>
            </div>
            <div class="mb-8">
              <div class="text-[17px] font-semibold mb-3">Học vấn</div>
              <nuxt-link :to="`${inforDetail}/about_work_and_education`">
                <div class="flex items-center gap-2 mb-3">
                  <div>
                    <i
                      data-visualcompletion="css-img"
                      class="x1b0d499 xi3auck"
                      style="
                        background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yJ/r/CrWaDzbo5ce.png');
                        background-position: 0px 0px;
                        background-size: 34px 34px;
                        width: 32px;
                        height: 32px;
                        background-repeat: no-repeat;
                        display: inline-block;
                      "
                    ></i>
                  </div>
                  <div
                    class="text-[15px] text-[#1876F2] hover:underline pb-1 cursor-pointer"
                  >
                    Thêm trường trung học
                  </div>
                </div>
                <div class="flex items-center gap-2 mb-3">
                  <div>
                    <i
                      data-visualcompletion="css-img"
                      class="x1b0d499 xi3auck"
                      style="
                        background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yJ/r/CrWaDzbo5ce.png');
                        background-position: 0px 0px;
                        background-size: 34px 34px;
                        width: 32px;
                        height: 32px;
                        background-repeat: no-repeat;
                        display: inline-block;
                      "
                    ></i>
                  </div>
                  <div
                    class="text-[15px] text-[#1876F2] hover:underline pb-1 cursor-pointer"
                  >
                    Thêm trường cao đẳng/đại học
                  </div>
                </div>
              </nuxt-link>
            </div>
            <div class="mb-8">
              <div class="text-[17px] font-semibold mb-3">
                Tỉnh/Thành phố hiện tại
              </div>
              <div class="flex justify-between">
                <div class="flex items-center gap-2 mb-3">
                  <div>
                    <input type="checkbox" class="switch-toggle" />
                  </div>
                  <div class="text-[15px] pb-1">Sống tại Hà Nội</div>
                </div>
                <div class="cursor-pointer">
                  <i
                    data-visualcompletion="css-img"
                    class="x1b0d499 xep6ejk"
                    style="
                      background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yu/r/qpig6Lo4TCX.png');
                      background-position: 0px -638px;
                      background-size: 22px 1044px;
                      width: 20px;
                      height: 20px;
                      background-repeat: no-repeat;
                      display: inline-block;
                    "
                  ></i>
                </div>
              </div>
            </div>
            <div class="mb-8">
              <div class="text-[17px] font-semibold mb-3">Quê quán</div>
              <nuxt-link :to="`${inforDetail}/about_places`">
                <div class="flex items-center gap-2">
                  <div>
                    <i
                      data-visualcompletion="css-img"
                      class="x1b0d499 xi3auck"
                      style="
                        background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yJ/r/CrWaDzbo5ce.png');
                        background-position: 0px 0px;
                        background-size: 34px 34px;
                        width: 32px;
                        height: 32px;
                        background-repeat: no-repeat;
                        display: inline-block;
                      "
                    ></i>
                  </div>
                  <div
                    class="text-[15px] text-[#1876F2] hover:underline pb-1 cursor-pointer"
                  >
                    Thêm quê quán
                  </div>
                </div>
              </nuxt-link>
            </div>
            <div class="mb-8">
              <div class="text-[17px] font-semibold mb-3">Mối quan hệ</div>
              <nuxt-link :to="`${inforDetail}/about_family_and_relationships`">
                <div class="flex items-center gap-2">
                  <div>
                    <i
                      data-visualcompletion="css-img"
                      class="x1b0d499 xi3auck"
                      style="
                        background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yJ/r/CrWaDzbo5ce.png');
                        background-position: 0px 0px;
                        background-size: 34px 34px;
                        width: 32px;
                        height: 32px;
                        background-repeat: no-repeat;
                        display: inline-block;
                      "
                    ></i>
                  </div>
                  <div
                    class="text-[15px] text-[#1876F2] hover:underline pb-1 cursor-pointer"
                  >
                    Thêm tình trạng mối quan hệ
                  </div>
                </div>
              </nuxt-link>
            </div>
            <div class="mb-8">
              <div class="flex justify-between">
                <div>
                  <div class="text-[17px] font-semibold">Trang web</div>
                  <div class="text-[15px] b-4 text-[#65676B]">
                    Để hiển thị liên kết trên trang cá nhân, hãy đặt đối tượng
                    thành Công khai.
                  </div>
                </div>
                <div
                  class="flex justify-center items-center w-[108px] h-[35px] px-3 py-2 font-semibold bg-slate-200 rounded-lg mt-4"
                >
                  <div>
                    <img
                      class="x1b0d499 x1d69dk1"
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/ys/r/L39Daxsxmmw.png"
                      alt="Công khai"
                      height="12"
                      width="12"
                    />
                  </div>
                  <button class="px-1 font-semibold">Công khai</button>
                </div>
              </div>
            </div>
            <div class="mb-8">
              <div class="flex justify-between">
                <div>
                  <div class="text-[17px] font-semibold">Liên kết xã hội</div>
                  <div class="text-[15px] b-4 text-[#65676B]">
                    Để hiển thị liên kết trên trang cá nhân, hãy đặt đối tượng
                    thành Công khai.
                  </div>
                </div>
                <div
                  class="flex justify-center items-center w-[108px] h-[35px] px-3 py-2 font-semibold bg-slate-200 rounded-lg mt-4"
                >
                  <div>
                    <img
                      class="x1b0d499 x1d69dk1"
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/ys/r/L39Daxsxmmw.png"
                      alt="Công khai"
                      height="12"
                      width="12"
                    />
                  </div>
                  <button class="px-1 font-semibold">Công khai</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="border-t-[2px] border-gray-200 w-full px-3 py-4 ml-[1px] bg-white"
      >
        <div class="flex justify-between">
          <div
            class="font-semibold text-[#1876F2] hover:bg-gray-200 rounded-md w-[164px] h-[36px] px-3 flex justify-center items-center cursor-pointer"
          >
            Cập nhật thông tin
          </div>
          <div class="flex gap-1">
            <button
              class="w-[60px] h-[36px] bg-gray-300 font-semibold px-3 rounded-md hover:bg-gray-400"
            >
              Hủy
            </button>
            <button
              class="w-[108px] h-[36px] bg-[#1B74E4] px-10 rounded-md font-semibold text-white hover:bg-[#2467b9]"
            >
              Lưu
            </button>
          </div>
        </div>
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

  watch: {
    '$store.state.idFriendModule.friends': {
      handler(val) {
        this.inforFriend = val
      },
      immediate: true,
    },

    '$store.state.idFriendModule.userDetail': {
      handler(val) {
        this.inforDetail = val ? val.user_id : null
      },
      immediate: true,
    },
  },
}
</script>
<style scoped lang="css">
.switch-toggle {
  width: 40px;
  height: 20px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: rgba(199, 199, 199, 0.84);
  border-radius: 26px;
  position: relative;
  cursor: pointer;
  transition: var(--transition-effect);
}
.switch-toggle::before {
  content: '';
  width: 16px;
  height: 17px;
  position: absolute;
  top: 2px;
  left: 2px;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.3);
  transition: var(--transition-effect);
}
.switch-toggle:checked {
  background: #5096f8;
}
.switch-toggle:checked:before {
  left: 22px;
}
</style>
