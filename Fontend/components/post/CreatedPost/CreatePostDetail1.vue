<template lang="">
  <div @click="hideIcon">
    <div
      class="fixed w-screen h-screen bg-[rgba(244,244,244,0.8)] z-[50] top-0 left-0"
      @click="closeCreatePostDetail"
    ></div>
    <div v-if="showMoreBG"><MoreBackGround @pickBgMore="pickBgMore" /></div>
    <div v-show="showFeelingPost">
      <FeelingPost
        @pickFeeling="pickFeeling"
        @handlePickWorkDetail="handlePickWorkDetail"
      />
    </div>
    <div v-show="showTag">
      <TagFriends @handleBackTag="showTag = false" @handleTags="handleTags" />
    </div>
    <div v-show="showAndressPost">
      <AndressPost
        :pick-check-in="checkIn"
        @backAndress="showAndressPost = false"
        @handleAndress="handleAndress"
      />
    </div>
    <div
      v-if="showTypePost"
      class="fixed z-[70] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <ShowTypePost @back="handleShowTypePost" />
    </div>
    <div
      v-if="loading"
      class="fixed top-10 z-[100] left-1/2 -translate-x-1/2 w-10 h-10"
    >
      <LoadingUi />
    </div>
    <div
      class="fixed w-[500px] bg-white z-[60] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md"
    >
      <div
        class="h-[60px] border-b border-gray-300 flex items-center justify-between px-6"
      >
        <div></div>
        <div class="text-xl font-bold">Tạo bài viết</div>
        <div
          class="w-9 h-9 rounded-full bg-[#E4E6EB] flex items-center justify-center cursor-pointer"
        >
          <div class="delete" @click="closeCreatePostDetail()"></div>
        </div>
      </div>

      <div class="mx-4 py-4 flex items-center gap-2">
        <div class="w-10 h-10 rounded-full overflow-hidden">
          <img class="w-full h-full object-cover" :src="user.avatar" />
        </div>
        <div class="w-[93%]">
          <div class="font-semibold text-[15px] break-words">
            {{ user?.fullName }}
            <span v-if="feeling.icon"
              >đang
              <img
                :src="feeling.icon"
                width="16px"
                height="16px"
                class="inline"
              />
              <span v-if="!feeling.typeWrap">cảm thấy {{ feeling.title }}</span>
              <span v-if="feeling.typeWrap"
                >{{ feeling.typeWrap.split(' ')[1] }} {{ feeling.title }}</span
              ></span
            >
            <span v-if="listTags?.length > 0"
              >cùng với
              <span
                class="cursor-pointer hover:underline"
                @click="showTag = true"
                >{{ listTags[0].fullName }}</span
              ></span
            >
            <span v-for="(tag, index) in listTags" :key="index">
              <span v-if="index > 0">
                và
                <span
                  class="cursor-pointer hover:underline"
                  @click="showTag = true"
                  >{{ tag.fullName }}</span
                ></span
              >
            </span>
            <span v-if="checkIn">tại {{ checkIn }}</span>
          </div>
          <div
            class="flex items-center gap-1 px-2 rounded-md bg-[#E4E6EB] cursor-pointer mt-[2px] w-fit"
            @click="showTypePost = true"
          >
            <div
              v-if="typePost === 'Chỉ mình tôi'"
              class="w-3 h-3 overflow-hidden"
            >
              <img
                class="w-full h-full object-cover"
                src="https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/bXBYraHyR0S.png"
              />
            </div>
            <div
              v-if="typePost === 'Công khai'"
              class="w-3 h-3 overflow-hidden"
            >
              <svg
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
                class="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6 x1kpxq89 xsmyaan"
                title="Đã chia sẻ với Công khai"
                width="12"
                height="12"
              >
                <title>Đã chia sẻ với Công khai</title>
                <g
                  fill-rule="evenodd"
                  transform="translate(-448 -544)"
                  fill="#65676B"
                >
                  <g fill="#65676B">
                    <path
                      d="M109.5 408.5c0 3.23-2.04 5.983-4.903 7.036l.07-.036c1.167-1 1.814-2.967 2-3.834.214-1 .303-1.3-.5-1.96-.31-.253-.677-.196-1.04-.476-.246-.19-.356-.59-.606-.73-.594-.337-1.107.11-1.954.223a2.666 2.666 0 0 1-1.15-.123c-.007 0-.007 0-.013-.004l-.083-.03c-.164-.082-.077-.206.006-.36h-.006c.086-.17.086-.376-.05-.529-.19-.214-.54-.214-.804-.224-.106-.003-.21 0-.313.004l-.003-.004c-.04 0-.084.004-.124.004h-.037c-.323.007-.666-.034-.893-.314-.263-.353-.29-.733.097-1.09.28-.26.863-.8 1.807-.22.603.37 1.166.667 1.666.5.33-.11.48-.303.094-.87a1.128 1.128 0 0 1-.214-.73c.067-.776.687-.84 1.164-1.2.466-.356.68-.943.546-1.457-.106-.413-.51-.873-1.28-1.01a7.49 7.49 0 0 1 6.524 7.434"
                      transform="translate(354 143.5)"
                      fill="#65676B"
                    ></path>
                    <path
                      d="M104.107 415.696A7.498 7.498 0 0 1 94.5 408.5a7.48 7.48 0 0 1 3.407-6.283 5.474 5.474 0 0 0-1.653 2.334c-.753 2.217-.217 4.075 2.29 4.075.833 0 1.4.561 1.333 2.375-.013.403.52 1.78 2.45 1.89.7.04 1.184 1.053 1.33 1.74.06.29.127.65.257.97a.174.174 0 0 0 .193.096"
                      transform="translate(354 143.5)"
                      fill="#65676B"
                    ></path>
                    <path
                      fill-rule="nonzero"
                      d="M110 408.5a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-1 0a7 7 0 1 0-14 0 7 7 0 0 0 14 0z"
                      transform="translate(354 143.5)"
                      fill="#65676B"
                    ></path>
                  </g>
                </g></svg
              >>
            </div>
            <div v-if="typePost === 'Bạn bè'" class="w-3 h-3 overflow-hidden">
              <img
                class="w-full h-full object-cover"
                src="https://static.xx.fbcdn.net/rsrc.php/v3/yZ/r/4qsdCsLNqKi.png"
              />
            </div>
            <div class="font-semibold text-[13px]">{{ typePost }}</div>
            <div>
              <i
                data-visualcompletion="css-img"
                class="x1b0d499 xep6ejk"
                style="
                  background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yV/r/bQ0mkw0Mak2.png');
                  background-position: 0px -168px;
                  background-size: 190px 182px;
                  width: 12px;
                  height: 12px;
                  background-repeat: no-repeat;
                  display: inline-block;
                "
              ></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Nội dung tạo post -->
      <div class="relative">
        <div
          :class="{
            'add-img': addImg,
            'no-add-img': !addImg,
            pickBg: pickBg,
            'no-pickBg': !pickBg,
            addBg: pickBg,
          }"
          class="px-4 relative max-h-[325px] overflow-y-auto"
          :style="{
            background: pickBg ? pickBg : '',
            color: pickBg ? colorTextPickBg : 'black',
          }"
        >
          <div
            ref="contentEditable"
            contenteditable
            role="textbox"
            aria-label="Trường ơi, bạn đang nghĩ gì thế?"
            spellcheck="true"
            tabindex="0"
            data-lexical-editor="true"
            class="w-full h-[24px] outline-none flex items-center flex-wrap break-words max-w-[470px]"
            :class="{
              addBg: pickBg,
            }"
            @input="updateValue"
            @focus="focusInput"
          >
            <p
              ref="inputRef"
              class="whitespace-pre-wrap break-words w-[466px]"
            ></p>
          </div>
          <div
            v-if="!value"
            class="h-10 absolute"
            :class="{ plahoderPickBg: pickBg, plahoderNoPickBg: !pickBg }"
          >
            Bạn đang nghĩ gì?
          </div>

          <!-- khung add ảnh -->
          <div
            v-if="addImg"
            class="w-full min-h-[259px] rounded-md border border-gray-300 p-2 relative"
          >
            <div
              class="absolute right-4 top-4 w-9 h-9 rounded-full bg-white border border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-200 z-30"
              @click="
                ;(addImg = false), (imageFilesUrl = []), (videoFilesUrl = [])
              "
            >
              <i
                style="
                  background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/y4/r/RcpGsP1Bgk9.png');
                  background-position: 0px -110px;
                  background-size: 190px 182px;
                  width: 20px;
                  height: 20px;
                  background-repeat: no-repeat;
                  display: inline-block;
                "
              ></i>
            </div>

            <!-- input Ảnh -->
            <div
              v-if="imageFilesUrl.length + videoFilesUrl.length == 0"
              class="w-full h-[259px] bg-gray-100 rounded-md cursor-pointer hover:bg-slate-100 flex items-center justify-center"
            >
              <label for="addImg" class="inline-block">
                <input
                  id="addImg"
                  multiple
                  type="file"
                  class="hidden"
                  @change="addImgVideo($event)"
                />
                <div
                  class="w-full h-full flex flex-col items-center justify-center gap-1"
                >
                  <div
                    class="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center cursor-pointer"
                  >
                    <i
                      style="
                        background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/9oLIQ46ecpP.png');
                        background-position: 0px -64px;
                        background-size: 38px 122px;
                        width: 20px;
                        height: 20px;
                        background-repeat: no-repeat;
                        display: inline-block;
                      "
                    ></i>
                  </div>
                  <div class="text-[17px] font-semibold">Thêm ảnh/video</div>
                  <div class="text-[12px] text-[#65676B]">hoặc kéo và thả</div>
                </div>
              </label>
            </div>
            <!-- input Ảnh -->

            <!-- render ảnh -->
            <div v-else class="rounded-md overflow-hidden">
              <ArrangePhotos
                :list-images="imageFilesUrl"
                :list-videos="videoFilesUrl"
              />
            </div>
            <!-- render ảnh -->
          </div>
          <!-- khung add ảnh -->
        </div>

        <div
          v-if="!addImg"
          class="flex items-center justify-between mx-4"
          :class="{ 'nav-bg': pickBg }"
        >
          <div class="flex items-center">
            <div
              v-if="!showBackGround"
              class="w-[38px] h-[38px] overflow-hidden cursor-pointer"
              @click="showBackGround = true"
            >
              <img
                class="w-full h-full object-cover"
                src="https://www.facebook.com/images/composer/SATP_Aa_square-2x.png"
              />
            </div>
            <div
              v-else
              class="w-[38px] h-[38px] overflow-hidden cursor-pointer flex items-center justify-center bg-[#E4E6EB] rounded-md"
              @click="showBackGround = false"
            >
              <i
                style="
                  background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/y4/r/RcpGsP1Bgk9.png');
                  background-position: -54px -132px;
                  background-size: 190px 182px;
                  width: 16px;
                  height: 16px;
                  background-repeat: no-repeat;
                  display: inline-block;
                "
              ></i>
            </div>

            <div v-if="showBackGround" class="flex items-center gap-2">
              <div
                class="w-8 h-8 bg-cover rounded-md cursor-pointer ml-2"
                style="background: #f0f2f5"
                @click="pickBg = ''"
              ></div>
              <div v-for="background in backgrounds" :key="background.id">
                <div
                  v-if="background.bgImgUrl"
                  class="w-8 h-8 bg-cover rounded-md cursor-pointer"
                  :style="{ background: background.represent }"
                  @click="pickBg = background.bgImgUrl"
                ></div>
                <div
                  v-else
                  class="w-8 h-8 bg-cover rounded-md cursor-pointer"
                  :style="{ background: background.represent }"
                  @click="pickBg = background.bgColor"
                ></div>
              </div>
              <div
                class="w-[38px] h-[38px] overflow-hidden cursor-pointer flex items-center justify-center bg-[#E4E6EB] rounded-md"
                @click="showMoreBG = true"
              >
                <i
                  style="
                    background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yR/r/b7ksdkHyRPn.png');
                    background-position: 0px -140px;
                    background-size: 34px 212px;
                    width: 16px;
                    height: 16px;
                    background-repeat: no-repeat;
                    display: inline-block;
                  "
                ></i>
              </div>
            </div>
          </div>

          <!-- Icon -->
          <div
            class="iconButton cursor-pointer relative"
            @click.stop="showIcons = true"
          >
            <div
              v-if="showIcons"
              class="absolute -top-[270px] left-1/2 -translate-x-1/2 w-[324px] h-[264px] rounded-md bg-white overflow-hidden pt-1"
              style="
                box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px
                  rgba(0, 0, 0, 0.12) 0px -12px 30px rgba(0, 0, 0, 0.12) 0px 4px
                  6px rgba(0, 0, 0, 0.17) 0px 12px 13px rgba(0, 0, 0, 0.09) 0px -3px
                  5px;
              "
            >
              <Icon @update:addIcon="addIcon" />
            </div>
          </div>
          <!-- Icon -->
        </div>
      </div>
      <!-- Nội dung tạo post -->

      <div class="py-4">
        <div
          class="mx-4 px-3 py-3 border border-gray-400 rounded-md flex items-center justify-between"
        >
          <div class="text-[15px] font-semibold">Thêm vào bài viết của bạn</div>
          <div class="flex items-center gap-1">
            <div
              v-for="(SettingPost, index) in settingPost"
              :key="index"
              class="w-9 h-9 flex items-center justify-center"
              :class="{ disable: SettingPost.disable && pickBg }"
            >
              <div
                class="w-6 h-6 overflow-hidden cursor-pointer"
                @click="handleSettingPost(SettingPost.title)"
              >
                <img
                  class="w-full h-full object-cover"
                  :src="SettingPost.url"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="px-4 pt-4">
          <button
            class="w-full bg-blue-500 text-white text-[15px] font-semibold py-2 rounded-md"
            @click="handleCreatePost"
          >
            Đăng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { settingPost } from '../../../utils/createPost/settingPost.js'
import { backgrounds } from '../../../utils/createPost/background.js'
import { RepositoryFactory } from '../../../apiConfig/RepositoryFactory'
import { socket } from '../../../plugins/socket.io'
import LoadingUi from '../../alert/LoadingUi.vue'
import Icon from '../Icon.vue'
import ArrangePhotos from '../ArrangePhotos.vue'
import ShowTypePost from './ShowTypePost.vue'
import MoreBackGround from './MoreBackGround.vue'
import FeelingPost from './FeelingPost.vue'
import TagFriends from './TagFriends.vue'
import AndressPost from './AndressPost.vue'
const PostRepository = RepositoryFactory.get('posts')

export default {
  name: 'CreatePostDetail1',
  components: {
    Icon,
    ArrangePhotos,
    LoadingUi,
    ShowTypePost,
    MoreBackGround,
    FeelingPost,
    TagFriends,
    AndressPost,
  },
  props: {
    isGroup: {
      type: Boolean,
      default: false,
    },
    groupId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      value: '',
      settingPost,
      backgrounds,
      showBackGround: false,
      showIcons: false,
      addImg: false,
      pickBg: '',
      colorTextPickBg: '',
      flag: true,
      imageFiles: [],
      imageFilesUrl: [],
      videoFiles: [],
      videoFilesUrl: [],
      imagesUrl: [],
      videosUrl: [],
      loading: false,
      showTypePost: false,
      user: null,
      typePost: null,
      showMoreBG: false,
      showFeelingPost: false,
      feeling: {},
      innerText: '',
      workDetail: {},
      showTag: false,
      listTags: [],
      showAndressPost: false,
      checkIn: '',
    }
  },

  watch: {
    '$store.state.authModule.user': {
      handler(val) {
        this.user = val
        this.typePost = val.typePost
        console.log(this.typePost)
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    this.$refs.contentEditable.addEventListener('keydown', this.handleKeyDown)
  },
  methods: {
    closeCreatePostDetail() {
      this.$emit('update:showCreateDetail', false)
    },
    handleKeyDown(event) {
      const contentEditable = this.$refs.contentEditable
      const paragraphs = contentEditable.querySelectorAll('p')
      if (
        event.key === 'Backspace' &&
        paragraphs.length === 1 &&
        contentEditable.textContent.trim() === ''
      ) {
        event.preventDefault() // Ngăn chặn xóa thẻ cuối cùng
      }
    },
    handleShowTypePost(payload) {
      this.showTypePost = payload
    },
    hideIcon() {
      this.showIcons = false
    },
    handleSettingPost(SettingPost) {
      console.log(SettingPost)
      if (SettingPost === 'Ảnh/video') {
        this.addImg = true
      }
      if (SettingPost === 'addIcon') {
        this.showFeelingPost = true
      }
      if (SettingPost === 'tag') {
        this.showTag = true
      }
      if (SettingPost === 'checkIn') {
        this.showAndressPost = true
      }
    },
    updateValue(event) {
      this.value = event.target.innerHTML
      this.innerText = event.target.innerText
    },
    focusInput() {
      const span = document.createElement('span')
      if (this.flag) {
        span.style.minWidth = '20px'
        span.style.minHeight = '20px'
        span.style.display = 'inline-block'
        span.style.overflowWrap = 'break-word'
        this.$refs.inputRef.appendChild(span)
        this.flag = false
      }
    },
    addIcon(url) {
      const span = document.createElement('span')
      span.style.backgroundImage = `url(${url})`
      span.style.width = '20px'
      span.style.height = '20px'
      span.style.backgroundSize = 'cover'
      span.style.display = 'inline-block'
      span.style.paddingLeft = '20px'
      this.$refs.inputRef.appendChild(span)
      this.value = this.$refs.inputRef.innerHTML
      this.flag = true
    },

    addImgVideo(event) {
      if (event.target.files) {
        const files = Array.from(event.target.files)
        this.videoFiles = files.filter((item) => item.type === 'video/mp4')
        this.imageFiles = files.filter((item) => item.type !== 'video/mp4')
        this.imageFilesUrl = this.imageFiles?.map((file) => ({
          url: URL.createObjectURL(file),
        }))
        this.videoFilesUrl = this.videoFiles?.map((file) => ({
          url: URL.createObjectURL(file),
        }))
      }
    },
    pickBgMore(bg) {
      if (bg) {
        this.pickBg = bg.bgImgUrl
        this.colorTextPickBg = bg.textColor
      }
      this.showMoreBG = false
    },
    pickFeeling(feeling) {
      if (feeling) {
        this.feeling = feeling
      }
      this.showFeelingPost = false
    },
    handlePickWorkDetail(data) {
      this.feeling = data
      this.showFeelingPost = false
      console.log(this.workDetail)
    },
    handleTags(listTags) {
      this.listTags = listTags
      this.showTag = false
    },
    handleAndress(andress) {
      this.checkIn = andress.title
      this.showAndressPost = false
    },

    async handleCreatePost() {
      this.loading = true
      if (this.imageFiles) {
        await Promise.all(
          this.imageFiles.map(async (img) => {
            const formData = new FormData()
            formData.append('file', img)
            formData.append('upload_preset', 'facebookImage')
            const [uploadMedia] = await Promise.all([
              axios.post(
                'https://api.cloudinary.com/v1_1/dpztwoefq/image/upload',
                formData
              ),
            ])
            this.imagesUrl = [...this.imagesUrl, uploadMedia.data.secure_url]
          })
        )
      }
      if (this.videoFiles) {
        await Promise.all(
          this.videoFiles.map(async (video) => {
            const formData = new FormData()
            formData.append('file', video)
            formData.append('upload_preset', 'facebookImage')
            const [uploadMedia] = await Promise.all([
              axios.post(
                'https://api.cloudinary.com/v1_1/dpztwoefq/video/upload',
                formData
              ),
            ])
            this.videosUrl = [...this.videosUrl, uploadMedia.data.secure_url]
          })
        )
      }
      if (!this.isGroup) {
        const result = await PostRepository.createPost({
          content: this.value,
          imagesUrl: this.imagesUrl,
          videosUrl: this.videosUrl,
          background: this.pickBg,
          userId: this.user.user_id,
          typePost: this.typePost,
          check: this.user.check,
          admin_id: this.user.admin_id,
          feeling: this.feeling,
          tags: this.listTags,
          checkIn: this.checkIn,
        })
        await Promise.all([this.imagesUrl, this.videosUrl])
        this.loading = false
        this.$emit('update:showCreateDetail', false)
        socket.emit('post_notification', {
          postId: result.data,
          innerText: this.innerText,
          ownerId: this.user.user_id,
        })
        console.log(result.data);
      } else {
        await PostRepository.postGroups({
          groupId: this.groupId,
          content: this.value,
          imagesUrl: this.imagesUrl,
          videosUrl: this.videosUrl,
          background: this.pickBg,
          userId: this.user.user_id,
          typePost: 'Công khai',
          check: this.user.check,
        })
        await Promise.all([this.imagesUrl, this.videosUrl])
        this.loading = false
        this.$emit('update:showCreateDetail', false)
      }
    },
  },
}
</script>
<style scoped lang="css">
.delete {
  background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/y3/r/odx4lgPNPFi.png);
  background-position: -154px -88px;
  background-size: 190px 182px;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  display: inline-block;
}
.iconButton {
  height: 24px;
  width: 24px;
  background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yV/r/h3PaFxa04y3.png);
  background-position: 0px -38px;
  background-size: 38px 148px;
  background-repeat: no-repeat;
  display: inline-block;
}
.add-img {
  font-size: 15px;
  line-height: 1.3333;
  font-weight: 400;
  padding-bottom: 8px;
}
.no-add-img {
  font-size: 24px;
  line-height: 1.1667;
  padding-bottom: 40px;
}
.pickBg {
  height: 325px;
  z-index: -10;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.addBg {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
.plahoderNoPickBg {
  top: 0;
  left: 16px;
  z-index: -10;
  color: #65676b;
}
.plahoderPickBg {
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  z-index: -10;
  font-size: 30px;
  font-weight: 700;
  width: 500px;
}
.nav-bg {
  position: absolute;
  bottom: 8px;
}
.disable {
  opacity: 0.5;
  pointer-events: none;
}
</style>
