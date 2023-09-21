<template>
  <div class="container-create-groups">
    <div class="wp-sidebar-form">
      <div class="wp-title-create">
        <p class="text-sm opacity-70">
          <span>Nhóm</span> > <span>Tạo nhóm</span>
        </p>
        <p class="font-bold text-2xl">Tạo nhóm</p>
      </div>
      <div class="wp-form-group">
        <div class="infor-admin">
          <div class="wp-avatar">
            <img :src="currenUser.avatar" alt="" class="avatar" />
          </div>
          <div class="wp-infor">
            <p class="name-user">{{ currenUser.fullName }}</p>
            <p class="role">Admin</p>
          </div>
        </div>
        <!-- form Gruops -->
        <div class="wp-from">
          <!-- input name groups -->
          <div
            class="wp-name-group"
            :style="{ border: statusNameGruop ? '1px solid red' : '' }"
          >
            <input
              v-model="dataGroups.nameGroups"
              type="text"
              placeholder="Tên nhóm"
              @focus="statusFocus = true"
            />
          </div>
          <p v-if="statusNameGruop" class="text-red-500 text-xs ml-2">
            Chọn tên cho nhóm của bạn
          </p>
          <!-- drop privacy  -->
          <div
            class="wp-privacy"
            :style="{ border: statusPrivate ? '1px solid red' : '' }"
          >
            <div class="privace" @click="popupPrivate">
              <p>Chọn quyền riêng tư</p>
              <div class="dropdown"></div>
            </div>
            <div v-if="isPopupPrivate" class="wp-choose-privacy">
              <div class="wp-data" @click="handlePrivace('Public')">
                <div class="wp-public">
                  <div class="wp-icon">
                    <div class="icon-public"></div>
                  </div>
                  <div class="wp-text">
                    <p class="title">Công khai</p>
                    <p class="text-public">
                      Bất kì ai cũng có thể nhìn thấy mọi người trong nhóm và
                      những gì họ đăng
                    </p>
                  </div>
                </div>
              </div>
              <div class="wp-data" @click="handlePrivace('Private')">
                <div class="wp-public">
                  <div class="wp-icon">
                    <div class="icon-private"></div>
                  </div>
                  <div class="wp-text">
                    <p class="title">Riêng tư</p>
                    <p class="text-public">
                      Chỉ thành viên mới thấy mọi người trong nhóm và những gì
                      họ đăng
                    </p>
                  </div>
                </div>
              </div>
              <div class="footer-dropdown">
                <p>Tìm hiểu thêm về <span>quyền riêng tư trong nhóm</span></p>
              </div>
            </div>
          </div>
          <p v-if="statusPrivate" class="text-red-500 text-xs ml-2">
            Chọn mức độ riêng tư cho nhóm của bạn
          </p>
          <!-- search frend -->
          <!-- <div class="wp-search-frends">
            <div class="wp-frend-add">
              <div class="item-frend">
                <div class="wp-avatar">
                  <img :src="luffy" alt="" class="avatar" />
                </div>
                <p class="">hello</p>
                <div class="close-frend"></div>
              </div>
            </div>
            <input
              type="text"
              placeholder="Mời bạn bè"
              @focus="onFocus"
              @focusout="onFocusout"
            /> -->
          <!-- list frend
            <div v-if="popupUser" class="wp-list-frends">
              <div class="list-frends">
                <div class="item-frends" @click="handelePush">
                  <div class="wp-avatar">
                    <img :src="luffy" alt="" class="avatar" />
                  </div>
                  <div class="wp-text">
                    <p class="name-frend">Vân Vũ</p>
                    <p class="frend-common">10 bạn chung</p>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
      <div class="footer-form">
        <button
          class="create-ground"
          :class="{ 'btn-blue': !statusNameGruop && !starusButton }"
          @click="submitGround"
        >
          Tạo
        </button>
      </div>
    </div>
    <div class="container-main">
      <div class="wp-main-groups">
        <div class="m-5">
          <div class="main-groups-title">
            <p class="groups-title">Desktop preview</p>
            <div class="wp-preview">
              <div
                class="flex items-center justify-center w-9 h-9 rounded-full"
              >
                <div class="desktop"></div>
              </div>
              <div
                class="flex items-center justify-center w-9 h-9 rounded-full"
              >
                <div class="mobile"></div>
              </div>
            </div>
          </div>
          <div class="container-preview">
            <div class="wp-group-preview">
              <div class="wp-infor-preview">
                <div class="wp-img-group">
                  <img :src="imgGroup" alt="" />
                </div>
                <div class="wp-group">
                  <div class="wp-infor-name">
                    <p v-if="dataGroups.nameGroups" class="name-group">
                      {{ dataGroups.nameGroups }}
                    </p>
                    <p v-else class="name-group">Group - name</p>
                    <div class="wp-privacy">
                      <div class="icon-privacy"></div>
                      <p class="">
                        Group privacy
                        <span class="">1 member</span>
                      </p>
                    </div>
                  </div>
                  <div class="wp-nav-groups">
                    <p>Giới thiệu</p>
                    <p>Bài viết</p>
                    <p>Thành viên</p>
                    <p>Sự kiện</p>
                  </div>
                </div>
              </div>
              <div class="container-preview-footer">
                <div class="wp-preview">
                  <div class="wp-left-footer-ground">
                    <div class="wp-search-mind">
                      <div class="wp-avatar">
                        <!-- <img src="" alt="" class="avatar" /> -->
                        <div class="avatar"></div>
                      </div>
                      <div class="wp-mind-search">
                        <input type="text" placeholder="Bạn đang nghĩ gì?" />
                      </div>
                    </div>
                    <div class="list-ground-feature">
                      <div class="wp-feature-img">
                        <div class="icon-img icon-feature"></div>
                        <p class="text-feature">Ảnh/video</p>
                      </div>
                      <div class="wp-feature-img">
                        <div class="icon-tag icon-feature"></div>
                        <p class="text-feature">Gắn thẻ người khác</p>
                      </div>
                      <div class="wp-feature-img">
                        <div class="icon-feeling icon-feature"></div>
                        <p class="text-feature">Feeling/activity</p>
                      </div>
                    </div>
                  </div>
                  <div class="wp-right-feature">
                    <p class="intro-gruops">Giới thiệu</p>
                    <div class="list-privacy">
                      <div
                        v-if="dataGroups.privace === 'Public'"
                        class="item-privacy"
                      >
                        <div class="icon-privacy"></div>
                        <div class="privacy-text">
                          <h1 class="">Public</h1>
                          <p class="">
                            Mọi người có thể xem nhóm và bài đăng của bạn
                          </p>
                        </div>
                      </div>
                      <div
                        v-if="dataGroups.privace === 'Private'"
                        class="item-privacy"
                      >
                        <div class="icon-private"></div>
                        <div class="privacy-text">
                          <h1 class="">Private</h1>
                          <p class="">
                            Chỉ thành viên mới có thể thấy ai trong nhóm và nội
                            dung họ đăng.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RepositoryFactory } from '../../apiConfig/RepositoryFactory'
import luffy from '../../assets/img/lufyNgo.jpg'
import imgGroup from '../../assets/img/imgGroups.png'
const groupsApi = RepositoryFactory.get('groupsRepository')
export default {
  data() {
    return {
      luffy,
      isPopupPrivate: false,
      popupUser: false,
      statusPrivate: false,
      statusNameGruop: false,
      starusButton: false,
      statusFocus: false,
      imgGroup,
      currenUser: null,
      dataGroups: {
        nameGroups: '',
        privace: '',
        adminId: null,
      },
    }
  },
  watch: {
    dataGroups: {
      handler: function (newVal) {
        if (this.statusFocus) {
          if (newVal.nameGroups) {
            this.statusNameGruop = false
          } else {
            this.statusNameGruop = true
          }
        }
      },
      deep: true,
    },
    '$store.state.authModule.user': {
      handler(val) {
        this.currenUser = val
        this.dataGroups.adminId = val.user_id
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    popupPrivate() {
      this.isPopupPrivate = !this.isPopupPrivate
    },
    onFocus() {
      this.popupUser = true
    },
    onFocusout() {
      this.popupUser = false
    },
    handlePrivace(privace) {
      this.dataGroups.privace = privace
      this.statusPrivate = false
    },
    handelePush() {
      console.log('hello')
    },
    async submitGround() {
      if (!this.dataGroups.nameGroups || !this.dataGroups.privace) {
        if (!this.dataGroups.nameGroups) {
          this.statusNameGruop = true
        }
        if (!this.dataGroups.privace) {
          this.statusPrivate = true
        }
        return
      }
      this.statusPrivate = false

      try {
        const response = await groupsApi.createGroups(this.dataGroups)
        this.$router.push(`/groups/${response.data.newGroupPage}`)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container-create-groups {
  position: relative;
  background-color: #f0f2f5;
  width: 100%;
  height: 100vh;
  .wp-sidebar-form {
    position: fixed;
    top: 56px;
    left: 0px;
    bottom: 0px;
    width: 360px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    padding: 8px;
    .wp-title-create {
      padding: 12px 8px;
      border-bottom: 1px solid #ced0d4;
    }
    .wp-form-group {
      overflow-y: scroll;
      height: 100%;
      .infor-admin {
        display: flex;
        gap: 12px;
        margin: 12px 8px;
        align-items: center;
        .wp-avatar {
          width: 36px;
          height: 36px;
          overflow: hidden;
          border-radius: 50%;
          .avatar {
            width: 36px;
            height: 36px;
            object-fit: cover;
          }
        }
        .wp-infor {
          .name-user {
            font-weight: 600;
          }
          .role {
            font-size: 14px;
            opacity: 0.7;
          }
        }
      }
      .wp-from {
        padding: 16px 0;
        width: 100%;
        .wp-name-group {
          width: 90%;
          margin: 6px;
          padding: 16px 16px 10px 16px;
          border: 1px solid #ced0d4;
          border-radius: 10px;
          input {
            outline: none;
            width: 100%;
          }
        }
        .wp-privacy {
          width: 90%;
          margin: 16px 6px;
          padding: 16px 16px 10px 16px;
          border: 1px solid #ced0d4;
          border-radius: 10px;
          position: relative;
          .privace {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .dropdown {
              background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/mXNAp7NN6zb.png);
              background-position: -72px -172px;
              background-size: 190px 200px;
              width: 16px;
              height: 16px;
              background-repeat: no-repeat;
              display: inline-block;
            }
          }
          .wp-choose-privacy {
            position: absolute;
            bottom: -200px;
            left: 0px;
            width: 100%;
            border: 1px solid #ced0d4;
            background-color: white;
            border-radius: 10px;
            padding: 8px;
            z-index: 10;
            .wp-data {
              display: flex;
              flex-direction: column;

              .wp-public {
                display: flex;
                gap: 16px;
                padding: 6px;
                border-radius: 10px;
                cursor: pointer;
                &:hover {
                  background-color: #f6f5f5;
                }
                .wp-icon {
                  width: 36px;
                  height: 36px;
                  border-radius: 50%;
                  background-color: #ececec;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  .icon-public {
                    background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/vNYFgUS1WBL.png);
                    background-position: 0px -136px;
                    background-size: 26px 326px;
                    width: 20px;
                    height: 20px;
                    background-repeat: no-repeat;
                    display: inline-block;
                  }
                  .icon-private {
                    background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/vNYFgUS1WBL.png);
                    background-position: 0px -246px;
                    background-size: 26px 326px;
                    width: 20px;
                    height: 20px;
                    background-repeat: no-repeat;
                    display: inline-block;
                  }
                }
                .wp-text {
                  width: 220px;
                  .title {
                    font-weight: 600;
                  }
                  .text-public {
                    font-size: 12px;
                  }
                }
              }
            }
            .footer-dropdown {
              width: 100%;
              height: 40px;
              border-top: 1px solid #ced0d4;
              p {
                line-height: 40px;
                font-size: 12px;
                span {
                  color: #77a7ff;
                }
              }
            }
          }
        }
        .wp-search-frends {
          width: 90%;
          margin: 6px;
          padding: 16px 16px 10px 16px;
          border: 1px solid #ced0d4;
          border-radius: 10px;
          position: relative;
          .wp-frend-add {
            display: flex;
            gap: 5px;
            flex-wrap: wrap;
            margin-bottom: 10px;
            .item-frend {
              background-color: #e7f3ff;
              border-radius: 5px;
              padding: 6px 10px;
              font-size: 15px;
              color: #0973ee;
              display: flex;
              align-items: center;
              gap: 5px;
              font-weight: 600;
              .wp-avatar {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                overflow: hidden;
                .avatar {
                  width: 24px;
                  height: 24px;
                  border-radius: 50%;
                  object-fit: cover;
                }
              }
              .close-frend {
                background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yN/r/nML6birD3vd.png);
                background-position: -54px -172px;
                background-size: 190px 200px;
                width: 12px;
                height: 12px;
                background-repeat: no-repeat;
                display: inline-block;
                filter: hue-rotate(202deg);
                -webkit-filter: invert(39%) sepia(57%) saturate(200%)
                  saturate(200%) saturate(200%) saturate(200%) saturate(200%)
                  saturate(147.75%) hue-rotate(202deg) brightness(97%)
                  contrast(96%);
              }
            }
          }
          input {
            outline: none;
          }
          .wp-list-frends {
            position: absolute;
            overflow: hidden;
            border-radius: 8px;
            border: 1px solid #ced0d4;
            width: 100%;
            height: 250px;
            top: 50px;
            left: 0;
            background-color: white;
            padding: 8px;
            box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
            .list-frends {
              overflow-y: scroll;
              display: flex;
              flex-direction: column;

              .item-frends {
                padding: 6px;
                display: flex;
                width: 90%;
                gap: 5px;
                .wp-avatar {
                  width: 40px;
                  height: 40px;
                  overflow: hidden;
                  border-radius: 50%;
                  margin: 4px;
                  .avatar {
                    width: 40px;
                    height: 40px;
                    object-fit: cover;
                  }
                }
                .wp-text {
                  .name-frend {
                    font-size: 15px;
                    font-weight: 600;
                  }
                  .frend-common {
                    font-size: 13px;
                    opacity: 0.7;
                  }
                }
              }
            }
          }
        }
      }
    }
    .footer-form {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 360px;
      padding: 16px;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      background-color: white;
      .create-ground {
        width: 100%;
        background-color: #e4e6eb;
        border-radius: 8px;
        height: 36px;
        font-size: 15px;
        font-weight: 600;
      }
      .btn-blue {
        background-color: #0973ee;
        color: white;
      }
    }
  }
  .container-main {
    margin-left: 360px;
    padding: 34px;

    .wp-main-groups {
      border-radius: 10px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
      background-color: #ffffff;
      overflow: hidden;
      .main-groups-title {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .groups-title {
          font-weight: 600;
        }
        .wp-preview {
          display: flex;
          align-items: center;
          gap: 10px;

          .desktop {
            background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/0_etHRYkr4X.png);
            background-position: -52px -664px;
            background-size: 222px 690px;
            width: 20px;
            height: 20px;
            background-repeat: no-repeat;
            display: inline-block;
          }
          .mobile {
            background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yo/r/e_KhNRim90q.png);
            background-position: 0px -284px;
            background-size: 34px 620px;
            width: 20px;
            height: 20px;
            background-repeat: no-repeat;
            display: inline-block;
          }
        }
      }
      .container-preview {
        width: 100%;
        height: 70vh;
        border: 1px solid #e5e5e5;
        border-radius: 10px;
        overflow: hidden;
        .wp-group-preview {
          overflow-y: scroll;
          width: 100%;
          height: 100%;
          .wp-infor-preview {
            width: 100%;
            .wp-img-group {
              width: 100%;
              overflow: hidden;
              border-radius: 10px;
              img {
                width: 100%;
                -webkit-filter: grayscale(1);
                filter: grayscale(1);
              }
            }
            .wp-group {
              padding: 30px 20px;
              .wp-infor-name {
                border-bottom: 1px solid #e5e5e5;
                padding-bottom: 20px;
                .name-group {
                  font-weight: 700;
                  font-size: 26px;
                  opacity: 0.5;
                }
                .wp-privacy {
                  opacity: 0.8;
                }
              }
              .wp-nav-groups {
                display: flex;
                gap: 30px;
                align-items: center;
                padding: 24px 14px 0px 14px;
                font-size: 15px;
                font-weight: 600;
              }
            }
          }
          .container-preview-footer {
            background-color: #f0f2f5;
            width: 100%;
            padding: 16px;
            .wp-preview {
              display: flex;
              gap: 16px;

              .wp-left-footer-ground {
                min-width: 58.33%;
                display: flex;
                flex-direction: column;
                background-color: #f9f9f9;
                border-radius: 16px;
                padding: 12px 20px;
                box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
                height: 118px;
                .wp-search-mind {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  gap: 10px;
                  .wp-avatar {
                    width: 32px;
                    height: 32px;
                    border-radius: 16px;
                    overflow: hidden;

                    .avatar {
                      object-fit: cover;
                      background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yo/r/e_KhNRim90q.png);
                      background-position: 0px 0px;
                      background-size: 34px 620px;
                      width: 32px;
                      height: 32px;
                      background-repeat: no-repeat;
                      display: inline-block;
                    }
                  }
                  .wp-mind-search {
                    height: 40px;
                    width: 90%;
                    padding: 8px 12px;
                    border-radius: 30px;
                    background-color: #f3f3f3;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    input {
                      outline: none;
                      width: 100%;
                    }
                  }
                }
                .list-ground-feature {
                  margin-top: 20px;
                  display: flex;
                  align-items: center;
                  justify-content: space-around;
                  .wp-feature-img {
                    display: flex;
                    align-items: center;
                    padding: 8px;
                    gap: 8px;
                    .icon-feature {
                      background-image: url(../../assets/img/icon_groups.png);
                      width: 25px;
                      height: 25px;
                      background-repeat: no-repeat;
                      display: inline-block;
                      -webkit-filter: grayscale(1);
                      filter: grayscale(1);
                    }
                    .icon-img {
                      background-position: 0px -52px;
                      background-size: 26px 74px;
                    }
                    .icon-tag {
                      background-position: 0px -26px;
                      background-size: 26px 74px;
                    }
                    .icon-feeling {
                      background-position: 0px 0px;
                      background-size: 26px 74px;
                    }
                    .text-feature {
                      font-weight: 600;
                      color: #65676b;
                      font-size: 14px;
                      opacity: 0.7;
                    }
                  }
                }
              }
              .wp-right-feature {
                padding: 20px 16px;
                background-color: white;
                border-radius: 10px;
                box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
                min-width: 41.67%;
                .intro-gruops {
                  font-size: 18px;
                  font-weight: 600;
                }
                .list-privacy {
                  display: flex;
                  flex-direction: column;
                  gap: 10px;
                  .item-privacy {
                    display: flex;

                    .icon-privacy {
                      width: 16.66%;
                      background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yp/r/ZHdmGFbuTly.png);
                      background-position: 0px -1336px;
                      background-size: 34px 1444px;
                      width: 16px;
                      height: 16px;
                      background-repeat: no-repeat;
                      display: inline-block;
                      margin: 8px 12px 8px 0;
                    }
                    .icon-private {
                      background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/B-_iwqpDSw7.png);
                      background-position: 0px -472px;
                      background-size: 26px 532px;
                      width: 16px;
                      height: 16px;
                      background-repeat: no-repeat;
                      display: inline-block;
                      margin: 8px 12px 8px 0;
                    }

                    .privacy-text {
                      width: 83.33%;
                      h1 {
                        font-size: 18px;
                        font-weight: 600;
                      }
                      .p {
                        font-size: 14px;
                      }
                    }
                  }
                }
              }
            }
            @media only screen and (max-width: 1280px) {
              .wp-preview {
                flex-wrap: wrap-reverse;
                justify-content: center;
                align-items: center;
                .wp-right-feature {
                  min-width: 90%;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
