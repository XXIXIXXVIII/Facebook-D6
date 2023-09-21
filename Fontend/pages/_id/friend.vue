<template>
  <div>
    <div class="w-full my-4">
      <div class="w-[1031px] m-auto">
        <div
          class="about w-[1017px] rounded-lg border border-gray-300 p-4 ml-2"
        >
          <div class="flex justify-between w-full h-[36px] mb-5">
            <div class="text-[20px] font-bold">Bạn bè</div>
            <div class="flex gap-3">
              <div
                class="h-full flex justify-center items-center rounded-md relative"
              >
                <i
                  data-visualcompletion="css-img"
                  class="absolute left-[15px]"
                  style="
                    background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/eKOSQ3d11kk.png');
                    background-position: -144px -154px;
                    background-size: 190px 204px;
                    width: 16px;
                    height: 16px;
                    background-repeat: no-repeat;
                    display: inline-block;
                  "
                ></i>
                <input
                  type="text"
                  class="border rounded-full w-52 h-[35px] py-2 px-4 pl-[34px] placeholder-gray-500 text-gray-800 bg-gray-200 outline-none"
                  placeholder="Tìm kiếm"
                />
              </div>
              <div
                class="text-[#1877F2] w-[135px] h-full flex justify-center items-center font-medium cursor-pointer hover:bg-gray-100 rounded-md"
              >
                Lời mời kết bạn
              </div>
              <div
                class="text-[#1877F2] w-[135px] h-full flex justify-center items-center font-medium cursor-pointer hover:bg-gray-100 rounded-md"
              >
                Tìm bạn bè
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
              Tất cả bạn bè
            </button>
            <button
              class="btn flex justify-center items-center h-full font-semibold text-[15px] pb-[12px]"
            >
              Đã thêm gần đây
            </button>
            <button
              class="btn flex justify-center items-center h-full font-semibold text-[15px] pb-[12px]"
            >
              Sinh nhật
            </button>
            <button
              class="btn flex justify-center items-center h-full font-semibold text-[15px] pb-[12px]"
            >
              Tỉnh/thành phố hiện tại
            </button>
            <button
              class="btn flex justify-center items-center h-full font-semibold text-[15px] pb-[12px]"
            >
              Quê quán
            </button>
            <button
              class="btn flex justify-center items-center h-full font-semibold text-[15px] pb-[12px]"
            >
              Người theo dõi
            </button>
            <button
              class="btn flex justify-center items-center h-full font-semibold text-[15px] pb-[12px]"
            >
              Đang theo dõi
            </button>
          </div>
          <div>
            <div class="mb-5 grid grid-cols-2 gap-1">
  <div
    v-for="(friend, index) in resultFriend"
    :key="index"
    class="flex justify-between w-[445px] h-[115px] p-1 border border-gray-100 rounded-md"
  >
    <div class="flex gap-3">
      <div
        class="w-[80px] h-[80px] border-2 rounded-lg border-gray-100"
      >
        <img
          :src="friend.avatar"
          class="w-full h-full rounded-lg border-2 border-gray-100"
        />
      </div>
      <div class="mt-[20px]">
        <a :href="`/${friend.user_id}`">
        <p
          class="font-bold text-[17px] cursor-pointer hover:underline"
        >
          {{ friend.fullName }} <!-- Sử dụng friend.fullName thay vì inforFriend.fullName -->
        </p>
      </a>
        <p 
          class="text-gray-500 text-[14px] cursor-pointer hover:underline"
        >
          {{ friend.mutualFriends.length }} bạn chung
        </p>
      </div>
    </div>
    <div
      class="flex justify-center items-center mt-[2.25rem] w-[24px] h-[24px] hover:bg-gray-200 rounded-full"
    >
      <i
        data-visualcompletion="css-img"
        class="x1b0d499 xep6ejk"
        style="
          background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/a0-jMUNGH_Q.png');
          background-position: -26px -62px;
          background-size: 190px 204px;
          width: 24px;
          height: 24px;
          background-repeat: no-repeat;
          display: inline-block;
        "
      ></i>
      </div>
    </div>
  </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <img-user-detail />
    </div>
    <div class="mt-4">
      <sport-user-detail />
    </div>
    <div class="mt-4">
      <music-user-detail />
    </div>
    <div class="mt-4">
      <movie-user-detail />
    </div>
    <div class="mt-4">
      <t-v-user-detail />
    </div>
    <div class="mt-4">
      <book-user-detail />
    </div>
  </div>
</template>

<script>
import ImgUserDetail from '../../components/userDetail/IndexUserDetail/ImgUserDetail.vue'
import SportUserDetail from '../../components/userDetail/IndexUserDetail/SportUserDetail.vue'
import MusicUserDetail from '../../components/userDetail/IndexUserDetail/MusicUserDetail.vue'
import MovieUserDetail from '../../components/userDetail/IndexUserDetail/MovieUserDeatil.vue'
import TVUserDetail from '../../components/userDetail/IndexUserDetail/TVUserDetail.vue'
import BookUserDetail from '../../components/userDetail/IndexUserDetail/BookUserDetail.vue'
import { RepositoryFactory } from '../../apiConfig/RepositoryFactory'
const friendsRepository = RepositoryFactory.get('friendsRepository')
export default {
  components:{
    ImgUserDetail,
    SportUserDetail,
    MusicUserDetail,
    MovieUserDetail,
    TVUserDetail,
    BookUserDetail,
  },
  layout: 'userDetail',

  data() {
    return {
      resultFriend: [],
      inforDetail: [],
      inforFriend: [],
    }
  },

  watch: {
    '$store.state.idFriendModule.friends': {
      handler(val) {
        this.inforFriend = val
        console.log('trang friend',this.inforFriend)
      },
      immediate: true,
    },

    '$store.state.idFriendModule.userDetail': {
      handler(val) {
        this.inforDetail = val?val.user_id : null
        this.getFriendByUserId(this.inforDetail);
      },
      immediate: true,
    },
  },

  methods: {
    async getFriendByUserId() {
      try {
      const response = await friendsRepository.getFriends(this.inforDetail)
      this.resultFriend = response.data.friendsWithMutual
      console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped></style>
