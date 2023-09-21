<template>
  <div class="container-detail-main">
    <div v-if="statusImgCover" class="bg-btn">
      <div class="wp-btn">
        <button class="btn btn-cancel" @click="handleCancel">Hủy</button>
        <button class="btn btn-save" @click="handleSave">Lưu thay đổi</button>
      </div>
    </div>
    <div class="wp-detail-group">
      <div class="header-detail">
        <div class="container-imgcover">
          <div class="wp-img-cover">
            <img
              v-if="dataDetailGroup.coverAvatar"
              :src="dataDetailGroup.coverAvatar"
              alt=""
              class="w-full h-full object-cover"
            />
            <img
              v-else
              :src="imgGroup"
              alt=""
              class="w-full h-full object-cover"
            />
          </div>
          <div class="wp-edit-group">
            <div class="">
              <div class="wp-edit">
                <div
                  class="flex gap-2 items-center cursor-pointer"
                  @click="popupListImg = !popupListImg"
                >
                  <div class="edit"></div>
                  <p class="text-edit">Chỉnh sửa</p>
                </div>
                <popup-list-img
                  v-if="popupListImg"
                  @on-cover="handleCoverImg"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="infor-user">
          <p class="name-group">{{ dataDetailGroup.groupName }}</p>
          <div class="wp-invite">
            <div class="wp-img">
              <img
                v-if="currentUser.avatar"
                :src="currentUser.avatar"
                alt=""
                class=""
              />
              <img v-else :src="avatarDetail" alt="" class="" />
            </div>
            <div class="wp-create-invite">
              <div class="create-invite"></div>
              <p class="invite">Mời</p>
            </div>
          </div>
        </div>
        <div class="nav-header-group">
          <!--  nav chill route -->
          <nav class="nav-group">
            <nuxt-link
              v-for="nav in navDetail"
              :key="nav.id"
              :to="nav.path"
              class="item-nav-group"
            >
              <div class="text-nav">{{ nav.name }}</div>
              <div class="ranger-nav"></div>
            </nuxt-link>
          </nav>
          <div class="wp-left-nav">
            <div class="wp-search">
              <div class="search-icon"></div>
            </div>
            <div class="wp-search">
              <div class="icon-more"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-discuss">
      <nuxt-child />
    </div>
  </div>
</template>

<script>
import { groupMixin } from '../../../mixin/groupMixin'
import imgGroup from '../../../assets/img/imgGroups.png'
import avatarDetail from '../../../assets/img/avatarDetail.jpg'
import popupListImg from '../../../components/detailGroup/popupListImg.vue'
export default {
  components: { popupListImg },
  mixins: [groupMixin],
  data() {
    return {
      imgGroup,
      avatarDetail,
      navDetail: [
        {
          id: 1,
          name: 'Thảo luận',
          path: `/groups/${this.$route.params.id}`,
        },
        {
          id: 2,
          name: 'Phòng họp mặt',
          path: `/groups/${this.$route.params.id}/room`,
        },
        {
          id: 3,
          name: 'Thành viên',
          path: `/groups/${this.$route.params.id}/Members`,
        },
        {
          id: 4,
          name: 'Sự kiện',
          path: `/groups/${this.$route.params.id}/Events`,
        },
        {
          id: 5,
          name: 'File phương tiện',
          path: `/groups/${this.$route.params.id}/Media`,
        },
        {
          id: 6,
          name: 'File',
          path: `/groups/${this.$route.params.id}/Files`,
        },
      ],
    }
  },
  created(){
console.log(this.dataDetailGroup)
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.container-detail-main {
  position: relative;
  margin-left: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .bg-btn {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 60px;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: rgba(0, 0, 0, 0.4);
    gap: 5px;
    z-index: 10;
    .wp-btn {
      .btn {
        line-height: 36px;
        padding: 0 40px;
        border-radius: 8px;
        color: white;
        font-size: 15px;
        font-weight: 600;
        height: 36px;
      }
      .btn-cancel {
        background-color: rgba(255, 255, 255, 0.1);
        &:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
      }
      .btn-save {
        background-color: #2374e1;
        &:hover {
          background-color: #2069c9;
        }
      }
    }
  }
  .wp-detail-group {
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    .header-detail {
      width: 940px;
      .container-imgcover {
        position: relative;

        .wp-img-cover {
          height: 350px;
          border-bottom-right-radius: 10px;
          border-bottom-left-radius: 10px;
          overflow: hidden;
          position: relative;

          img {
            object-fit: cover;
          }
        }
        .wp-edit-group {
          position: absolute;
          bottom: 15px;
          width: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding: 0 30px;
          .wp-edit {
            position: relative;
            background-color: #e4e6eb;
            border-radius: 8px;
            display: flex;
            gap: 10px;
            padding: 10px;
            justify-content: center;
            align-items: center;
            .edit {
              background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yN/r/HalkO23zjrG.png);
              background-position: 0px -586px;
              background-size: 26px 714px;
              width: 16px;
              height: 16px;
              background-repeat: no-repeat;
              display: inline-block;
              // filter: invert(100%);
            }
            .text-edit {
              font-weight: 600;
              font-size: 15px;
            }
          }
        }
      }
      .infor-user {
        min-height: 125px;
        padding: 25px 30px;
        border-bottom: 1px solid #b3c0d2;
        .name-group {
          line-height: 30px;
          font-size: 24px;
          font-weight: 700;
        }
        .wp-invite {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 20px;
          .wp-img {
            margin-top: 12px;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 35px;
              height: 35px;
              object-fit: cover;
            }
          }
          .wp-create-invite {
            padding: 8px;
            background-color: #3578e5;
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
            .create-invite {
              background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yv/r/QCj9H9Vf5Du.png);
              background-position: -144px -154px;
              background-size: 190px 190px;
              width: 16px;
              height: 16px;
              background-repeat: no-repeat;
              display: inline-block;
              filter: invert(100%);
            }
            .invite {
              color: white;
              font-size: 15px;
              font-weight: 600;
            }
          }
        }
      }
      .nav-header-group {
        width: 100%;
        height: 70px;
        padding: 4px 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .nav-group {
          display: flex;
          align-items: center;

          .item-nav-group {
            // padding-top: 8px;

            .text-nav {
              line-height: 56px;
              border-radius: 8px;
              border: white;
              text-align: center;
              opacity: 0.7;
              font-size: 15px;
              font-weight: 600;
              cursor: pointer;
              padding: 0 16px;
              margin-top: 10px;
              &:hover {
                background-color: #e4e6eb;
              }
            }
            .ranger-nav {
              height: 4px;

              width: 100%;
            }
          }
          .nuxt-link-exact-active {
            .ranger-nav {
              background-color: #3578e5;
            }
          }
        }
        .wp-left-nav {
          display: flex;
          gap: 10px;
          align-items: center;

          .wp-search {
            padding: 0px 16px;
            height: 36px;
            background-color: #e4e6eb;
            display: flex;
            align-items: center;
            border-radius: 8px;
            .search-icon {
              background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yv/r/QCj9H9Vf5Du.png);
              background-position: -108px -154px;
              background-size: 190px 190px;
              width: 16px;
              height: 16px;
              background-repeat: no-repeat;
              display: inline-block;
            }
            .icon-more {
              background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yv/r/QCj9H9Vf5Du.png);
              background-position: -72px -154px;
              background-size: 190px 190px;
              width: 16px;
              height: 16px;
              background-repeat: no-repeat;
              display: inline-block;
            }
          }
        }
      }
    }
  }
  .container-discuss {
    display: flex;
    justify-content: center;
    padding: 16px;
    width: 100%;
    background-color: #f0f2f5;
  }
}
</style>
