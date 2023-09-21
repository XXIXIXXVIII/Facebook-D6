<template>
  <div
    class="max-[890px]:fixed max-[890px]:top-0.6 max-[890px]:right-0 pl-1 pr-4 z-[3] block w-[320px]"
  >
    <div
      aria-label="Cài đặt và kiểm soát tài khoản"
      class="flex relative z-0 flex-row-reverse"
      role="navigation"
    >
      <!-- Phần ảnh Avatar ==========================================================> -->
      <span
        v-tippy="{
          content: 'Tài khoản',
          theme: 'material',
          placement: 'bottom',
        }"
        @click="handleShowSetting"
      >
        <div class="m-0 p-0">
          <div class="relative z-0 inline-block cursor-pointer">
            <div
              style="overflow: hidden"
              class="relative z-0 inline-block align-bottom h-10 w-10 bg-black dark:bg-white rounded-full"
            >
              <img class="w-full h-full object-cover" :src="user?.avatar" />
            </div>
          </div>
        </div>
      </span>

      <!-- Phần thông báo ==========================================================> -->
      <div
        v-tippy="{
          content: 'Thông báo',
          theme: 'material',
          placement: 'bottom',
        }"
        class="mr-2"
      >
        <span>
          <div class="box-border relative z-0">
            <!--Icon Tắt thông bảng báo -->
            <div
              v-if="!toggle.showNofication && currentPath !== '/notifications'"
              aria-label="Thông báo"
              class="select-icon flex justify-center items-center p-0 m-0 w-[40px] h-[40px] cursor-pointer box-border rounded-full"
              tabindex="0"
              @click="handleShowNofication"
            >
              <!-- eslint-disable-next-line vue/no-v-html -->
              <span v-html="icon?.nofication"></span>

              <div
                class="rounded-[50%] opacity-0"
                data-visualcompletion="ignore"
              ></div>
            </div>

            <!-- Icon Bật bảng thông báo -->
            <div
              v-if="toggle.showNofication || currentPath === '/notifications'"
              aria-label="Thông báo"
              class="select-icon-active flex justify-center items-center p-0 m-0 w-[40px] h-[40px] cursor-pointer box-border rounded-full"
              tabindex="0"
              @click="handleShowNofication"
            >
              <!-- eslint-disable-next-line vue/no-v-html -->
              <span v-html="icon.noficationActive"></span>

              <div
                class="rounded-[50%] opacity-0"
                data-visualcompletion="ignore"
              ></div>
            </div>

            <!-- Số lượng thông báo -->
            <div
              v-if="unreadNotificationQuantity > 0"
              style="top: -6px; left: 26px"
              class="flex m-0 p-0 box-border bg-transparent cursor-pointer absolute items-stretch w-5"
              tabindex="-1"
            >
              <span
                class="font-medium bg-[#e41e3f] text-white h-[19px] inline-flex leading-none m-w-[19px] rounded-[100px] cursor-pointer"
                ><span
                  class="flex justify-center w-full h-full p-[5px] items-center text-[.8125rem]"
                  >{{ unreadNotificationQuantity }}
                  <span v-if="+unreadNotificationQuantity >= 20">+</span></span
                ></span
              >
            </div>
          </div>
        </span>
      </div>

      <!-- Phần tin nhắn ==========================================================> -->
      <div
        v-tippy="{
          content: 'Messenger',
          theme: 'material',
          placement: 'bottom',
        }"
        class="mr-2"
      >
        <span>
          <span>
            <div class="box-border relative z-0">
              <!--Icon Tắt tin nhắn -->
              <div
                v-if="
                  currentPath !== '/messages' &&
                  !showMessengerBoard &&
                  !user?.check
                "
                class="select-icon flex justify-center items-center p-0 m-0 w-[40px] h-[40px] cursor-pointer box-border rounded-full"
                tabindex="0"
                @click="handleShowMessenger"
              >
                <!-- eslint-disable-next-line vue/no-v-html -->
                <span v-html="icon.messenger"></span>

                <div
                  class="rounded-[50%] opacity-0"
                  data-visualcompletion="ignore"
                ></div>
              </div>

              <!-- Icon Bật tin nhắn-->
              <div
                v-if="showMessengerBoard"
                class="select-icon-active flex justify-center items-center p-0 m-0 w-[40px] h-[40px] cursor-pointer box-border rounded-full"
                tabindex="0"
                @click="handleShowMessenger"
              >
                <!-- eslint-disable-next-line vue/no-v-html -->
                <span v-html="icon.messengerActive"></span>

                <div
                  class="rounded-[50%] opacity-0"
                  data-visualcompletion="ignore"
                ></div>
              </div>

              <!-- Số lượng tin nhắn -->
              <div
                v-if="
                  currentPath !== '/messages' &&
                  unreadMessagesQuantity > 0 &&
                  !user?.check
                "
                aria-hidden="true"
                style="top: -6px; left: 26px"
                class="flex m-0 p-0 box-border bg-transparent cursor-pointer absolute items-stretch w-5"
                role="button"
                tabindex="-1"
              >
                <span
                  class="font-medium bg-[#e41e3f] text-white h-[19px] inline-flex leading-none min-w-[19px] rounded-[100px] cursor-pointer"
                  ><span
                    class="flex justify-center w-full h-full p-[5px] items-center text-[.8125rem]"
                    >{{ unreadMessagesQuantity
                    }}<span v-if="unreadMessagesQuantity >= 20">+</span></span
                  >
                </span>
              </div>
            </div>
          </span>
        </span>
      </div>

      <!-- Phần mở rộng ==========================================================> -->
      <div
        v-tippy="{
          content: 'Menu',
          theme: 'material',
          placement: 'bottom',
        }"
        :style="{
          marginRight: currentPath !== '/messages' ? '8px' : '0',
          marginRight: !user?.check ? '8px' : '0',
        }"
      >
        <span
          ><span>
            <div class="box-border relative z-0">
              <!-- Icon tắt mở rộng -->
              <div
                v-if="!toggle.showMenu"
                class="select-icon flex justify-center items-center rounded-[50%] p-0 m-0 w-[40px] h-[40px] cursor-pointer box-border"
                @click="handleShowMenu"
              >
                <!-- eslint-disable-next-line vue/no-v-html -->
                <span v-html="icon.menu"></span>
                <div
                  class="rounded-[50%] opacity-0"
                  data-visualcompletion="ignore"
                ></div>
              </div>

              <!-- Icon Bật mở rộng -->
              <div
                v-if="toggle.showMenu"
                class="select-icon-active flex justify-center items-center rounded-[50%] p-0 m-0 w-[40px] h-[40px] cursor-pointer box-border"
                @click="handleShowMenu"
              >
                <!-- eslint-disable-next-line vue/no-v-html -->
                <span v-html="icon.menuActive"></span>
                <div
                  class="rounded-[50%] opacity-0"
                  data-visualcompletion="ignore"
                ></div>
              </div>
            </div>
          </span>
        </span>
      </div>
    </div>

    <!-- Hiện bảng cài đặt  -->
    <div v-if="toggle.showSetting">
      <setting-board :user-infor="user" />
    </div>

    <!-- Hiện bảng thông báo -->
    <div
      v-if="currentPath !== '/notifications' && toggle.showNofication"
      style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px"
      class="notification-board top-[52px] right-[17px] w-[386px] bg-white dark:bg-[#242526] rounded-lg absolute z-10 p-4 max-h-[625px] overflow-y-auto"
    >
      <nofication-board />
    </div>

    <!-- Hiện bảng messenger -->
    <div
      v-if="showMessengerBoard"
      style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px"
      class="top-[52px] right-[17px] w-[360px] bg-white dark:bg-[#242526] rounded-lg absolute z-10 p-4 max-h-[625px] overflow-x-hidden overflow-y-auto"
    >
      <messenger-board />
    </div>

    <div
      v-if="currentPath !== '/messages' && showInboxOne"
      class="fixed bottom-0 right-[80px] w-[328px] h-[455px] bg-[#f7f8fa] dark:bg-[#242526]"
    >
      <messenger-inbox
        :messenger-value-one="messengerValue[0]"
        @show-inbox-one="handleCloseShowInbox"
      />
    </div>

    <div
      v-if="currentPath !== '/messages' && showInboxTwo"
      class="fixed bottom-0 right-[445px] w-[328px] h-[455px] bg-[#f7f8fa] dark:bg-[#242526]"
    >
      <messenger-inbox
        :messenger-value-two="messengerValue[messengerValue.length - 1]"
        @show-inbox-two="handleCloseShowInboxTwo"
      />
    </div>

    <div
      v-if="
        showInboxTwo ? messengerValue.length > 2 : messengerValue.length > 1
      "
      class="fixed bottom-2 right-0 w-[58px] mr-2"
    >
      <div
        v-for="(message, messageIndex) in messengerValue.slice(
          1,
          messengerValue.length < 6
            ? showInboxTwo
              ? messengerValue.length - 1
              : messengerValue.length
            : 6
        )"
        :key="messageIndex"
        class="relative flex flex-col items-center"
      >
        <div
          v-tippy="{
            content: `${message.toUserName}`,
            theme: 'light',
            placement: 'right',
            arrow: true,
          }"
          style="
            border: 1px solid rgb(210, 210, 210);
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
          "
          class="relative w-[48px] h-[48px] overflow-hidden rounded-full mb-2 cursor-pointer"
          @click="handleChangeInbox(message, messageIndex)"
        >
          <img
            class="w-full h-full object-cover"
            :src="message.toUserAvatar"
            alt=""
          />
        </div>
        <div
          style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px"
          class="absolute top-0 right-0 w-[20px] h-[20px] overflow-hidden bg-white dark:bg-[#242526] hover:bg-slate-100 rounded-full flex items-center justify-center cursor-pointer"
          @click="handleDeleteIcon(messageIndex)"
        >
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="icon.previewImgX"></span>
        </div>
      </div>
    </div>

    <!-- Hiện bảng mở rộng -->
    <div v-if="toggle.showMenu">
      <menu-board />
    </div>
  </div>
</template>

<script>
import { RepositoryFactory } from '../../../apiConfig/RepositoryFactory'
import {
  nofication,
  noficationActive,
  messenger,
  messengerActive,
  menu,
  menuActive,
  previewImgX,
} from '../../../assets/icons/icons'
import { socket } from '../../../plugins/socket.io'
import SettingBoard from './settings/SettingBoard.vue'
import NoficationBoard from './notifications/NoficationBoard.vue'
import MessengerBoard from './messenger/MessengerBoard.vue'
import MenuBoard from './menu/MenuBoard.vue'
import MessengerInbox from './messenger/MessengerInbox.vue'
const messengerRepository = RepositoryFactory.get('messenger')
const notificationRepository = RepositoryFactory.get('notification')
export default {
  name: 'NoficationAndSettings',
  components: {
    SettingBoard,
    NoficationBoard,
    MessengerBoard,
    MenuBoard,
    MessengerInbox,
  },
  data() {
    return {
      icon: {
        nofication,
        noficationActive,
        messenger,
        messengerActive,
        menu,
        menuActive,
        previewImgX,
      },
      toggle: {
        showSetting: false,
        showNofication: false,
        showMessenger: false,
        showMenu: false,
      },
      user: null,
      unreadMessagesQuantity: 0,
      unreadNotificationQuantity: 0,
      messengers: [],
      notifications: [],
    }
  },

  computed: {
    currentPath() {
      return this.$route.path
    },
    showMessengerBoard() {
      return this.$store.state.headerModule.showMessengerBoard
    },
    showInboxOne() {
      return this.$store.state.headerModule.showInboxOne
    },
    showInboxTwo() {
      return this.$store.state.headerModule.showInboxTwo
    },
    messengerValue() {
      return this.$store.state.headerModule.messengerValue
    },
  },
  watch: {
    '$store.state.headerModule.unreadMessagesQuantity': {
      handler(val) {
        this.unreadMessagesQuantity = val
      },
      deep: true,
      immediate: true,
    },
    '$store.state.notificationModule.unreadNotificationQuantity': {
      handler(val) {
        this.unreadNotificationQuantity = val
      },
      deep: true,
      immediate: true,
    },
    '$store.state.authModule.user': {
      handler(val) {
        this.user = val
      },
      deep: true,
      immediate: true,
    },
  },

  created() {
    this.handleRenderMessengerBoard()
    this.handleRenderNotification()
    socket.on('receive_messages', () => {
      this.handleRenderMessengerBoard()
    })
    socket.on('recive_new_notification', () => {
      this.handleRenderNotification()
    })
    console.log(this.currentPath)
  },

  mounted() {
    this.handleRenderMessengerBoard()
    this.handleRenderNotification()

    socket.on('receive_messages', () => {
      this.handleRenderMessengerBoard()
      console.log('a1')
    })
    socket.on('recive_new_notification', () => {
      this.handleRenderNotification()
    })
  },

  methods: {
    async handleRenderMessengerBoard() {
      try {
        const response = await messengerRepository.renderMessengerBoard(
          this.user.user_id
        )
        this.messengers = response.data
        this.countUnreadMessages()
      } catch (error) {
        console.log(error)
      }
    },

    countUnreadMessages() {
      const unreadMessagesQuantity = this.messengers.filter(
        (message) => +message.unread > 0
      ).length

      this.$store.commit('setUnreadMessagesQuantity', unreadMessagesQuantity)
    },

    async handleRenderNotification() {
      try {
        const res = await notificationRepository.renderNotification({
          userId: this.user.user_id,
        })
        this.notifications = res.data
        this.countUnreadNotifications()
      } catch (error) {
        console.log('Không thể render ra thông báo bởi', error)
      }
    },

    countUnreadNotifications() {
      const unreadNotifications = this.notifications.filter(
        (notify) => notify.unread === true
      ).length
      this.$store.commit('setUnreadNotificationQuantity', unreadNotifications)
    },

    handleShowSetting() {
      this.toggle.showSetting = !this.toggle.showSetting
      this.toggle.showNofication = false
      this.$store.commit('setShowMessengerBoard', false)
      this.toggle.showMenu = false
    },
    handleShowNofication() {
      this.toggle.showNofication = !this.toggle.showNofication
      this.toggle.showSetting = false
      this.$store.commit('setShowMessengerBoard', false)
      this.toggle.showMenu = false
    },
    handleShowMessenger() {
      this.$store.commit('setShowMessengerBoard', !this.showMessengerBoard)
      this.toggle.showSetting = false
      this.toggle.showNofication = false
      this.toggle.showMenu = false
    },
    handleShowMenu() {
      this.toggle.showMenu = !this.toggle.showMenu
      this.toggle.showSetting = false
      this.toggle.showNofication = false
      this.$store.commit('setShowMessengerBoard', false)
    },

    handleChangeInbox(value, index) {
      this.messengerValue.splice(index + 1, 1)
      this.messengerValue.push(value)
    },

    handleCloseShowInbox() {
      if (this.messengerValue.length >= 3) {
        this.messengerValue[0] =
          this.messengerValue[this.messengerValue.length - 2]
        this.messengerValue.splice(this.messengerValue.length - 2, 1)
        this.$store.commit('setMessengerValue', this.messengerValue)
      } else if (this.messengerValue.length === 2) {
        this.messengerValue.shift()
        this.$store.commit('setMessengerValue', this.messengerValue)
        this.$store.commit('setShowInboxTwo', false)
      } else {
        this.messengerValue.shift()
        this.$store.commit('setMessengerValue', this.messengerValue)
        this.$store.commit('setShowInboxOne', false)
      }
    },

    handleCloseShowInboxTwo() {
      this.messengerValue.pop()
      this.$store.commit('setMessengerValue', this.messengerValue)
      this.$store.commit('setShowInboxTwo', false)
    },

    handleDeleteIcon(index) {
      this.messengerValue.splice(index + 1, 1)
    },

    abc(newValue, oldValue) {
      this.user = newValue
      console.log(this.user.fullName)
    },
  },
}
</script>

<style scoped>
.select-icon {
  background-color: #e4e6eb;
}

.select-icon-active {
  color: #1877f2;
  background-color: #e2f3ff;
}

.select-icon:hover {
  background-color: #d0d2d8;
}
</style>
