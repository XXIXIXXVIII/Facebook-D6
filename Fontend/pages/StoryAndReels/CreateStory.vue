<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <div class="min-h-[100vh] overflow-hidden relative">
    <div class="w-[360px] nav-create-story bg-white">
      <div class="flex my-3 pt-4 justify-between px-4">
        <h1 class="nav-title font-bold text-2xl">Tin của bạn</h1>
        <div class="wp-icon-setup">
          <div class="icon-setup"></div>
        </div>
      </div>
      <div class="wp-data-story">
        <div class="flex gap-2 mt-4 items-center px-4 mb-5">
          <div class="w-[60px] h-[60px] wp-avarta rounded-full overflow-hidden">
            <img
              :src="currenUser.avatar"
              alt=""
              class="h-[60px] w-full object-cover"
            />
          </div>
          <h1 class="text-base font-medium">{{ currenUser.fullName }}</h1>
        </div>
        <div class="br-nav"></div>

        <form
          v-if="isPreview"
          class="flex flex-col justify-center items-center gap-4 p-4"
          @submit.prevent="submitStory"
        >
          <!-- -------------------nội dung story-------------------- -->
          <textarea-story
            :isEmpty="isEmpty"
            @text-changed="onTextChanged"
            @empty-false="onEmptyFalse"
            @empty-true="onEmptyTrue"
          />
          <!-- --------------------Font Family-------------------- -->
          <font-family-story @fontSelected="onFontSelected" />
          <!-- ------------------------background -story----------------- -->
          <component-story-background
            :isPreview="isPreview"
            :isBackgroundStory="isBackgroundStory"
            :isTextColor="isTextColor"
            :arrBackgrounds="arrBackgrounds"
            @select-background="onSelectBackground"
          />
        </form>
        <div v-else></div>
      </div>
      <div v-if="isPreview" class="wp-btn">
        <button class="btn-story btn-discard" @click="activePopup">
          Discard
        </button>
        <button
          :disabled="isLoading"
          type="submit"
          class="btn-story btn-share text-white"
          @click="submitStory"
        >
          <div v-if="isLoading" :class="{ ringLoading: isLoading }"></div>
          <p v-else>Chia sẻ lên tin</p>
        </button>
      </div>
      <div v-else></div>
    </div>

    <!-- MainPreview -->
    <div class="wp-right-createStory">
      <main-preview v-if="isPreview" :story="dataStory" />
      <main-story
        v-else
        :preview="isPreview"
        @open-textStory="onOpenTextStory"
        @open-photo="onOpenPhoto"
      />
    </div>
    <!--------------------- Popup---------------------- -->
    <div v-if="popup" class="wp-popup">
      <div class="popup-title">
        <div class="h-full w-20"></div>
        <p>Discard story?</p>
        <div class="wp-close w-12">
          <div
            class="wp-close bg-slate-200 w-9 h-9 rounded-full"
            @click="activePopup"
          >
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div class="icon-close" v-html="closer"></div>
          </div>
        </div>
      </div>
      <hr />
      <p class="question-popup">
        Are you sure that you want to discard this story? Your story won't be
        saved.
      </p>
      <div class="wp-btn-popup">
        <div class=""></div>
        <div class="">
          <button class="mr-2 text-blue-700 font-semibold" @click="activePopup">
            Continue Editing
          </button>
          <button
            class="px-10 py-1 bg-blue-700 text-white font-semibold rounded-md"
            @click="closePreview"
          >
            Discard
          </button>
        </div>
      </div>
    </div>

    <div v-if="popup" class="container-popup"></div>
    <div v-else></div>
  </div>
</template>

<script>
import axios from 'axios'
import { RepositoryFactory } from '../../apiConfig/RepositoryFactory'
import { closer } from '../../assets/img/svg'
import luffy from '../../assets/img/lufyNgo.jpg'
import backgroundBlue from '../../assets/img/background-1.jpg'
import { backgrounds, coloText } from '../../utils/backgroundStory'
import MainStory from '../../components/StoryAndReels/ComponentStory/MainStory.vue'
import MainPreview from '../../components/StoryAndReels/ComponentStory/MainPreview.vue'
import ComponentStoryBackground from '../../components/StoryAndReels/ComponentStory/ComponentStoryBackground.vue'
import TextareaStory from '../../components/StoryAndReels/ComponentStory/TextareaStory.vue'
import FontFamilyStory from '../../components/StoryAndReels/ComponentStory/FontFamilyStory.vue'
const repositoryStory = RepositoryFactory.get('StoryAndReels')
export default {
  name: 'CreateStory',
  components: {
    ComponentStoryBackground,
    FontFamilyStory,
    MainStory,
    MainPreview,
    TextareaStory,
  },
  data() {
    return {
      luffy,
      isPreview: false,
      isBackgroundStory: false,
      isTextColor: false,
      popup: false,
      closer,
      isEmpty: false,
      backgroundPhoto: undefined,
      arrBackgrounds: [],
      isLoading: false,
      currenUser: null,
      dataStory: {
        contentStory: '',
        background: backgroundBlue,
        fontFamily: 'Arial',
        textColor: '',
      },
    }
  },
  watch: {
    '$store.state.authModule.user': {
      handler(val) {
        this.currenUser = val
      },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    // ----------------------- background Faceboock----------------------
    onOpenTextStory() {
      this.arrBackgrounds = backgrounds
      this.isPreview = true
      this.isBackgroundStory = true
    },
    onOpenPhoto(dataPoto) {
      this.backgroundPhoto = dataPoto
      const filePhoto = dataPoto
      filePhoto.preview = URL.createObjectURL(filePhoto)
      this.dataStory.background = filePhoto.preview
      this.arrBackgrounds = coloText
      this.isPreview = true
      this.isTextColor = true
    },
    activePopup() {
      this.popup = !this.popup
    },

    closePreview() {
      this.dataStory.contentStory = ''
      this.dataStory.background = backgroundBlue
      this.dataStory.fontFamily = 'Arial'
      this.dataStory.textColor = ''
      this.backgroundPhoto = undefined
      this.isEmpty = false
      this.isPreview = false
      this.isBackgroundStory = false
      this.isTextColor = false
      this.popup = !this.popup
    },
    // ---------------------------- emit nội dung Story -------------------
    onTextChanged(contentStory) {
      this.dataStory.contentStory = contentStory
    },
    // ----------------------------background story----------------------
    onSelectBackground(isBackground, isTextColor) {
      console.log(isBackground)
      if (isBackground) {
        this.dataStory.background = isBackground
      }
      this.dataStory.textColor = isTextColor
    },
    // ---------------------------font famyly ----------------------------
    onFontSelected(isFontFamily) {
      this.dataStory.fontFamily = isFontFamily
    },
    onEmptyFalse() {
      this.isEmpty = false
    },
    onEmptyTrue() {
      this.isEmpty = true
    },
    // -------------------------submit------------------------------
    async submitStory() {
      // console.log(currenUser)

      const apiPostStory = async () => {
        this.isLoading = true
        const newStory = {
          content: this.dataStory.contentStory,
          background: this.dataStory.background,
          font: this.dataStory.fontFamily,
          color_text: this.dataStory.textColor,
          user_id: this.currenUser.user_id,
          type: 'Story',
        }
        try {
          await repositoryStory.createStory(newStory)
          this.isLoading = false
          this.$router.push('/')
        } catch (error) {
          console.log(error)
        }
      }
      if (!this.dataStory.contentStory) {
        this.isEmpty = true
        return this.isEmpty
      }
      if (this.backgroundPhoto instanceof Object) {
        this.isLoading = true
        const dataPhoto = new FormData()
        dataPhoto.append('file', this.backgroundPhoto)
        dataPhoto.append('upload_preset', 'dinoEnglish')
        try {
          const result = await axios.post(
            'https://api.cloudinary.com/v1_1/dlb1ac5xw/image/upload',
            dataPhoto
          )
          this.dataStory.background = result.data.secure_url
          return apiPostStory()
        } catch (error) {
          console.log(error)
        }
      }

      return apiPostStory()

      //  const response = await axios.post("http://10.100.6.139:8000/api/stories")
    },
  },
}
</script>

<style scoped lang="scss">
.nav-create-story {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  position: fixed;
  top: 57px;
  left: 0px;
  bottom: 40px;
  height: 100%;
}
.wp-right-createStory {
  overflow: hidden;
  position: relative;
  width: calc(100% - 360px);
  height: 100vh;
  left: 360px;
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wp-data-story {
  height: calc(80% - 45px);
  overflow-y: scroll;
  position: relative;
}
.wp-data-story::-webkit-scrollbar {
  width: 10px;
}
.wp-data-story::-webkit-scrollbar-thumb {
  background-color: #cfd1d5;
  border-radius: 50px;
}
.wp-svg-close {
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(45deg);
}
.br-nav {
  height: 1px;
  background-color: #e5e5e5;
}
.wp-icon-setup {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e4e6eb;
  width: 36px;
  height: 36px;
  border-radius: 50%;
}
.icon-setup {
  background-image: url(../../assets/img/icon-FaceBook.png);
  background-position: -88px -110px;
  background-size: 190px 182px;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  display: inline-block;
}
.v-text-field__slot {
  height: 180px;
}

.btn-story {
  height: 36px;
  padding: 0 12px;
  border-radius: 5px;
  min-width: 113px;
  font-weight: 500;
}
.btn-story:hover {
  opacity: 0.8;
}
.ringLoading {
  width: 20px;
  height: 20px;
  opacity: 0.8;
  border-radius: 50%;
  border: 3px solid white;
  margin: 0 auto;
  border-right: 3px solid transparent;
  border-left: 3px solid transparent;
  animation: spinner 1s infinite linear;
  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }
}
.btn-discard {
  background-color: #e4e6eb;
}
.wp-btn {
  position: absolute;
  bottom: 60px;
  padding: 30px 0;
  width: 360px;
  height: 45px;
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.btn-share {
  background-color: #1b74e4;
  color: white;
}
.container-popup {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(218, 217, 217, 0.7);
}
.wp-popup {
  position: absolute;
  top: calc(50% - 179px);
  left: calc(50% - (548px / 2));
  background-color: white;
  width: 548px;
  height: 179px;
  border-radius: 8px;
  z-index: 10;
  .popup-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    font-size: 20px;
    font-weight: 700;
    .wp-close {
      display: flex;
      align-items: center;
      justify-content: center;
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        .icon-close {
          transform: rotate(45deg);
        }
      }
    }
  }

  .question-popup {
    padding: 12px 16px;
    font-size: 0.9rem;
  }
  .wp-btn-popup {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
  }
}
</style>
