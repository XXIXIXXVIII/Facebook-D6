<template>
  <div class="mt-1 h-full overflow-auto">
    <!-- Chế độ tối -->
    <div class="flex mb-2">
      <div
        class="select-icon flex justify-center items-center w-[36px] h-[36px] mr-2"
      >
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span class="pt-1" v-html="icons.display"></span>
      </div>
      <div class="w-[261px]">
        <div class="text-base font-semibold">Chế độ tối</div>
        <div class="text-sm text-[#65676B] dark:text-gray-300">
          Điều chỉnh giao diện của Facebook để giảm độ chói và cho đôi mắt được
          nghỉ ngơi.
        </div>
        <!-- radio -->
        <div>
          <div
            class="radio dark:hover:bg-gray-500"
            @click="handleDisplayLight('Off')"
          >
            <span>Tắt</span>
            <input v-model="selectedDisplayLight" type="radio" value="Off" />
          </div>
          <div
            class="radio dark:hover:bg-gray-500"
            @click="handleDisplayLight('On')"
          >
            <span>Bật</span>
            <input v-model="selectedDisplayLight" type="radio" value="On" />
          </div>
          <div
            class="radio dark:hover:bg-gray-500"
            @click="handleDisplayLight('Automatic')"
          >
            <span class="w-[235px]"
              >Tự động
              <div
                class="text-xs text-[#65676B] font-normal dark:text-gray-300"
              >
                Chúng tôi sẽ tự động điều chỉnh màn hình theo cài đặt hệ thống
                trên thiết bị của bạn.
              </div></span
            >
            <input
              v-model="selectedDisplayLight"
              type="radio"
              value="Automatic"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Chế độ thu gọn -->
    <div class="flex mb-2">
      <div
        class="select-icon flex justify-center items-center w-[36px] h-[36px] mr-2"
      >
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span class="pt-1" v-html="icons.resize"></span>
      </div>
      <div class="w-[261px]">
        <div class="text-base font-semibold">Chế độ thu gọn</div>
        <div class="text-sm text-[#65676B]">
          Làm giảm kích thước phông chữ để có thêm nội dung vừa với màn hình.
        </div>
        <!-- radio -->
        <div>
          <div class="radio" @click="handleDisplaySize('Off')">
            <span>Tắt</span>
            <input v-model="selectedSize" type="radio" value="Off" />
          </div>
          <div class="radio" @click="handleDisplaySize('On')">
            <span>Bật</span>
            <input v-model="selectedSize" type="radio" value="On" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { display, resize } from '../../../../assets/icons/icons'
export default {
  name: 'DisplaySetting',
  data() {
    return {
      icons: {
        display,
        resize,
      },
      selectedDisplayLight: 'Off',
      selectedSize: 'On',
      isDarkMode: false,
    }
  },
  created() {
    this.isDarkMode =
      JSON.parse(localStorage.getItem('darkMode')) === true || false
    if (this.isDarkMode) {
      this.selectedDisplayLight = 'On'
    } else {
      this.selectedDisplayLight = 'Off'
    }
  },
  methods: {
    handleDisplayLight(value) {
      if (value === 'Off') {
        this.selectedDisplayLight = 'Off'
        localStorage.setItem('darkMode', JSON.stringify(false))
        document.documentElement.classList.remove('dark')
      }
      if (value === 'On') {
        this.selectedDisplayLight = 'On'
        localStorage.setItem('darkMode', JSON.stringify(true))
        document.documentElement.classList.add('dark')
      }
    },
    handleDisplaySize(value) {
      this.selectedSize = value
    },
  },
}
</script>

<style scoped>
.select-icon {
  background-color: #e4e6eb;
  border-radius: 100%;
}

.radio {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  padding: 8px;
  border-radius: 8px;
  transition-duration: 0.5s;
  cursor: pointer;
}

.radio:hover {
  transition-duration: 0.1s;
  background-color: #f2f3f5;
}

.flex > * {
  flex: none !important;
  max-width: none !important;
}
</style>
