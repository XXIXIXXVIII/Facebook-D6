<template>
  <div
    style="background-color: #f0f2f5"
    class="flex items-center flex-col mt-5 h-[630px]"
  >
    <!-- Nhóm -->
    <div v-if="groups" class="flex justify-center items-center flex-col w-full">
      <div
        v-for="(group, i) in groups"
        :key="i"
        class="search-block p-5 h-[86.5px] flex items-center"
      >
        <div class="w-[60px] h-[60px] rounded-full overflow-hidden mr-3">
          <img
            class="w-full h-full object-cover"
            :src="group.coverAvatar"
            alt=""
          />
        </div>
        <div>
          <div
            class="name text-base font-semibold cursor-pointer"
            @click="handleToUserDetail(group.groupId)"
          >
            {{ group.groupName }}
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
        console.log(`Giá trị mới: ${newValue}, Giá trị cũ: ${oldValue}`)
        this.searchResult = newValue
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
          { search_type: 'Group' }
        )

        this.$store.commit('setSearchResult', response.data.result)
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
}
</style>
