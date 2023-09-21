<template>
  <div class="tổng relative">
    <div class="pt-[92px] pb-[132px] bg-[#f0f2f5]">
      <div class="flex mx-[269px]">
        <div class="w-[584px] h-[496px] pr-12">
          <div
            class="h-[70px] w-[199px] flex items-center justify-center pt-[8px] pb-[16px]"
          >
            <img src="../../assets/loginImg/logo.svg" />
          </div>
          <div class="w-[536px] font-normal text-[28px] leading-8 ml-4">
            Đăng nhập gần đây
          </div>
          <p
            class="pb-[12px] mb-[12px] font-normal text-[15px] leading-6 text-gray-600 ml-4"
          >
            Nhấp vào ảnh của bạn hoặc thêm tài khoản
          </p>
          <div class="flex">
            <div
              :class="{ ishover: ishover === true }"
              class="border-input pb-[20px] ml-4 rounded overflow-hidden w-[160px] h-[206px]"
            >
              <div class="">
                <img
                  class="w-full h-full object-cover"
                  src="https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg"
                />
              </div>
              <div
                class="p-3 w-full h-full cursor-pointer text-[18px] leading-[22px] text-center bg-white text-gray-900"
              >
                Trà My
              </div>
            </div>
            <div
              :class="{ ishover: ishover === 'true' }"
              class="border-input pb-[20px] ml-4 rounded-lg overflow-hidden w-[160px] h-[206px]"
              @mouseover="ishover = true"
            >
              <div
                class="w-full h-[160px] flex items-center justify-center flex-col bg-slate-100"
              >
                <div class="img-add cursor-pointer"></div>
              </div>
              <div
                class="p-3 w-full h-full cursor-pointer text-[18px] leading-[22px] text-center bg-white text-blue-500 border-solid"
              >
                Thêm tài khoản
              </div>
            </div>
          </div>
        </div>
        <!-- Form đăng nhập -->
        <div class="w-[396px] h-[496px]">
          <div class="w-full">
            <div
              class="shadowForm w-full mt-10 pt-[10px] pb-[24px] rounded-lg"
            >
            <div class="w-[361px] leading-4 border border-[#dd3c10] bg-[#ffebe8] text-[12px] text-center px-[3px] py-[7px] my-3 m-auto" v-if="errorAuth">{{ errorAuth }}</div>
              <form class="w-full h-[314px]" @submit.prevent="handleLogin">
                <div class="w-[366px] mx-auto h-[131px]">
                  <div class="w-[364px] h-[62px] pt-[6px] pb-[6px]">
                    <input
                      v-model="email"
                      type="text"
                      class="px-4 py-[14px] w-full h-[51px] border-input border-gray-300 rounded-lg outline-none focus:border-[#1b74e4]"
                      placeholder="Email hoặc số điện thoại"
                    />
                  </div>
                  <div class="w-[364px] h-[62px] pt-[6px] pb-[6px]">
                    <input
                      v-model="password"
                      type="password"
                      class="px-4 py-[14px] w-full h-[51px] border-input border-gray-300 rounded-lg outline-none focus:border-[#1b74e4]"
                      placeholder="Mật khẩu"
                    />
                  </div>
                  <div class="w-[364px] h-[54px] pt-[6px]">
                    <button
                      class="w-full h-[48px] px-4 font-bold text-white bg-blue-500 rounded-lg leading-[48px] text-xl"
                      type="submit"
                    >
                      Đăng nhập
                    </button>
                  </div>
                  <div class="w-full h-[18px] mt-[16px] text-center">
                    <a href="" class="text-[#1877f2] font-medium text-[14px]"
                      >Quên mật khẩu ?</a
                    >
                  </div>
                  <div
                    class="w-[364px] mx-auto my-5 border-[0.8px] border-gray-200"
                  ></div>
                  <div
                    class="w-[364px] h-[54px] pt-[6px] flex items-center justify-center"
                  >
                    <div
                      class="px-4 font-bold text-white bg-[#42b72a] rounded-lg leading-[48px] text-[17px] cursor-pointer"
                      @click.stop="toggleRegisterOpen"
                    >
                      Tạo tài khoản mới
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="w-[396px] h-[37px] mt-[28px] text-center">
              <a href="" class="font-normal text-sm pt-0"
                ><strong>Tạo trang</strong> dành cho người nổi tiếng, thương
                hiệu hoặc doanh nghiệp.</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="h-[156px] pt-[20px] bg-white mx-[269px]">
      <div class="w-[980px] h-[136px]">
        <div class="border-b border-gray-300 pb-1 mb-2">
          <ul
            class="w-full h-[27px] flex gap-[10px] whitespace-nowrap text-[#737373] text-xs"
          >
            <li
              v-for="(title, index) in languages"
              :key="index"
              class="cursor-pointer hover:underline"
            >
              {{ title.title }}
            </li>
          </ul>
        </div>
        <div>
          <ul
            class="w-full h-[27px] flex flex-wrap -ml-4 gap-1 whitespace-nowrap text-[#737373] text-xs"
          >
            <li
              v-for="(title, index) in titles"
              :key="index"
              class="cursor-pointer hover:underline ml-4"
            >
              {{ title.title }}
            </li>
          </ul>
        </div>
      </div>
      <div class="text-[#737373] text-xs pb-5">Meta © 2023</div>
    </footer>
    <div
      v-show="showModal"
      class="fixed z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-slate-50 opacity-70"
    ></div>
    <!-- Form đăng ký -->
    <div
      v-show="showModal"
      style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px"
      class="fixed z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[432px] bg-white rounded-lg"
    >
      <div>
        <div class="px-4 py-[10px] border-b border-gray-300 pt-1 mb-2">
          <div
            class="flex justify-end absolute right-[10px] top-3 w-6 h-6 cursor-pointer"
            @click.stop="toggleRegisterClose"
          >
            <img
              class="w-full h-full object-cover"
              src="../../assets/loginImg/C6QZ-pcv3Bd.png"
            />
          </div>
          <div class="text-[#1c1e21] text-[32px] leading-[38px] mb-0 font-bold">
            Đăng ký
          </div>
          <div
            class="h-6 text-left font-normal text-[15px] leading-6 text-[#606770]"
          >
            Nhanh chóng và dễ dàng
          </div>
        </div>
        <div class="w-[398px] leading-4 border border-[#dd3c10] bg-[#ffebe8] text-[12px] text-center px-[3px] py-[7px] my-3 m-auto" v-if="errorRegister">{{ errorRegister }}</div>
        <div class="w-[432px] p-4">
          <div class="w-[400px] pb-2">
            <div class="flex w-[399px] h-[39px] mb-[10px] gap-2">
              <div class="w-1/2">
                <InputValidate
                  type="text"
                  title="Họ"
                  title-tippy="Họ của bạn"
                  @input-change-value="firstName = $event"
                ></InputValidate>
              </div>
              <div class="w-[48%]">
                <InputValidate
                  type="text"
                  title="Tên"
                  title-tippy="Tên của bạn"
                  @input-change-value="lastName = $event"
                ></InputValidate>
              </div>
            </div>
            <div class="w-[399px] h-[39px] mb-[10px]">
              <InputValidate
                type="text"
                title="Nhập email của bạn"
                title-tippy="Bạn sẽ sử dụng thông tin này khi đăng nhập và khi cần đặt lại mật khẩu'"
                @input-change-value="emailRegister = $event"
              ></InputValidate>
            </div>
            <div class="w-[399px] h-[39px] mb-[10px]">
              <InputValidate
                type="password"
                title="Mật khẩu mới"
                title-tippy="Mật khẩu phải có tối thiểu 6 kí tự chứa cả chữ thường và chữ hoa cả dấu ! ,& câu"
                @input-change-value="passwordRegister = $event"
              ></InputValidate>
            </div>
            <div class="w-full h-[56px]">
              <div class="flex">
                <div
                  class="w-full h-[20px] mt-[2px] text-left text-xs text-[#606770] font-normal leading-[20px] ml-[2px]"
                >
                  Ngày sinh
                </div>
              </div>
              <div class="w-full h-[36px] flex gap-3">
                <div>
                  <SelectValidate
                    placeholder="Ngày"
                    :item="daysInMonth"
                    @selected-value="selectDay = $event"
                  />
                </div>
                <div>
                  <SelectValidate
                    placeholder="Tháng"
                    :item="months"
                    @selected-value="selectMonth = $event"
                  />
                </div>
                <div>
                  <SelectValidate
                    placeholder="Năm"
                    :item="years"
                    @selected-value="selectYear = $event"
                  />
                </div>
              </div>
            </div>
            <div class="w-full h-[62px] mt-[10px] pr-3">
              <div class="flex">
                <div
                  class="w-full h-[20px] mt-[2px] text-left text-xs text-[#606770] font-normal leading-[20px] ml-[2px]"
                >
                  Giới tính
                </div>
              </div>
              <div class="w-full h-[36px]">
                <div class="w-[411px] h-[50px] mx-[-6px] my-[-8px] flex">
                  <div
                    class="w-[120px] h-[34px] mb-[6px] ml-[6px] mt-[8px] items-center bg-white border-input inline-block flex-1 font-normal rounded"
                  >
                    <div class="w-full h-full p-[5px] mr-1">
                      <span>Nữ</span>
                      <input
                        id="gender"
                        v-model="gender"
                        type="radio"
                        class="float-right mt-[5px]"
                        name="gender"
                        value="Nữ"
                      />
                    </div>
                  </div>
                  <div
                    class="w-[120px] h-[34px] mb-[6px] ml-[6px] mt-[8px] items-center bg-white border-input inline-block flex-1 font-normal rounded"
                  >
                    <div class="w-full h-full p-[5px] mr-1">
                      <span>Nam</span>
                      <input
                        id="gender"
                        v-model="gender"
                        type="radio"
                        class="float-right mt-[5px]"
                        name="gender"
                        value="Nam"
                      />
                    </div>
                  </div>
                  <div
                    class="w-[140px] h-[34px] mr-[8px] mb-[6px] ml-[6px] mt-[8px] items-center bg-white border-input inline-block flex-1 font-normal rounded"
                  >
                    <div class="w-full h-full p-[6px] mr-1">
                      <span>Tùy chọn</span>
                      <input
                        id="gender"
                        v-model="gender"
                        type="radio"
                        class="float-right mt-[5px]"
                        name="gender"
                        value="khác"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-[399px] h-[29px]">
              <p
                class="w-full h-full mt-[3px] mb-[11px] text-[#777] text-[11px]"
              >
                Những người dùng dịch vụ của chúng tôi có thể đã tải thông tin
                liên hệ của bạn lên Facebook.
                <a
                  href=""
                  class="text-[#385898] cursor-pointer w-[483px] h-[34px]"
                  >Tìm hiểu thêm</a
                >
              </p>
            </div>
            <div class="w-[399px] h-[29px] mb-[30px]">
              <p class="w-full h-full my-[11px] text-[#777] text-[11px]">
                Bằng cách nhấp vào Đăng ký, bạn đồng ý với
                <a
                  href=""
                  class="text-[#385898] cursor-pointer w-[483px] h-[34px]"
                  >Điều khoản</a
                >,
                <a
                  href=""
                  class="text-[#385898] cursor-pointer w-[483px] h-[34px]"
                  >Chính sách quyền riêng tư</a
                >
                và
                <a
                  href=""
                  class="text-[#385898] cursor-pointer w-[483px] h-[34px]"
                  >Chính sách cookie của chúng tôi</a
                >. Bạn có thể nhận được thông báo của chúng tôi qua SMS và hủy
                nhận bất kỳ lúc nào.
              </p>
            </div>
            <div class="w-full h-[56px] flex items-center justify-center">
              <button
                class="btnRegister w-[194px] h-[36px] px-8 my-[10px] font-bold text-white bg-[#00a400] rounded text-[18px]"
                @click="hanldeRegister"
              >
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { languages, titles } from '../../utils/Const'
import InputValidate from '../../components/login/InputValidate.vue'
import SelectValidate from '../../components/login/SelectValidate.vue'

export default {
  name: 'Login',
  components: {
    InputValidate,
    SelectValidate,
  },
  layout: 'login',
  data() {
    return {
      ishover: false,
      languages,
      titles,
      showModal: false,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      passwordRegister: '',
      emailRegister: '',
      selectDay: '',
      selectMonth: '',
      selectYear: '',
      gender: '',
    }
  },

  computed: {
    ...mapGetters(['getRegistrationError','getLoginError']),
    errorAuth() {
      return this.getLoginError
    },
    errorRegister() {
      return this.getRegistrationError
    },

    check() {
      return (
        !this.firstName &&
        !this.lastName &&
        !this.emailRegister &&
        !this.passwordRegister &&
        !this.selectMonth &&
        !this.selectYear
      )
    },
    daysInMonth() {
      const day = []
      for (let i = 1; i < 32; i++) {
        day.push(i)
      }
      return day
    },
    months() {
      return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    },
    years() {
      const currentYear = new Date().getFullYear()
      const years = []

      for (let i = currentYear - 100; i <= currentYear; i++) {
        years.push(i)
      }
      return years
    },
  },

  methods: {
    toggleRegisterOpen() {
      this.showModal = true
      this.$store.dispatch('resetError');
    },

    toggleRegisterClose() {
      this.showModal = false
    },

    handleLogin() {
      const dataLogin = {
        email: this.email,
        password: this.password,
      }
      this.$store.dispatch('login', dataLogin)
      if(this.errorAuth === null){
        this.$store.dispatch('resetError');
      }
    },

    hanldeRegister() {
      const birthday =
        this.selectDay.toString() +
        '/' +
        this.selectMonth.toString() +
        '/' +
        this.selectYear.toString()

      const inforUser = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.emailRegister,
        password: this.passwordRegister,
        gender: this.gender,
        birthday,
      }
      this.$store.dispatch('register', inforUser)
    },
  },
}
</script>

<style scoped>
.alert {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.ishover {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}

.img-add {
  background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/y3/r/_ACU9i_3AiP.png');
  background-size: 44px 80px;
  background-repeat: no-repeat;
  display: inline-block;
  width: 42px;
  height: 42px;
  background-color: aliceblue;
}

/* Define your custom tooltip theme */
.tippy-box {
  background-color: #be4b49; /* Background color */
  color: white; /* Text color */
  font-size: 12px; /* Text size */
  padding: 13px; /* Padding */
  border-radius: 2px; /* Border radius */
  box-shadow: 0 0 0 1px rgba(139, 3, 0, 0.75), 0 1px 10px rgba(0, 0, 0, 0.35);
}
.tippy-arrow {
  color: #be4b49; /* Text color */
}

.check {
  border: 1px solid red;
}

.btnRegister {
  color: rgb(255, 255, 255);
}

.btnRegister:hover {
  background-color: rgb(11, 134, 11) !important;
}

.border-input {
  border: 0.8px solid rgb(209 213 219);
  opacity: 1;
}

.shadowForm {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}
</style>
