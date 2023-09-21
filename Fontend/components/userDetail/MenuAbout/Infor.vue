<template>
  <div>
    <div class="text-[17px] font-semibold mb-6" v-if="status && status === 'Myself'">Thông tin liên hệ</div>
    <div class="text-[17px] font-semibold mb-4" v-if="status && status === 'Myself'">Các trang web và liên kết xã hội</div>
    <div class="mb-2 flex gap-3 w-[569px] h-[36px]" v-if="status && status === 'Myself'">
      <div>
      <i data-visualcompletion="css-img" class="x1b0d499 xi3auck" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/y1/r/pA6GGzdsH2B.png&quot;); background-position: 0px -156px; background-size: 26px 258px; width: 24px; height: 24px; background-repeat: no-repeat; display: inline-block;"></i></div>
      <div class="text-[15px] font-semibold text-[#1876F2] hover:underline">
        Thêm một trang web
      </div>
    </div>
    <div class="mb-2 flex gap-3 w-[569px] h-[36px]"  v-if="status && status === 'Myself'">
      <div>
      <i data-visualcompletion="css-img" class="x1b0d499 xi3auck" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/y1/r/pA6GGzdsH2B.png&quot;); background-position: 0px -156px; background-size: 26px 258px; width: 24px; height: 24px; background-repeat: no-repeat; display: inline-block;"></i></div>
      <div class="text-[15px] font-semibold text-[#1876F2] hover:underline">
        Thêm liên kết xã hội 
      </div>
    </div>
    <div class="text-[17px] font-semibold mb-4">Thông tin cơ bản</div>
    <div class="mb-2 flex gap-3 w-[569px] h-[36px]" v-if="status && status === 'Myself'">
      <div>
      <i data-visualcompletion="css-img" class="x1b0d499 xi3auck" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/y1/r/pA6GGzdsH2B.png&quot;); background-position: 0px -156px; background-size: 26px 258px; width: 24px; height: 24px; background-repeat: no-repeat; display: inline-block;"></i></div>
      <div class="text-[15px] font-semibold text-[#1876F2] hover:underline">
        Thêm một ngôn ngữ
      </div>
    </div>
    <div class="flex justify-between mb-6">
       <div class="flex gap-2">
          <div class="flex justify-center items-center"><img class="x1b0d499 xuo83w3" src="https://static.xx.fbcdn.net/rsrc.php/v3/yB/r/-A1fdkjvECX.png" alt="" height="24" width="24"></div>
          <div>
            <p class="text-[15px]" v-if="user && user.gender">{{ user.gender }}</p>
            <p class="text-[12px] text-gray-500" v-if="user && user.gender">{{ user.gender }}</p>
          </div>
       </div>
       <div class="flex justify-center items-center w-[35px] h-[35px] bg-gray-200 hover:bg-gray-300 rounded-full cursor-pointer" v-if="status && status === 'Myself'">
         <i data-visualcompletion="css-img" class="x1b0d499 xep6ejk" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/y_/r/UEO0L2LD4hm.png&quot;); background-position: 0px -374px; background-size: 22px 616px; width: 20px; height: 20px; background-repeat: no-repeat; display: inline-block;"></i>
       </div>
    </div>
    <div class="flex justify-between mb-6">
       <div class="flex gap-2">
          <div class="flex justify-center items-center"><img class="x1b0d499 xuo83w3" src="https://static.xx.fbcdn.net/rsrc.php/v3/y_/r/f-ckmStWkTC.png" alt="" height="24" width="24"></div>
          <div>
            <p class="text-[15px]" v-if="user && user.gender">{{ user.gender === 'Nam' ? 'anh ấy' : 'cô ấy' }}</p>
            <p class="text-[12px] text-gray-500">Danh xưng trên hệ thống</p>
          </div>
       </div>
       <div class="flex justify-center items-center w-[35px] h-[35px] bg-gray-200 hover:bg-gray-300 rounded-full cursor-pointer"  v-if="status && status === 'Myself'">
         <i data-visualcompletion="css-img" class="x1b0d499 xep6ejk" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/y_/r/UEO0L2LD4hm.png&quot;); background-position: 0px -374px; background-size: 22px 616px; width: 20px; height: 20px; background-repeat: no-repeat; display: inline-block;"></i>
       </div>
    </div>
    <div class="flex justify-between mb-6">
       <div class="flex gap-2">
          <div class="flex justify-center items-center"><img class="x1b0d499 xuo83w3" src="https://static.xx.fbcdn.net/rsrc.php/v3/yW/r/RuWoPd8_oMo.png" alt="" height="24" width="24"></div>
          <div>
            <p class="text-[15px]"  v-if="user">{{ user.birthDay }}</p>
            <p class="text-[12px] text-gray-500">Ngày/tháng/năm sinh</p>
          </div>
       </div>
       <div class="flex justify-center items-center w-[35px] h-[35px] bg-gray-200 hover:bg-gray-300 rounded-full cursor-pointer"  v-if="status && status === 'Myself'">
         <i data-visualcompletion="css-img" class="x1b0d499 xep6ejk" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/y_/r/UEO0L2LD4hm.png&quot;); background-position: 0px -374px; background-size: 22px 616px; width: 20px; height: 20px; background-repeat: no-repeat; display: inline-block;"></i>
       </div>
    </div>
  </div>
</template>
<script>
export default {

  computed: {
    user() {
      return this.$store.state.idFriendModule.userDetail
    },
    userId() {
      return this.$store.state.authModule.user.user_id
    },

    profile() {
      return this.$store.state.idFriendModule.userDetail
    },

    status() {
      return this.$store.state.idFriendModule.status
    }
  }
  
}
</script>
<style>
  
</style>