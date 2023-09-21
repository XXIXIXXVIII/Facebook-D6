<template>
  <div>
    <div class="w-full my-4">
      <div class="w-[1031px] m-auto">
        <div
          class="about w-[1017px] rounded-lg border border-gray-300 p-4 ml-2"
        >
          <div class="flex justify-between w-full h-[36px] mb-5">
            <div class="text-[20px] font-bold">Video</div>
          </div>
          <div class="text-center text-[24px] text-gray-500 font-bold mb-5">
            Không hiển thị hoạt động nào
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <sport-user-detail />
    </div>
    <div class="mt-4">
      <music-user-detail />
    </div>
    <div class="mt-4">
      <movie-user-detail />
    </div>
    <div class="mt-4">
      <t-v-user-detail />
    </div>
    <div class="mt-4">
      <book-user-detail />
    </div>
  </div>
</template>

<script>

import SportUserDetail from '../../components/userDetail/IndexUserDetail/SportUserDetail.vue';
import MusicUserDetail from '../../components/userDetail/IndexUserDetail/MusicUserDetail.vue';
import MovieUserDetail from '../../components/userDetail/IndexUserDetail/MovieUserDeatil.vue';
import TVUserDetail from '../../components/userDetail/IndexUserDetail/TVUserDetail.vue';
import BookUserDetail from '../../components/userDetail/IndexUserDetail/BookUserDetail.vue';

export default {
  components: {
    SportUserDetail,
    MusicUserDetail,
    MovieUserDetail,
    TVUserDetail,
    BookUserDetail
  },
  layout: 'userDetail',
}
</script>

<style scoped></style>
