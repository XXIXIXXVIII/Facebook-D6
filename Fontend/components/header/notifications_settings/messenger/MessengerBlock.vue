<template>
  <div class="dark:bg-[#242526] dark:text-white">
    <div
      v-for="(messenger, index) in messengers"
      :key="index"
      class="messenger w-full flex justify-between items-center z-10 dark:bg-[#242526] dark:text-white"
      @click="handleGetValue(messenger)"
    >
      <div
        class="flex justify-center items-center mt-1 w-[56px] h-[56px] bg-[#e4e6eb] dark:bg-[#242526] rounded-full overflow-hidden"
      >
        <img
          class="w-full h-full object-cover"
          :src="messenger.toUserAvatar"
          alt=""
        />
      </div>
      <div class="flex w-[80%] items-center overflow-hidden pl-1">
        <div>
          <div class="text-sm font-medium dark:bg-[#242526] dark:text-white">
            {{ messenger.toUserName }}
          </div>
          <div class="text-xs flex">
            <div
              :class="{ 'last-activity-unread': messenger.unread > 0 }"
              class="w-[185px] overflow-hidden whitespace-nowrap text-ellipsis"
            >
              {{ messenger.lastActivity }}
            </div>
            <div lass="font-medium">&nbsp;·&nbsp;</div>
            <div class="font-normal">{{ messenger.lastTime }}</div>
          </div>
        </div>
        <!-- Chưa đọc sẽ hiện lên -->
        <div
          v-if="+messenger.unread > 0"
          class="absolute right-6 flex justify-end"
        >
          <span
            class="w-3 h-3 inline-flex justify-center items-center rounded-full bg-[#1877f2]"
          ></span>
        </div>
        <!-- Đã đọc -->
        <div
          v-if="messenger.unread == 0"
          class="absolute right-6 flex justify-end"
        >
          <span
            class="w-4 h-4 inline-flex justify-center items-center rounded-full overflow-hidden"
          >
            <img
              class="w-full h-full object-cover"
              :src="messenger.toUserAvatar"
              alt=""
            />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RepositoryFactory } from '../../../../apiConfig/RepositoryFactory'
import { socket } from '../../../../plugins/socket.io'
const messengerRepository = RepositoryFactory.get('messenger')
export default {
  name: 'MessengerBlock',

  data() {
    return {
      messengers: [],
      isDuplicate: undefined,
    }
  },

  computed: {
    currentPath() {
      return this.$route.path
    },
    user() {
      return this.$store.state.authModule.user
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
    messengerOtherValue() {
      return this.$store.state.headerModule.messengerOtherValue
    },
    // Lấy dố lượng tin nhắn chưa đọc
  },

  created() {
    this.handleRenderMessengerBoard()
    this.countUnreadMessages()
    socket.on('receive_messages', () => {
      this.handleRenderMessengerBoard()
      this.countUnreadMessages()
    })
  },

  mounted() {
    // this.handleRenderMessengerBoard()
    // this.countUnreadMessages()
    socket.on('receive_messages', () => {
      this.handleRenderMessengerBoard()
      this.countUnreadMessages()
      console.log('a2')
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

    async handleGetValue(value) {
      socket.emit('seen_messages', {
        userConversationId: value.conversationId,
        accountHasLogin: this.user.user_id,
      })

      if (this.currentPath === '/messages') {
        this.$store.commit('setShowOtherInbox', true)
        this.$store.commit('setMessengerOtherValue', value)
      }

      this.isDuplicate = this.messengerValue.findIndex(
        (message) => message.toUserId === value.toUserId
      )

      if (this.isDuplicate === -1) {
        // Nếu không trùng lặp, thêm phần tử vào cuối mảng messages của phần tử thứ nhất trong messagesList
        this.messengerValue.push(value)
        this.$store.commit('setShowInboxOne', true)
        this.$store.commit('setMessengerValue', this.messengerValue)
        this.$store.commit('setShowMessengerBoard', false)
      } else if (this.showInboxTwo === true && this.isDuplicate >= 1) {
        this.messengerValue.splice(this.isDuplicate, 1)
        this.messengerValue.push(value)
      }

      if (this.showInboxOne !== true) {
        this.$store.commit('setShowInboxOne', true)
      } else if (
        this.showInboxOne === true &&
        this.messengerValue.length >= 2
      ) {
        this.$store.commit('setShowInboxTwo', true)
        this.$store.commit('setShowMessengerBoard', false)
      }

      console.log('valueinbox ====>', this.messengerValue)

      if (this.messengerValue.length < 2) {
        this.$store.commit('setShowInboxTwo', false)
      }

      try {
        const response = await messengerRepository.getConversationId({
          accountHasLoginId: this.user.user_id,
          conversationId: this.value.conversationId,
        })
        this.messengers = response.data
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
  },
}
</script>

<style scoped>
.messenger {
  cursor: pointer;
  height: 68px;
  border-radius: 8px;
  padding: 6px;
  background-color: white;
}

.messenger:hover {
  background-color: #eceef4a3;
  transition-duration: 0.1s;
}

.last-activity-unread {
  font-weight: 600;
}
</style>
