import { RepositoryFactory } from '../apiConfig/RepositoryFactory.js'
import { btnLeft, btnRight, comment, closer } from '../assets/img/svg.js'
const apiStory = RepositoryFactory.get('StoryAndReels')
export const storyMixin = {
  data() {
    return {
      dataStory: [],
      currentStory: {},
      idStory: 0,
      currentUser: {},
      indexStory: 0,
      statusComment: false,
      statusPrevious: false,
      statusNext: true,
      btnLeft,
      btnRight,
      comment,
      closer,
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
      const typeStory = this.$route.query
      try {
        const response = await apiStory.getStory(`${this.currentUser.user_id}`)
        for (let index = 0; index < response.data.length; index++) {
          const element = response.data[index]
          for (let index = 0; index < element.length; index++) {
            const item = element[index]
            if (item.type === typeStory.type) {
              this.dataStory.unshift(item)
              break
            }
          }
        }
        const indexStory = this.dataStory.findIndex(
          (item) => item.story_id === +typeStory.story_id
        )
        this.dataStory = this.dataStory.slice(indexStory)
        this.currentStory = this.dataStory[this.indexStory]
        this.idStory = this.currentStory.story_id
        return this.dataStory
      } catch (error) {
        console.log(error)
      }
    },
    handleNext(id) {
      this.indexStory = this.dataStory.findIndex((item) => item.story_id === id)
      ++this.indexStory
      this.currentStory = this.dataStory[this.indexStory]
      this.idStory = this.currentStory.story_id
      this.statusPrevious = true
      if (this.indexStory === this.dataStory.length - 1) {
        this.statusNext = false
      }
    },
    handlePrevious(id) {
      this.indexStory = this.dataStory.findIndex((item) => item.story_id === id)
      --this.indexStory
      this.currentStory = this.dataStory[this.indexStory]
      this.idStory = this.currentStory.story_id
      if (this.indexStory === 0) {
        this.statusPrevious = false
      }
      if (this.indexStory !== this.dataStory.length - 1) {
        this.statusNext = true
      }
    },
  },
}
