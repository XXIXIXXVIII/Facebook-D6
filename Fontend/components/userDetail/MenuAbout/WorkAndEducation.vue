<template>
    <div>
    <div class="text-[17px] font-semibold mb-4">Công việc</div>
    <div class="mt-5 mb-2 flex gap-3 w-[569px] h-[36px]" v-if="status && status === 'Myself' && profile && profile.company === null">
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
        Thêm nơi làm việc
      </div>
    </div>
    <!-- nếu chưa có thông tin -->
    <div v-if="status && status !== 'Myself' && profile && !profile.company" class="mb-5">
      <div class="flex gap-3">
        <div class="justify-center flex items-center">
          <img
            class="x1b0d499 xuo83w3"
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yE/r/oXhO_oSl40g.png"
            alt=""
            height="24"
            width="24"
          />
        </div>
        <p class="font-medium text-gray-600">Không có nơi làm việc để hiển thị</p>
      </div>
    </div>
    <!-- đã có thông tin -->
    <div v-if="profile && profile.position && profile.company" class="mb-4">
      <div class="flex gap-3">
        <div class="justify-center flex items-center">
          <img
            class="x1b0d499 xuo83w3"
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yE/r/oXhO_oSl40g.png"
            alt=""
            height="24"
            width="24"
          />
        </div>
        <p>{{ profile.position }} tại <strong>{{ profile.company }}</strong></p>
      </div>
    </div>
    <div class="text-[17px] font-semibold mb-4">Đại học</div>
    <div class="mt-5 mb-2 flex gap-3 w-[569px] h-[36px]" v-if="status && status === 'Myself' && profile && profile.university === null">
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
        Thêm trường cao đẳng/đại học
      </div>
    </div>
    <!-- chưa có thông tin -->
    <div v-if="status && status !== 'Myself' && profile && !profile.university" class="mb-5">
      <div class="flex gap-3">
        <div class="justify-center flex items-center">
          <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/tzVYBX7RQ1q.png" alt="" height="24" width="24">
        </div>
        <p class="font-medium text-gray-600">Không có trường học nào để hiển thị</p>
      </div>
    </div>
    <!-- có thông tin -->
    <div v-if="profile && profile.university && (profile.specialized_1 || profile.specialized_2)" class="mb-5">
      <div class="flex gap-3">
        <div class="justify-center flex items-center">
          <img class="x1b0d499 xuo83w3" src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/tzVYBX7RQ1q.png" alt="" height="24" width="24">
        </div>
        <p>Học chuyên ngành {{ profile.specialized_1 }} tại <strong> {{ profile.university }} </strong></p>
      </div>
    </div>
    <div class="text-[17px] font-semibold mb-4">Trường trung học</div>
    <div class="mt-5 mb-2 flex gap-3 w-[569px] h-[36px]"  v-if="status && status === 'Myself' && profile && profile.schoolName === null">
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
        Thêm trường trung học
      </div>
    </div>
    <!-- chưa có thông tin -->
    <div v-if="status && status !== 'Myself' && profile && !profile.university" class="mb-5">
      <div class="flex gap-3">
        <div class="justify-center flex items-center">
          <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/tzVYBX7RQ1q.png" alt="" height="24" width="24">
        </div>
        <p class="font-medium text-gray-600">Không có trường học nào để hiển thị</p>
      </div>
    </div>
    <!-- có thông tin -->
    <div v-if="profile && profile.schoolName" class="mb-5">
      <div class="flex gap-3">
        <div class="justify-center flex items-center">
          <img class="x1b0d499 xuo83w3" src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/tzVYBX7RQ1q.png" alt="" height="24" width="24">
        </div>
        <p>Từng học tại <strong> {{ profile.schoolName }} </strong></p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      company: '',
      schoolName: '',
      university: '',
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