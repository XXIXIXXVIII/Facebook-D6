<template>
  <div class="container-room">
    <div class="wp-room">
      <div class="wp-title">
        <p class="font-semibold text-lg">Phòng họp mặt</p>
        <span class="">tạo</span>
      </div>
      <div class="wp-img-room">
        <img
          src="https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/TOgUhMwiCV2.png"
          alt=""
        />
      </div>
      <div class="text-room">
        <p class="font-bold text-lg">Họp mặt nhóm bằng tính năng chat video</p>
        <p class="">
          Hãy tạo phòng họp mặt để kết nối ngay với các thành viên khác bằng
          tính năng chat video.
        </p>
      </div>
      <div class="flex justify-center items-center mt-5">
        <button class="">Tạo phòng họp mặt</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.container-room {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  width: 100%;
  .wp-room {
    width: 500px;
    background-color: white;
    padding: 16px;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

    .wp-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .wp-img-room {
      display: flex;
      justify-content: center;
      img {
        width: 468px;
      }
    }
    .text-room {
      text-align: center;
    }
    button {
      background-color: #1b74e4;
      color: white;
      align-items: center;
      line-height: inherit;
      padding: 8px 12px;
      border-radius: 8px;
    }
  }
}
</style>
