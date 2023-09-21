<template>
  <div class="relative">
    <div class="backgroudColor"></div>
    <div class="wp-popup">
      <div class="header-popup">
        <p class="title">Chọn ảnh minh họa</p>
        <div class="wp-close" @click="emitClose">
          <div class="close"></div>
        </div>
      </div>
      <div class="listImg">
        <div class="wp-list-img">
          <div
            v-for="img in arrIllustration"
            :key="img.id"
            class="overflow-hidden"
            @click="emitIllustration(img.illustration)"
          >
            <img :src="img.illustration" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { arrIllustration } from '../../utils/groups/group.js'
import { groupMixin } from '../../mixin/groupMixin'
export default {
  mixins:[groupMixin],
  data() {
    return {
      arrIllustration,
    }
  },
  methods: {
    emitClose() {
      this.$emit('emit-close')
    },
    emitIllustration(illustration) {
      this.$emit('emit-illustration', illustration)
    },
  },
}
</script>

<style lang="scss" scoped>
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
  top: calc(50% - 250px);
  right: calc(50% - 255px);
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  z-index: 41;
  width: 548px;
  min-height: 500px;
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

  .listImg {
    padding: 10px;
    gap: 8px;
    .wp-list-img {
      display: grid;
      grid-template-columns: auto auto auto;
      border-radius: 8px;
      overflow: hidden;
      gap: 5px;
      img {
        height: 90px;
        align-items: center;
        object-fit: cover;
      }
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
</style>
