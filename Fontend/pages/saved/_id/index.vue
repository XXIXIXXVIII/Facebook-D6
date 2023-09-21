<template>
  <div class="w-[1127px] px-16 pt-4 pb-5">
    <div class="mb-2 flex justify-between">
      <div class="font-bold text-[20px]">Tất cả</div>
      <div
        class="w-[48px] h-[36px] bg-gray-200 rounded-lg hover:bg-gray-300 flex justify-center items-center"
      >
        <i
          data-visualcompletion="css-img"
          class="x1b0d499 xep6ejk"
          style="
            background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yM/r/6T6pArf43MZ.png');
            background-position: 0px -314px;
            background-size: 34px 440px;
            width: 16px;
            height: 16px;
            background-repeat: no-repeat;
            display: inline-block;
          "
        ></i>
      </div>
    </div>
    <div
      class="w-full h-[180px] p-4 rounded-lg bg-white shadow-md shadow-gray-300 border-1 border-gray-300 mb-4"
      v-for="(post, index) in savePost" :key="index"
    >
      <div class="flex gap-2">
        <div class="w-[144px] h-[144px]">
          <img v-if="savePost && post.media && post.media[0] && post.media[0].url && post.media[0].url !== null"
            :src="post.media[0].url"
            class="w-full h-full object-cover rounded-lg border-1 border-gray-300"
          /> 
          <img v-if="savePost && post.media[0] && post.media[0].url && !post.media[0].url"
            :src="post.avatar"
            class="w-full h-full object-cover rounded-lg border-1 border-gray-300"
          />
        </div>
        <div>
          <div v-html="post.content" class="text-[20px] font-bold hover:underline cursor-pointer">
          </div>
          <div class="text-[13px] cursor-pointer hover:underline text-[gray]">
            Bài viết • Đã lưu vào Yêu thích
          </div>
          <div class="flex gap-2 mt-2">
          <div class="w-[30px] h-[30px]">
          <img
            :src="post.avatar"
            class="w-full h-full object-cover rounded-full border-1 border-gray-300"
          />
        </div>
            <p class="text-[13px] text-[gray] mt-1">Đã lưu từ <strong> bài viết của {{ post.fullName }}</strong></p>
          </div>
          <div class="flex gap-2 mt-3 p-[6px]">
             <div class="text-center font-semibold text-[15px] px-4 py-2 w-[223px] h-[36px] rounded-md bg-gray-200 hover:bg-gray-300">Thêm vào bộ sưu tập</div>
             <div class="flex justify-center items-center w-[48px] h-[36px] rounded-md bg-gray-200 hover:bg-gray-300"><i style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/yQ/r/shzFU_6ZHy9.png&quot;); background-position: 0px -172px; background-size: 190px 190px; width: 16px; height: 16px; background-repeat: no-repeat; display: inline-block;"></i></div>
             <div class="flex justify-center items-center w-[48px] h-[36px] rounded-md bg-gray-200 hover:bg-gray-300"><i data-visualcompletion="css-img" class="x1b0d499 xep6ejk" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/yQ/r/shzFU_6ZHy9.png&quot;); background-position: -90px -154px; background-size: 190px 190px; width: 16px; height: 16px; background-repeat: no-repeat; display: inline-block;"></i></div>
             <div class="text-center font-semibold text-[15px] px-4 py-2 w-[223px] h-[36px] rounded-md bg-gray-200 hover:bg-gray-300" @click="deleteStorage(post.id)">Xóa khỏi kho lưu trữ</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { RepositoryFactory } from '../../../apiConfig/RepositoryFactory'
const storage = RepositoryFactory.get('storage')
export default {
  layout: 'layoutPost',

  data() {
    return {
      userId : 0,
      savePost : []
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

  },

  created(){
     this.getSavePost()
  },

  methods : {
    async getSavePost(){
      try {
        const response = await storage.getSavePost({id:this.userId})
        this.savePost = response.data.storages
        console.log('đây là kho lưu nè',this.savePost)
      } catch (error) {
        console.log(error)
      }
    },

    async deleteStorage(id) {
      try {
      await storage.deleteStorage({id})
      } catch (error) {
        console.log(error)
      }
      this.getSavePost()
    }
  }
}
</script>
<style></style>
