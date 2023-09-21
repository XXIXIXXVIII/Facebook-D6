<template>
  <div
    style="box-shadow: -7.5px 10px 15px 5px rgba(37, 37, 37, 0.26)"
    class="search-board-container top-0 left-0 w-[320px] max-h-[525px] min-h-[100px] bg-white dark:bg-[#242526] dark:text-white rounded-[8px] absolute z-10 pr-[1rem] pl-[1rem]"
  >
    <div class="relative">
      <div class="pt-[61px] mb-3">
        <div class="flex flex-col box-border w-[295px] justify-center">
          <!-- Chỉnh sửa tìm kiếm -->
          <div
            v-if="showRecently === true"
            class="flex justify-between items-center pb-2"
          >
            <div class="font-semibold">Tìm kiếm gần đây</div>
            <div
              class="text-[#216FDB] text-[.875rem] pr-2 box-border cursor-pointer"
            >
              Chỉnh sửa
            </div>
          </div>

          <!-- Tìm kiếm gần đây -->
          <span v-if="showRecently">
            <div
              v-for="(recently, index) in recentlySearchValue.slice(0, 8)"
              :key="index"
              class="recently-search flex items-center relative p-2 m-0 cursor-pointer overflow-hidden rounded-lg dark:hover:bg-[#838383]"
            >
              <!-- Giá trị tìm kiếm gần đây -->
              <div
                v-if="recently.search_data"
                class="flex items-center flex-row box-border m-[-6px] pl-1 justify-between w-[250px] h-[49px] overflow-hidden text-ellipsis whitespace-nowrap"
              >
                <!-- Icon lịch sử -->
                <div
                  style="padding: 6px 6px 6px 6px"
                  class="rounded-full bg-[#f2f3f5] mr-3"
                >
                  <img
                    src="https://icons.veryicon.com/png/o/business/official-icon-of-the-insurer/history-17.png"
                    alt=""
                    width="22px"
                    height="22x"
                    class="text-gray-500"
                  />
                </div>
                <!-- Thông tin cần tìm kiếm -->
                <div
                  class="w-[215px] h-[19.65px] flex items-center text-[15px]"
                  @click="handleToSearchPage(recently.search_data)"
                >
                  {{ recently.search_data }}
                </div>
              </div>

              <!-- Thông tin tìm kiếm người dùng gần đây -->
              <div
                v-if="recently.avatar && recently.fullName && recently.status"
                class="flex items-center flex-row box-border m-[-6px] pl-1 w-[250px] h-[49px] overflow-hidden text-ellipsis whitespace-nowrap"
                @click="handleToUserDetail(recently.user_id)"
              >
                <!-- Icon avatar -->
                <div
                  style="border: 1px solid rgb(198, 198, 198)"
                  class="w-[38px] h-[38px] rounded-full overflow-hidden"
                >
                  <img
                    width="100%"
                    height="100%"
                    style="object-fit: cover"
                    :src="recently.avatar"
                    alt=""
                  />
                </div>
                <!-- Thông tin người dùng -->
                <div class="ml-2 cursor-pointer">
                  <div class="text-[14px] font-medium">
                    {{ recently.fullName }}
                  </div>
                  <div class="text-[12px] text-gray-500">
                    {{ recently.status }}
                  </div>
                </div>
              </div>

              <!-- Xóa tìm kiếm gần đây -->
              <div @click="handleDeleteRecently(recently.id)">
                <img
                  src="https://openclipart.org/image/2000px/324409"
                  alt=""
                  class="x-search w-[25px] h-[25px] mr-[7px] p-[6px] rounded-full"
                />
              </div>
            </div>
          </span>

          <!-- Kết quả tìm kiếm người dùng -->
          <span v-if="!showRecently">
            <div
              v-for="(value, index) in searchValue"
              :key="index"
              class="recently-search flex items-center relative p-2 m-0 cursor-pointer overflow-hidden rounded-lg"
              @click="handleSendSearchValue(value.user_id)"
            >
              <div
                class="flex items-center flex-row box-border m-[-6px] pl-1 w-[300px] h-[49px] overflow-hidden text-ellipsis whitespace-nowrap"
              >
                <!-- Icon avatar -->
                <div
                  style="border: 1px solid rgb(198, 198, 198)"
                  class="w-[38px] h-[38px] rounded-full overflow-hidden"
                >
                  <img
                    class="w-full h-full object-cover"
                    :src="value.avatar"
                    alt=""
                  />
                </div>
                <!-- Thông tin người dùng -->
                <div class="ml-2 cursor-pointer">
                  <div class="text-[14px] font-medium">
                    {{ value.fullName }}
                  </div>
                  <div class="text-[12px] text-gray-500">
                    {{ value.status }}
                  </div>
                </div>
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { RepositoryFactory } from '../../../../apiConfig/RepositoryFactory'
const SearchRepository = RepositoryFactory.get('search')
export default {
  name: 'SearchBoard',
  props: {
    showRecently: {
      type: Boolean,
      default: true,
    },
    searchValue: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      newRecentlySearchValue: {
        search_data: null,
        avatar: null,
        fullName: null,
        status: null,
      },
      recentlySearchValue: [],
    }
  },
  computed: {
    ...mapGetters(['getUser']),
    user() {
      return this.getUser
    },
  },

  created() {
    // Gọi hàm render tìm kiếm gần đây
    this.handleShowRecently()
  },

  methods: {
    // Hàm render tìm kiếm gần đây
    async handleShowRecently() {
      try {
        const response = await SearchRepository.searchRecently(
          this.user.user_id
        )
        this.recentlySearchValue = response.data
      } catch (error) {}
    },

    // Hàm xóa tìm kiếm gần đây
    async handleDeleteRecently(id) {
      try {
        const response = await SearchRepository.deleteSearch(id)
        console.log('response ===>', response)
        this.handleShowRecently()
      } catch (error) {}
    },

    // Hàm gửi giá trị tìm kiếm để tìm người dùng
    async handleSendSearchValue(userId) {
      this.$router.push(`/${userId}`)
      try {
        const response = await SearchRepository.postSearchUserValue(
          this.user.user_id,
          {
            user_id_search: userId,
          }
        )
        this.value.searchValue = response.data
      } catch (error) {
        console.log(error)
      }
    },

    handleToUserDetail(userId) {
      this.$router.push(`/${userId}`)
    },

    // Hàm đến trang search
    handleToSearchPage(searchData) {
      this.$router.push(`/search/top?q=${searchData}`)
    },
  },
}
</script>

<style scoped>
.search-board-container {
  overflow: hidden;
}

.recently-search:hover {
  background-color: #eeeef1;
}

.x-search:hover {
  background-color: #dee0e3;
}
</style>
