<template>
  <div>
    <HeaderVue></HeaderVue>
    <div class="flex w-full">
      <div className="w-[360px] min-h-screen mt-14"></div>
      <div class="navbar w-[360px] fixed bg-white min-h-screen mt-14">
        <div
          v-if="
            currentPath == '/friends' || currentPath == '/friends/birthdays'
          "
          class=""
        >
          <HomeNavBarFriends :current-path="currentPath" />
        </div>
        <div v-if="currentPath == '/friends/requests'" class="">
          <RequestNavBarFriendsVue />
        </div>
        <div v-if="currentPath == '/friends/suggestions'" class="">
          <SuggestionsNavBarFriends />
        </div>
        <div v-if="currentPath == '/friends/list'" class="">
          <ListAllNavBarFriends />
        </div>
      </div>
      <div  class="w-[calc(100vw-360px)] ml-[360px] mt-14">
        <nuxt />
      </div>
    </div>
  </div>
</template>
<script>
import HeaderVue from '../components/header/HeaderVue.vue'
import HomeNavBarFriends from '../components/navBarFriends/HomeNavBarFriends.vue'
import RequestNavBarFriendsVue from '../components/navBarFriends/Request/RequestNavBarFriends.vue'
import SuggestionsNavBarFriends from '../components/navBarFriends/suggestions/SuggestionsNavBarFriends.vue'
import ListAllNavBarFriends from '../components/navBarFriends/listAllFriends/ListAllNavBarFriends.vue'

export default {
  name: 'LayoutFriends',
  components: {
    HeaderVue,
    HomeNavBarFriends,
    RequestNavBarFriendsVue,
    SuggestionsNavBarFriends,
    ListAllNavBarFriends,
  },
  data() {
    return {
      showUserDetail: false,
      userDetail: null,
    }
  },
  computed: {
    currentPath() {
      return this.$route.path
    },
  },

  watch: {
    '$store.state.idFriendModule.userDetail': {
      handler: 'handler',
      immediate: true,
      deep: true,
    },
  },
  methods: {
    handler(vale) {
      this.userDetail = vale
    },
  },
}
</script>
<style scoped lang="css">
.navbar {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
