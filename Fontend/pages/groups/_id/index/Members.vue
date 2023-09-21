<template>
  <div class="container-room">
    <div class="wp-room">
      <div class="wp-title">
        <p class="font-semibold text-lg">Thành viên</p>
        <p class="text-sm">
          Người và Trang mới tham gia nhóm này sẽ hiển thị tại đây
        </p>
        <div class="flex items-center gap-4 mt-2">
          <div class="find-event">
            <div class="icon-create"></div>
            <input type="text" placeholder="Tìm kiếm file" />
          </div>
        </div>
      </div>
      <hr />
      <!-- data admin -->
      <div class="wp-img-room">
        <div class="wp-avatar">
          <img v-if="idAdmin.avatar" :src="idAdmin.avatar" alt="" />
          <!-- sssssssssssssssssssssssszzzzzzzzzzzzzzzzzzzzzzzzzz -->
          <img v-else :src="detailAvatar" alt="" />
        </div>
        <div class="wp-infor-admin">
          <div class="wp-infor-text">
            <p class="font-semibold">{{ idAdmin.fullName }}</p>
            <div class="wp-admin-role">
              <div class="wp-role-blue common-backgroud">
                <div class="role-name">Quản trị viên</div>
              </div>
              <div class="wp-hand common-backgroud">
                <img
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/ym/r/yO9BVSOo4qE.png"
                  class="icon-hand"
                />
              </div>
            </div>
            <p class="text-[12px]">Nhân viên IT</p>
          </div>

          <div class="wp-search">
            <div class="icon-more"></div>
          </div>
        </div>
      </div>
      <hr />
      <!-- data member -->
      <div class="list-member">
        <p class="font-semibold text-lg">Thành viên trong nhóm</p>
        <div
          v-for="member in members"
          :key="member.memberId"
          class="wp-img-room"
        >
          <div class="wp-avatar">
            <img :src="member.avatar" alt="" />
          </div>
          <div class="wp-infor-admin">
            <div class="wp-infor-text">
              <p class="font-semibold">{{ member.fullName }}</p>
              <div class="wp-admin-role">
                <div class="wp-role-blue common-backgroud">
                  <div class="role-name">{{ member.memberRole }}</div>
                </div>
                <div class="wp-hand common-backgroud">
                  <img
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/ym/r/yO9BVSOo4qE.png"
                    class="icon-hand"
                  />
                </div>
              </div>
              <p class="text-[12px]">{{ member.biography }}</p>
            </div>
            <br />
            <div class="wp-search">
              <div class="icon-more"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-room mb-5 mt-3">
        <div class="wp-img"></div>
      </div>
    </div>
  </div>
</template>

<script>
import detailAvatar from '../../../../assets/img/avatarDetail.jpg'

import { RepositoryFactory } from '../../../../apiConfig/RepositoryFactory'
import { groupMixin } from '../../../../mixin/groupMixin'
const apiGroup = RepositoryFactory.get('groupsRepository')

export default {
  mixins: [groupMixin],
  data() {
    return {
      detailAvatar,
      members: [],
    }
  },
  computed: {
    groupId() {
      return this.$route.params.id
    },
  },
  created() {
    this.getMember()
  },

  methods: {
    async getMember() {
      try {
        const response = await apiGroup.getMemberGroup(this.groupId)
        this.idAdmin = response.data.user.admin
        this.members = response.data.user.user
        console.log(this.idAdmin)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped lang="scss">
.container-room {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  width: 100%;
  .wp-room {
    width: 70%;
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
        width: 98%;
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
          width: 90%;
          outline: none;
        }
      }
    }
    .wp-img-room {
      display: flex;
      align-items: center;
      .wp-avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        box-sizing: border-box;
        margin: 8px 12px 8px 0px;

        img {
          width: 60px;
          height: 60px;
          object-fit: cover;
        }
      }
      .wp-infor-admin {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 76px;
        width: 100%;
        margin: 20px 0;
        .wp-infor-text {
          .wp-admin-role {
            margin-left: 5px;
            display: flex;
            gap: 5px;
            .wp-role-blue {
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #e7f3ff;
              color: #188af5;
              line-height: 20px;
              font-size: 12px;
              padding: 5px 5px;
            }
            .common-backgroud {
              border-radius: 5px;
              height: 20px;
            }
            .wp-hand {
              background-color: #e4e6eb;
              display: flex;
              align-items: center;
              justify-content: center;
              box-sizing: border-box;
              .icon-hand {
                width: 16px;
                height: 16px;
              }
            }
          }
        }
        .wp-search {
          padding: 0px 16px;
          height: 36px;
          background-color: #e4e6eb;
          display: flex;
          align-items: center;
          border-radius: 8px;
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
    .list-member {
      margin: 8px 12px 8px 0px;
      .wp-img-room {
        display: flex;
        align-items: center;
        .wp-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          overflow: hidden;
          box-sizing: border-box;
          img {
            width: 60px;
            height: 60px;
            object-fit: cover;
          }
        }
        .wp-infor-admin {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 76px;
          width: 100%;
          margin: 10px 0;
          .wp-infor-text {
            .wp-admin-role {
              margin-left: 5px;
              display: flex;
              gap: 5px;
              .wp-role-blue {
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #e7f3ff;
                color: #188af5;
                line-height: 20px;
                font-size: 12px;
                padding: 5px 5px;
              }
              .common-backgroud {
                border-radius: 5px;
                height: 20px;
              }
              .wp-hand {
                background-color: #e4e6eb;
                display: flex;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                .icon-hand {
                  width: 16px;
                  height: 16px;
                }
              }
            }
          }
          .wp-search {
            padding: 0px 16px;
            height: 36px;
            background-color: #e4e6eb;
            display: flex;
            align-items: center;
            border-radius: 8px;
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
