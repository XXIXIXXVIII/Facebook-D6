<template lang="">
  <div>
    <div class="flex items-center gap-2 mt-3 pb-2">
      <nuxt-link to="/friends">
        <div
          class="w-9 h-9 rounded-full flex items-center justify-center hover:bg-slate-200 cursor-pointer"
        >
          <i
            style="
              background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/UMAvBmuqi-U.png');
              background-position: -78px -62px;
              background-size: 190px 200px;
              width: 20px;
              height: 20px;
              background-repeat: no-repeat;
              display: inline-block;
              filter: invert(40%);
            "
          ></i>
        </div>
      </nuxt-link>
      <div>
        <div class="text-[#65676B] text-xs">Bạn bè</div>
        <div class="text-2xl font-bold">Tất cả bạn bè</div>
      </div>
    </div>



      <div class="px-4">
        <label
          class="min-h-[40px] w-full box-border flex items-center relative rounded-[50px] cursor-default align-middle bg-[#f0f2f5]"
        >
          <!-- Search icon -->
          <span
        
            class="pl-3 cursor-pointer"

          >
            <svg
              fill="currentColor"
              viewBox="0 0 16 16"
              class="w-[1em] h-[1em] block text-[#65676b]"
            >
              <g fill-rule="evenodd" transform="translate(-448 -544)">
                <g fill-rule="nonzero">
                  <path
                    d="M10.743 2.257a6 6 0 1 1-8.485 8.486 6 6 0 0 1 8.485-8.486zm-1.06 1.06a4.5 4.5 0 1 0-6.365 6.364 4.5 4.5 0 0 0 6.364-6.363z"
                    transform="translate(448 544)"
                  ></path>
                  <path
                    d="M10.39 8.75a2.94 2.94 0 0 0-.199.432c-.155.417-.23.849-.172 1.284.055.415.232.794.54 1.103a.75.75 0 0 0 1.112-1.004l-.051-.057a.39.39 0 0 1-.114-.24c-.021-.155.014-.356.09-.563.031-.081.06-.145.08-.182l.012-.022a.75.75 0 1 0-1.299-.752z"
                    transform="translate(448 544)"
                  ></path>
                  <path
                    d="M9.557 11.659c.038-.018.09-.04.15-.064.207-.077.408-.112.562-.092.08.01.143.034.198.077l.041.036a.75.75 0 0 0 1.06-1.06 1.881 1.881 0 0 0-1.103-.54c-.435-.058-.867.018-1.284.175-.189.07-.336.143-.433.2a.75.75 0 0 0 .624 1.356l.066-.027.12-.061z"
                    transform="translate(448 544)"
                  ></path>
                  <path
                    d="m13.463 15.142-.04-.044-3.574-4.192c-.599-.703.355-1.656 1.058-1.057l4.191 3.574.044.04c.058.059.122.137.182.24.249.425.249.96-.154 1.41l-.057.057c-.45.403-.986.403-1.411.154a1.182 1.182 0 0 1-.24-.182zm.617-.616.444-.444a.31.31 0 0 0-.063-.052c-.093-.055-.263-.055-.35.024l.208.232.207-.206.006.007-.22.257-.026-.024.033-.034.025.027-.257.22-.007-.007zm-.027-.415c-.078.088-.078.257-.023.35a.31.31 0 0 0 .051.063l.205-.204-.233-.209z"
                    transform="translate(448 544)"
                  ></path>
                </g>
              </g>
            </svg>
          </span>
        

          <!-- Input -->
          <input
          
            placeholder="Tìm kiếm bạn bè"
            style="padding: 7px 8px 9px"
            class="h-10 outline-none text-[.9375rem] text-[#050505] placeholder:text-[#707276] bg-transparent"
          />
        </label>
      </div>


    <div>
      <div class="pt-3 pb-1 font-semibold px-2 m-4">
        Những người bạn có thể biết
      </div>

      <div class="pt-3 pb-1 font-semibold px-4 border-t border-gray-300">
        {{allFriends.length}} Người bạn
      </div>

      <!-- =============== item ================ -->
      <div class="h-[calc(100vh-190px)] w-full overflow-y-auto px-2">
  
      
        <div v-for="friend in allFriends" :key="friend.user_id"><ItemListAllFriends :id="id" :friend="friend"/></div>
      </div>

      <!-- =============== item ================ -->
    </div>
  </div>
</template>
<script>
import { RepositoryFactory } from '../../../apiConfig/RepositoryFactory'
import ItemListAllFriends from './ItemListAllFriends.vue'
const friendsRepository = RepositoryFactory.get('friendsRepository')

export default {
  name: 'ListAllNavBarFriends',
  components:{ItemListAllFriends},
  data() {
    return {
      allFriends: [],
      id: 0,
    }
  },
  computed: {
    userId() {
      return this.$store.state.authModule.user.user_id
    },
  },
  watch: {
    '$store.state.idFriendModule.userDetail': {
      handler(val) {
        if (val) {
          this.id = val?.user_id
        }
      },
      immediate: true,
    },
  },
  created() {
    this.fetchAllFriends()
  },
  methods: {
    async fetchAllFriends() {
      try {
        const result = await friendsRepository.allFriend({
          userId: this.userId,
        })
        this.allFriends = result.data.friendsWithMutual
        console.log(this.allFriends)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
<style lang=""></style>
