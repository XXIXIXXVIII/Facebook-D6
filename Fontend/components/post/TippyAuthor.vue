<template lang="">
  <div
    class="absolute settingPost z-50 bg-white py-4 overflow-hidden w-[400px] rounded-lg"
  >
    <div class="">
      <div class="px-8 flex items-start">
        <div
          class="w-24 h-24 flex items-center justify-center overflow-hidden rounded-full"
        >
          <img class="w-full h-full object-cover" :src="post.avatar" />
        </div>
        <div>
          <div class="px-4 pt-1 mb-2 text-xl font-bold">
            {{ post.fullName }}
          </div>
          <div
            v-if="post.biography"
            class="px-[10px] py-2 flex items-start gap-2"
          >
            <div class="p-1">
              <img
                height="20"
                src="https://static.xx.fbcdn.net/rsrc.php/v3/yM/r/0atnr_Oi2J5.png"
                width="20"
                alt=""
              />
            </div>
            <div class="break-words text-sm w-[80%] flex items-center">
              <span
                ><strong v-if="post.check">Trang</strong> ·
                <span>{{ post.biography }}</span></span
              >
            </div>
          </div>
          <div
            v-if="post.homeTown || post.city"
            class="px-[10px] py-2 flex items-start gap-2"
          >
            <div class="p-1">
              <img
                src="https://static.xx.fbcdn.net/rsrc.php/v3/yZ/r/V632KGZoHho.png"
                alt=""
                height="20"
                width="20"
              />
            </div>
            <div class="break-words text-sm w-[80%] flex items-center">
              <span>{{ post.city }}</span>
            </div>
          </div>
          <div v-if="post.follower" class="px-[10px] py-2 flex items-start gap-3">
            <div class="p-1 flex items-center gap-3">
              <img
                height="20"
                src="https://static.xx.fbcdn.net/rsrc.php/v3/yX/r/ZtO9bT5ryRe.png"
                width="20"
                alt=""
              />
              <div class="flex items-center gap-1">
                <strong>{{ post.follower }}</strong> <span> Người theo dõi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div><ButtonStatus/></div>
    </div>
  </div>
</template>
<script>
import ButtonStatus from '../userDetail/ButtonStatus.vue'
export default {
  components:{
    ButtonStatus
  }
  ,
  props: {
    post: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    console.log(this.post)
  },
}
</script>
<style scoped lang="css"></style>
