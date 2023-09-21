<template>
  <div
    v-if="messengerValueOne || messengerValueTwo || messengerOtherValue"
    style="box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
    class="w-full h-12 flex justify-between items-center p-1"
  >
    <div
      v-tippy="{
        content: 'Cài đặt chat',
        theme: 'material',
        placement: 'top',
      }"
      class="message-icon flex items-center rounded-lg pr-1"
    >
      <div class="w-[44px] h-[44px] p-2">
        <div class="w-[32px] h-[32px] overflow-hidden rounded-full">
          <img
            v-if="messengerValueOne"
            class="w-full h-full object-cover"
            :src="messengerValueOne?.toUserAvatar"
            alt=""
          />
          <img
            v-if="messengerValueTwo"
            class="w-full h-full object-cover"
            :src="messengerValueTwo?.toUserAvatar"
            alt=""
          />
          <img
            v-if="messengerOtherValue"
            class="w-full h-full object-cover"
            :src="messengerOtherValue?.toUserAvatar"
            alt=""
          />
        </div>
      </div>
      <!--  -->
      <div v-if="messengerValueOne" class="pr-1">
        <div
          :title="messengerValueOne?.toUserName"
          class="text-sm cursor-pointer overflow-hidden max-w-[145px] whitespace-nowrap text-ellipsis font-semibold pl-1 dark:text-white"
        >
          {{ messengerValueOne?.toUserName }}
        </div>
        <div
          class="cursor-pointer overflow-hidden max-w-[145px] whitespace-nowrap text-ellipsis text-xs pl-1 text-gray-700 dark:text-gray-300"
        >
          Đang hoạt động
        </div>
      </div>
      <!--  -->
      <div v-if="messengerValueTwo" class="pr-1">
        <div
          :title="messengerValueTwo?.toUserName"
          class="text-sm cursor-pointer overflow-hidden max-w-[145px] whitespace-nowrap text-ellipsis font-semibold pl-1 dark:text-white"
        >
          {{ messengerValueTwo?.toUserName }}
        </div>
        <div
          class="cursor-pointer overflow-hidden max-w-[145px] whitespace-nowrap text-ellipsis text-xs pl-1 text-gray-700 dark:text-gray-300"
        >
          Đang hoạt động
        </div>
      </div>
      <div v-if="messengerOtherValue" class="pr-1">
        <div
          :title="messengerOtherValue?.toUserName"
          class="text-sm cursor-pointer overflow-hidden max-w-[145px] whitespace-nowrap text-ellipsis font-semibold pl-1 dark:text-white"
        >
          {{ messengerOtherValue?.toUserName }}
        </div>
        <div
          class="cursor-pointer overflow-hidden max-w-[145px] whitespace-nowrap text-ellipsis text-xs pl-1 text-gray-700 dark:text-gray-300"
        >
          Đang hoạt động
        </div>
      </div>
      <div>
        <div :style="{ display: inboxOneFocus ? 'block' : 'none' }">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="icons.messengerDropDownActive"></span>
        </div>
        <div v-if="!inboxOneFocus">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="icons.messengerDropDown"></span>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center">
      <!-- Phone Icon ############### -->
      <div
        v-tippy="{
          content: 'Bắt đầu gọi thoại',
          theme: 'material',
          placement: 'top',
        }"
      >
        <div
          :style="{ display: inboxOneFocus ? 'block' : 'none' }"
          class="message-icon p-[1px]"
        >
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="icons.messengerPhoneActive"></span>
        </div>
        <div v-if="!inboxOneFocus" class="message-icon p-[1px]">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="icons.messengerPhone"></span>
        </div>
      </div>

      <!-- Video Icon ################ -->
      <div
        v-tippy="{
          content: 'Bắt đầu gọi video',
          theme: 'material',
          placement: 'top',
        }"
      >
        <div
          :style="{ display: inboxOneFocus ? 'block' : 'none' }"
          class="message-icon p-[1px]"
        >
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="icons.messengerVideoActive"></span>
        </div>
        <div v-if="!inboxOneFocus" class="message-icon p-[1px]">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="icons.messengerVideo"></span>
        </div>
      </div>

      <!-- Small Size Icon ################ -->
      <div
        v-if="!messengerOtherValue"
        v-tippy="{
          content: 'Thu nhỏ đoạn chat',
          theme: 'material',
          placement: 'top',
        }"
      >
        <div
          :style="{ display: inboxOneFocus ? 'block' : 'none' }"
          class="message-icon p-[1px]"
        >
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="icons.messengerSmallSizeActive"></span>
        </div>
        <div v-if="!inboxOneFocus" class="message-icon p-[1px]">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="icons.messengerSmallSize"></span>
        </div>
      </div>

      <!-- X Icon ################ -->
      <div
        v-if="!messengerOtherValue"
        v-tippy="{
          content: 'Đóng đoạn chat',
          theme: 'material',
          placement: 'top',
        }"
      >
        <div
          v-if="messengerValueOne"
          class="message-icon p-[1px]"
          @click="handleCloseShowInbox"
        >
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="icons.messengerX"></span>
        </div>
        <div
          v-if="messengerValueTwo"
          class="message-icon p-[1px]"
          @click="handleCloseShowInboxTwo"
        >
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="icons.messengerX"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  messengerPhone,
  messengerPhoneActive,
  messengerVideo,
  messengerVideoActive,
  messengerDropDown,
  messengerDropDownActive,
  messengerSmallSize,
  messengerSmallSizeActive,
  messengerX,
  messengerXActive,
} from '../../../../../assets/icons/icons'
export default {
  name: 'MessengerInboxTop',
  props: {
    messengerValueOne: {
      type: Object,
      default: null,
    },
    messengerValueTwo: {
      type: Object,
      default: null,
    },
    messengerOtherValue: {
      type: Object,
      default: null,
    },
    inboxOneFocus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      icons: {
        messengerPhone,
        messengerPhoneActive,
        messengerVideo,
        messengerVideoActive,
        messengerDropDown,
        messengerDropDownActive,
        messengerSmallSize,
        messengerSmallSizeActive,
        messengerX,
        messengerXActive,
      },
    }
  },
  methods: {
    // Đóng inbox
    handleCloseShowInbox() {
      this.$emit('handle-close-show-inbox', false)
    },

    // Đóng inboxTwo
    handleCloseShowInboxTwo() {
      this.$emit('handle-close-show-inbox-two', false)
      console.log('vào')
    },
  },
}
</script>

<style scoped>
.message-icon:hover {
  border-radius: 100%;
  background-color: #e3e5eba3;
  cursor: pointer;
}
</style>
