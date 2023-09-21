<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="container-groups">
    <div class="wp-nav-groups">
      <div class="head-nav-groups">
        <div class="title-head-nav">
          <h1 class="title-groups">Nhóm</h1>
          <div class="wp-icon-setting">
            <div class="icon-setting"></div>
          </div>
        </div>
        <div class="wp-search">
          <div class="icon-search" v-html="search"></div>
          <input type="text" class="search-input" placeholder="Tìm kiếm nhóm" />
        </div>
      </div>
      <div class="wp-body-groups">
        <div class="nav-icon-groups">
          <!-- list navigate  -->
          <nuxt-link
            v-for="item in navIcon"
            :key="item.id"
            :to="item.path"
            class="item-nav-groups"
          >
            <div class="wp-icon">
              <div :class="item.icon" class="active-link"></div>
            </div>
            <p class="nav-name">{{ item.name }}</p>
          </nuxt-link>

          <!-- tạo nhóm -->
          <nuxt-link to="/groups/create" class="create-groups">
            <div class="icon-create"></div>
            <p>Tạo nhóm mới</p>
          </nuxt-link>
        </div>
        <!--  nhóm do Admin quản lý -->
        <div class="wp-render-groups">
          <div class="wp-title">
            <p class="title-join">Nhóm do Admin quản lý</p>
            <!-- <div class="see-all">xem tất cả</div> -->
          </div>
          <div class="list-groups">
            <div
              v-for="group in dataGroupAdmin"
              :key="group.groupId"
              class="item-groups"
              @click="handleDetail(group.groupId)"
            >
              <div class="flex">
                <div class="flex items-center">
                  <div class="wp-img-groups">
                    <img
                      v-if="group.coverAvatar"
                      :src="group.coverAvatar"
                      alt=""
                      class=""
                    />
                    <img v-else :src="imgGroups" alt="" class="" />
                  </div>
                </div>
                <div class="py-[4px] px-[6px] flex items-center">
                  <div class="wp-infor-groups">
                    <p class="name-groups">{{ group.groupName }}</p>
                    <!-- <p class="timer-groups">lần hoạt động gần nhất</p> -->
                  </div>
                </div>
              </div>
              <div class="py-[4px] px-[6px] flex items-center">
                <div class="wp-icon-drop">
                  <div class="icon-drop"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- nhóm tham gia -->
        <div class="wp-render-groups">
          <div class="wp-title">
            <p class="title-join">Nhóm bạn đã tham gia</p>
            <div class="see-all">xem tất cả</div>
          </div>
          <div class="list-groups">
            <div
              v-for="group in dataGroupAdminJoin"
              :key="group.groupId"
              class="item-groups"
              @click="handleDetail(group.groupId)"
            >
              <div class="flex">
                <div class="flex items-center">
                  <div class="wp-img-groups">
                    <img
                      v-if="group.coverAvatar"
                      :src="group.coverAvatar"
                      alt=""
                      class=""
                    />
                    <img v-else :src="imgGroups" alt="" class="" />
                  </div>
                </div>
                <div class="py-[4px] px-[6px] flex items-center">
                  <div class="wp-infor-groups">
                    <p class="name-groups">{{ group.groupName }}</p>
                    <p class="timer-groups">lần hoạt động gần nhất</p>
                  </div>
                </div>
              </div>
              <div class="py-[4px] px-[6px] flex items-center">
                <div class="wp-icon-drop">
                  <div class="icon-drop"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-redirect">
      <nuxt />
    </div>
  </div>
</template>

<script>
import { search } from '../../assets/img/svg'
import { RepositoryFactory } from '../../apiConfig/RepositoryFactory'
import { navIcon } from '../../utils/groups/group.js'
import { feelMixin } from '../../mixin/feelMixin.js'
const groupApi = RepositoryFactory.get('groupsRepository')
export default {
  mixins: [feelMixin],
  data() {
    return {
      search,
      activeLink: 0,
      user: {},
      dataGroupAdminJoin: [],
      dataGroupAdmin: [],
      navIcon,
    }
  },
  created() {
    this.dataMyGroup()
  },
  methods: {
    async dataMyGroup() {
      try {
        const response = await groupApi.getGroupsAdmin(this.user.user_id)
        this.dataGroupAdmin = response.data.groupCreator
        return this.dataGroupAdmin
      } catch (error) {
        console.log(error)
      }
    },

    handleDetail(groupId) {
      this.$router.push(`/groups/${groupId}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.container-groups {
  position: relative;
  background-color: #eff1f4;
  .wp-nav-groups {
    width: 360px;
    // height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    background: white;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    display: flex;
    flex-direction: column;
    padding: 20px 8px;
    .head-nav-groups {
      border-bottom: 1px solid #ced0d4;
      padding: 0px 8px;
      .title-head-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title-groups {
          font-size: 24px;
          font-weight: 700;
        }
        .wp-icon-setting {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: #e4e6eb;
          display: flex;
          align-items: center;
          justify-content: center;
          .icon-setting {
            background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/y4/r/RcpGsP1Bgk9.png);
            background-position: -88px -110px;
            background-size: 190px 182px;
            width: 20px;
            height: 20px;
            background-repeat: no-repeat;
            display: inline-block;
          }
        }
      }
      .wp-search {
        margin: 16px 0px;
        display: flex;
        background-color: #f0f2f5;
        border-radius: 20px;
        align-items: center;
        padding-left: 10px;

        .search-input {
          padding: 7px 6px 9px 6px;
          width: 100%;
          outline: none;
        }
      }
    }
    .wp-body-groups {
      overflow-y: auto;
      overflow-x: hidden;
      margin-top: 5px;
      .nav-icon-groups {
        border-bottom: 1px solid #ced0d4;
        .item-nav-groups {
          width: 100%;
          height: 52px;
          padding: 0 8px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-radius: 8px;
          .wp-icon {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #e4e6eb;

            .icon-feels {
              background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yg/r/oDSPbw-yf-Y.png);
              background-position: 0px -358px;
              background-size: 34px 596px;
              width: 20px;
              height: 20px;
              background-repeat: no-repeat;
              display: inline-block;
            }

            .icon-discover {
              background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yA/r/q7WIMt-eeDm.png);
              background-position: 0px -34px;
              background-size: 34px 208px;
              width: 20px;
              height: 20px;
              background-repeat: no-repeat;
              display: inline-block;
            }
            .icon-groups {
              background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yg/r/oDSPbw-yf-Y.png);
              background-position: 0px -314px;
              background-size: 34px 596px;
              width: 20px;
              height: 20px;
              background-repeat: no-repeat;
              display: inline-block;
            }
          }
          .nav-name {
            font-size: 14px;
            font-weight: 600;
          }
        }
        .nuxt-link-exact-active {
          background-color: #f0f2f5;
          .wp-icon {
            background-color: #1877f2;
            .active-link {
              filter: invert(100%);
            }
          }
        }
        .create-groups {
          width: 100%;
          height: 36px;
          border-radius: 5px;
          background-color: #e7f3ff;
          color: #247ef3;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          margin: 8px 8px 16px 8px;
          .icon-create {
            background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/UMAvBmuqi-U.png);
            background-position: -162px -154px;
            background-size: 190px 200px;
            width: 16px;
            height: 16px;
            background-repeat: no-repeat;
            display: inline-block;
            filter: hue-rotate(90deg);
            -webkit-filter: invert(39%) sepia(57%) saturate(200%) saturate(200%)
              saturate(200%) saturate(200%) saturate(200%) saturate(147.75%)
              hue-rotate(202deg) brightness(97%) contrast(96%);
          }
        }
      }
      .wp-render-groups {
        .wp-title {
          margin: 10px 6px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .title-join {
            font-size: 16px;
            font-weight: 600;
          }
          .see-all {
            color: #247ef3;
            cursor: pointer;
            padding: 8px 5px;
            border-radius: 4px;
            &:hover {
              background-color: #f0f2f5;
            }
          }
        }
        .list-groups {
          .item-groups {
            height: 70px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px;
            border-radius: 8px;
            cursor: pointer;
            &:hover {
              background-color: #f0f2f5;
            }
            .items-center {
              display: flex;
              align-items: center;
              justify-content: flex-end;
              .wp-infor-groups {
                .name-groups {
                  font-size: 18px;
                  font-weight: 600;
                }
                .timer-groups {
                  font-size: 14px;
                  opacity: 0.6;
                }
              }
            }
            .wp-img-groups {
              width: 48px;
              height: 48px;
              border-radius: 5px;
              overflow: hidden;
              img {
                width: 48px;
                height: 48px;
                object-fit: cover;
              }
            }

            .wp-icon-drop {
              width: 24px;
              height: 24px;
              border-radius: 50%;
              background-color: #e4e6eb;
              display: flex;
              justify-content: center;
              align-items: center;
              .icon-drop {
                background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/CBzEZmbq4RG.png);
                background-position: -60px -74px;
                background-size: 74px 408px;
                width: 12px;
                height: 12px;
                background-repeat: no-repeat;
                display: inline-block;
              }
            }
          }
        }
      }
    }
  }
  .container-redirect {
    margin-left: 360px;
  }
}
</style>
