<template>
  <div>
    <div
      v-if="showModal"
      class="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-slate-50 opacity-70"
    ></div>
    <div
      v-if="showModal"
      style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px"
      class="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[548px] bg-white rounded-lg"
    >
      <div>
        <div class="px-4 py-[10px] border-b border-gray-300 pt-1 mb-2">
          <div
            class="flex justify-end absolute right-[10px] top-3 w-6 h-6 cursor-pointer"
            @click="closeModal"
          >
            <img
              class="w-full h-full object-cover"
              src="../../../assets/loginImg/C6QZ-pcv3Bd.png"
            />
          </div>
          <div
            class="text-[#1c1e21] text-center text-[20px] leading-[38px] mb-0 font-bold"
          >
            Lưu bài viết
          </div>
        </div>
        <div class="scrollable-content max-h-[400px] overflow-y-auto px-5 py-2">
          <div class="flex justify-between">
            <div class="flex gap-3">
              <div class="w-[48px] h-[48px]">
                <img
                  src="https://i.pinimg.com/550x/a7/8d/8a/a78d8ab6dbfb7293daefbb63ea1a9ea0.jpg"
                  class="w-full h-full object-cover rounded-lg border-1 border-gray-300"
                />
              </div>
              <div class="font-semibold text-[18px]">
                Yêu thích
                <p class="text-gray-400 text-[12px]"><i style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/ym/r/LLdZ2PbE6Vi.png&quot;); background-position: -18px -266px; background-size: 34px 324px; width: 12px; height: 12px; background-repeat: no-repeat; display: inline-block; margin-right: 5px; margin-top:2px"></i>chỉ mình tôi</p>
              </div>
            </div>
            <div class="mt-2">
              <input type="radio" class="w-4 h-4 text-blue-500 border-2 border-blue-500 rounded-full"> 
            </div>
          </div>
        </div>
      </div>
      <div
        class="border-t-[2px] border-gray-200 w-full px-3 py-4 ml-[1px] bg-white"
      >
        <div class="flex justify-end">
        <nuxt-link :to="`/saved/${userId}`">
          <button
            class="w-[108px] h-[36px] bg-[#1B74E4] px-5 rounded-md font-semibold text-white hover:bg-[#2467b9]"
            :disabled="postSaved"
            @click="savePost"
          >
            Xong
          </button>
        </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { RepositoryFactory } from '../../../apiConfig/RepositoryFactory'
const storage = RepositoryFactory.get('storage')
export default {
  props: {
    showModal: Boolean,
    post: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      userId : 0,
      postId : 0,
    }
  },

  watch: {
    '$store.state.authModule.user': {
      handler(val) {
        this.userId = val ? val.user_id : null
        console.log('userId ở lưu' , this.userId)
      },
      immediate: true,
      deep: true,
    },

    '$store.state.postUserDetail.postId': {
      handler(val) {
        this.idPost = val.post_id
      },
      immediate : true,
      deep: true,
    }
  },

  created(){
    console.log('đây là id post lưu',this.post.post_id)
  },

  methods: {
    closeModal() {
      this.$emit('close-modal') // Emit an event to parent component
    },

    async savePost() {
      try {
        const response = storage.savePost({id : this.userId , postId : this.post.post_id})
        console.log('lưu thành công rồi' , response)
      } catch (error) {
        console.log(error)
      }
      this.closeModal()
    }
  },
}
</script>
<style></style>
