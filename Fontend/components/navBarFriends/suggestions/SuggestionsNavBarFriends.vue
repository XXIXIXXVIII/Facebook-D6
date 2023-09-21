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
        <div class="text-2xl font-bold">Gợi ý</div>
      </div>
    </div>
    <div>
      <div class="pt-3 pb-1 font-semibold px-2">
        Những người bạn có thể biết
      </div>

      <!-- =============== item ================ -->
      <div class="h-[calc(100vh-190px)] w-full overflow-y-auto px-2">
        <!-- <div
          class="flex gap-4 px-2 py-2 hover:bg-[#F0F2F5] cursor-pointer rounded-md mt-2"
        >
          <div
            class="w-[60px] h-[60px] rounded-full overflow-hidden flex items-center justify-center"
          >
            <img
              class="w-full h-full object-cover"
              src="https://media.vov.vn/sites/default/files/styles/large/public/2023-06/gd.jpg"
            />
          </div>
          <div class="w-[75%]">
            <div class="flex items-center justify-between w-full">
              <div class="text-sm font-medium">Ró se</div>
            </div>
  
            <div class="flex items-center relative">
              <div
                class="w-5 h-5 rounded-full overflow-hidden border-2 border-white flex items-center justify-center left-0 z-10"
              >
                <img
                  class="w-full h-full object-cover"
                  src="https://image2.tin247.news/webps/2023/04/26/ivo1682515550.jpg.webp"
                />
              </div>
              <div
                class="w-5 h-5 rounded-full overflow-hidden border-2 border-white flex items-center justify-center left-[14px] absolute"
              >
                <img
                  class="w-full h-full object-cover"
                  src="https://image2.tin247.news/webps/2023/04/26/ivo1682515550.jpg.webp"
                />
              </div>
              <div class="text-xs text-[#65676B] ml-5">6 bạn chung</div>
            </div>
  
            <div class="flex items-center gap-3 mt-2 pr-2">
              <div class="flex w-1/2 items-center gap-3">
                <button
                  class="px-3 w-full h-9 text-[15px] font-semibold text-white bg-[#1B74E4] rounded-md hover:bg-blue-600"
                >
                  Thêm bạn bè
                </button>
              </div>
              <div class="flex w-1/2 items-center gap-3 ">
                <button
                  class="px-3 w-full h-9 text-[15px] font-semibold bg-[#E4E6EB] rounded-md hover:bg-gray-300"
                >
                  Xóa, gỡ
                </button>
              </div>
            </div>
          </div>
        </div> -->
        <div v-for="user in suggestions" :key="user.user_id">
          <ItemSuggestions :id="id" :suggestions="user" />
        </div>
      </div>

      <!-- =============== item ================ -->
    </div>
  </div>
</template>
<script>
import { RepositoryFactory } from '../../../apiConfig/RepositoryFactory'
import ItemSuggestions from './ItemSuggestions.vue'
const friendsRepository = RepositoryFactory.get('friendsRepository')
export default {
  name: 'SuggestionsNavBarFriends',
  components: { ItemSuggestions },
  data() {
    return {
      suggestions: [],
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
    this.fetchSuggestionsFriends()
  },

  methods: {
    async fetchSuggestionsFriends() {
      try {
        const result = await friendsRepository.suggestionssFriends({
          userId: this.userId,
        })
        this.suggestions = result.data.sortSuggestsFriends
        console.log(this.suggestions)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
<style lang=""></style>
