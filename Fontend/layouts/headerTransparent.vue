<template lang="">
  <div>
    <div
      class="flex items-center justify-between bg-transparent fixed top-0 z-50 w-screen h-14"
    >
      <div class="flex items-center ml-4 gap-2">
        <nuxt-link
          to="/"
          class="w-10 h-10 flex items-center justify-center bg-gray-400 hover:bg-gray-500 rounded-full"
        >
          <i
            style="
              background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/UMAvBmuqi-U.png');
              background-position: 0px -110px;
              background-size: 190px 200px;
              width: 20px;
              height: 20px;
              background-repeat: no-repeat;
              display: inline-block;
              filter: invert(100%);
            "
          ></i>
        </nuxt-link>
        <nuxt-link to="/">
          <svg
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 36 36"
            class="x1lliihq x1k90msu x2h7rmj x1qfuztq x1ssd25i"
            fill="url(#:r1:)"
            height="40"
            width="40"
          >
            <defs>
              <linearGradient x1="50%" x2="50%" y1="97.0782153%" y2="0%">
                <stop offset="0%" stop-color="#0062E0"></stop>
                <stop offset="100%" stop-color="#19AFFF"></stop>
              </linearGradient>
            </defs>
            <path
              d="M15 35.8C6.5 34.3 0 26.9 0 18 0 8.1 8.1 0 18 0s18 8.1 18 18c0 8.9-6.5 16.3-15 17.8l-1-.8h-4l-1 .8z"
              fill='url("#:r1:")'
            ></path>
            <path
              class="xe3v8dz"
              d="M25 23l.8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z"
              fill="#FFFFFF"
            ></path>
          </svg>
        </nuxt-link>
      </div>
      <div><NoficationAndSettings /></div>
    </div>
    <nuxt />
  </div>
</template>
<script>
import NoficationAndSettings from '../components/header/notifications_settings/NoficationAndSettings.vue'
export default {
  name: 'HeaderTransparent',
  components: { NoficationAndSettings },
}
</script>
<style lang=""></style>
