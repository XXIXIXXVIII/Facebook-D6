<template lang="">
  <div class="wraper">
    <div
      class="fixed w-screen h-screen top-0 z-[80] bg-[rgba(244,244,244,0.8)]"
    ></div>
    <div
      class="wraper w-[500px] bg-white rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[81]"
    >
      <div class="fixed top-0 w-full">
        <div
          class="text-xl font-bold flex items-center justify-center w-full h-[60px] relative border-b border-gray-200"
        >
          <span>Gắn thẻ người khác</span>
          <div
            class="absolute cursor-pointer top-1/2 -translate-y-1/2 left-4 w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
            @click="handleBack"
            >
            <i
              style="
                background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yQ/r/shzFU_6ZHy9.png');
                background-position: -52px -62px;
                background-size: 190px 190px;
                width: 20px;
                height: 20px;
                background-repeat: no-repeat;
                display: inline-block;
              "
            ></i>
          </div>
        </div>
      </div>

      <div class="mt-[76px]">
        <div class="px-4 flex items-center w-full justify-between mb-6">
          <div class="w-[85%]">
            <InputSearch @handleSearch="handleSearch" />
          </div>
          <div @click="doneTags">
            <button class="px-3 py-1 text-blue-500 font-medium">Xong</button>
          </div>
        </div>
        <div class="px-2 max-h-[374px] overflow-y-auto">
          <div v-if="listTags?.length>0">
            <div class="text-[13px] text-[#65676B] p-[6px] font-medium">
              ĐÃ GẮN THẺ
            </div>
  
            <div  class="border border-gray-200 rounded-md p-2 flex items-center gap-2 flex-wrap">
              <div
              v-for="(tag,index) in listTags" :key="index"
                class="px-[10px] py-1 rounded-md bg-[#E7F3FF] text-blue-500 text-[15px] w-fit font-medium flex items-center gap-1"
              >
                <span>{{tag.fullName}}</span>
                <div class="w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-100 cursor-pointer" @click="handleDelTag(tag)">
                  <div
                    class="w-3 h-3 flex items-center justify-center overflow-hidden"
                  >
                    <img
                      class="w-full h-full object-cover"
                      src="https://icones.pro/wp-content/uploads/2021/08/icone-x-bleue.png"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="text-[13px] text-[#65676B] p-[6px] font-medium">
            GỢI Ý
          </div>
          <div
            v-for="friend in listSearch"
            :key="friend.user_id"
            class="p-[6px] flex items-center gap-4 hover:bg-gray-200 rounded-md cursor-pointer"
            @click="handleTag(friend)"
          >
            <div
              class="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden"
            >
              <img class="w-full h-full object-cover" :src="friend.avatar" />
            </div>
            <div class="font-medium text-[15px]">
              {{ friend.fullName }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import InputSearch from '../../pages/InputSearch'
export default {
  components: { InputSearch },
  data() {
    return {
      listFriends: null,
      listSearch: null,
      listTags: [],
      user:null
    }
  },
  watch: {
    '$store.state.listFriendModule.listFriends': {
      handler(val) {
        this.listFriends = val
        this.listSearch = val
      },
      deep: true,
      immediate: true,
    },
    '$store.state.authModule.user': {
      handler(val) {
        this.user = val
      },
      immediate: true,
      deep: true,
  }
  },
  created(){
    this.$store.dispatch("getAllFriends", {userId: this.user.user_id})
  }

  ,

  methods: {
    handleSearch(value) {
      this.listSearch = this.listFriends.filter((item) =>
        item.fullName.trim().toUpperCase().includes(value.trim().toUpperCase())
      )
    },
    handleTag(friend){
        this.listTags.push(friend)
        this.listSearch=this.listSearch.filter(item=>item.user_id !== friend.user_id)
    },
    handleDelTag(tag){
      this.listTags=this.listTags.filter(item=>item.user_id !== tag.user_id)
      this.listSearch.unshift(tag)
    },
    doneTags(){
      this.$emit("handleTags", this.listTags)
    },
    handleBack(){
      this.$emit("handleBackTag")
    }
  },
}
</script>
<style scoped lang="css">
.wraper {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}</style>
