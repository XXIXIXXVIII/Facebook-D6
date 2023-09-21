<template>
  <div class="p-0 m-0">
    <div
      class="relative z-20 max-[890px]:w-auto flex box-border items-center pl-4 pr-4 m-w-[320px] h-[56px] cursor-pointer"
    >
      <div
        v-if="toggle.showSearch"
        class="fixed w-screen h-screen bg-transparent top-[56px] left-[320px]"
      ></div>

      <!-- Nút back -->
      <span
        v-if="toggle.showSearch"
        class="back flex w-100 items-center shrink-0 text-black p-2 rounded-full"
        @click="handleShowSearch"
      >
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-html="icon.backArrow"></span>
      </span>

      <!-- Logo -->
      <nuxt-link v-else to="/" class="flex w-100 items-center shrink-0">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <a class="pr-0 min-h-0 shrink-0" v-html="icon.logo"> </a>
      </nuxt-link>
      <div v-if="!toggle.showSearch" class="w-[8px] flex">&nbsp;</div>

      <!-- Tìm kiếm -->
      <span v-if="toggle.showSearch">&nbsp;&nbsp;</span>
      <label
        class="w-100 min-w-[40px] min-h-[40px] box-border flex items-center relative rounded-[50px] cursor-default align-middle bg-[#f0f2f5] dark:bg-[#3A3B3C]"
        @click="handleShowSearch"
      >
        <!-- Search icon -->
        <span
          v-if="!toggle.showSearch"
          class="pl-3 cursor-pointer"
          @click="handleShowSearch"
        >
          <!-- eslint-disable-next-line vue/no-v-html -->
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
        <span v-if="toggle.showSearch">&nbsp;&nbsp;</span>

        <!-- Input -->
        <input
          ref="searchInput"
          v-model="value.inputData"
          :class="[inputResponsiveClass]"
          :placeholder="$t('home.searchHeader')"
          style="padding: 7px 8px 9px"
          class="w-[212.04px] h-10 outline-none text-[.9375rem] text-[#050505] placeholder:text-[#707276] dark:placeholder:text-[#E4E6EB] bg-transparent"
          @input="handleSearchValue"
          @keyup.enter="handleSendSearch"
        />
        <span v-if="toggle.showSearch">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </label>
    </div>

    <!-- Hiện bảng tìm kiếm  -->
    <div v-if="toggle.showSearch">
      <search-board
        :show-recently="toggle.showRecently"
        :search-value="value.searchValue"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { logo, backArrow } from '../../../assets/icons/icons'
import { RepositoryFactory } from '../../../apiConfig/RepositoryFactory'
import SearchBoard from './search/SearchBoard.vue'
const SearchRepository = RepositoryFactory.get('search')
export default {
  name: 'LogoAndSearch',
  components: { SearchBoard },
  props: {
    showSetting: Boolean,
  },
  data() {
    return {
      icon: { logo, backArrow },
      toggle: {
        inputResponsiveClass: 'input-responsive',
        showSearch: false,
        showRecently: true,
      },
      value: {
        inputData: '',
        searchValue: [],
        searchType: 'All',
      },
    }
  },
  computed: {
    inputResponsiveClass() {
      // Tính toán và trả về class responsive dựa trên this.inputValue
      return this.toggle.showSearch === true ? '' : 'input-responsive'
    },
    ...mapGetters(['getUser']),
    user() {
      return this.getUser
    },
  },
  methods: {
    // Hiển thị bảng tìm kiếm
    handleShowSearch() {
      this.toggle.showSearch = !this.toggle.showSearch
      this.$emit('showSearch', this.toggle.showSearch)
      if (this.toggle.showSearch) {
        this.$nextTick(() => {
          this.$refs.searchInput.focus()
        })
      }
    },
    // Hàm input giá trị tìm kiếm
    async handleSearchValue() {
      if (this.value.inputData !== '') {
        this.toggle.showRecently = false
      } else {
        this.toggle.showRecently = true
      }
      try {
        const response = await SearchRepository.searchUser(
          {
            value: this.value.inputData,
            userId: this.user.user_id,
          },
          { search_type: 'Home' }
        )
        this.value.searchValue = response.data
        console.log(this.value.searchValue)
      } catch (error) {}
    },

    async handleSendSearch() {
      try {
        const response = await SearchRepository.postSearchValue(
          this.user.user_id,
          {
            search_value: this.value.inputData,
            search_type: this.value.searchType,
          }
        )
        console.log(response.data)
        this.$router.push(`/search/top?q=${this.value.inputData}`)
        this.$store.commit('setSearchResult', response.data)
      } catch (error) {}
    },
  },
}
</script>

<style scoped>
.back:hover {
  background-color: #f2f3f5;
}

@media (max-width: 1260px) {
  .input-responsive {
    display: none;
  }
}
</style>
