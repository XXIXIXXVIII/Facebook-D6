<template>
  <div>
    <div
      v-show="showModal"
      class="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-slate-50 opacity-70"
    ></div>
    <div
      v-show="showModal"
      style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px"
      class="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] bg-white rounded-lg"
    >
      <div class="w-[560px]">
        <div class="border-b border-gray-300 mb-3">
          <div
            class="flex justify-end absolute right-[10px] top-3 w-6 h-6 cursor-pointer"
            @click="closeModal"
          >
            <img
              class="w-full h-full object-cover"
              src="../../../assets/loginImg/C6QZ-pcv3Bd.png"
            />
          </div>
          <div class="w-[560px] h-[188px] pt-[4px]">
            <i
              data-visualcompletion="css-img"
              class="w-full h-full"
              style="
                background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/y0/r/KehqXHMiA2J.png');
                background-position: 0px 0px;
                background-size: 566px 250px;
                background-repeat: no-repeat;
                display: inline-block;
              "
            ></i>
          </div>
          <div class="w-[560px] h-[95px] px-4 pt-4 pb-28">
            <div class="font-bold text-center text-[20px]">Thêm sở thích</div>
            <div
              class="text-[13px] pt-1 pl-[11px] text-center text-[#65676B] font-semibold"
            >
              Bạn thích làm gì? Hãy chọn các sở thích phổ biến dưới đây hoặc
              thêm sở thích khác nhé.
            </div>
          </div>
        </div>
        <div class="w-[560px] pb-[77px]">
          <div class="w-[548px]">
            <div
              class="font-semibold text-center pl-[20px] text-[17px] text-[#787a7e] pt-8"
            >
              Sở thích được đề xuất
            </div>
            <div class="w-[528px] pt-2">
              <div class="pt-4 pl-24 pr-5 flex gap-2 flex-wrap pb-30">
                <div
                  v-for="hobby in hobbies.hobbies"
                  :key="hobby.hobby_id"
                  class="px-3 flex justify-center items-center hover:bg-gray-100 border-2 border-gray-200 rounded-3xl h-[35px] w-auto cursor-pointer font-semibold"
                  :class="{ 'active-hobbies': activeItems[hobby.hobby_name], 'hobbies': !activeItems[hobby.hobby_name] }"
                  @click="saveHobbies(hobby)"
                >
                  {{ hobby.hobby_name }}
                </div>
                <div
                  class="px-3 flex justify-center items-center bg-blue-50 text-blue-400 hover:bg-blue-100 border-2 border-gray-200 rounded-3xl h-[35px] w-auto cursor-pointer font-semibold"
                >
                  <i
                    data-visualcompletion="css-img"
                    class="x1b0d499 xi3auck"
                    style="
                      background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/aGbBkBOd76T.png');
                      background-position: 0px -68px;
                      background-size: 34px 86px;
                      width: 16px;
                      height: 16px;
                      background-repeat: no-repeat;
                      display: inline-block;
                      color: rgb(0, 131, 238);
                    "
                  ></i>
                  Tìm kiếm sở thích khác
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="border-t-[2px] px-3 py-4 border-gray-200 w-full">
          <div class="flex justify-between">
            <div class="flex justify-center items-center gap-1">
              <i
                data-visualcompletion="css-img"
                class="x1b0d499 xep6ejk"
                style="
                  background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yy/r/FFJlY6jO_92.png');
                  background-position: 0px -22px;
                  background-size: 22px 198px;
                  width: 20px;
                  height: 20px;
                  background-repeat: no-repeat;
                  display: inline-block;
                "
              ></i>
              Sở thích hiển thị công khai
            </div>
            <div class="flex gap-1">
            <button class="w-[60px] h-[36px] bg-gray-300 font-semibold px-3 rounded-md hover:bg-gray-400" @click="cancle()">Hủy</button>
            <button class="w-[108px] h-[36px] bg-[#1B74E4] px-10 rounded-md font-semibold text-white hover:bg-[#2467b9]" @click="saveSelectedHobbies()">Lưu</button>
         </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { RepositoryFactory } from '../../../apiConfig/RepositoryFactory'
const userRepository = RepositoryFactory.get('user')
export default {

  props: {
    showModal: Boolean,
    hobbies: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      activeItems: {},
      selectedHobbies: [],
    };
  },

  computed: {
   userId() {
      return this.$store.state.authModule.user.user_id
    },
 },

  methods: {
    closeModal() {
      console.log("first")
      this.$emit('close-modal') // Gửi sự kiện đóng modal lên component cha
    },

    async saveHobbies(hobby) {
      this.$set(this.activeItems, hobby.hobby_name, !this.activeItems[hobby.hobby_name]);
  },

  cancle() {
    this.closeModal()
  },

  async saveSelectedHobbies() {
    const selectedHobbies = this.hobbies.hobbies
    .filter(hobby => this.activeItems[hobby.hobby_name])
    .map(hobby => hobby.hobby_name);
      
    if (selectedHobbies.length > 0) {
      try {
      // Gửi danh sách các tên sở thích đã chọn về backend ở đây
       await userRepository.profileUser(this.userId, { selectedHobbies });
      // Xử lý phản hồi từ backend (nếu cần)
      this.$emit('saveSelectedHobbies', selectedHobbies);
      } catch (error) {
      console.error(error);
      }
    } else {
    // Hiển thị một thông báo hoặc thực hiện xử lý khi không có sở thích nào được chọn
    console.log('Không có sở thích nào được chọn.');
    }
    this.closeModal()
    },
  },
}
</script>
<style scope="">
.active-hobbies{
  color: rgb(21, 130, 253);
  background-color: rgba(177, 225, 255, 0.76);
}
</style>
