<template lang="">
  <div class="p-2">
    <div class="mt-5 mx-4 mb-3 flex items-center justify-between">
      <div class="text-2xl font-bold">Bạn bè</div>
      <div
        class="w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer flex items-center justify-center"
      >
        <i
          style="
            background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/L1k-kkbTA1u.png');
            background-position: -88px -110px;
            background-size: 190px 182px;
            width: 20px;
            height: 20px;
            background-repeat: no-repeat;
            display: inline-block;
          "
        ></i> 
      </div>
    </div>

    <div>
      <nuxt-link
        exact
        class="flex items-center gap-3 px-2 py-2 rounded-md"
        to="/friends"
      >
        <div
          :style="[
            currentPath === '/friends'
              ? { background: '#1877F2' }
              : { background: 'rgb(229 231 235 / var(--tw-bg-opacity))' },
          ]"
          class="w-9 h-9 rounded-full flex items-center justify-center"
        >
          <i
            v-if="currentPath === '/friends'"
            style="
              background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yI/r/egaFSqQ5fGQ.png');
              background-position: 0px -266px;
              background-size: 26px 518px;
              width: 20px;
              height: 20px;
              background-repeat: no-repeat;
              display: inline-block;
              filter: invert(100%);
            "
          ></i>
          <i
            v-else
            style="
              background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yI/r/egaFSqQ5fGQ.png');
              background-position: 0px -266px;
              background-size: 26px 518px;
              width: 20px;
              height: 20px;
              background-repeat: no-repeat;
              display: inline-block;
              filter: invert(0%);
            "
          ></i>
        </div>
        <div class="text-base font-medium">Trang chủ</div>
      </nuxt-link>
    </div>

    <div>
      <nuxt-link
        exact
        class="flex items-center gap-3 px-2 py-2 rounded-md"
        to="/friends/requests"
      >
        <div
          :style="[
            currentPath === '/friends/requests'
              ? { background: 'rgb(191 219 254 / var(--tw-bg-opacity))' }
              : { background: 'rgb(229 231 235 / var(--tw-bg-opacity))' },
          ]"
          class="w-9 h-9 rounded-full flex items-center justify-center"
        >
          <i
            style="
              background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/P5BfJpcvMAI.png');
              background-position: 0px -254px;
              background-size: 26px 498px;
              width: 20px;
              height: 20px;
              background-repeat: no-repeat;
              display: inline-block;
            "
          ></i>
        </div>
        <div class="text-base font-medium">Lời mời kết bạn</div>
      </nuxt-link>
    </div>

    <div>
      <nuxt-link
        exact
        class="flex items-center gap-3 px-2 py-2 rounded-md"
        to="/friends/suggestions"
      >
        <div
          class="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center"
        >
          <i
            data-visualcompletion="css-img"
            class="x1b0d499 xep6ejk"
            style="
              background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/P5BfJpcvMAI.png');
              background-position: 0px -188px;
              background-size: 26px 498px;
              width: 20px;
              height: 20px;
              background-repeat: no-repeat;
              display: inline-block;
            "
          ></i>
        </div>
        <div class="text-base font-medium">Gợi ý</div>
      </nuxt-link>
    </div>

    <div>
      <nuxt-link
        exact
        class="flex items-center gap-3 px-2 py-2 rounded-md"
        to="/friends/list"
      >
        <div
          class="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center"
        >
          <i
            data-visualcompletion="css-img"
            class="x1b0d499 xep6ejk"
            style="
              background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/CPfzd-fJYwD.png');
              background-position: 0px -188px;
              background-size: 26px 578px;
              width: 20px;
              height: 20px;
              background-repeat: no-repeat;
              display: inline-block;
            "
          ></i>
        </div>
        <div class="text-base font-medium">Tất cả bạn bè</div>
      </nuxt-link>
    </div>

    <div>
      <nuxt-link
        exact
        class="flex items-center gap-3 px-2 py-2 rounded-md"
        to="/friends/birthdays"
      >
        <div
        :style="[
            currentPath === '/friends/birthdays'
              ? { background: '#1877F2' }
              : { background: 'rgb(229 231 235 / var(--tw-bg-opacity))' },
          ]"
          class="w-9 h-9 rounded-full flex items-center justify-center"
        >
          <i
            v-if="currentPath === '/friends/birthdays'"
            style="
              background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/CPfzd-fJYwD.png');
              background-position: 0px -210px;
              background-size: 26px 578px;
              width: 20px;
              height: 20px;
              background-repeat: no-repeat;
              display: inline-block;
              filter: invert(100%)
            "
          ></i>
          <i
            v-else
            style="
              background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/CPfzd-fJYwD.png');
              background-position: 0px -210px;
              background-size: 26px 578px;
              width: 20px;
              height: 20px;
              background-repeat: no-repeat;
              display: inline-block;
              filter: invert(0%)
            "
          ></i>
        </div>
        <div class="text-base font-medium">Sinh nhật</div>
      </nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HomeNavBarFriends',
  props: {
    currentPath: {
      type: String,
      default: '/friends',
    },
  },
}
</script>
<style scoped lang="css">
.navbar {
  box-shadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px';
}
.nuxt-link-active {
  background: rgb(229 231 235 / var(--tw-bg-opacity));
}

.focus {
  background: rgb(37 99 235 / var(--tw-bg-opacity));
}
</style>
