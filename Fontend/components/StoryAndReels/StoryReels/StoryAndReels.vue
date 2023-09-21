<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="wp-story-reels shadow-xl dark:bg-[#242526]">
    <div class="flex w-full justify-center h-[60px] px-4 wp-header-story-reels">
      <active-story :is-story="isStory" @handle-story="onHandleStory" />
      <active-reels :is-reels="isReels" @handle-reels="onHandleReels" />
    </div>
    <!-- eslint-disable-next-line vue/attribute-hyphenation -->
    <render-story-and-reels
      :data-story="dataStory"
      :data-reels="dataReels"
      :is-story="isStory"
      :is-reels="isReels"
      :current-user="currentUser"
    />
  </div>
</template>

<script>
import { RepositoryFactory } from '../../../apiConfig/RepositoryFactory'
import RenderStoryAndReels from './storyAndReelsComponent/RenderStoryAndReels.vue'
import ActiveStory from './storyAndReelsComponent/ActiveStory.vue'
import ActiveReels from './storyAndReelsComponent/ActiveReels.vue'
const apiStories = RepositoryFactory.get('StoryAndReels')
export default {
  name: 'StoryAndReels',
  components: { RenderStoryAndReels, ActiveStory, ActiveReels },
  data: () => {
    return {
      model: null,
      isStory: true,
      isReels: false,
      datachildren: [],
      dataparents: [],
      dataStory: [],
      dataReels: [],
      currentUser: null,
    }
  },

  watch: {
    '$store.state.authModule.user': {
      handler(val) {
        this.currentUser = val
      },
      immediate: true,
      deep: true,
    },
  },

  created() {
    this.fetchStory()
  },
  methods: {
    async fetchStory() {
      try {
        const response = await apiStories.getStory(
          `${this.currentUser.user_id}`
        )
        for (let index = 0; index < response.data.length; index++) {
          const element = response.data[index]
          for (let index = 0; index < element.length; index++) {
            const item = element[index]
            if (item.type === 'Story') {
              this.dataStory.unshift(item)
              break
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    onHandleStory() {
      this.isStory = true
      this.isReels = false
      this.fetchData('Story')
    },
    onHandleReels() {
      this.isReels = true
      this.isStory = false
      this.fetchData('Reels')
    },
    async fetchData(type) {
      this.dataStory = []
      this.dataReels = []

      try {
        const response = await apiStories.getStory(
          `${this.currentUser.user_id}`
        )
        this.$store.commit('setDataStoryOrReels', response.data)
        for (let index = 0; index < response.data.length; index++) {
          const element = response.data[index]
          for (let index = 0; index < element.length; index++) {
            const item = element[index]
            if (item.type === type && type === 'Story') {
              this.dataStory.unshift(item)
              break
            }
            if (item.type === type && type === 'Reels') {
              this.dataReels.unshift(item)
              break
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
<style>
.wp-story-reels {
  background-color: white;
  width: 576px;
  margin: 20px auto;
  border-radius: 8px;
  overflow: hidden;
  height: 300px;
}

.wp-header-story-reels {
  border-bottom: 1px solid #cacdd1;
}
.bottom-story {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 4px;
  background-color: #3578e5;
}
</style>
