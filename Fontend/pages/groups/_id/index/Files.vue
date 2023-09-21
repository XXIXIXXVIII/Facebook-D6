<template>
  <div class="container-room">
    <div class="wp-room">
      <div class="wp-title flex items-center justify-between">
        <p class="font-semibold text-lg">File</p>
        <div class="flex items-center gap-4">
          <div class="find-event">
            <div class="icon-create"></div>
            <input type="text" placeholder="Tìm kiếm file" />
          </div>
          <p class="create-event">Tải file lên</p>
        </div>
      </div>
      <hr />
      <div class="wp-img-room">
        <div class="nav-img">
          <div class="ranger-name">Tên File</div>
        </div>
        <div class="nav-img">
          <div class="ranger-name">Loại</div>
        </div>
        <div class="nav-img">
          <div class="ranger-name">Lần Sửa đổi gần đây</div>
        </div>
      </div>
      <div class="text-room mb-5 mt-3">
        <div class="wp-img"></div>
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
        gap: 8px;
        align-items: center;
        padding: 8px 10px;
        border-radius: 20px;
        background-color: #f0f2f5;
        .icon-create {
          background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/y3/r/4wi6t97irzz.png);
          background-position: 0px -184px;
          background-size: 34px 220px;
          width: 16px;
          height: 16px;
          background-repeat: no-repeat;
          display: inline-block;
        }
        input {
          outline: none;
        }
      }
      .create-event {
        color: #1b74e4;
        font-weight: 500;
        font-size: 14px;
        cursor: pointer;
        height: 36px;
        padding: 0 16px;
        text-align: center;
        line-height: 36px;
        border-radius: 8px;
        &:hover {
          background-color: #e5e7eb;
        }
      }
    }
    .wp-img-room {
      display: grid;
      grid-template-columns: 35% 20% 35%;
      gap: 8px;

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
          margin-top: 10px;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          height: 36px;
          padding: 0 16px;
          text-align: center;
          line-height: 36px;
          border-radius: 8px;
          background-color: #e4e6eb;
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
