<template>
  <div class="wp-complete">
    <!-- invite group -->
    <div class="item-step">
      <div class="wp-icon">
        <div class="icon icon-user"></div>
      </div>
      <p class="font-semibold text-lg">Mời mọi người tham gia</p>
    </div>
    <!-- thêm ảnh bìa -->
    <div class="item-step">
      <div class="flex gap-2" @click="popupListImg = !popupListImg">
        <div class="wp-icon">
          <div class="icon icon-img"></div>
        </div>
        <p class="font-semibold text-lg">Thêm ảnh bìa</p>
      </div>
      <popup-list-img v-if="popupListImg" @on-cover="handleCoverImg" />
    </div>
    <!-- thêm mô tả -->
    <div class="item-step">
      <div
        class="flex items-center gap-2"
        @click="statusPopupDecription = !statusPopupDecription"
      >
        <div class="wp-icon">
          <div class="icon icon-decription"></div>
        </div>
        <p class="font-semibold text-lg">Thêm mô tả</p>
      </div>
      <!-- popup mô tả -->
      <div v-if="statusPopupDecription" class="backgroudColor"></div>
      <div v-if="statusPopupDecription" class="wp-popup">
        <div class="header-popup">
          <p class="title">Viết mô tả</p>
          <div
            class="wp-close"
            @click="statusPopupDecription = !statusPopupDecription"
          >
            <div class="close"></div>
          </div>
        </div>
        <!-- decription =========== -->
        <div class="body-popup">
          <textarea
            v-model="decriptionText"
            class=""
            :style="{ border: errorEmtry ? '1px solid red' : '' }"
          ></textarea>
          <p style="color: red">
            {{ errorEmtry ? 'Mời nhập đầy đủ phần mô tả' : '' }}
          </p>
        </div>
        <div class="footer-popup">
          <button class="btn btn-cancel" @click="statusPopup = !statusPopup">
            cancel
          </button>
          <button
            class="btn btn-save"
            :class="{ 'true-btn': !errorEmtry }"
            @click="handleDecription"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
    <!-- tạo bài post -->
    <div class="item-step">
      <div class="wp-icon">
        <div class="icon icon-post"></div>
      </div>
      <p class="font-semibold text-lg">Tạo bài post</p>
    </div>
    <!-- giới thiệu nhóm  -->
    <div class="item-step">
      <div
        class="flex items-center gap-2"
        @click="statusPopupIntroduce = !statusPopupIntroduce"
      >
        <div class="wp-icon">
          <div class="icon icon-introduce"></div>
        </div>
        <p class="font-semibold text-lg">Giới thiệu nhóm của bạn</p>
      </div>

      <div v-if="statusPopupIntroduce" class="backgroudColor"></div>
      <div v-if="statusPopupIntroduce" class="wp-popup">
        <div class="header-popup">
          <p class="title">Viết giới thiệu</p>
          <div
            class="wp-close"
            @click="statusPopupIntroduce = !statusPopupIntroduce"
          >
            <div class="close"></div>
          </div>
        </div>
        <div class="body-popup">
          <textarea
            v-model="introducText"
            :style="{ border: emtryIntro ? '1px solid red' : '' }"
          ></textarea>
          <p style="color: red">
            {{ emtryIntro ? 'Mời nhập đầy đủ phần giới thiệu' : '' }}
          </p>
        </div>
        <div class="footer-popup">
          <button class="btn btn-cancel" @click="statusPopup = !statusPopup">
            cancel
          </button>
          <button class="btn btn-save" @click="handleIntro">Lưu</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { groupMixin } from '../../mixin/groupMixin'
import popupListImg from './popupListImg.vue'
export default {
  components: { popupListImg },
  mixins: [groupMixin],
  data() {
    return {
      decriptionText: '',
      statusPopupDecription: false,
      statusPopupIntroduce: false,
      errorEmtry: false,
      introducText: '',
      emtryIntro: false,
    }
  },
  watch: {
    decriptionText(val) {
      console.log(val)
      if (!val) {
        this.errorEmtry = true
        return
      }
      this.errorEmtry = false
    },
    introducText(val) {
      if (!val) {
        console.log(val)
        this.emtryIntro = true
        return
      }
      this.emtryIntro = false
    },
  },
  methods: {
    // mô tả
    handleDecription() {
      if (!this.decriptionText) {
        this.errorEmtry = true
        return
      }
      this.handlerApiPut(this.dataDetailGroup.groupId, {
        descriptions: this.decriptionText,
      })
      this.statusPopupDecription = false
    },
    // giới thiệu
    handleIntro() {
      if (!this.introducText) {
        this.emtryIntro = true
        return
      }
      this.handlerApiPut(this.dataDetailGroup.groupId, {
        welcomeMessage: this.introducText,
      })
      this.statusPopupIntroduce = false
    },
  },
}
</script>

<style scoped lang="scss">
.wp-complete {
  padding: 10px;
  .item-step {
    position: relative;
    width: 345px;
    height: 52px;
    padding: 0px 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    .wp-icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: #e4e6eb;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      .icon {
        width: 20px;
        height: 20px;
        background-repeat: no-repeat;
        display: inline-block;
      }
      .icon-user {
        background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/y4/r/462AOGcX2RS.png);
        background-position: 0px -346px;
        background-size: 26px 790px;
      }
      .icon-img {
        background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yc/r/WifVmwo-uyE.png);
        background-position: 0px -404px;
        background-size: 34px 426px;
      }
      .icon-decription {
        background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yJ/r/3Z6qE4hgTDQ.png);
        background-position: 0px -860px;
        background-size: 26px 1312px;
      }

      .icon-post {
        background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yJ/r/3Z6qE4hgTDQ.png);
        background-position: 0px -552px;
        background-size: 26px 1312px;
      }
      .icon-introduce {
        background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yi/r/2oEs-R74wiz.png);
        background-position: -44px -174px;
        background-size: 650px 196px;
      }
    }
    .backgroudColor {
      position: fixed;
      top: 0px;
      left: 0px;
      right: 0;
      bottom: 0;
      background-color: rgba(244, 244, 244, 0.8);
      z-index: 40;
    }
    .wp-popup {
      position: fixed;
      top: calc(50% - 150px);
      right: calc(50% - 255px);
      width: 548px;
      background-color: white;
      border-radius: 10px;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      z-index: 41;

      .header-popup {
        padding: 20px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ced0d4;
        box-sizing: border-box;
        .title {
          font-weight: 700;
          font-size: 20px;
          line-height: 56px;
        }
        .wp-close {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #e4e6eb;
          .close {
            background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yy/r/JbYPGvIBNLU.png);
            background-position: -154px -88px;
            background-size: 190px 190px;
            width: 20px;
            height: 20px;
            background-repeat: no-repeat;
            display: inline-block;
          }
        }
      }

      .body-popup {
        padding: 23px;
        textarea {
          border: 1px solid #ced0d4;
          height: 84px;
          width: 100%;
          border-radius: 10px;
          padding: 5px;
          outline: none;
        }
      }
      .footer-popup {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 10px;
        padding: 0px 16px 16px 16px;
        .btn {
          // height: 36px;
          padding: 8px 30px;
          border-radius: 8px;
        }
        .btn-cancel {
          color: #1877f2;
        }
        .btn-save {
          background-color: #e4e6eb;
        }
        .true-btn {
          color: white;
          background-color: #1877f2 !important;
        }
      }
    }
  }
}
</style>
