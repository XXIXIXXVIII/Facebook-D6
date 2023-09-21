<template lang="">
  <div>
    <HeaderVue></HeaderVue>
    <div class="flex w-full">
      <div className="w-[360px] min-h-screen mt-14"></div>
      <div class="navbar w-[360px] fixed bg-white min-h-screen mt-14">
        <div class="mx-4 mt-5 mb-3">
          <div class="text-[13px] text-[#65676B] my-2">Rose is the best</div>
          <div class="text-2xl font-bold">Bảng điều khiển chuyên nghiệp</div>
        </div>

        <div class="py-3 px-2">
          <nuxt-link
          :to="`/professional_dashboard`"
            class="text-[15px] font-medium flex items-center gap-2 px-2 rounded-md hover:bg-gray-200 cursor-pointer h-11"
            :class="{
              'bg-slate-200': fullPart === `/professional_dashboard`,
            }"
          >
            <i
            v-if="fullPart !== `/professional_dashboard`"
              style="
                background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yV/r/-hQWGrG0T4W.png');
                background-position: 0px -132px;
                background-size: 22px 194px;
                width: 20px;
                height: 20px;
                background-repeat: no-repeat;
                display: inline-block;
              "
            ></i>
            <i
            v-else
              style="
                background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yV/r/-hQWGrG0T4W.png');
                background-position: 0px -110px;
                background-size: 22px 194px;
                width: 20px;
                height: 20px;
                background-repeat: no-repeat;
                display: inline-block;
              "
            ></i>
            Tổng quan
          </nuxt-link>

          <div class="text-[#65676B] text-[15px] font-medium pt-5 pb-1 px-2">
            Thông tin chi tiết
          </div>

          <div v-for="item in detailt" :key="item.title">
            <nuxt-link
            :to="`/professional_dashboard/insights/${item.nuxtLink}`"
              class="text-[15px] font-medium flex items-center gap-2 px-2 rounded-md hover:bg-gray-200 cursor-pointer h-11"
              :class="{
                'bg-gray-200':
                  fullPart ===
                  `/professional_dashboard/insights/${item.nuxtLink}`,
              }"
            >
              <div
                v-if="
                  fullPart !==
                  `/professional_dashboard/insights/${item.nuxtLink}`
                "
                v-html="item.icon"
              ></div>
              <div v-else v-html="item.iconPick"></div>
              <div>{{ item.title }}</div>
            </nuxt-link>
          </div>

          <div class="text-[#65676B] text-[15px] font-medium pt-5 pb-1 px-2">
            Phát triển đối tượng
          </div>

          <div v-for="(item,index) in objectDevelopment" :key="index">
            <nuxt-link
            :to="`/professional_dashboard/insights/${item.nuxtLink}`"
              class="text-[15px] font-medium flex items-center gap-2 px-2 rounded-md hover:bg-gray-200 cursor-pointer h-11"
              :class="{
                'bg-slate-200':
                  fullPart ===
                  `/professional_dashboard/insights/${item.nuxtLink}`,
              }"
            >
              <div v-html="item.icon"></div>
              <div>{{ item.title }}</div>
            </nuxt-link>
          </div>

          <div class="text-[#65676B] text-[15px] font-medium pt-5 pb-1 px-2">
            Công cụ của bạn
          </div>

          <div class="px-2 rounded-md"></div>
        </div>
      </div>

      <div class="w-[calc(100vw-360px)] ml-[360px] mt-14 bg-[#F0F2F5] min-h-screen">
        <nuxt />
      </div>
    </div>
  </div>
</template>
<script>
import HeaderVue from '../components/header/HeaderVue.vue'
import { detailt, objectDevelopment } from '../utils/page/professionalDashboard'
export default {
  name: 'ProfessionalDashboard',
  components: {
    HeaderVue,
  },
  data() {
    return {
      detailt,
      objectDevelopment,
    }
  },
  computed: {
    param() {
      return this.$route.params.id
    },
    fullPart() {
      return this.$route.fullPath
    },
  },
}
</script>
<style scoped lang="css">
.navbar {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
