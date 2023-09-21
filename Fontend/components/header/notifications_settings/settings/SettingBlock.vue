<template>
  <div class="mt-5 text-[14px] font-medium">
    <!--  -->
    <span v-if="!value.showMoreTitle || !showMoreTitle">
      <div
        v-for="(setting, index) in settingValues"
        :key="index"
        class="setting flex justify-between items-center w-full h-[48px] pl-1 pr-1 rounded-lg cursor-pointer"
        @click="handleShowMore(setting.title, setting.showMore)"
      >
        <div class="flex items-center">
          <div
            class="select-icon flex items-center justify-center w-[35px] h-[35px]"
          >
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span class="pt-1" v-html="setting.icon"></span>
          </div>
          <div class="flex items-center pl-2">{{ setting.title }}</div>
        </div>
        <div v-if="setting.showMore">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="setting.showMore"></span>
        </div>
      </div>
    </span>

    <!--  -->
    <span v-if="value.showMoreTitle || showMoreTitle">
      <div
        v-for="(setting, index) in value.showMoreTitle ===
        'Cài đặt & quyền riêng tư'
          ? settingAndPrivacyValues
          : value.showMoreTitle === 'Trợ giúp & hỗ trợ'
          ? helpCenter
          : displaySetting"
        :key="index"
        class="setting flex justify-between items-center w-full h-[48px] pl-1 pr-1 rounded-lg cursor-pointer"
        @click="handleShowMore(setting.title, setting.showMore)"
      >
        <div class="flex items-center">
          <div
            class="select-icon flex items-center justify-center w-[35px] h-[35px]"
          >
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span class="pt-1" v-html="setting.icon"></span>
          </div>
          <div class="flex items-center pl-2">{{ setting.title }}</div>
        </div>
        <div v-if="setting.showMore">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="setting.showMore"></span>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  name: 'SettingBlock',
  props: {
    settingValues: {
      type: Array,
      default: () => [],
    },
    settingAndPrivacyValues: {
      type: Array,
      default: () => [], // Giá trị mặc định là một mảng rỗng
    },
    helpCenter: {
      type: Array,
      default: () => [], // Giá trị mặc định là một mảng rỗng
    },
    displaySetting: {
      type: Array,
      default: () => [], // Giá trị mặc định là một mảng rỗng
    },

    showMoreTitle: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      value: {
        showMoreTitle: null,
      },
    }
  },
  methods: {
    handleShowMore(title, showMore) {
      console.log(title);
      if (showMore) {
        this.value.showMoreTitle = title
        this.$emit('show-more-title', title)
      }
      if (title === 'Đăng xuất') {
        this.$store.dispatch('logout')
        this.$router.push('/login')
      }
      if (title === 'Chuyển sang Tiếng Việt' ) {
        localStorage.setItem("lang", JSON.stringify("vi"))
        window.location.reload();
        }
        
        if(title === 'Chuyển sang English'){
          localStorage.setItem("lang", JSON.stringify("en"))
          window.location.reload();
        }
        
        
      }
    
  },
}
</script>

<style scoped>
.select-icon {
  background-color: #e4e6eb;
  border-radius: 100%;
}

.setting:hover {
  background-color: #eeeef1a4;
}
</style>
