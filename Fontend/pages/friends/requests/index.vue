<template lang="">
  <div>
    <HeaderUserDetail/>
    <UserDetail/>
  </div>
</template>
<script>
import HeaderUserDetail from '../../../components/userDetail/HeaderUserDetail.vue'
import UserDetail from '../../_id/index.vue'
export default {
  name: 'FriendsRequests',
  components:{UserDetail, HeaderUserDetail},
  layout: 'layoutFriends',
}
</script>
<style lang="">
  
</style>