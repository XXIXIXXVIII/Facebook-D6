<template>
   <div>
    <div class="text-[17px] font-semibold mb-3">Giới thiệu về bản thân</div>
    <div class="mt-5 mb-2 flex gap-3 w-[569px] h-[36px]"  v-if="status && status === 'Myself'">
      <div>
        <i
          data-visualcompletion="css-img"
          class="x1b0d499 xi3auck"
          style="
            background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/y1/r/pA6GGzdsH2B.png');
            background-position: 0px -156px;
            background-size: 26px 258px;
            width: 24px;
            height: 24px;
            background-repeat: no-repeat;
            display: inline-block;
          "
        ></i>
      </div>
      <div class="text-[15px] font-semibold text-[#1876F2] hover:underline">
        Viết một số điều về chính bạn
      </div>
    </div>
    <div v-if="status && status !== 'Myself'" class="mb-5">
      <div class="flex gap-3">
        <div class="justify-center flex items-center">
          <img src="https://static.xx.fbcdn.net/rsrc.php/v3/y6/r/NBGANyRj8cr.png" alt="" height="24" width="24">
        </div>
        <p class="font-medium text-gray-600">Không có chi tiết nào khác để hiển thị</p>
      </div>
    </div>
    <div class="text-[17px] font-semibold mb-3">Cách phát âm tên</div>
    <div class="mt-5 mb-2 flex gap-3 w-[569px] h-[36px]" v-if="status && status === 'Myself'">
      <div>
        <i
          data-visualcompletion="css-img"
          class="x1b0d499 xi3auck"
          style="
            background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/y1/r/pA6GGzdsH2B.png');
            background-position: 0px -156px;
            background-size: 26px 258px;
            width: 24px;
            height: 24px;
            background-repeat: no-repeat;
            display: inline-block;
          "
        ></i>
      </div>
      <div class="text-[15px] font-semibold text-[#1876F2] hover:underline">
        Thêm cách đọc tên
      </div>
    </div>
    <div v-if="status && status !== 'Myself'" class="mb-5">
      <div class="flex gap-3">
        <div class="justify-center flex items-center">
          <img class="x1b0d499 x1d69dk1" src="https://static.xx.fbcdn.net/rsrc.php/v3/yE/r/J3FbIqp275E.png" alt="" height="24" width="24">
        </div>
        <p class="font-medium text-gray-600">Không có cách đọc tên để hiển thị</p>
      </div>
    </div>
    <div class="text-[17px] font-semibold mb-3">Các tên khác</div>
    <div class="mt-5 mb-2 flex gap-3 w-[569px] h-[36px]" v-if="status && status === 'Myself'">
      <div>
        <i
          data-visualcompletion="css-img"
          class="x1b0d499 xi3auck"
          style="
            background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/y1/r/pA6GGzdsH2B.png');
            background-position: 0px -156px;
            background-size: 26px 258px;
            width: 24px;
            height: 24px;
            background-repeat: no-repeat;
            display: inline-block;
          "
        ></i>
      </div>
      <div class="text-[15px] font-semibold text-[#1876F2] hover:underline">
        Thêm biệt danh, tên thường gọi 
      </div>
    </div>
    <div v-if="status && status !== 'Myself'" class="mb-5">
      <div class="flex gap-3">
        <div class="justify-center flex items-center">
          <img class="x1b0d499 x1d69dk1" src="https://static.xx.fbcdn.net/rsrc.php/v3/yf/r/7v5T2RaqKe4.png" alt="" height="24" width="24">
        </div>
        <p class="font-medium text-gray-600">Không có tên khác để hiển thị</p>
      </div>
    </div>
    <div class="text-[17px] font-semibold mb-3">Trích dẫn yêu thích</div>
    <div class="mt-5 mb-2 flex gap-3 w-[569px] h-[36px]" v-if="status && status === 'Myself'">
      <div>
        <i
          data-visualcompletion="css-img"
          class="x1b0d499 xi3auck"
          style="
            background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/y1/r/pA6GGzdsH2B.png');
            background-position: 0px -156px;
            background-size: 26px 258px;
            width: 24px;
            height: 24px;
            background-repeat: no-repeat;
            display: inline-block;
          "
        ></i>
      </div>
      <div class="text-[15px] font-semibold text-[#1876F2] hover:underline">
        Thêm câu trích dẫn yêu thích của bạn
      </div>
    </div>
    <div v-if="status && status !== 'Myself'" class="mb-5">
      <div class="flex gap-3">
        <div class="justify-center flex items-center">
          <img class="x1b0d499 x1d69dk1" src="https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/Lfrtfsw0lq_.png" alt="" height="24" width="24">
        </div>
        <p class="font-medium text-gray-600">Không có trích dẫn yêu thích nào để hiển thị</p>
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