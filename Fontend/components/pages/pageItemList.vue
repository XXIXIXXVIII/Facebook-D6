<template lang="">
           <div  class="item bg-white w-full rounded-lg">
            <div class="w-full h-[146.6px] flex items-center justify-center">
              <img
                class="w-full h-full object-cover"
                :src="page.cover_img"
              />
            </div>
            <div class="px-4 pt-3 flex items-start gap-2">
              <nuxt-link
              :to="`/${page.page_id}`"
                class="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center mt-1"
              >
                <img
                  class="w-full h-full object-cover"
                  :src="page.avatar "
                />
              </nuxt-link>
              <div class="w-[80%] h-28">
                <nuxt-link :to="`/${page.page_id}`" class="text-xl font-bold">{{ page.fullName }}</nuxt-link>
                <div class="text-[13px] text-[#65676B] font-medium">
                  {{page.fullName}}
                </div>
                <div class="text-[13px] text-[#65676B]">
                  Nguyễn Xuân Trường và 3 người khác thích trang này
                </div>
              </div>
            </div>
            <div class="p-4">
              <button
                class="bg-[#E4E6EB] rounded-lg text-[15px] font-medium w-full text-center h-9"
                :class="liked ? 'pointer-events-none opacity-50' : '' "
                @click="handleLike"
              >
                <i
                  style="
                    background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/IOkwzH65arb.png');
                    background-position: 0px -530px;
                    background-size: 34px 620px;
                    width: 16px;
                    height: 16px;
                    background-repeat: no-repeat;
                    display: inline-block;
                  "
                ></i>
                <span v-if="liked">Đã Thích</span>
                <span v-if="!liked">Thích</span>
              </button>
            </div>
          </div>
</template>
<script>
import { RepositoryFactory } from '../../apiConfig/RepositoryFactory'
const followRepository = RepositoryFactory.get('followRepository')
export default {
  props:{
    page:{
      type:Object,
      default:()=>{}
    }
  },
  data(){
    return {
      liked:false,
      user:null
    }
  },
  watch:{
  '$store.state.authModule.user': {
      handler(val) {
        this.user = val
      },
      immediate: true,
      deep: true,
    },
  },
  methods:{
    handleLike(){
      console.log(this.user);
      this.liked = true
      followRepository.followPage({id:this.page.page_id, followerId:  this.user.user_id})
    }
  }
}
</script>
<style lang="">
  
</style>