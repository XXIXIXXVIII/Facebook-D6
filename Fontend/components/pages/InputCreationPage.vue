<template lang="">
  <label htmlFor="input" class="">
    <div class="w-full" :class="{ WrapdivFocus: focusInput && checkValue !== 'wrong'  }">
      <div
        class="rounded-lg relative flex items-center justify-between"
        :class="{
          readyCheck: checkValue === 'ready' || checkValue === 'ok' || checkValue==='',
          checkWrong: checkValue === 'wrong',
        }"
      >
        <div class="w-[92%]">
          <span
            class="absolute left-4"
            :class="{ spanBlur: !focusInput && !value, spanFocus: focusInput || value}"
            :style="{color: checkValue === 'wrong' ? 'hsl(350, 87%, 55%)': ''}"
            >{{ placeholder }}</span
          >
          <input
            id="input"
            class="pt-[26px] px-4 pb-[10px] outline-none w-full"
            :value="value"
            @input="handleOnChange($event)"
            @focus="focusInput = true"
            @blur="handleBlur"
          />
        </div>
        <div
          v-if="checkValue === 'wrong'"
          class="w-5 h-5 flex items-center justify-center mr-3"
        >
          <img
            class="w-full h-full object-cover"
            src="../../assets/icons/error-icon-transparent-21.jpg"
          />
        </div>
        <div
          v-if="checkValue === 'ok'"
          class="w-5 h-5 flex items-center justify-center mr-3"
        >
          <img
            class="w-full h-full object-cover"
            src="../../assets/icons/Flat_tick_icon.svg.png"
          />
        </div>
      </div>
    </div>
  </label>
</template>
<script>
export default {
  name: 'InputCreationPage',
  props: {
    check: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      value: '',
      focusInput: false,
    }
  },
  computed: {
  checkValue() {
    return this.check;
  }
},
  watch: {
    check(val) {
      this.checkValue = val
    },
  },

  methods: {
    handleBlur() {
      this.focusInput = false
      this.$emit('checkValue', this.value)
    },
    handleOnChange(event) {
      if (this.checkValue === 'wrong') {
        this.checkValue = 'ready'
      }
      this.value = event.target.value
      this.$emit('setValue', this.value)
    },
  },
}
</script>
<style scoped lang="css">
.spanFocus {
  color: hsl(214, 89%, 52%);
  top: 10px;
  font-size: 12px;
}
.spanBlur {
  color: #65676b;
  transform: translateY(-50%);
  top: 50%;
  left: 16px;
}
.WrapdivFocus {
  padding: 2px;
  outline: 3px solid #3498db;
  border-radius: 10px;
}
.checkWrong {
  border: 1px solid hsl(350, 87%, 55%);
}
.readyCheck {
  border: 1px solid #CED0D4;
}
</style>
