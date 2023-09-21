<template>
  <div>
    <div
      v-for="(notify, index) in showAllNofication
        ? notifications
        : unreadNotify"
      :key="index"
    >
      <div @click="handleGetNotifyId(notify.notificationId)">
        <notification-block :notify="notify" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { RepositoryFactory } from '../../../../apiConfig/RepositoryFactory'
import { socket } from '../../../../plugins/socket.io'
import NotificationBlock from './NotificationBlock.vue'
const notificationRepository = RepositoryFactory.get('notification')
export default {
  name: 'NoficationAll',
  components: { NotificationBlock },
  props: {
    showAllNofication: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      notifications: [],
      unreadNotifications: 0,
    }
  },
  computed: {
    userId() {
      return this.$store.state.authModule.user.user_id
    },
  },

  created() {
    this.handleRenderNotification()
    this.countUnreadNotifications()
    socket.on('recive_new_notification', () => {
      this.handleRenderNotification()
      this.countUnreadNotifications()
    })
  },

  methods: {
    async handleRenderNotification() {
      try {
        const res = await notificationRepository.renderNotification({
          userId: this.userId,
        })
        this.notifications = res.data
        this.countUnreadNotifications()
      } catch (error) {
        console.log('Không thể render ra thông báo bởi', error)
      }
    },

    async handleGetNotifyId(id) {
      console.log(id)
      try {
        const res = await axios.post(
          `http://10.101.44.219:8000/api/notification`,
          {
            notificationId: id,
            userId: this.userId,
          }
        )
        console.log('restest', res)
        this.handleRenderNotification()
      } catch (error) {
        console.log(error)
      }
    },

    countUnreadNotifications() {
      const unreadNotifications = this.notifications.filter(
        (notify) => notify.unread === true
      ).length
      this.$store.commit('setUnreadNotificationQuantity', unreadNotifications)
    },
  },
}
</script>

<style scoped></style>
