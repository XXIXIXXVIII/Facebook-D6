<template>
  <div class="wp-list-image">
    <div class="item-image">
      <div class="img-from-group image"></div>
      <p class="font-semibold text-sm">Chọn ảnh từ nhóm</p>
    </div>
    <div class="item-image">
      <div class="img-from-frofile image"></div>
      <p class="font-semibold text-sm">Chọn từ ảnh của tôi</p>
    </div>
    <div class="item-image">
      <div class="flex gap-2" @click="statusImg = !statusImg">
        <div class="img-from-illustration image"></div>
        <p class="font-semibold text-sm">Chọn từ ảnh minh họa</p>
      </div>
      <popup-img
        v-if="statusImg"
        @emit-illustration="handleCoverImg"
        @emit-close="handleClose"
      />
    </div>
    <label for="image" class="item-image cursor-pointer">
      <div class="img-from-file image"></div>
      <p class="font-semibold text-sm">Tải ảnh lên</p>
      <input id="image" hidden type="file" @change="coverImg" />
    </label>
    <div class="item-image">
      <div class="img-from-context image"></div>
      <p class="font-semibold text-sm">Thêm bên liên kết của nhóm</p>
    </div>
  </div>
</template>

<script>
import { groupMixin } from '../../mixin/groupMixin'
import popupImg from './popupImg.vue'
export default {
  components: { popupImg },
  mixins: [groupMixin],
  data() {
    return {}
  },
  methods: {
    handleClose() {
      this.statusImg = false
    },
    coverImg(e) {
      if (!e.target.files[0]) return
      this.$emit('on-cover', e.target.files[0])
    },
  },
}
</script>

<style scoped lang="scss">
.wp-list-image {
  position: absolute;
  width: 345px;
  background-color: white;
  border-radius: 8px;
  padding: 8px;
  top: 52px;
  right: 0px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  z-index: 10;
  .item-image {
    padding: 8px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: #ebedf0;
    }
    .image {
      width: 20px;
      height: 20px;
      background-repeat: no-repeat;
      display: inline-block;
      margin-right: 10px;
    }
    .img-from-group {
      background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/CBzEZmbq4RG.png);
      background-position: 0px -248px;
      background-size: 74px 408px;
    }
    .img-from-frofile {
      background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yx/r/tHswKt8Qv3Y.png);
      background-position: 0px -22px;
      background-size: 22px 88px;
    }
    .img-from-illustration {
      background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/-4f6DY76yFU.png);
      background-position: 0px -558px;
      background-size: 62px 580px;
    }
    .img-from-file {
      background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yV/r/Qc9BRM5w0X9.png);
      background-position: 0px -22px;
      background-size: 22px 44px;
    }
    .img-from-context {
      background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/y-/r/RsCs_ROFtI8.png);
      background-position: 0px -110px;
      background-size: 22px 212px;
    }
  }
}
</style>
