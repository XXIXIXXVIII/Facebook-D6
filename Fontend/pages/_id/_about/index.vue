<template>
  <div>
    <div class="w-full my-4">
      <div class="w-[1031px] m-auto">
        <div
          class="about w-[1017px] m-2 flex rounded-lg border border-gray-300"
        >
          <div class="w-[300px] px-[6px] py-4 border-r border-gray-300">
            <div class="w-full pt-1 pb-1 px-4 mt-[-10px] mb-4">
              <div class="w-full text-xl font-bold">Giới thiệu</div>
            </div>
            <nuxt-link to="about">
              <div
                :class="{
                  'item-about-active': currentPath === 'about',
                  'item-about': currentPath !== 'about',
                }"
                class="pt-1 pb-1 px-4 mb-4 font-semibold text-base"
              >
                Tổng quan
              </div>
            </nuxt-link>
            <nuxt-link to="about_work_and_education">
              <div
                :class="{
                  'item-about-active':
                    currentPath === 'about_work_and_education',
                  'item-about': currentPath !== 'about_work_and_education',
                }"
                class="pt-1 pb-1 px-4 mb-4 font-semibold text-base"
              >
                Công việc và học vấn
              </div>
            </nuxt-link>
            <nuxt-link to="about_places">
              <div
                :class="{
                  'item-about-active': currentPath === 'about_places',
                  'item-about': currentPath !== 'about_places',
                }"
                class="pt-1 pb-1 px-4 mb-4 font-semibold text-base"
              >
                Nơi từng sống
              </div>
            </nuxt-link>
            <nuxt-link to="about_contact_and_basic_info">
              <div
                :class="{
                  'item-about-active':
                    currentPath === 'about_contact_and_basic_info',
                  'item-about': currentPath !== 'about_contact_and_basic_info',
                }"
                class="pt-1 pb-1 px-4 mb-4 font-semibold text-base"
              >
                Thông tin liên hệ và cơ bản
              </div>
            </nuxt-link>
            <nuxt-link to="about_family_and_relationships">
              <div
                :class="{
                  'item-about-active':
                    currentPath === 'about_family_and_relationships',
                  'item-about':
                    currentPath !== 'about_family_and_relationships',
                }"
                class="pt-1 pb-1 px-4 mb-4 font-semibold text-base"
              >
                Gia đình và các mối liên hệ
              </div>
            </nuxt-link>
            <nuxt-link to="about_details">
              <div
                :class="{
                  'item-about-active': currentPath === 'about_details',
                  'item-about': currentPath !== 'about_details',
                }"
                class="pt-1 pb-1 px-4 mb-4 font-semibold text-base"
                v-if="user && status && status !== 'Myself'"
              >
                Chi tiết về {{ user.fullName }}
              </div>
              <div
                :class="{
                  'item-about-active': currentPath === 'about_details',
                  'item-about': currentPath !== 'about_details',
                }"
                class="pt-1 pb-1 px-4 mb-4 font-semibold text-base"
                v-else
              >
                Chi tiết về bạn
              </div>
            </nuxt-link>
            <nuxt-link to="about_life_events">
              <div
                :class="{
                  'item-about-active': currentPath === 'about_life_events',
                  'item-about': currentPath !== 'about_life_events',
                }"
                class="pt-1 pb-1 px-4 mb-4 font-semibold text-base"
              >
                Sự kiện trong đời
              </div>
            </nuxt-link>
          </div>
          <div class="w-[717px] p-5">
            <div v-if="currentPath === 'about'">
              <about-view />
            </div>
            <div v-if="currentPath === 'about_work_and_education'">
              <work-and-education />
            </div>
            <div v-if="currentPath === 'about_places'">
              <places />
            </div>
            <div v-if="currentPath === 'about_contact_and_basic_info'">
              <infor />
            </div>
            <div v-if="currentPath === 'about_family_and_relationships'">
              <family-and-relationships />
            </div>
            <div v-if="currentPath === 'about_details'">
              <about-deatil />
            </div>
            <div v-if="currentPath === 'about_life_events'">
              <life-events />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <img-user-detail />
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
import ImgUserDetail from '../../../components/userDetail/IndexUserDetail/ImgUserDetail.vue'
import SportUserDetail from '../../../components/userDetail/IndexUserDetail/SportUserDetail.vue'
import MusicUserDetail from '../../../components/userDetail/IndexUserDetail/MusicUserDetail.vue'
import MovieUserDetail from '../../../components/userDetail/IndexUserDetail/MovieUserDeatil.vue'
import TVUserDetail from '../../../components/userDetail/IndexUserDetail/TVUserDetail.vue'
import BookUserDetail from '../../../components/userDetail/IndexUserDetail/BookUserDetail.vue'
import AboutDeatil from '../../../components/userDetail/MenuAbout/AboutDetail.vue'
import AboutView from '../../../components/userDetail/MenuAbout/AboutView.vue'
import FamilyAndRelationships from '../../../components/userDetail/MenuAbout/FamilyAndRelationships.vue'
import Infor from '../../../components/userDetail/MenuAbout/Infor.vue'
import LifeEvents from '../../../components/userDetail/MenuAbout/LifeEvents.vue'
import Places from '../../../components/userDetail/MenuAbout/Places.vue'
import WorkAndEducation from '../../../components/userDetail/MenuAbout/WorkAndEducation.vue'
export default {
  components: {
    ImgUserDetail,
    SportUserDetail,
    MusicUserDetail,
    MovieUserDetail,
    TVUserDetail,
    BookUserDetail,
    AboutDeatil,
    AboutView,
    Infor,
    LifeEvents,
    Places,
    WorkAndEducation,
    FamilyAndRelationships,
  },
  layout: 'userDetail',
  computed: {
    currentPath() {
      return this.$route.params.about
    },
    user() {
      return this.$store.state.idFriendModule.userDetail
    },
    userId() {
      return this.$store.state.authModule.user.user_id
    },

    profile() {
      return this.$store.state.idFriendModule.userDetail
    },

    status() {
      return this.$store.state.idFriendModule.status
    }

  },
 
}
</script>

<style scoped>
.item-about {
  color: gray;
}
.item-about:hover {
  background-color: rgba(185, 185, 185, 0.178);
  border-radius: 4px;
}

.item-about-active {
  color: #1877f2 !important;
  background-color: #eaf3ff !important;
  border-radius: 8px;
}

.about {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
</style>
