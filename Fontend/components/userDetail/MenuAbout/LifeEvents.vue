<template>
  <div>
    <div class="text-[17px] font-semibold">Sự kiện trong đời</div>
    <div class="mt-5 mb-2 flex gap-3 w-[569px] h-[36px]"  v-if="status && status === 'Myself'">
      <div>
      <i data-visualcompletion="css-img" class="x1b0d499 xi3auck" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/y1/r/pA6GGzdsH2B.png&quot;); background-position: 0px -156px; background-size: 26px 258px; width: 24px; height: 24px; background-repeat: no-repeat; display: inline-block;"></i></div>
      <div class="text-[15px] font-semibold text-[#1876F2] hover:underline">
        Thêm một sự kiện trong đời
      </div>
    </div>
    <div class="mt-3 mb-2 flex gap-3 w-[569px] h-[36px]">
      <i data-visualcompletion="css-img" class="x1b0d499 x1d69dk1" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/y1/r/pA6GGzdsH2B.png&quot;); background-position: 0px -78px; background-size: 26px 258px; width: 24px; height: 24px; background-repeat: no-repeat; display: inline-block;"></i>
      <div class="text-[15px] font-semibold text-gray-500">
        Không có sự kiện trong đời để hiển thị
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    userId() {
      return this.$store.state.authModule.user.user_id
    },

    profile() {
      return this.$store.state.idFriendModule.userDetail
    },

    status() {
      return this.$store.state.idFriendModule.status
    }
  },
}
</script>
<style>
  
</style>