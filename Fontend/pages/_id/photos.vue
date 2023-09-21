<template>
  <div>
    <div class="mt-4">
    <img-user-detail/>
  </div>
  <div class="mt-4">
    <sport-user-detail/>
  </div>
  <div class="mt-4">
    <music-user-detail/>
  </div>
  <div class="mt-4">
    <movie-user-detail/>
  </div>
  <div class="mt-4">
    <t-v-user-detail/>
  </div>
  <div class="mt-4">
    <book-user-detail/>
  </div>
  </div>
</template>

<script>
import ImgUserDetail from '../../components/userDetail/IndexUserDetail/ImgUserDetail.vue';
import SportUserDetail from '../../components/userDetail/IndexUserDetail/SportUserDetail.vue';
import MusicUserDetail from '../../components/userDetail/IndexUserDetail/MusicUserDetail.vue';
import MovieUserDetail from '../../components/userDetail/IndexUserDetail/MovieUserDeatil.vue';
import TVUserDetail from '../../components/userDetail/IndexUserDetail/TVUserDetail.vue';
import BookUserDetail from '../../components/userDetail/IndexUserDetail/BookUserDetail.vue';
export default {
  layout:"userDetail",

  components:{
    ImgUserDetail,
    SportUserDetail,
    MusicUserDetail,
    MovieUserDetail,
    TVUserDetail,
    BookUserDetail
  }
}
</script>

<style scoped>

</style>