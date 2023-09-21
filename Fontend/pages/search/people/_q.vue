<template>
  <div
    style="background-color: #f0f2f5"
    class="flex justify-center items-center flex-col mt-5"
  >
    <!-- Mọi người -->
    <div
      v-if="peoples"
      class="flex justify-center items-center flex-col w-full"
    >
      <div
        v-for="(people, i) in peoples"
        :key="i"
        class="search-block p-5 h-[86.5px] flex items-center"
      >
        <div class="w-[60px] h-[60px] rounded-full overflow-hidden mr-3">
          <img class="w-full h-full object-cover" :src="people.avatar" alt="" />
        </div>
        <div>
          <div
            class="name text-base font-semibold cursor-pointer"
            @click="handleToUserDetail(people.user_id)"
          >
            {{ people.fullName }}
          </div>
          <div v-if="people.isFriend" class="text-sm text-[#65676b]">
            Bạn bè
          </div>
          <div
            v-if="people.commonFriend.length > 0"
            class="text-sm text-[#65676b] mt-1 relative flex items-center"
          >
            <div
              v-for="(friend, index) in people.commonFriend.slice(0, 1)"
              :key="index"
              class="flex absolute items-center"
            >
              <div
                style="border: 3px solid white"
                class="w-[24px] h-[24px] overflow-hidden rounded-full"
              >
                <img
                  class="w-full h-full object-cover"
                  :src="friend.avatar"
                  alt=""
                />
              </div>
              <div v-if="people.commonFriend.length === 1" class="flex ml-1">
                {{ people.commonFriend.length }} bạn chung
              </div>
            </div>
            <div
              v-for="(friend, index) in people.commonFriend.slice(1, 2)"
              :key="index"
              class="flex ml-[17px]"
            >
              <div
                style="border: 3px solid white"
                class="w-[24px] h-[24px] overflow-hidden rounded-full"
              >
                <img
                  class="w-full h-full object-cover"
                  :src="friend.avatar"
                  alt=""
                />
              </div>
              <div class="flex items-center ml-1">
                {{ people.commonFriend.length }} bạn chung
              </div>
            </div>
            <div v-if="people.commonFriend.length === 1">d</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!peoples && !groups && !pages && !posts">
      <search-not-found />
    </div>
    <!-- <p>Search query: {{ searchQuery }}</p> -->
    <!-- Thêm mã HTML và xử lý tìm kiếm ở đây -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { RepositoryFactory } from '../../../apiConfig/RepositoryFactory'
import SearchNotFound from '../../../components/header/logo_search/search/SearchNotFound.vue'
const SearchRepository = RepositoryFactory.get('search')
export default {
  components: { SearchNotFound },
  layout: 'layoutSearch',
  data() {
    return {
      searchResult: undefined,
      peoples: undefined,
    }
  },
  computed: {
    searchQuery() {
      return this.$route.query.q || ''
    },
    ...mapGetters(['getUser']),
    user() {
      return this.getUser
    },
  },

  watch: {
    '$store.state.searchModule.searchResult': {
      handler(newValue, oldValue) {
        console.log(`Giá trị mới: ${newValue}, Giá trị cũ: ${oldValue}`)
        this.searchResult = newValue
        if (newValue.usersWithFriend && newValue.usersWithFriend.length > 0) {
          this.peoples = newValue.usersWithFriend
        }
      },
      deep: true,
      immediate: true,
    },
  },

  created() {
    this.handleSearchValue()
  },

  methods: {
    async handleSearchValue() {
      try {
        const response = await SearchRepository.searchUser(
          {
            value: this.searchQuery,
            userId: this.user.user_id,
          },
          { search_type: 'User' }
        )
        console.log('ress ===>', response.data)
        this.$store.commit('setSearchResult', response.data)
      } catch (error) {}
    },
    handleToUserDetail(userId) {
      this.$router.push(`/${userId}`)
    },
  },
}
</script>

<style scoped>
.search-block {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  margin: 10px;
  border: 1px solid rgb(228, 228, 228);
  border-radius: 8px;
  width: 62%;
  background-color: white;
}

.name:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
