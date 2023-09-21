<template>
  <div>
    <div class="text-[17px] font-semibold mb-3">Nơi từng sống</div>
    <div class="mt-5 mb-2 flex gap-3 w-[569px] h-[36px]" v-if="status && status === 'Myself' && profile && profile.homeTown === null">
      <div><i data-visualcompletion="css-img" class="x1b0d499 xi3auck" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/y1/r/pA6GGzdsH2B.png&quot;); background-position: 0px -156px; background-size: 26px 258px; width: 24px; height: 24px; background-repeat: no-repeat; display: inline-block;"></i></div>
      <div class="text-[15px] font-semibold text-[#1876F2] hover:underline">
        Thêm quê quán
      </div>
    </div>
    <div class="mt-3 mb-2 flex gap-3 w-[569px] h-[36px]"  v-if="status && status === 'Myself' && profile && profile.homeTown === null">
      <div><i data-visualcompletion="css-img" class="x1b0d499 xi3auck" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/y1/r/pA6GGzdsH2B.png&quot;); background-position: 0px -156px; background-size: 26px 258px; width: 24px; height: 24px; background-repeat: no-repeat; display: inline-block;"></i></div>
      <div class="text-[15px] font-semibold text-[#1876F2] hover:underline">
        Thêm thành phố
      </div>
    </div>
    <div class="mt-3 mb-2 flex justify-between gap-3 w-full h-[36px]" v-if="status && status === 'Myself' && profile && profile.homeTown === null">
      <div class="flex gap-3">
        <div class="flex justify-center items-center">
         <img height="40" width="40" alt="" referrerpolicy="origin-when-cross-origin" src="https://external.fhan4-3.fna.fbcdn.net/emg1/v/t13/1821729613778443181?url=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F1%2F17%2FHanoi_Montage.jpg%2F720px-Hanoi_Montage.jpg&amp;fb_obo=1&amp;utld=wikimedia.org&amp;stp=c0.5000x0.5000f_dst-jpg_flffffff_p90x90_q75&amp;ccb=13-1&amp;oh=06_AbFF_IkpqSO1RYMjuqq_zbupw3X7p-JHGoPQ6qhB7YLGNg&amp;oe=64FB0D3D&amp;_nc_sid=75c735" class="rounded-full">
        </div>
        <div class="text-[15px] font-semibold hover:underline">
          Hà Nội
          <p class="text-[12px] text-gray-500">Tỉnh/Thành phố hiện tại</p>
        </div>
      </div>
      <div class="flex gap-6">
        <div class="mt-[10px]"><img class="x1b0d499 x1d69dk1" src="https://static.xx.fbcdn.net/rsrc.php/v3/yT/r/JZe0NC6Um6y.png" alt="Chỉ mình tôi" height="16" width="16"></div>
        <div class="w-[35px] h-[35px] bg-gray-200 rounded-full flex justify-center items-center hover:bg-gray-300">
          <i data-visualcompletion="css-img" class="x1b0d499 xep6ejk" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/CBzEZmbq4RG.png&quot;); background-position: -22px -226px; background-size: 74px 408px; width: 20px; height: 20px; background-repeat: no-repeat; display: inline-block;"></i>
        </div>
    </div>
    </div>
    <div v-if="status && status !== 'Myself' && profile && !profile.homeTown" class="mb-5">
      <div class="flex gap-3">
        <div class="justify-center flex items-center">
          <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yy/r/9RISa0HPFnB.png" alt="" height="24" width="24">
        </div>
        <p class="font-medium text-gray-600">Không có địa điểm nào để hiển thị</p>
      </div>
    </div>
    <div v-if="profile && profile.homeTown" class="mb-5">
      <div class="flex gap-3">
        <div class="justify-center flex items-center">
          <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yy/r/9RISa0HPFnB.png" alt="" height="24" width="24">
        </div>
        <p>Từng sống tại <strong>{{ profile.homeTown }}</strong></p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      homeTown: '',
    }
  },
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