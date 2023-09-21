<template>
  <div class="container-room">
    <div class="wp-room">
      <div class="wp-title flex items-center justify-between">
        <p class="font-semibold text-lg">File phương tiện</p>
        <div class="flex gap-2">
          <button class="find-event">
            <div class="icon-create"></div>
            Tạo album
          </button>
          <button class="create-event">Thêm ảnh/video</button>
        </div>
      </div>
      <div class="wp-img-room">
        <div class="nav-img">
          <div class="nav-name">Ảnh</div>
          <div class="ranger-name"></div>
        </div>
        <div class="nav-img">
          <p class="nav-name">Video</p>
          <div class="ranger-name"></div>
        </div>
        <div class="nav-img">
          <div class="nav-name">Album</div>
          <div class="ranger-name"></div>
        </div>
      </div>
      <div class="text-room mb-5 mt-3">
        <div class="wp-img">
          <img :src="imgGroup" height="162px" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import imgGroup from '../../../../assets/img/gymsCover.jpg'
export default {
  data() {
    return {
      imgGroup,
    }
  },
}
</script>

<style scoped lang="scss">
.container-room {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  width: 100%;
  .wp-room {
    width: 90%;
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
        &:hover {
          background-color: #f0f2f5;
        }
      }

      .find-event {
        display: flex;
        gap: 5px;
        color: #1b74e4;
        align-items: center;
        .icon-create {
          background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yQ/r/shzFU_6ZHy9.png);
          background-position: -162px -154px;
          background-size: 190px 190px;
          width: 16px;
          height: 16px;
          background-repeat: no-repeat;
          display: inline-block;
          filter: invert(39%);
          -webkit-filter: invert(39%) sepia(57%) saturate(200%) saturate(200%)
            saturate(200%) saturate(200%) saturate(200%) saturate(147.75%)
            hue-rotate(202deg) brightness(97%) contrast(96%);
        }
      }
      .create-event {
        color: #1b74e4;
      }
    }
    .wp-img-room {
      display: flex;
      align-items: center;

      .nav-img {
        .nav-name {
          height: 60px;
          line-height: 60px;
          padding: 0 16px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          opacity: 0.8;
          &:hover {
            background-color: #f0f2f5;
          }
        }
        .ranger-name {
          width: 100%;
          height: 4px;
          background-color: #1876f2;
        }
      }
    }
    .text-room {
      margin-top: 16px;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      .wp-img {
        height: 162px;

        img {
          height: 100%;
        }
      }
    }
  }
}
</style>
