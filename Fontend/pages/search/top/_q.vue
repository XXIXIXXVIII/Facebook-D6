<template>
  <div class="flex justify-center items-center flex-col mt-5">
    <!-- Mọi người -->
    <div v-if="peoples" class="search-block p-5">
      <div class="font-bold text-xl">Mọi người</div>
      <div
        v-for="(people, i) in peoples.slice(0, 3)"
        :key="i"
        class="h-[86.5px] w-full flex items-center"
      >
        <div class="w-[60px] h-[60px] rounded-full overflow-hidden mr-3">
          <img class="w-full h-full object-cover" :src="people.avatar" alt="" />
        </div>
        <div>
          <div
            class="name text-base font-semibold"
            @click="handleToDetail(people)"
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
      <nuxt-link
        :to="'/search/people?q=' + searchQuery"
        class="w-full flex items-center justify-center bg-gray-200 rounded-lg h-[36px] text-sm font-medium mt-1 cursor-pointer hover:bg-[#cfd0d2]"
      >
        Xem tất cả
      </nuxt-link>
    </div>
    <!-- Trang -->
    <div v-if="pages" class="search-block p-5">
      <div class="font-bold text-xl">Trang</div>
      <div
        v-for="(page, i) in pages.slice(0, 3)"
        :key="i"
        class="h-[86.5px] w-full flex items-center"
      >
        <div class="w-[60px] h-[60px] rounded-full overflow-hidden mr-3">
          <img class="w-full h-full object-cover" :src="page.avatar" alt="" />
        </div>
        <div>
          <div
            class="name text-base font-semibold"
            @click="handleToDetail(page)"
          >
            {{ page.fullName }}
          </div>
        </div>
      </div>
      <nuxt-link
        :to="'/search/pages?q=' + searchQuery"
        class="w-full flex items-center justify-center bg-gray-200 rounded-lg h-[36px] text-sm font-medium mt-1 cursor-pointer hover:bg-[#cfd0d2]"
      >
        Xem tất cả
      </nuxt-link>
    </div>
    <!-- Nhóm -->
    <div v-if="groups" class="search-block p-5">
      <div class="font-bold text-xl">Nhóm</div>
      <div
        v-for="(group, i) in groups.slice(0, 3)"
        :key="i"
        class="h-[86.5px] w-full flex items-center"
      >
        <div class="w-[60px] h-[60px] rounded-lg overflow-hidden mr-3">
          <img
            class="w-full h-full object-cover"
            :src="group.coverAvatar"
            alt=""
          />
        </div>
        <div>
          <div
            class="name text-base font-semibold"
            @click="handleToDetail(group)"
          >
            {{ group.groupName }}
          </div>
        </div>
      </div>
      <nuxt-link
        :to="'/search/groups?q=' + searchQuery"
        class="w-full flex items-center justify-center bg-gray-200 rounded-lg h-[36px] text-sm font-medium mt-1 cursor-pointer hover:bg-[#cfd0d2]"
      >
        Xem tất cả
      </nuxt-link>
    </div>
    <div v-for="item in posts" :key="item.post_id" class="search-block p-5">
      <external-post :post="item" />
    </div>
    <div v-if="!peoples && !groups && !pages && !posts">
      <search-not-found />
    </div>
    <p>Search query: {{ searchQuery }}</p>
    <!-- Thêm mã HTML và xử lý tìm kiếm ở đây -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { RepositoryFactory } from '../../../apiConfig/RepositoryFactory'
import SearchNotFound from '../../../components/header/logo_search/search/SearchNotFound.vue'
import ExternalPost from '../../../components/post/ExternalPost.vue'
const SearchRepository = RepositoryFactory.get('search')
export default {
  components: { SearchNotFound, ExternalPost },
  layout: 'layoutSearch',
  data() {
    return {
      searchResult: undefined,
      peoples: undefined,
      posts: undefined,
      pages: undefined,
      groups: undefined,
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
        this.searchResult = newValue
        if (newValue.usersWithFriend && newValue.usersWithFriend.length > 0) {
          this.peoples = newValue.usersWithFriend
        }
        if (newValue.postsWithMedia && newValue.postsWithMedia.length > 0) {
          this.posts = newValue.postsWithMedia
        }
        if (newValue.pages && newValue.pages.length > 0) {
          this.pages = newValue.pages
        }
        if (newValue.groups && newValue.groups.length > 0) {
          this.groups = newValue.groups
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
          { search_type: 'All' }
        )
        this.$store.commit('setSearchResult', response.data)
        console.log('test ===>', response.data)
      } catch (error) {}
    },
    handleToDetail(value) {
      if (value.user_id) {
        this.$router.push(`/${value.user_id}`)
      } else if (value.page_id) {
        this.$router.push(`/${value.page_id}`)
      } else if (value.groupId) {
        this.$router.push(`/groups/${value.groupId}`)
      }
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
