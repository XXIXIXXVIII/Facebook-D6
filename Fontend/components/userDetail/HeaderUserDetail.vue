<template>
  <div class="header w-full">
    <div v-if="isLoading"><Loading4/></div>
    <div class="relative">
      <div class="relative w-[1095px] h-[405px] mx-auto">
          <div
            class="w-[1095px] h-[405px] flex items-center mx-auto justify-center rounded-b-lg overflow-hidden relative cursor-pointer"
          >
            <img
              v-if="inforDetail"
              class="object-cover w-full h-full"
              :src="inforDetail.cover_img"
            />
          </div>
          <div
            v-if="
              inforDetail && userId && inforDetail.user_id === userId.user_id
            "
            class="w-[179px] h-[108px] p-[6px] absolute bottom-0 right-6 z-20 flex flex-col gap-1"
          >
            <div
              class="w-[167px] h-[36px] mb-[8px] bg-[rgba(0,0,0,0.4)] text-white font-medium text-[17px] rounded-md px-7 py-1 hover:bg-[rgba(0,0,0,0.5)]"
            >
              Tạo với avatar
            </div>
            <div class="relative">
              <div
                class="w-[167px] h-[36px] mb-[8px] bg-[rgba(0,0,0,0.4)] text-white font-medium text-[17px] rounded-md px-3 py-1 hover:bg-[rgba(0,0,0,0.5)] cursor-pointer"
                @click="toggleDropdown('coverImg')"
              >
                Chỉnh sửa ảnh bìa
              </div>
              <div
              v-if="activeDropdown === 'coverImg'"
              class="drdbg absolute left-[-183px] top-12 right-0 w-[350px] bg-white shadow-black rounded-md"
              >
                <div
                  class="px-4 py-3 font-semibold cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                >
                  <i
                    style="
                      background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yB/r/uj14YiK-kua.png');
                      background-position: 0px -152px;
                      background-size: 38px 258px;
                      width: 20px;
                      height: 20px;
                      background-repeat: no-repeat;
                      display: inline-block;
                    "
                  ></i>
                  Chọn ảnh
                </div>
                <label
                  for="uploadInput"
                  class="px-4 py-3 font-semibold cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                >
                  <i
                    data-visualcompletion="css-img"
                    class="x1b0d499 xep6ejk"
                    style="
                      background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yB/r/uj14YiK-kua.png');
                      background-position: 0px -218px;
                      background-size: 38px 258px;
                      width: 20px;
                      height: 20px;
                      background-repeat: no-repeat;
                      display: inline-block;
                    "
                  ></i>
                  Tải ảnh lên
                </label>

                <!-- Input ẩn có type 'file' -->
                <input
                  id="uploadInput"
                  type="file"
                  style="display: none"
                  @change="(event) => handleAvatarChange(event, 'coverImg')"
                />
                <div
                  class="px-4 py-3 font-semibold cursor-pointer hover.bg-gray-100 flex items-center gap-2"
                >
                  <i
                    data-visualcompletion="css-img"
                    class="x1b0d499 xep6ejk"
                    style="
                      background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yB/r/uj14YiK-kua.png');
                      background-position: 0px -64px;
                      background-size: 38px 258px;
                      width: 20px;
                      height: 20px;
                      background-repeat: no-repeat;
                      display: inline-block;
                    "
                  ></i>
                  Tạo ảnh bìa bằng Avatar
                </div>
                <div
                  class="px-4 py-3 font-semibold cursor-pointer hover:bg-gray-100 flex items-center gap-2 border-b-gray-200"
                >
                  <i
                    data-visualcompletion="css-img"
                    class="x1b0d499 xep6ejk"
                    style="
                      background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yJ/r/cGzgMi6dLwF.png');
                      background-position: 0px -22px;
                      background-size: 22px 330px;
                      width: 20px;
                      height: 20px;
                      background-repeat: no-repeat;
                      display: inline-block;
                    "
                  ></i>
                  Đặt lại vị trí
                </div>
                <div
                  class="px-4 py-3 font-semibold cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                >
                  <i
                    data-visualcompletion="css-img"
                    class="x1b0d499 xep6ejk"
                    style="
                      background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/yEg-pKFaIiI.png');
                      background-position: 0px -1034px;
                      background-size: 22px 1198px;
                      width: 20px;
                      height: 20px;
                      background-repeat: no-repeat;
                      display: inline-block;
                    "
                  ></i>
                  Gỡ
                </div>
              </div>
            </div>
          </div>
        </div>
      <div class="absolute w-full h-full top-0 flex items-center justify-center overflow-hidden">
        <div
          v-if="inforDetail"
          :style="{
            filter: 'blur(20px)',
            backgroundImage: `url('${inforDetail.cover_img}')`,
          }"
          class="coverPhoto w-full h-full absolute -z-20 bg-repeat"
        ></div>
        <div
          style="background-image: linear-gradient(to top,#ffffff,rgba(255, 255, 255, 0.9),rgba(255, 255, 255, 0.7),rgba(255, 255, 255, 0.4),rgba(255, 255, 255, 0));"
          class="absolute w-full h-full -z-10"
        ></div>
      </div>
    </div>
    <div class="w-full h-[144px] pb-4 -z-30">
      <div class="w-[1051px] h-[128px] mx-auto relative">
        <div class="w-full h-full bg-white flex justify-evenly gap-2">
          <div class="w-1/2 flex items-center">
            <div class="flex items-center">
              <div class="w-[170px] h-[170px] relative mr-4 mb-[46px]">
                <div
                  class="border-4 border-white rounded-full overflow-hidden cursor-pointer w-[168px] h-[168px]"
                  @click="toggleDropdown('avatar')"
                >
                  <img
                    v-if="inforDetail"
                    :src="inforDetail.avatar"
                    class="object-cover w-full h-full"
                  />
                </div>
                  <div v-if="online && status && status !=='Myself' && online === true" class="absolute bottom-[19px] right-[9px] w-[32px] h-[32px] bg-green-500 rounded-full px-1 pt-[2px] items-center justify-center cursor-pointer overflow-hidden border-4 border-white">
                  </div>
                <div
                  v-if="
                    activeDropdown === 'avatar' &&
                    inforDetail &&
                    inforDetail.user_id === userId.user_id
                  "
                  class="absolute z-30 left-5 right-0 mt-2 w-[350px] bg-white border border-gray-300 shadow-md rounded-md"
                >
                  <div
                    class="px-4 py-2 font-semibold cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                  >
                    <i
                      data-visualcompletion="css-img"
                      class="x1b0d499 xep6ejk"
                      style="
                        background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/tj7XRbB5MZL.png');
                        background-position: 0px -44px;
                        background-size: 22px 88px;
                        width: 20px;
                        height: 20px;
                        background-repeat: no-repeat;
                        display: inline-block;
                      "
                    ></i>
                    Xem tin
                  </div>
                  <div
                    class="px-4 py-2 font-semibold cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                  >
                    <i
                      data-visualcompletion="css-img"
                      class="x1b0d499 xep6ejk"
                      style="
                        background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/tj7XRbB5MZL.png');
                        background-position: 0px -66px;
                        background-size: 22px 88px;
                        width: 20px;
                        height: 20px;
                        background-repeat: no-repeat;
                        display: inline-block;
                      "
                    ></i>
                    Xem ảnh đại diện
                  </div>
                  <label
                    for="avatarInput"
                    class="px-4 py-2 font-semibold cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                  >
                    <i
                      data-visualcompletion="css-img"
                      class="x1b0d499 xep6ejk"
                      style="
                        background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/h-cAL7dCtgl.png');
                        background-position: 0px -152px;
                        background-size: 38px 240px;
                        width: 20px;
                        height: 20px;
                        background-repeat: no-repeat;
                        display: inline-block;
                      "
                    ></i>
                    Cập nhật ảnh đại diện
                  </label>

                  <!-- Input ẩn có type 'file' -->
                  <input
                    id="avatarInput"
                    type="file"
                    style="display: none"
                    @change="(event) => handleAvatarChange(event, 'avatar')"
                  />
                  <div
                    class="px-4 py-2 font-semibold cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                  >
                    <i
                      data-visualcompletion="css-img"
                      class="x1b0d499 xep6ejk"
                      style="
                        background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/tj7XRbB5MZL.png');
                        background-position: 0px -22px;
                        background-size: 22px 88px;
                        width: 20px;
                        height: 20px;
                        background-repeat: no-repeat;
                        display: inline-block;
                      "
                    ></i>
                    Thêm khung
                  </div>
                  <div
                    class="px-4 py-2 font-semibold cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                  >
                    <i
                      data-visualcompletion="css-img"
                      class="x1b0d499 xep6ejk"
                      style="
                        background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/h-cAL7dCtgl.png');
                        background-position: 0px -64px;
                        background-size: 38px 240px;
                        width: 20px;
                        height: 20px;
                        background-repeat: no-repeat;
                        display: inline-block;
                      "
                    ></i>
                    Dùng avatar làm ảnh đại diện
                  </div>
                </div>
                <div
                  v-if="
                    inforDetail &&
                    userId &&
                    inforDetail.user_id === userId.user_id
                  "
                  class="absolute bottom-2 right-1 w-[38px] h-[38px] bg-gray-100 rounded-full px-1 pt-[2px] items-center justify-center border-none cursor-pointer overflow-hidden"
                >
                  <img
                    src="../../assets/user_detail_img/camera.jpg"
                    class="w-[30px] h-[30px] rounded-full"
                  />
                </div>
              </div>
              <div class="h-[50px] mb-10">
                <div
                  v-if="inforDetail"
                  class="text-black text-[32px] font-bold"
                >
                  {{ inforDetail.fullName }}
                </div>
                <div
                  v-if="inforFriend && !inforDetail?.check"
                  class="text-gray-500 font-semibold mt-[-4px]"
                >
                  {{ inforFriend.length }} bạn bè
                </div>
                <div
                  v-if="inforDetail?.check"
                  class="text-gray-500 font-semibold mt-[-4px]"
                >
                  2222222
                </div>
              </div>
            </div>
          </div>
          <div class="w-1/2">
            <div>
              <button-status />
            </div>
            <div
              class="w-[48px] h-[36px] mt-2 px-4 float-right flex justify-center items-center rounded-md bg-[#ECF3FF] hover:bg-[#e6eefc]"
            >
              <button
                class="text-black font-semibold flex justify-center items-center"
              >
                <i
                  data-visualcompletion="css-img"
                  style="
                    background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yy/r/R6S5jqYFFnY.png');
                    background-position: 0px -270px;
                    background-size: 26px 612px;
                    width: 16px;
                    height: 16px;
                    background-repeat: no-repeat;
                    display: inline-block;
                  "
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-[0.8px]">
      <div class="w-[1020px] h-full border-b border-gray-300 m-auto"></div>
    </div>
    <nav-user-detail />
  </div>
</template>
<script>
import axios from 'axios'
import { RepositoryFactory } from '../../apiConfig/RepositoryFactory'
import Loading4 from '../alert/Load4.vue'
import NavUserDetail from './NavUserDetail.vue'
import ButtonStatus from './ButtonStatus.vue'
const userRepository = RepositoryFactory.get('user')

export default {
  components: {
    NavUserDetail,
    ButtonStatus,
    Loading4
  },
  data() {
    return {
      activeDropdown: null,
      inforDetail: null,
      avatar: '',
      cover_img: '',
      inforFriend: {},
      userId: null,
      isLoading:false,
      online : true
    }
  },

  computed: {
    status() {
      return this.$store.state.idFriendModule.status
    }
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
        this.inforDetail = val
        console.log(this.inforDetail)
      },
      immediate: true,
    },

    '$store.state.idFriendModule.userDetail.online': {
      handler(val) {
        this.online = val
      },
      immediate: true,
    },

    '$store.state.authModule.user': {
      handler(val) {
        this.userId = val
      },
      immediate: true,
    },
  },

  destroyed() {
    this.$store.dispatch('resetUserDetai')
  },

  methods: {
    toggleDropdown(dropdownName) {
      // Đóng tất cả các dropdown
      if (this.activeDropdown === dropdownName) {
        this.activeDropdown = null
      } else {
        this.activeDropdown = dropdownName
      }
    },
    async handleAvatarChange(event, type) {
      this.isLoading = true
      const selectedFileAvatar = event.target.files[0]
      console.log('avatar', selectedFileAvatar)

      if (
        !selectedFileAvatar ||
        !/\.jpg$|\.png$/i.test(selectedFileAvatar.name)
      ) {
        console.log('Đuôi tệp không hợp lệ. Vui lòng chọn tệp .jpg hoặc .png.')
        return
      }

      const formData = new FormData()
      formData.append('file', selectedFileAvatar)
      formData.append('upload_preset', 'Project_module 5')

      const [uploadMedia] = await Promise.all([
        axios.post(
          'https://api.cloudinary.com/v1_1/dkwxilkxq/image/upload',
          formData
        ),
      ])

      const newAvatar = uploadMedia.data.secure_url

      if (newAvatar !== this.avatar && !this.userId.check ) {
        try {
          const response = await userRepository.updateImgUserDetail({
            userId: this.userId.user_id,
            avatar: newAvatar,
            type,
          })
          console.log('Kết quả từ server:', response)
          // Chỉ cập nhật giá trị avatar nếu thành công
        } catch (error) {
          console.log(error)
        }
      }
      if(newAvatar !== this.avatar && this.userId.check){
        try {
          const response = await userRepository.updateImgPageDetail({
            userId: this.userId.user_id,
            avatar: newAvatar,
            type,
            adminId: this.userId.admin_id
          })
          console.log('Kết quả từ server:', response)
          
          this.avatar = newAvatar
        } catch (error) {
          console.log(error)
        }
      }
      if(type==="avatar"){
            this.inforDetail.avatar = newAvatar
          }else{
          
            this.inforDetail.cover_img = newAvatar
          }
      this.activeDropdown = null
      this.isLoading = false
    },
  },
}
</script>
<style scoped lang="css">
 .drdbg {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
 }
</style>
