<template>
  <div class="container-room">
    <div class="wp-room">
      <div class="wp-title flex items-center justify-between">
        <p class="font-semibold text-lg">Sự kiện sắp tới</p>
        <div class="flex gap-2">
          <button class="find-event">Tìm sự kiện</button>
          <button class="create-event">Tạo sự kiện</button>
        </div>
      </div>
      <div class="wp-img-room">
        <div class="img-event"></div>
      </div>
      <div class="text-room mb-5 mt-3">
        <p class="">không có sự kiện nào sắp diễn ra</p>
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
    width: 680px;
    background-color: white;
    padding: 16px;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

    .wp-title {
      margin-bottom: 10px;
      width: 100%;
      button {
        padding: 8px;
        border-radius: 8px;
      }

      .find-event {
        background-color: #e4e6eb;
      }
      .create-event {
        background-color: #1b74e4;
        color: white;
      }
    }
    .wp-img-room {
      display: flex;
      justify-content: center;
      .img-event {
        background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/GYA7Pcxl6Ai.png);
        background-position: 0px -260px;
        background-size: 146px 374px;
        width: 112px;
        height: 112px;
        background-repeat: no-repeat;
        display: inline-block;
      }
    }
    .text-room {
      text-align: center;
    }
  }
}
</style>
