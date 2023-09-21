<template>
  <div
    v-if="messagesList.length === 0"
    class="flex justify-center items-center h-full pt-10"
  >
    <div class="flex flex-col justify-center items-center h-full">
      <div
        style="border: 1px solid rgb(228, 228, 228)"
        class="w-[60px] h-[60px] overflow-hidden rounded-full"
      >
        <img
          v-if="messengerValueOne"
          :src="messengerValueOne.toUserAvatar"
          alt=""
        />
        <img
          v-if="messengerValueTwo"
          :src="messengerValueTwo.toUserAvatar"
          alt=""
        />
        <img
          v-if="messengerOtherValue"
          :src="messengerOtherValue.toUserAvatar"
          alt=""
        />
      </div>
      <div v-if="messengerValueOne" class="font-semibold text-base mt-1">
        {{ messengerValueOne?.toUserName }}
      </div>
      <div v-if="messengerValueTwo" class="font-semibold text-base mt-1">
        {{ messengerValueTwo?.toUserName }}
      </div>
      <div v-if="messengerOtherValue" class="font-semibold text-base mt-1">
        {{ messengerOtherValue?.toUserName }}
      </div>
      <div class="text-xs text-[#65676b] mt-2">Facebook</div>
      <div class="text-xs text-[#65676b]">Các bạn là bạn bè trên facebook</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoneMessengerList',
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
    messagesList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
}
</script>

<style scoped></style>
