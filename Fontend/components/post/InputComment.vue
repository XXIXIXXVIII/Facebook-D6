<template lang="">
  <div >
    <div v-if="showIcon" class="fixed top-0 left-0 w-screen h-screen" @click.stop="showIcon=false"></div>
    <div class="bg-[#F0F2F5] rounded-3xl min-h-fit dark:bg-[#3A3B3C]">
      <div class="py-2 px-4 relative">
        <div
        ref="handleEnter"
          contenteditable
          class="w-full min-h-[20px] outline-none flex items-center flex-wrap break-all max-w-[470px] bg-transparent relative z-20 dark:text-[#E4E6EB]"
          @input="updateValue"
          @focus="focusInput"
          @keyup.enter="handleSendMessenger"
        >
          <p ref="inputRef" class="whitespace-pre-wrap break-all w-[466px] flex items-center"></p>
        </div>
        <div
          v-show="!value"
          class="absolute text-gray-500 z-10 text-base font-normal top-2 left-3 dark:text-[#E4E6EB]"
        >
          {{$t('home.writeCmt')}}
        </div>
      </div>

      <div class="px-2 flex justify-between">
        <div class="flex items-center">
          <div
            class="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center cursor-pointer"
          >
            <i
              style="
                background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yh/r/w5HRkHSSN-4.png');
                background-position: 0px -134px;
                background-size: 26px 414px;
                width: 16px;
                height: 16px;
                background-repeat: no-repeat;
                display: inline-block;
                filter: invert(40%);
              "
            ></i>
          </div>
          <div
            class="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center cursor-pointer relative"
            @click="showIcon=!showIcon"
          >
            <i
              style="
                background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yh/r/w5HRkHSSN-4.png');
                background-position: 0px -224px;
                background-size: 26px 414px;
                width: 16px;
                height: 16px;
                background-repeat: no-repeat;
                display: inline-block;
                filter: invert(40%);
              "
            ></i>
            <div
            v-if="showIcon"
              class="absolute -top-[270px] -left-[145px] -translate-x-1/2 w-[324px] h-[264px] rounded-md bg-white overflow-hidden pt-1 z-30"
              style="
                box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px
                  rgba(0, 0, 0, 0.12) 0px -12px 30px rgba(0, 0, 0, 0.12) 0px 4px
                  6px rgba(0, 0, 0, 0.17) 0px 12px 13px rgba(0, 0, 0, 0.09) 0px -3px
                  5px;
              "
            >
              <Icon :show-icon="showIcon" @update:addIcon="addIcon"/>
            </div>
            
          </div>

          <div
            class="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center cursor-pointer"
            
          >
            <i
              style="
                background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yh/r/w5HRkHSSN-4.png');
                background-position: 0px -170px;
                background-size: 26px 414px;
                width: 16px;
                height: 16px;
                background-repeat: no-repeat;
                display: inline-block;
                filter: invert(40%);
              "
            ></i>
          </div>

          <div
            class="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center cursor-pointer"
           
          >
            <i
              style="
                background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yh/r/w5HRkHSSN-4.png');
                background-position: 0px -242px;
                background-size: 26px 414px;
                width: 16px;
                height: 16px;
                background-repeat: no-repeat;
                display: inline-block;
                filter: invert(40%);
              "
            ></i>
       
          </div>

          <div
            class="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center cursor-pointer"
          >
            <i
              style="
                background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yh/r/w5HRkHSSN-4.png');
                background-position: 0px -332px;
                background-size: 26px 414px;
                width: 16px;
                height: 16px;
                background-repeat: no-repeat;
                display: inline-block;
                filter: invert(40%);
              "
            ></i>
          </div>
        </div>
        <div
          v-if="!value"
          class="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center cursor-pointer"
        >
          <i
            style="
              background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yh/r/w5HRkHSSN-4.png');
              background-position: 0px -278px;
              background-size: 26px 414px;
              width: 16px;
              height: 16px;
              background-repeat: no-repeat;
              display: inline-block;
              filter: invert(70%);
            "
          ></i>
        </div>
        <div
          v-if="value"
          class="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 cursor-pointer"
          @click="handleSendMessenger"
        >
          <div class="w-6 h-6">
            <img
              class="w-full h-full object-cover"
              src="https://cdn4.iconfinder.com/data/icons/message-4-flat/512/26_Send-512.png"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Icon from './Icon.vue'
export default {
  name: 'InputComment',
  components: { Icon },
  data() {
    return {
      value: '',
      flag: true,
      showIcon:false,
      innerText: ''
    }
  },

  methods: {
    hideIcon() {
      this.showIcons = false
    },
    updateValue(event) {
      this.value = event.target.innerHTML
      this.innerText = event.target.innerText
    },
    focusInput() {
      const span = document.createElement('span')
      if (this.flag) {
        span.style.minWidth = '20px'
        span.style.minHeight = '20px'
        span.style.display = 'inline-block'
        span.style.overflowWrap = 'break-word'
        this.$refs.inputRef.appendChild(span)
        this.flag = false
      }
      
    },
    addIcon(url) {
      const span = document.createElement('span')
      span.style.backgroundImage = `url(${url})`
      span.style.width = '20px'
      span.style.height = '20px'
      span.style.backgroundSize = 'cover'
      span.style.display = 'inline-block'
      span.style.paddingLeft = '20px'

      this.$refs.inputRef.appendChild(span)
      this.value = this.$refs.inputRef.innerHTML
      this.flag = true
    },
    handleSendMessenger(){
      this.$emit("addMess", {value:this.value,innerText: this.innerText})
      this.$refs.handleEnter.blur()
      this.$refs.handleEnter.innerHTML=""
      this.value=""
      this.innerText=""
    }
  },
}
</script>
<style lang="css" scoped></style>
