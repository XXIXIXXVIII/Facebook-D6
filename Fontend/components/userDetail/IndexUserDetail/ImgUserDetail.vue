<template>
  <div>
    <div class="w-full my-4">
      <div class="w-[1031px] m-auto">
        <div
          class="about w-[1017px] rounded-lg border border-gray-300 p-4 ml-2"
        >
          <div class="flex justify-between w-full h-[36px] mb-2">
            <div class="text-[20px] font-bold">Ảnh</div>
            <div class="flex gap-3">
              <div
                class="text-[#1877F2] w-[135px] h-full flex justify-center items-center font-medium cursor-pointer hover:bg-gray-100 rounded-md"
              >
                Thêm ảnh/video
              </div>
              <div
                class="w-[48px] h-[36px] bg-[#ECF3FF] flex justify-center items-center rounded-md hover:bg-[#e6eefc]"
              >
                <button class="mt-[-9px] text-black font-bold text-xl">
                  ...
                </button>
              </div>
            </div>
          </div>
          <div class="flex gap-4 mb-5">
            <button
                class="btn-active w-[110px] h-full font-semibold text-[15px] pb-[12px]"
              >
                Ảnh của bạn
            </button>
            <button
                class="btn flex justify-center items-center w-[110px] h-full font-semibold text-[15px] pb-[12px]"
              >
                Album
            </button>
          </div>
          <div class="grid grid-cols-4 gap-4">
             <div class="w-[193px] h-[193px]" v-for="(img, index) in images" :key="index">
                <img :src="img.url" class="w-full h-full rounded-md object-cover">
             </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { RepositoryFactory } from '../../../apiConfig/RepositoryFactory'
const userRepository = RepositoryFactory.get('user')
export default {
  data() {
    return {
      images: [],
    }
  },

  watch: {
    '$store.state.idFriendModule.userDetail': {
      handler(val) {
        this.inforDetail = val ? val.user_id : null
        this.getImgUser(this.inforDetail);
      },
      immediate: true,
    },
  },
  
  methods: {
    async getImgUser(){
      try {
        const response = await userRepository.getImgUser(this.inforDetail)
        this.images = response.data.images
        console.log(this.images)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style  scoped lang="css">
.about {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.btn-active{
  color: rgb(4, 117, 255) !important;
  border-bottom: 3px solid rgb(4, 117, 255);
}

.btn {
  color: rgb(125, 125, 125) !important;
}

.btn:hover {
  background-color: rgba(243, 239, 239, 0.801);
  border-radius: 8px;
}
</style>
