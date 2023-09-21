<template>
  <div class="w-full bg-[#F2F3F5] relative mt-[-13px]">
    <CreatePostDetail1 v-if="showCreatePost" @update:showCreateDetail="updateShowCreateDetail"/>
    <div class="w-[1047px] mt-4 flex gap-4 mx-auto">
      <div class="w-[42%]">
        <div
          class="introduce w-full mt-2 bg-white border-[0.8px] border-gray-200 rounded-md mb-4"
        >
          <div class="w-full h-[40px] pt-3 pb-1 px-4">
            <div class="w-full h-[16px] text-xl font-bold">Giới thiệu</div>
          </div>
          <!-- Tiểu sử -->
          <!-- hộp để nhập tiểu sử -->
          <div
            class="w-[415px] px-4 pt-2 mr-[-3px] ml-[10px]"
            v-if="showBiography"
          >
            <div class="w-[383px] h-[48px] p-[6px]">
              <textarea
                v-model="biography"
                class="text-area w-[371px] pl-[129px] outline-none font-semibold rounded-md bg-[#E4E6EB]"
                placeholder="Mô tả về bạn"
                rows="3"
              >
              </textarea>
              <p class="flex float-right text-sm text-gray-500 mb-1">
                Còn 101 kí tự
              </p>
            </div>
            <div class="w-[383px] mt-12 mb-4 flex justify-between px-2">
              <div
                class="h-[20px] flex justify-center items-center gap-1 mt-[10px]"
              >
                <i
                  data-visualcompletion="css-img"
                  class="x1b0d499 xep6ejk"
                  style="
                    background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yy/r/FFJlY6jO_92.png');
                    background-position: 0px -22px;
                    background-size: 22px 198px;
                    width: 20px;
                    height: 20px;
                    background-repeat: no-repeat;
                    display: inline-block;
                  "
                ></i>
                Công khai
              </div>
              <div class="w-[132pxpx] h-[40px] flex gap-3">
                <button
                  class="w-[60px] h-[40px] bg-gray-200 font-semibold rounded-lg hover:bg-gray-300"
                  @click="biographyClose"
                >
                  Hủy
                </button>
                <button
                  class="w-[60px] h-[40px] bg-blue-500 font-semibold rounded-lg text-white hover:bg-gray-300"
                  :class="{
                    'bg-gray-200': biography === '',
                    'btn-disabled': biography === '',
                  }"
                  :disabled="biography === ''"
                  @click="saveBiography()"
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>

          <!-- Hiển thị tiểu sử của page -->
          <div
            class="text-center px-9 mt-1"
            v-if="isPage && isPage.check && isPage.biography"
          >
            {{ isPage.biography }}
            <div class="w-[415px] pt-2" v-if="status && status === 'Myself'">
              <div class="w-[383px] h-[48px] pr-[10px] pt-2">
                <button
                  class="w-[371px] h-[36px] px-3 bg-[#E4E6EB] font-semibold rounded-md hover:bg-[#d1d2d4]"
                  @click="biographyOpen"
                >
                  Chỉnh sửa tiểu sử
                </button>
              </div>
            </div>
          </div>

          <!-- hiển thị tiểu sử và ô chỉnh tiểu sử của user -->
          <div
            v-if="profile && profile.biography && !isPage.check"
            class="font-medium text-center px-9"
          >
            <button
              v-if="status && status === 'Myself'"
              @click="removeBiography()"
              class="text-red-500 mr-2 -ml-2"
            >
              ×
            </button>
            <span>{{ profile.biography }}</span>
            <hr />
            <div class="w-[415px] pt-2">
              <div
                class="w-[383px] h-[48px] pr-[10px] pt-2"
                v-if="status && status === 'Myself'"
              >
                <button
                  class="w-[371px] h-[36px] px-3 bg-[#E4E6EB] font-semibold rounded-md hover:bg-[#d1d2d4]"
                  @click="biographyOpen"
                >
                  Chỉnh sửa tiểu sử
                </button>
              </div>
            </div>
          </div>

          <!-- hiển thị ô thêm tiểu sử -->
          <div class="w-[415px] px-4 pt-2 mr-[-3px] ml-[10px]" v-else>
            <div
              class="w-[383px] h-[48px] p-[6px]"
              v-if="isPage && status && status === 'Myself' && !isPage.check"
            >
              <button
                class="w-[371px] h-[36px] px-3 bg-[#E4E6EB] font-semibold rounded-md hover:bg-[#d1d2d4]"
                @click="biographyOpen"
              >
                Thêm tiểu sử
              </button>
            </div>
          </div>

          <!-- hiển thị trang nếu là Page -->
          <div
            class="font-medium flex items-center gap-3 mt-3 px-9"
            v-if="isPage.check"
          >
            <i
              style="
                background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/UMAvBmuqi-U.png');
                background-position: -66px -110px;
                background-size: 190px 200px;
                width: 20px;
                height: 20px;
                background-repeat: no-repeat;
                display: inline-block;
                filter: invert(50%);
              "
            ></i>
            Trang ·<span v-if="!isPage.category" class="text-base font-normal"
              >Hạng mục</span
            >
            <span v-if="isPage.category" class="text-base font-normal">{{
              isPage.category
            }}</span>
          </div>

          <!-- hiển thị web nếu là Page -->
          <div
            v-if="isPage.check"
            class="font-medium flex items-center gap-3 mt-2 px-9"
          >
            <img
              src="https://static.xx.fbcdn.net/rsrc.php/v3/y-/r/DzX7o-tOmJ6.png"
              alt=""
              height="20"
              width="20"
              style="filter: invert(50%)"
            />
            <span class="text-base font-normal" v-if="isPage.web">{{
              isPage.web
            }}</span>
          </div>

          <!-- hiển thị số điện thoại nếu là Page -->
          <div
            v-if="isPage.phone && isPage.check"
            class="font-medium flex items-center gap-3 mt-2 px-9"
          >
            <img
              src="https://static.xx.fbcdn.net/rsrc.php/v3/yE/r/7KDVc3hw483.png"
              alt=""
              height="20"
              width="20"
              style="filter: invert(50%)"
            />
            <span class="text-base font-normal">{{ isPage.phone }}</span>
          </div>

          <!-- hiển thị email nếu là Page -->
          <div
            v-if="isPage.email && isPage.check"
            class="font-medium flex items-center gap-3 mt-5 px-9"
          >
            <img
              src="https://static.xx.fbcdn.net/rsrc.php/v3/yO/r/W4m-1QXtJyK.png"
              alt=""
              height="20"
              width="20"
              style="filter: invert(50%)"
            />
            <span class="text-base font-normal">{{ isPage.email }}</span>
          </div>

          <!-- hiển thị địa chỉ nếu là Page -->
          <div
            v-if="isPage.address && isPage.check"
            class="font-medium flex items-center gap-3 mt-5 px-9"
          >
            <img
              src="https://static.xx.fbcdn.net/rsrc.php/v3/yZ/r/V632KGZoHho.png"
              alt=""
              height="20"
              width="20"
              style="filter: invert(50%)"
            />
            <span class="text-base font-normal">{{ isPage.address }}</span>
          </div>

          <!-- hiển thị công việc nếu là mình -->
          <div
            v-if="profile && profile.position && profile.company"
            class="flex justify-between mb-5 px-10 mt-3"
          >
            <div class="flex gap-3">
              <div class="justify-center flex items-center">
                <img
                  class="x1b0d499 xuo83w3"
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/yE/r/oXhO_oSl40g.png"
                  alt=""
                  height="24"
                  width="24"
                />
              </div>
              <p>
                {{ profile.position }} tại
                <strong>{{ profile.company }}</strong>
              </p>
            </div>
          </div>
          <!-- hiển thị trường học nếu là mình -->
          <div
            v-if="profile && profile.schoolName"
            class="flex justify-between mb-5 px-10 mt-3"
          >
            <div class="flex gap-3">
              <div class="justify-center flex items-center">
                <img
                  class="x1b0d499 xuo83w3"
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/tzVYBX7RQ1q.png"
                  alt=""
                  height="24"
                  width="24"
                />
              </div>
              <p>
                Từng học tại <strong> {{ profile.schoolName }} </strong>
              </p>
            </div>
          </div>
          <!-- hiển thị đại học nếu là mình -->
          <div
            v-if="
              profile &&
              profile.university &&
              profile.specialized_1 &&
              profile.specialized_2
            "
            class="flex justify-between mb-5 px-10 mt-3"
          >
            <div class="flex gap-3">
              <div class="justify-center flex items-center">
                <img
                  class="x1b0d499 xuo83w3"
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/tzVYBX7RQ1q.png"
                  alt=""
                  height="24"
                  width="24"
                />
              </div>
              <p>
                Học chuyên ngành {{ profile.specialized_1 }} tại
                <strong> {{ profile.university }} </strong>
              </p>
            </div>
          </div>
          <!-- sống ở đâu nếu là mình -->
          <div
            class="mt-3 flex justify-between gap-3 w-full h-[36px] px-10"
            v-if="status && status === 'Myself' && profile && profile.homeTown !== null"
          >
            <div class="flex gap-3">
              <div class="flex justify-center items-center mt-[-13px]">
                <img
                  class="x1b0d499 xuo83w3"
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/y4/r/HNzy6p26p_d.png"
                  alt=""
                  height="24"
                  width="24"
                />
              </div>
              <div class="text-[15px] hover:underline" v-if="status && status === 'Myself' && profile && profile.homeTown !== null">
                sống tại <strong>{{ profile.homeTown }}</strong>
              </div>
            </div>
          </div>
          <!-- đến từ đâu là mình -->
          <div
            v-if="profile && profile.homeTown"
            class="flex justify-between mb-5 px-10 mt-3"
          >
            <div class="flex gap-3">
              <div class="justify-center flex items-center">
                <img
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/yy/r/9RISa0HPFnB.png"
                  alt=""
                  height="24"
                  width="24"
                  class="x1b0d499 xuo83w3"
                />
              </div>
              <p>
                Đến từ <strong>{{ profile.homeTown }}</strong>
              </p>
            </div>
          </div>
          <!-- mối quan hệ nếu là mình -->
          <div
            v-if="profile && profile.relationship"
            class="flex justify-between px-10 mt-3"
          >
            <div class="flex gap-3">
              <div class="justify-center flex items-center mt-[-5px]">
                <img
                  class="x1b0d499 xuo83w3"
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/GDS3B7rCUbW.png"
                  alt=""
                  height="24"
                  width="24"
                />
              </div>
              <p>{{ profile.relationship }}</p>
            </div>
          </div>
          <div
            class="w-[415px] px-4 pt-2 mr-[-3px] ml-[10px]"
            v-if="status && status === 'Myself'"
          >
            <div class="w-[383px] h-[48px] p-[6px]">
              <button
                class="w-[371px] h-[36px] px-3 bg-[#E4E6EB] font-semibold rounded-md hover:bg-[#d1d2d4]"
                @click="modalBiographyOpen"
              >
                Chỉnh sửa chi tiết
              </button>
            </div>
            <modal-biography
              :show-modal="showModalBiography"
              @close-modal="modalBiographyClose"
            />
          </div>
          <div
            v-if="profile && profile.hobbies"
            class="px-8 flex justify-start gap-2 mt-3"
          >
            <div
              class="px-3 flex justify-center items-center hover:bg-gray-100 border-2 border-gray-200 rounded-3xl h-[35px] w-50 cursor-pointer font-semibold mb-4"
              v-for="(hobby, index) in profile.hobbies"
              :key="index"
            >
              <button
                v-if="status && status === 'Myself'"
                @click="removeHobby(index)"
                class="text-red-500 mr-2"
              >
                ×
              </button>
              <span>{{ hobby }}</span>
            </div>
          </div>
          <div
            class="w-[415px] px-4 pt-2 mr-[-3px] ml-[10px]"
            v-if="status && status === 'Myself'"
          >
            <div class="w-[383px] h-[48px] p-[6px]">
              <button
                class="w-[371px] h-[36px] px-3 bg-[#E4E6EB] font-semibold rounded-md hover:bg-[#d1d2d4]"
                @click="modalHobbiesOpen"
              >
                Thêm sở thích
              </button>
            </div>
            <modal-hobbies
              :hobbies="hobbies"
              :show-modal="showModalHobbies"
              @close-modal="modalHobbiesCancle"
              @saveSelectedHobbies="modalHobbiesClose"
            />
          </div>
          <div
            class="w-[415px] px-4 pt-2 mr-[-3px] mb-4 ml-[10px]"
            v-if="status && status === 'Myself'"
          >
            <div class="w-[383px] h-[48px] p-[6px]">
              <button
                class="w-[371px] h-[36px] px-3 bg-[#E4E6EB] font-semibold rounded-md hover:bg-[#d1d2d4]"
                @click="modalContentOpen"
              >
                Thêm nội dung đáng chú ý
              </button>
              <modal-content
                :hobbies="hobbies"
                :show-modal="showModalContent"
                @close-modal="modalContentClose"
              />
            </div>
          </div>
        </div>
        <div
          class="introduce w-full bg-white border-[0.8px] border-gray-200 rounded-md mb-4 ml-[5px]"
        >
          <div class="w-[371px] h-[40px] pt-3 pb-1 px-[16px] flex">
            <div class="w-full h-[16px] text-xl font-bold">Ảnh</div>
            <nuxt-link :to="`/${inforDetail}/photos`">
              <div
                class="ml-[-60px] text-[17px] text-[#216FDB] cursor-pointer w-[120px] h-[40px] rounded"
              >
                Xem tất cả ảnh
              </div>
            </nuxt-link>
          </div>
          <div class="w-full px-4 py-4">
            <div
              class="w-full grid grid-cols-3 gap-1 rounded-md overflow-hidden"
            >
              <div
                v-for="(img, index) in images.slice(
                  0,
                  Math.min(9, images.length)
                )"
                :key="index"
                class="w-[121px] h-[121px] rounded-lg"
                @click="handleImg(img.post_id)"
              >
                <img
                  :src="img.url"
                  class="w-full h-full rounded-lg object-cover cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="introduce w-full bg-white border-[0.8px] border-gray-200 rounded-md mb-4 ml-[5px]"
        >
          <div class="w-[371px] h-[40px] pt-3 pb-1 px-[16px] flex">
            <div class="w-full h-[16px] text-xl font-bold">Bạn bè</div>
            <div
              class="ml-[-80px] text-[17px] text-[#216FDB] cursor-pointer w-[160px] h-[40px] rounded"
            >
              <nuxt-link :to="`/${inforDetail}/friend`">
                Xem tất cả bạn bè
              </nuxt-link>
            </div>
          </div>
          <div class="w-full px-4 py-4">
            <div
              class="w-full grid grid-cols-3 gap-1 rounded-md overflow-hidden"
            >
              <div
                v-for="(friend, index) in inforFriend"
                :key="index"
                class="w-[121px]"
              >
                <!-- Sử dụng nuxt-link để chuyển đến trang userDetail -->
                <a
                  v-if="index < 9"
                  :href="`/${friend.user_id}`"
                  class="text-center font-semibold cursor-pointer"
                >
                  <div
                    class="imgFriend w-[121px] h-[121px] rounded-lg object-cover"
                  >
                    <img
                      :src="friend.avatar"
                      class="rounded object-cover w-[121px] h-[121px]"
                    />
                  </div>
                  {{ friend.fullName }}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full h-[32px] pl-[10px]">
          <small-footer />
        </div>
      </div>
      <div class="mt-[8px] w-[58%]">
        <div class="w-full">
          <create-post-container1
            :user="user"
            @update:showCreateDetail="updateShowCreateDetail"
          />
        </div>
        <div>
          <div
            v-for="post in posts"
            :key="post.post_id"
            class="w-full mt-4 rounded-xl bg-white border border-gray-200 shadow-xl"
          >
          <div v-if="status && status === 'Myself'">
            <ExternalPost :post="post" />
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from 'vuex'
import SmallFooter from '../../components/header/notifications_settings/settings/SmallFooter.vue'
import CreatePostContainer1 from '../../components/post/CreatedPost/CreatePostContainer1.vue'
import CreatePostDetail1 from '../../components/post/CreatedPost/CreatePostDetail1.vue'
import ModalBiography from '../../components/userDetail/ModalUserDetail/ModalBiography.vue'
import ModalHobbies from '../../components/userDetail/ModalUserDetail/ModalHobbies.vue'
import ModalContent from '../../components/userDetail/ModalUserDetail/ModalContent.vue'
import { RepositoryFactory } from '../../apiConfig/RepositoryFactory'
import ExternalPost from '../../components/post/ExternalPost.vue'
const userRepository = RepositoryFactory.get('user')
const hobbiesRepository = RepositoryFactory.get('hobbies')
const postsRepository = RepositoryFactory.get('posts')
export default {
  components: {
    SmallFooter,
    CreatePostContainer1,
    ModalBiography,
    ModalHobbies,
    ModalContent,
    ExternalPost,
    CreatePostDetail1
  },
  layout: 'userDetail',
  data() {
    return {
      showBiography: false,
      biography: '',
      showAddBiographyButton: true,
      showModalBiography: false,
      showModalHobbies: false,
      showModalContent: false,
      inforFriend: [],
      userDetail: {},
      inforDetail: [],
      hobbies: [],
      images: [],
      posts: [],
      idPost : this.$store.state.postUserDetail.postId,
      user: null,
      isPage: [],
      showCreatePost:false
    }
  },

  computed: {
    profile() {
      return this.$store.state.idFriendModule.userDetail
    },

    status() {
      return this.$store.state.idFriendModule.status
    },
  },

  watch: {
    '$store.state.idFriendModule.friends': {
      handler(val) {
        this.inforFriend = val
      },
      immediate: true,
    },

    '$store.state.idFriendModule.userDetail': {
      handler(val) {
        this.inforDetail = val ? val.user_id : null
        this.userDetail = val
        this.getImgUser(this.inforDetail)
        this.fetchPosts()
      },
      immediate: true,
      deep: true,
    },


    '$store.state.authModule.user': {
      handler(val) {
        this.isPage = val
        this.userId = val ? val.user_id : null
        this.user = val
        console.log('đây là thông tin page nè', this.isPage)
      },
      immediate: true,
      deep: true,
    },

    '$store.state.postUserDetail.postId': {
      handler(val) {
        this.idPost = val
        this.posts = this.posts.filter((post) => post.post_id !== this.idPost)
      },
      immediate : true,
      deep: true,
    }
  },

  methods: {
    biographyOpen() {
      this.showBiography = true
      this.showAddBiographyButton = false
    },

    biographyClose() {
      this.showBiography = false
      this.biography = ''
      this.showAddBiographyButton = true
    },

    async saveBiography() {
      if (!this.user?.check) {
        this.profile.biography = this.biography
        try {
          await userRepository.profileUser(this.userId, {
            biography: this.biography,
          })
          this.showBiography = false
        } catch (error) {
          console.log(error)
        }
      } else {
        this.isPage.describe = this.biography
        try {
          await userRepository.profilePage(this.userId, {
            biography: this.biography,
          })
          this.showBiography = false
        } catch (error) {
          console.log(error)
        }
      }
      this.biography = ''
    },

    async removeBiography() {
      this.profile.biography = ''
      try {
        await userRepository.profileUser(this.userId, {
          biography: '',
        })
      } catch (error) {
        console.log(error)
      }
      this.showBiography = false
    },

    modalBiographyOpen() {
      this.showModalBiography = true
    },

    modalBiographyClose() {
      this.showModalBiography = false
    },

    async modalHobbiesOpen() {
      this.showModalHobbies = true
      try {
        const response = await hobbiesRepository.getHobbies()
        this.hobbies = response.data
        console.log('hobbies', this.hobbies)
      } catch (error) {
        console.log(error)
      }
    },

    modalHobbiesClose(selectedHobbies) {
      this.profile.hobbies = selectedHobbies
      this.showModalHobbies = false
    },

    async removeHobby(index) {
      this.profile.hobbies.splice(index, 1)
      try {
        await userRepository.profileUser(this.userId, {
          selectedHobbies: this.profile.hobbies,
        })
      } catch (error) {
        console.error(error)
      }
    },

    modalHobbiesCancle() {
      this.showModalHobbies = false
    },

    modalContentOpen() {
      this.showModalContent = true
    },

    modalContentClose() {
      this.showModalContent = false
    },

    async getImgUser() {
      try {
        const response = await userRepository.getImgUser(this.inforDetail)
        this.images = response.data.images
        console.log('img nè', this.images)
      } catch (error) {
        console.log(error)
      }
    },

    handleImg(id) {
      this.$router.push(`/photo/${id}`)
    },

    async fetchPosts() {
      if (!this.userDetail?.check) {
        try {
          console.log('1')
          const result = await postsRepository.getPostforUser({
            userId: this.inforDetail,
          })
          this.posts = result.data
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          console.log('2')
          const result = await postsRepository.getPostforPage({
            pageId: this.inforDetail,
          })
          this.posts = result.data
        } catch (error) {
          console.log(error)
        }
      }
    },
    updateShowCreateDetail(data) {
      this.showCreatePost=data
    },
  },
}
</script>
<style scoped>
.text-area {
  border: 1px solid rgb(176, 176, 176) !important;
  resize: none;
}

.text-area:hover {
  background-color: rgba(191, 191, 191, 0.655) !important;
}

.text-area:focus {
  border: 1px solid #1b74e4 !important;
  background-color: white !important;
}
.introduce {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

.imgFriend:hover {
  background-color: rgba(0, 0, 0, 0.15);
}

.btn-disabled {
  background-color: gray;
  color: rgb(203, 203, 203) !important;
  cursor: not-allowed;
  pointer-events: none; /* Ngăn chặn sự kiện click */
}
</style>
