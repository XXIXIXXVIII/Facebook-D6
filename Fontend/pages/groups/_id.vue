<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="container-detail-gruops">
    <div class="wp-nav-group">
      <div class="head-nav">
        <div class="infor-group">
          <div class="wp-avatar">
            <img
              v-if="dataGroup.coverAvatar"
              :src="dataGroup.coverAvatar"
              alt=""
              class=""
            />
            <img v-else :src="imgGruop" alt="" class="" />
          </div>
          <div class="wp-infor">
            <p class="name-groups">{{ dataGroup.groupName }}</p>
            <div class="wp-privacy">
              <div class="icon-privarcy"></div>
              <div class="privacy">
                <p v-if="dataGroup.privacy === 'Private'">Nhóm riêng tư</p>
                <p v-if="dataGroup.privacy === 'Public'">Nhóm công khai</p>
                <span>{{ dataGroup.memberCount }} thành viên</span>
              </div>
            </div>
          </div>
        </div>
        <div class="wp-invite">
          <div class="btn-invite">
            <div class="icon-add"></div>
            <p>Mời</p>
          </div>
          <div class="btn-more">
            <div class="icon-more"></div>
          </div>
        </div>
      </div>
      <div class="body-nav">
        <div class="wp-active-nav">
          <div class="active-nav" @click="handleToggleCommulity('commulity')">
            <div
              class="btn-active"
              :style="{ color: statusCommulity ? '#1876f2' : '' }"
            >
              Lướt xem
            </div>
            <div
              class="ranger-active"
              :style="{ backgroundColor: statusCommulity ? '#1876f2' : '' }"
            ></div>
          </div>
          <div class="active-nav" @click="handleToggleCommulity('manager')">
            <div
              class="btn-active"
              :style="{ color: statusBrowse ? '#1876f2' : '' }"
            >
              Quản lí
            </div>
            <div
              class="ranger-active"
              :style="{ backgroundColor: statusBrowse ? '#1876f2' : '' }"
            ></div>
          </div>
        </div>
        <nuxt-link to="/groups/1" class="wp-home-group-home">
          <div class="icon-home"></div>
          <p class="title-home">Trang chủ của cộng đồng</p>
        </nuxt-link>
        <div v-if="statusBrowse" class="container-home-group">
          <nuxt-link to="/groups/1/overview" class="wp-home-group">
            <div class="icon-overview"></div>
            <p class="title-home">Tổng quan</p>
          </nuxt-link>
          <div class="container-admin-setting">
            <div
              v-for="item in featureNav"
              :key="item.id"
              class="wp-admin-tool"
            >
              <p class="title-tool">{{ item.name }}</p>
              <div class="icon-dropdonw"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-nav">
        <div class="wp-btn-create-chat">
          <div class="icon-create" v-html="createChat"></div>
          <p class="">Tạo phòng chat</p>
        </div>
      </div>
    </div>
    <nuxt />
  </div>
</template>

<script>
import { RepositoryFactory } from '../../apiConfig/RepositoryFactory'
import { createChat } from '../../assets/img/svg'
import { featureNav } from '../../utils/groups/group'
import { groupMixin } from '../../mixin/groupMixin'
const apiDetailGroup = RepositoryFactory.get('groupsRepository')
export default {
  mixins: [groupMixin],
  data() {
    return {
      createChat,
      statusCommulity: false,
      statusBrowse: true,
      dataGroup: {},
      featureNav,
    }
  },

  created() {
    this.detailGroup()
  },
  methods: {
    handleToggleCommulity(type) {
      if (type === 'commulity') {
        this.statusCommulity = true
        this.statusBrowse = false
      } else if (type === 'manager') {
        this.statusBrowse = true
        this.statusCommulity = false
      }
    },
    async detailGroup() {
      console.log(this.groupId)
      try {
        const response = await apiDetailGroup.getDetaiAdmin(this.groupId)
        this.dataGroup = response.data
        this.$store.commit('setDetailGroup', this.dataGroup)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container-detail-gruops {
  .wp-nav-group {
    width: 360px;
    position: fixed;
    top: 56px;
    left: 0px;
    bottom: 0px;
    height: 100%;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    .head-nav {
      padding: 15px;
      .infor-group {
        display: flex;
        gap: 10px;

        .wp-avatar {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          overflow: hidden;

          img {
            width: 48px;
            height: 48px;
            object-fit: cover;
          }
        }
        .wp-infor {
          .name-groups {
            font-size: 17px;
            font-weight: 600;
          }
          .wp-privacy {
            display: flex;
            .icon-privarcy {
              background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/ym/r/BBQhmh97rdP.png);
              background-position: 0px -294px;
              background-size: 22px 308px;
              width: 12px;
              height: 12px;
              background-repeat: no-repeat;
              display: inline-block;
              margin: 2px;
            }

            .privacy {
              display: flex;
              opacity: 0.8;
              font-size: 13px;
              gap: 6px;
              align-items: center;
              span {
                font-weight: 600;
              }
            }
          }
        }
      }
      .wp-invite {
        display: flex;
        justify-content: space-between;
        align-items: center;

        margin-top: 12px;

        .btn-invite {
          display: flex;
          justify-content: center;
          gap: 5px;
          align-items: center;
          background-color: #1b74e4;
          border-radius: 8px;
          width: 80%;
          height: 36px;
          cursor: pointer;
          &:hover {
            background-color: #1867c7;
          }
          .icon-add {
            background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yv/r/QCj9H9Vf5Du.png);
            background-position: -144px -154px;
            background-size: 190px 190px;
            width: 16px;
            height: 16px;
            background-repeat: no-repeat;
            display: inline-block;
            filter: invert(100%);
          }
          p {
            font-size: 15px;
            font-weight: 600;
            color: white;
          }
        }
        .btn-more {
          width: 48px;
          height: 36px;
          border-radius: 8px;
          background-color: #e4e6eb;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 15%;
          &:hover {
            background-color: #c6c7cd;
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
    .body-nav {
      overflow-y: scroll;
      height: 100%;
      .wp-active-nav {
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #e4e6eb;
        .active-nav {
          cursor: pointer;
          .btn-active {
            width: 156px;
            height: 36px;
            border-radius: 8px;
            font-size: 15px;
            line-height: 36px;
            text-align: center;
            border: white;
            font-weight: 600;
            opacity: 0.7;
            &:hover {
              background-color: #e4e6eb;
            }
          }
          .ranger-active {
            height: 4px;
            width: 100%;
          }
        }
      }
      .wp-home-group-home {
        width: 95%;
        height: 44px;
        border-radius: 8px;
        display: flex;
        gap: 10px;
        align-items: center;
        padding: 0px 8px;
        margin-top: 16px;
        margin-left: 8px;
        &:hover {
          background-color: #e4e6eb;
        }
        .icon-home {
          background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/_wRrwXp_OpM.png);
          background-position: 0px -136px;
          background-size: 26px 322px;
          width: 20px;
          height: 20px;
          background-repeat: no-repeat;
          display: inline-block;
        }
      }
      .nuxt-link-exact-active {
        color: #1876f2;
        background-color: #eaf3ff;
        .icon-home {
          width: 20px;
          height: 20px;
          -webkit-mask-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/_wRrwXp_OpM.png);
          -webkit-mask-size: 26px 322px;
          -webkit-mask-position: 0px -114px;
          background-color: #3578e5;
        }
      }
      .container-home-group {
        .wp-home-group {
          width: 95%;
          height: 44px;
          border-radius: 8px;
          display: flex;
          gap: 10px;
          align-items: center;
          padding: 0px 8px;
          margin-left: 8px;
          // -----------------------

          &:hover {
            background-color: #f5f6f7;
          }
          .icon-overview {
            background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yV/r/-hQWGrG0T4W.png);
            background-position: 0px -132px;
            background-size: 22px 194px;
            width: 20px;
            height: 20px;
            background-repeat: no-repeat;
            display: inline-block;
          }
        }
        .nuxt-link-exact-active {
          color: #1876f2;
          background-color: #eaf3ff;
          .icon-overview {
            width: 20px;
            height: 20px;
            -webkit-mask-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/_wRrwXp_OpM.png);
            -webkit-mask-size: 26px 322px;
            -webkit-mask-position: 0px -158px;
            background-color: #3578e5;
          }
        }
      }
      .container-admin-setting {
        padding: 14px 8px;
        display: flex;
        flex-direction: column;
        .wp-admin-tool {
          height: 44px;
          width: 100%;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 8px;
          &:hover {
            background-color: #f5f6f7;
          }
          .title-tool {
            font-size: 15px;
            opacity: 0.7;
            font-weight: 600;
          }
          .icon-dropdonw {
            background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yv/r/QCj9H9Vf5Du.png);
            background-position: 0px -88px;
            background-size: 190px 190px;
            width: 20px;
            height: 20px;
            background-repeat: no-repeat;
            display: inline-block;
            opacity: 0.7;
          }
        }
      }
    }
    .footer-nav {
      position: fixed;
      bottom: 0px;
      left: 0px;
      background-color: white;
      padding: 16px;
      width: 360px;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
      .wp-btn-create-chat {
        width: 100%;
        height: 36px;
        border-radius: 8px;
        background-color: #e7f3ff;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        cursor: pointer;
        .icon-create {
          color: #1b74e4;
        }
        p {
          color: #1b74e4;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
