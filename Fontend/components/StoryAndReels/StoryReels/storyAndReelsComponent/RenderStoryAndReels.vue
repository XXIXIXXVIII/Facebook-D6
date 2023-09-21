<template>
  <div class="bg-slate-500 dark:bg-[#242526]">
    <v-sheet
      class="mx-auto relative dark:bg-[#242526]"
      elevation="8"
      max-width="576"
    >
      <v-slide-group
        v-model="model"
        class="pa-4"
        active-class="success"
        show-arrows
      >
        <!-- Link Story -->
        <nuxt-link
          v-if="isStory"
          to="/StoryAndReels/CreateStory"
          class="wp-curren-user shadow"
        >
          <div
            class="h-[138px] overflow-hidden w-full relative wp-img-currenUser"
          >
            <img
              :src="currentUser.avatar"
              alt=""
              class="object-cover curren-user"
            />
          </div>
          <div class="relative">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div class="svg-create" v-html="createStory"></div>
          </div>
          <div class="create-story relative mb-[10px] mt-8">
            <p class="">{{$t('home.createStory')}}</p>
          </div>
        </nuxt-link>
        <!-- Link Reels -->
        <nuxt-link
          v-if="isReels"
          to="/StoryAndReels/CreateReels"
          class="mt-5 wp-curren-user wp-reels mr-1 mb-[15px] ml-[18px] shadow relative rounded-xl w-[112px] h-[200px]"
        >
          <div
            class="absolute w-[60px] h-[60px] bg-white rounded-full wp-icon-reels"
          >
            <div class="icon-reels"></div>
            <div class="absolute wp-icon-create-reels">
              <div class="icon-create-reels"></div>
            </div>
          </div>
        </nuxt-link>

        <!-- -----------------render story---------------------------- -->
        <div v-if="isStory" class="flex">
          <v-slide-item
            v-for="(item, index) in dataStory"
            :key="index"
            v-slot="{ toggle }"
          >
            <v-card
              class="ma-4 my-5 mx-1 v-card"
              height="200"
              width="112"
              @click="toggle"
            >
              <!--  avarta user login -->
              <div
                class="border-4 border-solid border-[#3578e5] mt-3 ml-2 absolute z-10 w-10 h-10 rounded-full overflow-hidden"
                style="border-radius: 50%"
              >
                <img :src="item.avatar" class="object-cover w-10 h-10" />
              </div>
              <!-- user name -->
              <div
                class="absolute z-10 bottom-1 left-1 text-[14px] font-semibold text-white"
              >
                {{ item.fullName }}
              </div>
              <!-- background data story -->
              <v-img
                :src="item.background"
                alt="Your Image Alt Text"
                height="200"
                @click="routerDetailStory(item.user_id, item.story_id)"
              ></v-img>
              <v-row class="fill-height" align="center" justify="center">
                <v-scale-transition>
                  <v-icon color="white" size="48"></v-icon>
                </v-scale-transition>
              </v-row>
            </v-card>
          </v-slide-item>
        </div>
        <!-- render reels -->
        <div v-if="isReels" class="flex">
          <v-slide-item
            v-for="(item, index) in dataReels"
            :key="index"
            v-slot="{ toggle }"
          >
            <v-card
              class="ma-4 my-5 mx-1 v-card"
              height="200"
              width="112"
              @click="toggle"
            >
              <!--  avarta user login -->
              <div
                class="border-4 border-solid border-[#3578e5] mt-3 ml-2 absolute z-10 w-10 h-10 rounded-full overflow-hidden"
                style="border-radius: 50%"
              >
                <img :src="item.avatar" class="object-cover w-10 h-10" />
              </div>
              <!-- user name -->
              <div
                class="absolute z-10 bottom-1 left-1 text-[14px] font-semibold text-white"
              >
                {{ item.fullName }}
              </div>
              <!-- background data story -->
              <video
                :src="item.background"
                alt="Your Image Alt Text"
                height="200"
                class="h-full"
                @click="routerDetailReels(item.user_id, item.story_id)"
              ></video>
              <v-row class="fill-height" align="center" justify="center">
                <v-scale-transition>
                  <v-icon color="white" size="48"></v-icon>
                </v-scale-transition>
              </v-row>
            </v-card>
          </v-slide-item>
        </div>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<script>
import { createStory } from '../../../../assets/img/svg'

export default {
  name: 'RenderStoryAndReels',
  props: {
    dataReels: {
      type: Array,
      require: true,
      default: () => [],
    },
    dataStory: {
      type: Array,
      require: true,
      default: () => [],
    },
    isStory: Boolean,
    isReels: Boolean,
    currentUser: {
      type: Object,
      require: true,
      default: () => {},
    },
  },

  data() {
    return {
      model: null,
      createStory,
    }
  },

  methods: {
    routerDetailStory(id, storyId) {
      this.$router.push({
        path: '/StoryAndReels/Story/story',
        query: { type: 'Story', user_id: id, story_id: storyId },
      })
    },
    routerDetailReels(id, storyId) {
      console.log(storyId)
      this.$router.push({
        path: '/StoryAndReels/Reels/reels',
        query: { type: 'Reels', user_id: id, story_id: storyId },
      })
    },
  },
}
</script>

<style>
.v-image,
.curren-user {
  position: relative;
  transition: transform 0.5s ease;
  height: 100%;
}
.wp-curren-user {
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  overflow: hidden;
  margin: 20px 4px 15px 18px;
  position: relative;
  border-radius: 8px;
  width: 112px;
  height: 200px;
}
.v-slide-group__prev--disabled {
  display: none;
}
.v-slide-group__next--disabled {
  display: none;
}
.wp-img-currenUser::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.wp-reels {
  background: linear-gradient(
    225deg,
    rgba(237, 67, 162, 1) 16%,
    rgba(255, 163, 72, 1) 100%
  );
}
.wp-icon-reels {
  top: calc(50% - 30px);
  left: calc(50% - 30px);
  display: flex;
  align-items: center;
  justify-content: center;
}
.wp-icon-create-reels {
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  border: 2px solid rgb(237, 67, 162);
  bottom: 0px;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-create-reels {
  background-image: url(../../../../assets/img/img-reels.png);
  background-position: 0px -38px;
  background-size: 38px 52px;
  width: 12px;
  height: 12px;
  background-repeat: no-repeat;
  display: inline-block;
}
.icon-reels {
  background-image: url(../../../../assets/img/img-reels.png);
  background-position: 0px 0px;
  background-size: 38px 52px;
  width: 36px;
  height: 36px;
  background-repeat: no-repeat;
  display: inline-block;
  /* position: absolute;
  top: calc(50% - 15px);
  left: calc(50% - 15px); */
}

.v-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
}

.curren-user::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
}
.wp-curren-user:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.v-image:hover,
.curren-user:hover {
  transform: scale(1.05);
}
.v-slide-group {
  position: relative;
}

/* currenUsser */

.svg-create {
  position: absolute;
  right: calc(50% - 15px);
  top: calc(50% - 20px);
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid white;
  border-radius: 50%;
  background-color: #3578e5;
  color: white;
  z-index: 2;
}

.v-slide-group__content {
  transition: 1s cubic-bezier(0.25, 0.8, 0.5, 1);
}
.v-slide-group__prev {
  position: absolute;
  z-index: 10;
  top: 40%;
  left: 10px;
  border-radius: 100%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: white;
}
.v-slide-group__next {
  position: absolute;
  z-index: 10;
  top: 40%;
  right: 10px;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: white;
}
.v-icon {
  display: block;
  height: 52px;
}
.v-slide-group__next:hover,
.v-slide-group__prev:hover {
  background-color: #edf1f5;
}
.v-slide-group__next:active,
.v-slide-group__prev:active {
  transform: scale(0.9);
}
.v-sheet.v-card {
  width: 112px;
  height: 200px;
  overflow: hidden;
  border-radius: 10px;
}
</style>
