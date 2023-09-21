<template>
  <div>
    <div class="text-[17px] font-semibold mb-3">Mối quan hệ</div>
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
        Thêm tình trạng mối quan hệ
      </div>
    </div>
    <div v-if="status && status !== 'Myself' && profile && profile.relationship" class="mb-5">
      <div class="flex gap-3">
        <div class="justify-center flex items-center">
          <img class="x1b0d499 x1d69dk1" src="https://static.xx.fbcdn.net/rsrc.php/v3/yt/r/fG0kmhRY2IE.png" alt="" height="24" width="24">
        </div>
        <p>{{ profile.relationship }}</p>
      </div>
    </div>
    <div v-if="status && status !== 'Myself' && profile && !profile.relationship" class="mb-5">
      <div class="flex gap-3">
        <div class="justify-center flex items-center">
          <img class="x1b0d499 x1d69dk1" src="https://static.xx.fbcdn.net/rsrc.php/v3/yt/r/fG0kmhRY2IE.png" alt="" height="24" width="24">
        </div>
        <p class="font-medium text-gray-600">Không có thông tin mối quan hệ nào để hiển thị</p>
      </div>
    </div>
    <div class="text-[17px] font-semibold  mb-3">Thành viên trong gia đình</div>
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
        Thêm người thân
      </div>
    </div>
    <div v-if="status && status !== 'Myself'" class="mb-5">
      <div class="flex gap-3">
        <div class="justify-center flex items-center">
          <img class="x1b0d499 x1d69dk1" src="https://static.xx.fbcdn.net/rsrc.php/v3/yH/r/8nuTSSX3hP-.png" alt="" height="24" width="24">
        </div>
        <p class="font-medium text-gray-600">Không có thành viên gia đình nào để hiển thị</p>
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
<style></style>
