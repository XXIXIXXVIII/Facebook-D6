<template>
  <div class="flex justify-center items-center flex-col mt-5">
    <div v-for="item in posts" :key="item.post_id" class="search-block p-5">
      <external-post :post="item" />
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
import ExternalPost from '../../../components/post/ExternalPost.vue'
const SearchRepository = RepositoryFactory.get('search')
export default {
  components: { SearchNotFound, ExternalPost },
  layout: 'layoutSearch',
  data() {
    return {
      searchResult: undefined,
      posts: undefined,
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
        if (newValue.postsWithMedia && newValue.postsWithMedia.length > 0) {
          this.posts = newValue.postsWithMedia
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
          { search_type: 'Post' }
        )
        this.$store.commit('setSearchResult', response.data)
      } catch (error) {}
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
</style>
