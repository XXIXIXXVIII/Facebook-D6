<template>
  <select
    v-tippy="{
      content:
        'Hình như bạn chọn nhầm ngày sinh hãy dùng ngày sinh nhật của mình nhé!',
      trigger: 'click',
      theme: 'custom-tooltip-theme',
      placement: 'bottom',
    }"
    class="w-[120px] h-9 px-2 text-sm border-input rounded focus:outline-none"
    @blur="setBlur"
    @focus="setFocus"
    @change="handleSelectionChange"
  >
    <option selected>{{ placeholder }}</option>
    <option v-for="(itemValue, index) in item" :key="index" :value="itemValue">{{ itemValue }}</option>
  </select>
</template>
<script>

export default {
  name:"SelectValidate",
    props: {
    item :{
      type: Array,
      default: function () {
      return [];
    }
    },
    placeholder : {
      type: String,
      default: ""
    },
    propsSelectedValue: {
      type: String, // Chỉnh kiểu dựa vào loại dữ liệu của selectDay, selectMonth, selectYear
      default: ""
    },
  },
  data() {
    return {
      check: "",
      validateFlag: false,
      count: 0,
      selectedValue : "",
    };
  },

  methods: {
    setBlur() {
      this.count++
      this.validateFlag = true
    },
    setFocus(){
      this.validateFlag = false
      this.count++
    },
    handleSelectionChange(event) {
      this.selectedValue = event.target.value; // Cập nhật giá trị tạm thời khi có sự thay đổi
      this.$emit("selected-value", this.selectedValue); // Gửi giá trị lên component cha
    },
  },
};
</script>

<style></style>
