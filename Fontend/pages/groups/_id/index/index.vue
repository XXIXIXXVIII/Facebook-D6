<!-- eslint-disable vue/prop-name-casing -->
<template>
  <div class="wp-discuss">
    <div class="wp-left-discuss">
      <div class="container-search">
        <div class="wp-search">
          <CreatePostDetail1Vue
            v-if="popupCreatePost"
            :is-group="isGroup"
            :group-id="+groupId"
            @update:showCreateDetail="handleClosePost"
          />
          <div class="wp-avatar">
            <img
              v-if="currentUser.avatar"
              :src="currentUser.avatar"
              alt=""
              class="avatar"
            />
            <img v-else :src="avatarDetail" alt="" class="avatar" />
          </div>
          <div class="wp-input-search">
            <p
              class="cursor-pointer w-full"
              @click="popupCreatePost = !popupCreatePost"
            >
              Bạn viết gì đi...
            </p>
            <!-- <input type="text" placeholder="Bạn viết gì đi..." /> -->
          </div>
        </div>
        <hr class="" />
        <div class="list-feature-discuss">
          <div class="item-feature">
            <img
              class="icon-incognito"
              src="https://static.xx.fbcdn.net/rsrc.php/v3/y-/r/WpZH_PxfuYV.png"
            />
            <p class="">Bài viết ẩn danh</p>
          </div>
          <div class="item-feature">
            <img
              class="icon-incognito"
              src="https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/a6OjkIIE-R0.png"
            />
            <p class="">Ảnh/video</p>
          </div>
          <div class="item-feature">
            <img
              class="icon-incognito"
              src="https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/iD7ozpfOjdA.png"
            />
            <p class="">Phòng họp mặt</p>
          </div>
        </div>
      </div>
      <div class="wp-attention">
        <div class="attention-left">
          <p class="">Đáng chú ý</p>
          <div class="icon-attention"></div>
        </div>
        <div class="attention-left">
          <p class="">Thêm</p>
          <div class="icon-drop"></div>
        </div>
      </div>
      <div
        v-for="post in dataPostGroups"
        :key="post.post_id"
        class="w-[576px] mt-4 rounded-xl bg-white border border-gray-200 shadow-xl"
      >
        <ExternalPost :post="post" />
      </div>
    </div>
    <div class="wp-right-discuss">
      <div class="wp-procedure">
        <div class="hearder-procedure">
          <div class="wp-title-procedure">
            <p class="font-semibold">Hãy hoàn tất quy trình thiết lập nhóm</p>
            <div class="icon-close"></div>
          </div>
          <p class="text-sm font-semibold">Đã hoàn thành 0/5 bước</p>
          <p class="opacity-70 font-medium">
            Tiếp tục thêm các thông tin chính và bắt đầu tương tác với cộng đồng
            của bạn.
          </p>
        </div>
        <!-- form data -->
        <form-groups />
        <!-- <external-post /> -->
      </div>
      <div
        v-if="dataDetailGroup.privacy === 'Public'"
        class="container-privacy"
      >
        <p class="font-semibold text-xl">Giới thiệu</p>
        <div class="wp-privacy">
          <div class="icon-private"></div>
          <div class="wp-text-privacy">
            <p class="titile-privacy">Private</p>
            <p class="">
              Only members can see who's in the group and what they post.
            </p>
          </div>
        </div>
      </div>
      <div
        v-if="dataDetailGroup.privacy === 'Private'"
        class="container-privacy"
      >
        <p class="font-semibold text-xl">Giới thiệu</p>
        <div class="wp-privacy">
          <div class="icon-private"></div>
          <div class="wp-text-privacy">
            <p class="titile-privacy">Private</p>
            <p class="">
              Only members can see who's in the group and what they post.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import avatarDetail from '../../../../assets/img/avatarDetail.jpg'
import FormGroups from '../../../../components/detailGroup/FormGroups.vue'
import CreatePostDetail1Vue from '../../../../components/post/CreatedPost/CreatePostDetail1.vue'
import { groupMixin } from '../../../../mixin/groupMixin'
import { RepositoryFactory } from '../../../../apiConfig/RepositoryFactory'
import ExternalPost from '../../../../components/post/ExternalPost.vue'
const apiPostGroups = RepositoryFactory.get('posts')

export default {
  components: {
    FormGroups,
    CreatePostDetail1Vue,
    ExternalPost,
  },
  mixins: [groupMixin],
  data() {
    return {
      avatarDetail,
      popupCreatePost: false,
      isGroup: true,
      dataPostGroups: [],
      statusGroups: true,
    }
  },
  created() {
    this.dataPostGroup(this.groupId, this.currentUser.user_id)
  },
  methods: {
    handleClosePost(popup) {
      this.popupCreatePost = popup
      this.dataPostGroup(this.groupId, this.currentUser.user_id)
    },
    async dataPostGroup(groupId, userId) {
      try {
        const response = await apiPostGroups.getPostGroup(groupId, userId)
        this.dataPostGroups = response.data.postsWithMedia
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped lang="scss">
.wp-discuss {
  display: flex;
  width: 940px;
  gap: 18px;
  padding: 16px auto;
  .wp-left-discuss {
    width: 60%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .container-search {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
      border-radius: 8px;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
      padding: 12px;
      background-color: white;
      .wp-search {
        width: 100%;
        display: flex;
        gap: 8px;
        .wp-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 5px;
          .avatar {
            width: 40px;
            height: 40px;
            object-fit: cover;
          }
        }
        .wp-input-search {
          width: 90%;
          border: 20px;
          display: flex;
          align-items: center;
          padding: 8px 12px;
          background-color: #f0f2f5;
          border-radius: 20px;

          input {
            outline: none;
            width: 100%;
          }
        }
      }
      .list-feature-discuss {
        display: flex;
        justify-content: space-between;
        .item-feature {
          width: 33%;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-items: center;
          gap: 2px;
          padding: 8px;
          &:hover {
            background-color: #e4e6eb;
          }
          .icon-incognito {
            width: 24px;
            height: 24px;
            margin-right: 10px;
          }
          p {
            font-size: 14px;
            font-weight: 700;
            opacity: 0.6;
          }
        }
      }
    }
    .wp-attention {
      display: flex;
      align-items: center;
      border-radius: 8px;
      justify-content: space-between;
      background-color: white;
      height: 52px;
      width: 100%;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
      padding: 12px;

      .attention-left {
        display: flex;
        gap: 10px;
        justify-content: center;
        align-items: center;
        .icon-attention {
          background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/y2/r/z3fbew0r_cu.png);
          background-position: 0px -216px;
          background-size: 38px 402px;
          width: 20px;
          height: 20px;
          background-repeat: no-repeat;
          display: inline-block;
        }
        p {
          font-weight: 600;
        }
        .icon-drop {
          background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/55xgkRiG92W.png);
          background-position: 0px -26px;
          background-size: 26px 1246px;
          width: 24px;
          height: 24px;
          background-repeat: no-repeat;
          display: inline-block;
        }
      }
    }
  }
  .wp-right-discuss {
    width: 40%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    .wp-procedure {
      width: 100%;
      background-color: white;

      border-radius: 8px;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
      .hearder-procedure {
        padding: 20px;

        .wp-title-procedure {
          display: flex;
          justify-content: space-between;
          .icon-close {
            background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/ewXIxnPcb6O.png);
            background-position: 0px -226px;
            background-size: 34px 512px;
            width: 20px;
            height: 20px;
            background-repeat: no-repeat;
            display: inline-block;
          }
        }
      }
    }
    .container-privacy {
      width: 100%;
      background-color: white;
      border-radius: 8px;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
      padding: 20px;
      .wp-privacy {
        display: flex;
        margin-top: 10px;
        .icon-private {
          margin: 6px 0;
          background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yI/r/4K6mccd9Y50.png);
          background-position: 0px -1284px;
          background-size: 34px 1338px;
          width: 16px;
          height: 16px;
          background-repeat: no-repeat;
          display: inline-block;
          width: 8%;
        }
        .wp-text-privacy {
          width: 90%;

          .titile-privacy {
            font-weight: 600;
            font-size: 18px;
          }
        }
      }
    }
  }
}
</style>
