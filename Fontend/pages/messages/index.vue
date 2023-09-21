<template>
  <div class="w-full h-full dark:bg-[#242526] dark:text-white">
    <!--  -->
    <div
      v-if="!messengerOtherValue"
      class="w-full h-full flex items-center justify-center p-2"
    >
      <div
        class="text-[20px] text-[#65676b] dark:bg-[#242526] dark:text-white font-bold"
      >
        Hãy chọn một đoạn chat hoặc bắt đầu cuộc trò chuyện mới
      </div>
    </div>
    <!--  -->
    <div v-if="messengerOtherValue" class="p-3">
      <messenger-other-inbox :messenger-other-value="messengerOtherValue" />
    </div>
  </div>
</template>

<script>
import MessengerOtherInbox from '../../components/header/notifications_settings/messenger/MessengerOtherInbox.vue'
export default {
  name: 'MessagesHome',
  components: { MessengerOtherInbox },
  layout: 'layoutMessenge',
  computed: {
    currentPath() {
      return this.$route.path
    },
    showOtherInbox() {
      return this.$store.state.headerModule.showOtherInbox
    },
    messengerOtherValue() {
      return this.$store.state.headerModule.messengerOtherValue
    },
  },
}
</script>

<style scoped></style>
