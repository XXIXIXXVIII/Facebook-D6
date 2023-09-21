<template>
  <div class="py-2 text-[0.9375rem] font-medium">
    <div
      class="mx-2 p-2 flex gap-2 items-center hover:bg-gray-200 rounded-md cursor-pointer"
    >
      <div>
        <i
          style="
            background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/s-G5CX6lFzb.png');
            background-position: 0px -70px;
            background-size: 26px 224px;
            width: 20px;
            height: 20px;
            background-repeat: no-repeat;
            display: inline-block;
          "
        ></i>
      </div>
      <div class="" @click="modalSavePost">
        <div class="">Lưu bài viết</div>
        <div class="text-[#65676B] text-xs font-normal">
          Thêm vào mục danh sách đã lưu
        </div>
      </div>
    </div>
    <modal-save-post :show-modal="showModalSavePost" @close-modal="closeModalSavePost" :post="post"></modal-save-post>

    <hr class="bg-[#CED0D4] mx-4 my-2" />

    <div
      class="mx-2 p-2 flex gap-2 items-center hover:bg-gray-200 rounded-md cursor-pointer"
    >
      <div>
        <i
          data-visualcompletion="css-img"
          class="x1b0d499 xep6ejk"
          style="
            background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/ys/r/R3EOcUzJPv5.png');
            background-position: 0px -154px;
            background-size: 22px 1044px;
            width: 20px;
            height: 20px;
            background-repeat: no-repeat;
            display: inline-block;
          "
        ></i>
      </div>
      <div class="">
        <div class="">Bật thông báo về bài viết này</div>
      </div>
    </div>

    <hr class="bg-[#CED0D4] mx-4 my-2 h-[2px]" />

    <div
      class="mx-2 p-2 flex gap-2 items-center hover:bg-gray-200 rounded-md cursor-pointer"
    >
      <div>
        <i
          data-visualcompletion="css-img"
          class="x1b0d499 xep6ejk"
          style="
            background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/y4/r/1Iv9Oayr05d.png');
            background-position: 0px -22px;
            background-size: 22px 110px;
            width: 20px;
            height: 20px;
            background-repeat: no-repeat;
            display: inline-block;
          "
        ></i>
      </div>
      <div class="">
        <div class="">Báo cáo bài viết với quản trị viên nhóm</div>
      </div>
    </div>

    <div
      class="mx-2 p-2 flex gap-2 items-center hover:bg-gray-200 rounded-md cursor-pointer"
    >
      <div class="w-5 h-5 overflow-hidden">
        <img
          class="object-cover"
          src="https://static.xx.fbcdn.net/rsrc.php/v3/yp/r/A_NcMeki4UO.png"
        />
      </div>
      <div class="" v-if="status && status === 'Myself'" @click="deletePost">
        <div class="">Xóa bài viết</div>
        <div class="text-[#65676B] text-xs font-normal">
          Ẩn bớt các bài viết tương tự.
        </div>
      </div>
    </div>

    <div
      class="mx-2 p-2 flex gap-2 items-center hover:bg-gray-200 rounded-md cursor-pointer"
    >
      <div class="w-5 h-5 overflow-hidden">
        <img
          class="object-cover"
          src="https://static.xx.fbcdn.net/rsrc.php/v3/ya/r/h15jrhghvUR.png"
        />
      </div>
      <div class="">
        <div class="">Tạm ẩn Luke trong 30 ngày</div>
        <div class="text-[#65676B] text-xs font-normal">
          Tạm thời không nhìn thấy bài viết nữa.
        </div>
      </div>
    </div>

    <div
      class="mx-2 p-2 flex gap-2 items-center hover:bg-gray-200 rounded-md cursor-pointer"
    >
      <div class="w-5 h-5 overflow-hidden">
        <img
          class="object-cover"
          src="https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/KHqkjYOwBTc.png"
        />
      </div>
      <div class="">
        <div class="">Ẩn tất cả từ Luke</div>
        <div class="text-[#65676B] text-xs font-normal">
          Không xem bài viết từ người này nữa.
        </div>
      </div>
    </div>

    <div
      class="mx-2 p-2 flex gap-2 items-center hover:bg-gray-200 rounded-md cursor-pointer"
    >
      <div class="w-5 h-5 overflow-hidden">
        <img
          class="object-cover"
          src="https://static.xx.fbcdn.net/rsrc.php/v3/ya/r/h15jrhghvUR.png"
        />
      </div>
      <div class="">
        <div class="">Tạm ẩn Fan MU Việt Nam trong 30 ngày</div>
        <div class="text-[#65676B] text-xs font-normal">
          Tạm thời không nhìn thấy bài viết nữa.
        </div>
      </div>
    </div>

    <div
      class="mx-2 p-2 flex gap-2 items-center hover:bg-gray-200 rounded-md cursor-pointer"
    >
      <div class="w-5 h-5 overflow-hidden">
        <img
          class="object-cover"
          src="https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/KHqkjYOwBTc.png"
        />
      </div>
      <div class="">
        <div class="">Bỏ theo dõi Fan MU Việt Nam</div>
        <div class="text-[#65676B] text-xs font-normal">
          Không xem bài viết từ người này nữa.
        </div>
      </div>
    </div>

    <div
      class="mx-2 p-2 flex gap-2 items-center hover:bg-gray-200 rounded-md cursor-pointer"
    >
      <div class="w-5 h-5 overflow-hidden">
        <img
          class="object-cover"
          src="https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/BNdV7yOMsDU.png"
        />
      </div>
      <div class="">
        <div class="">Báo cáo bài viết</div>
        <div class="text-[#65676B] text-xs font-normal">
          Chúng tôi sẽ không cho Luke biết ai đã báo cáo.
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ModalSavePost from './ModalSavePost.vue'
export default {
  name: 'SettingPost',
  props: {
    post: {
      type: Object,
      default: () => {},
    },
  },

  components : {
    ModalSavePost
  },

  computed: {
    status () {
      return this.$store.state.idFriendModule.status
    }
  },

  data() {
    return {
      showModalSavePost: false,
    }
  },

  methods: {
    modalSavePost() {
      this.showModalSavePost = true;
    },
    closeModalSavePost() {
      this.showModalSavePost = false;
    },

    async deletePost() {
      await this.$store.dispatch('deletePost', { postId: this.post.post_id })
    },
  },
}
</script>
<style></style>
