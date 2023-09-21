<template>
  <div
    v-if="notify"
    class="notify-hover nofication-item h-[80.7px] flex items-center justify-between p-1 cursor-pointer rounded-lg mt-1 dark:bg-[#242526] dark:text-white"
  >
    <!-- AVATAR NGƯỜI VÀ THỂ LOẠI THÔNG BÁO  -->
    <div class="flex w-[88%] break-words">
      <div class="flex items-center justify-center relative flex-row">
        <!-- AVATAR -->
        <div
          style="border: 1px solid rgb(199, 197, 197)"
          class="h-[56px] w-[56px] rounded-full overflow-hidden"
        >
          <img
            class="w-full h-full object-cover"
            :src="notify.ownerAvatar"
            alt=""
          />
        </div>

        <!-- THỂ LOẠI THÔNG BÁO -->
        <div
          class="absolute bottom-3 right-2 rounded-full translate-x-1/2 translate-y-1/2 w-[28px] h-[28px] z-50"
        >
          <!-- Icon nhóm -->
          <span
            v-if="
              notify.type === 'group' &&
              (notify.action === 'post' || notify.action === 'share')
            "
          >
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span class="object-cover" v-html="icons.notifygroup"></span>
          </span>

          <!-- Icon Trang cá nhân -->
          <span
            v-if="
              notify.type === 'page' &&
              (notify.action === 'post' || notify.action === 'share')
            "
          >
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span class="object-cover" v-html="icons.notifyPage"></span>
          </span>

          <!-- Icon Comment -->
          <span v-if="notify.notificationType === 'comment your post'">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span class="object-cover" v-html="icons.notifyComment"></span>
          </span>

          <!-- Icon Like -->
          <span
            v-if="
              notify.notificationType === 'react your post' &&
              notify.ownerAction === 'like'
            "
          >
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span class="object-cover" v-html="icons.notifyLike"></span>
          </span>

          <!-- Icon Love -->
          <span
            v-if="
              notify.notificationType === 'react your post' &&
              notify.ownerAction === 'love'
            "
          >
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span class="object-cover" v-html="icons.notifyLove"></span>
          </span>

          <!-- Icon Care -->
          <span
            v-if="
              notify.notificationType === 'react your post' &&
              notify.ownerAction === 'dear'
            "
          >
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span class="object-cover" v-html="icons.notifyCare"></span>
          </span>

          <!-- Icon Haha -->
          <span
            v-if="
              notify.notificationType === 'react your post' &&
              notify.ownerAction === 'haha'
            "
          >
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span class="object-cover" v-html="icons.notifyHaha"></span>
          </span>

          <!-- Icon Wow -->
          <span
            v-if="
              notify.notificationType === 'react your post' &&
              notify.ownerAction === 'wow'
            "
          >
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span class="object-cover" v-html="icons.notifyWow"></span>
          </span>

          <!-- Icon Sad -->
          <span
            v-if="
              notify.notificationType === 'react your post' &&
              notify.ownerAction === 'sad'
            "
          >
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span class="object-cover" v-html="icons.notifySad"></span>
          </span>

          <!-- Icon Angry -->
          <span
            v-if="
              notify.notificationType === 'react your post' &&
              notify.ownerAction === 'angry'
            "
          >
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span class="object-cover" v-html="icons.notifyAngry"></span>
          </span>

          <!-- Icon Friend -->
          <span
            v-if="
              notify.notificationType === 'friend request' ||
              notify.notificationType === 'accept your friend request'
            "
          >
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span class="object-cover" v-html="icons.notifyFriend"></span>
          </span>
        </div>
      </div>

      <!-- NỘI DUNG THÔNG BÁO -->
      <div class="ml-3 mr-3 break-words w-[88%]">
        <div class="max-h-[65px] overflow-hidden leading-[1.25]">
          <!-- Nếu không phải bạn bè thì hiện lên -->
          <span
            v-if="notify.status !== 'friend' && notify.action === 'post'"
            :class="{ 'text-unread': !notify.unread }"
            class="text-[14px] break-words"
            >Bây giờ trong
          </span>

          <!-- Tên người dùng sẽ hiện lên nếu là bạn bè -->
          <span
            :class="{ 'text-bold-unread': !notify.unread }"
            class="font-semibold text-[14px] break-words"
            >{{ notify.ownerFullName }}</span
          >

          <!-- HÀNH ĐỘNG THÔNG BÁO -->
          <!-- Bạn bè đăng bài -->
          <span
            v-if="notify.notificationType === 'friend post'"
            class="text-[14px]"
            :class="{ 'text-unread': !notify.unread }"
          >
            đã đăng một bài viết mới.
          </span>

          <!-- Bình luận bài viết  -->
          <span
            v-if="notify.notificationType === 'comment your post'"
            class="text-[14px]"
            :class="{ 'text-unread': !notify.unread }"
          >
            đã bình luận về một bài viết của bạn.
          </span>

          <!-- REACT BÀI VIẾT, COMMENT VÀ ẢNH-->
          <!-- Like bài viết -->
          <span
            v-if="
              notify.notificationType === 'react your post' &&
              notify.ownerAction === 'like'
            "
          >
            <span
              class="text-[14px]"
              :class="{ 'text-unread': !notify.unread }"
            >
              đã thích bài viết của bạn.
            </span>
          </span>

          <!-- React bài viết -->
          <span
            v-if="
              notify.notificationType === 'react your post' &&
              notify.ownerAction !== 'like'
            "
          >
            <span
              class="text-[14px]"
              :class="{ 'text-unread': !notify.unread }"
            >
              đã bày tỏ cảm xúc về một bài viết của bạn.
            </span>
          </span>

          <!-- React ảnh -->
          <span v-if="notify.status === 'friend' && notify.type === 'image'">
            <span
              class="text-[14px]"
              :class="{ 'text-unread': !notify.unread }"
            >
              đã bày tỏ cảm xúc về một ảnh
              <span v-if="!notify.content">.</span>
              <span v-if="notify.content">:</span>
            </span>
            <span
              :class="{ 'text-bold-unread': !notify.unread }"
              class="text-[14px]"
              >{{ notify.content }}</span
            >
          </span>
        </div>

        <!-- THÔNG BÁO KẾT BẠN -->
        <!-- Người khác gửi lời mời kết bạn  -->
        <span
          v-if="notify.notificationType === 'friend request'"
          class="text-[14px]"
          :class="{ 'text-unread': !notify.unread }"
        >
          đã gửi cho bạn lời mời kết bạn.
        </span>

        <!-- Người khác đã chấp nhận lời mời kết bạn -->
        <span
          v-if="notify.notificationType === 'accept your friend request'"
          class="text-[14px]"
          :class="{ 'text-unread': !notify.unread }"
        >
          đã chấp nhận lời mời kết bạn.
        </span>

        <!-- Thời gian đăng bài -->
        <div
          :class="{ time: !notify.unread, 'time-unread': notify.unread }"
          class="font-semibold text-xs"
        >
          {{ notify.notificationTime }}
        </div>
      </div>
    </div>
    <!-- Chưa đọc sẽ hiện lên -->
    <div v-if="notify.unread" class="flex w-[10%] justify-end">
      <span
        class="w-3 h-3 inline-flex justify-center items-center rounded-full bg-[#1877f2]"
      ></span>
    </div>
  </div>
</template>

<script>
// import { RepositoryFactory } from '../../../../apiConfig/RepositoryFactory'
import {
  notifygroup,
  notifyPage,
  notifyPost,
  notifyComment,
  notifyLike,
  notifyLove,
  notifyHaha,
  notifyWow,
  notifyCare,
  notifySad,
  notifyAngry,
  notifyFriend,
} from '../../../../assets/icons/icons'
// const notificationRepository = RepositoryFactory.get('notification')
export default {
  name: 'NotificationBlock',
  props: {
    notify: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      icons: {
        notifygroup,
        notifyPage,
        notifyPost,
        notifyComment,
        notifyLike,
        notifyLove,
        notifyCare,
        notifyHaha,
        notifyWow,
        notifySad,
        notifyAngry,
        notifyFriend,
      },
    }
  },
  computed: {
    user() {
      return this.$store.state.authModule.user
    },
  },

  methods: {},
}
</script>

<style scoped>
.time {
  color: grey;
}

.time-unread {
  color: #1877f2;
}

.text-bold-unread {
  color: gray;
}

.text-unread {
  color: grey;
}

.notify-hover {
  background-color: white;
}

.notify-hover:hover {
  background-color: #e4e6ebcb;
  transition-duration: 0.1s;
}
</style>
