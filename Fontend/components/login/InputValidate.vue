<template>
  <div class="w-full relative">
    <input
      v-tippy="{
        content: titleTippy,
        trigger: 'click',
        theme: 'custom-tooltip-theme',
        placement: 'bottom',
      }"
      :type="type"
      class="w-full h-[39px] border-input rounded p-[11px] outline-none"
      :class="inputClass ? 'check' : ''"
      :placeholder="title"
      @blur="setBlur"
      @focus="setFocus"
      @input="changeValue"
    />
    <div
      v-if="inputClass"
      class="h-[18px] w-[18px] rounded-[50px] border-red-600 text-white bg-red-600 text-center pt-[-6px] absolute top-1/2 -translate-y-1/2 right-1 flex items-center justify-center"
    >
      !
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputValidate',
  props: {
    type: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    // eslint-disable-next-line vue/require-default-prop
    titleTippy: {
      type: String,
    },
  },
  data() {
    return {
      check: '',
      validateFlag: false,
      count: 0,
      inputChangeValue: '',
    }
  },

  computed: {
    inputClass() {
      return this.validateFlag && this.count > 1 && !this.inputChangeValue
    },
  },

  methods: {
    setBlur() {
      this.count++
      this.validateFlag = true
    },

    setFocus() {
      this.validateFlag = false
      this.count++
    },

    changeValue(event) {
      this.inputChangeValue = event.target.value
      this.$emit('input-change-value', this.inputChangeValue)
    },
  },
}
</script>

<style scoped>
.border-input {
  border: 0.8px solid rgb(209 213 219);
  opacity: 1;
}

.check {
  border: 1px solid red;
}
</style>
