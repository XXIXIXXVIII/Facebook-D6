<template>
  <div class="container-overview">
    <div class="wp-overview">
      <div class="wp-consider">
        <p class="font-bold text-xl">Cần xem nội dung</p>
        <p>0 thông tin mới cần xem xét</p>
        <div class="conten-wp">
          <div
            v-for="item in content"
            :key="item.id"
            class="item-content-report"
          >
            <div
              class="img-content"
              :style="{ backgroundColor: item.bacgroudColor }"
            >
              <img :src="item.img" alt="" class="" />
            </div>
            <div class="content-text">
              <div class="w-[90%]">
                <div class="flex justify-between">
                  <p class="font-semibold text-lg">
                    {{ item.name }}
                  </p>
                  <div class="font-bold text-xl">0</div>
                </div>
                <p class="">0 mục nhập mới hôm nay</p>
              </div>
              <div class="wp-icon-drop">
                <div class="drop-rignt"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="wp-bottom">
        <div class="wp-bottom-left">
          <div class="wp-title">
            <p class="font-bold text-xl">Tóm tắt thông tin chi tiết</p>
            <p class="">Trong 7 ngày qua</p>
          </div>
          <div class="list-summary">
            <div class="item-summary">
              <div class="item-summary-left">
                <div class="icon-comment icon"></div>
                <p class="font-semibold text-base">Post</p>
              </div>
              <div class="item-summary-right">
                <p class="font-semibold text-base">1</p>
                <div class="icon-arrow"></div>
                <p class="font-semibold text-base opacity-70">0%</p>
              </div>
            </div>
          </div>
        </div>
        <div class="wp-bottom-right"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { content } from '../../../utils/groups/group.js'
export default {
  data() {
    return {
      content,
    }
  },
}
</script>

<style scoped lang="scss">
.container-overview {
  margin-left: 360px;
  margin-top: 56px;
  display: flex;
  justify-content: center;
  background-color: #f0f2f5;
  height: 100vh;
  .wp-overview {
    width: 880px;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .wp-consider {
      display: flex;
      flex-direction: column;
      gap: 16px;
      justify-content: center;
      padding: 16px;
      border-radius: 8px;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
      background-color: white;

      .conten-wp {
        display: grid;
        grid-template-columns: auto auto;
        gap: 5px;

        .item-content-report {
          width: 100%;
          padding: 8px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          cursor: pointer;
          &:hover {
            background-color: #ebedf0;
          }

          .img-content {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 8px 12px 8px 0px;
            border-radius: 50%;
            width: 36px;
            height: 36px;
            img {
              width: 20px;
              height: 20px;
              object-fit: cover;
            }
          }
          .content-text {
            width: 100%;
            display: flex;
            justify-content: space-between;
            .wp-icon-drop {
              .drop-rignt {
                background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yQ/r/shzFU_6ZHy9.png);
                background-position: -164px -28px;
                background-size: 190px 190px;
                width: 24px;
                height: 24px;
                background-repeat: no-repeat;
                display: inline-block;
              }
            }
          }
        }
      }
    }
    .wp-bottom {
      width: 100%;
      display: grid;
      grid-template-columns: 49% 49%;
      gap: 10px;
      .wp-bottom-left {
        border-radius: 8px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        background-color: white;
        padding: 16px;
        .list-summary {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 8px;
          .item-summary {
            border-radius: 8px;
            width: 100%;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px;
            background-color: #f7f8fa;
            &:hover {
              background-color: #ebedf0;
            }
            .item-summary-left {
              display: flex;
              gap: 8px;
              .icon-comment {
                background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yP/r/_Exuc0d1rsp.png);
                background-position: 0px -346px;
                background-size: 34px 502px;
              }
              .icon {
                width: 24px;
                height: 24px;
                background-repeat: no-repeat;
                display: inline-block;
              }
            }
            .item-summary-right {
              display: flex;
              gap: 5px;
              .icon-arrow {
                background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yw/r/zitjsqLtMwl.png);
                background-position: 0px -138px;
                background-size: 34px 254px;
                width: 20px;
                height: 20px;
                background-repeat: no-repeat;
                display: inline-block;
              }
            }
          }
        }
      }
    }
  }
}
</style>
