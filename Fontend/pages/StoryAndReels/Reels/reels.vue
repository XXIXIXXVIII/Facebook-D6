<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    class="constainer-reel"
    :style="{ marginRight: statusComment ? '360px' : '' }"
  >
    <div class="wp-reels-detail">
      <div class="wp-btn">
        <div
          v-if="statusPrevious"
          class="wp-btn-item"
          @click="handlePrevious(currentStory.story_id)"
        >
          <button class="left-btn">
            <span v-html="btnLeft"></span>
          </button>
        </div>
      </div>
      <div class="wp-video">
        <div class="infor-user-reels">
          <div class="wp-header-reel">
            <div class="wp-infor-user">
              <div class="wp-avatar">
                <img :src="currentStory.avatar" alt="" class="avatar" />
              </div>
              <p class="name-user">{{ currentStory.fullName }}</p>
            </div>
            <div class="wp-control-video">
              <div
                v-if="togglePlay"
                v-tippy="{
                  content: 'Play',
                  theme: 'material',
                  placement: 'bottom',
                }"
                class="play-video control"
                @click="controlVid"
              ></div>
              <div
                v-else
                v-tippy="{
                  content: 'Pause',
                  theme: 'material',
                  placement: 'bottom',
                }"
                class="pause-video control"
                @click="controlVid"
              ></div>
              <div
                v-if="toggleVolum"
                v-tippy="{
                  content: 'UnMute',
                  theme: 'material',
                  placement: 'bottom',
                }"
                class="control volum-video--off"
                @click="controlVolum"
              ></div>
              <div
                v-else
                v-tippy="{
                  content: 'Mute',
                  theme: 'material',
                  placement: 'bottom',
                }"
                class="volum-video control"
                @click="controlVolum"
              ></div>
            </div>
          </div>
          <p class="content-reels">{{ currentStory.content }}</p>
        </div>
        <!-- video -->
        <video ref="videoReel" :src="currentStory.background" autoplay></video>
      </div>

      <div class="relative right-reels">
        <div class="wp-btn">
          <div
            v-if="statusNext"
            class="wp-btn-item"
            @click="handleNext(currentStory.story_id)"
          >
            <span v-html="btnRight"></span>
          </div>
        </div>
        <div class="list-icon">
          <div
            v-for="item in listIcon"
            :key="item.id"
            class="item-icon"
            @click="item.click(item.id, currentStory.story_id)"
          >
            <div
              class="wp-icon"
              :class="{
                activeBackgroundIcon:
                  (item.id === curenIcon && statusComment) ||
                  (statusLike && item.id === curenIcon),
              }"
            >
              <div
                :class="{
                  [item.className]: true,
                  activeIcon:
                    (item.id === curenIcon && statusComment) ||
                    (statusLike && item.id === curenIcon),
                }"
              ></div>
            </div>
            <p class="count-like">10</p>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
    <!-- tap bình luận -->
    <div v-if="statusComment" class="container-comment-reels">
      <div class="wp-comment">
        <div class="wp-curren-reels">
          <div class="wp-infor-user">
            <div class="wp-avatar">
              <img :src="currentStory.avatar" alt="" class="avatar" />
            </div>
            <p class="name-user">{{ currentStory.fullName }}</p>
          </div>
          <p class="content-reels">{{ currentStory.content }}</p>
        </div>
        <div class="list-comment-reels">
          <!-- ------------------------------------------------------------------- -->
          <div
            v-for="item in dataAllComment"
            :key="item.id"
            class="item-comment-user"
          >
            <div
              class="wp-item-comment-user"
              :class="{ reverRow: item.user_id === currentUser.user_id }"
            >
              <div class="wp-avatar">
                <img :src="item.avatar" alt="" class="avatar" />
              </div>
              <div
                class="wp-comment-user"
                :class="{ contenText: item.user_id === currentUser.user_id }"
              >
                <p class="text-sm font-semibold">{{ item.fullName }}</p>
                <p class="text-sm">{{ item.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-comment">
        <div class="user-avatar">
          <img :src="currentUser.avatar" alt="" class="avatar" />
        </div>
        <div class="wp-input-comment">
          <input
            v-model="comment"
            type="text"
            placeholder="Viết bình luận..."
          />
          <!-- tạo comment -->
          <div
            class="share-comment"
            :class="{ 'is-commen': comment !== '' }"
            @click="handleCommentApi"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RepositoryFactory } from '../../../apiConfig/RepositoryFactory.js'
import { createStoryBlue } from '../../../assets/img/svg'
import { storyMixin } from '../../../mixin/storyMixin'
const apiStory = RepositoryFactory.get('StoryAndReels')
export default {
  mixins: [storyMixin],
  data() {
    return {
      togglePlay: false,
      createStoryBlue,
      curenIcon: 0,
      statusLike: false,
      toggleVolum: false,
      comment: '',
      dataAllComment: [],
      listIcon: [
        { id: 1, className: 'icon-like', click: this.handleLike },
        { id: 2, className: 'icon-comment', click: this.handleComment },
        { id: 3, className: 'icon-share', click: this.handleShare },
      ],
    }
  },
  watch: {
    currentStory: {
      handler(val) {
        this.dataComment(val.story_id)
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    controlVolum() {
      if (this.$refs.videoReel.volume) {
        this.toggleVolum = true
        this.$refs.videoReel.volume = 0
      } else {
        this.toggleVolum = false
        this.$refs.videoReel.volume = 1
      }
    },
    controlVid() {
      if (this.$refs.videoReel.paused) {
        this.togglePlay = false
        this.$refs.videoReel.play()
      } else {
        this.togglePlay = true
        this.$refs.videoReel.pause()
      }
    },
    handleShare(id) {
      this.curenIcon = id
    },
    handleLike(id) {
      this.curenIcon = id
      this.statusLike = !this.statusLike
    },
    handleComment(id, storyId) {
      this.curenIcon = id
      this.dataComment(storyId)
      this.statusComment = !this.statusComment
    },

    async dataComment(storyId) {
      try {
        const response = await apiStory.dataComment(storyId)
        this.dataAllComment = response.data.allComments.reverse()
      } catch (error) {
        console.log(error)
      }
    },
    // tạo comment -------------------------------------------
    async handleCommentApi() {
      if (!this.comment) return
      const newComment = {
        userId: this.currentUser.user_id,
        story_id: this.currentStory.story_id,
        commentValue: this.comment,
      }
      try {
        await apiStory.postCommonet(newComment)
        this.dataComment(this.currentStory.story_id)
        this.comment = ''
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.constainer-reel {
  background-color: black;
  position: relative;
  height: 100vh;
  .wp-reels-detail {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    .wp-video {
      width: 300px;
      height: 80vh;
      overflow: hidden;
      position: relative;
      border-radius: 8px;
      margin: 20px;
      img {
        width: 300px;
        height: 100%;
        border-radius: 8px;
        object-fit: cover;
      }
      .infor-user-reels {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 15px;
        width: 100%;
        .wp-header-reel {
          display: flex;
          justify-content: space-between;
          .wp-infor-user {
            display: flex;
            gap: 10px;
            width: 70%;
            .wp-avatar {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              overflow: hidden;
              .avatar {
                width: 40px;
                object-fit: cover;
              }
            }
            .name-user {
              font-size: 16px;
              font-weight: 600;
              color: white;
            }
          }
          .wp-control-video {
            width: 30%;
            display: flex;
            gap: 5px;
            justify-content: flex-end;
            z-index: 20;
            .control {
              background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/CBzEZmbq4RG.png);
              width: 20px;
              height: 20px;
              background-repeat: no-repeat;
              display: inline-block;
              filter: invert(100%);
            }
            .pause-video {
              background-position: -22px -270px;
              background-size: 74px 408px;
            }
            .play-video {
              background-position: 0px -292px;
              background-size: 74px 408px;
            }
            .volum-video {
              background-position: 0px -160px;
              background-size: 74px 408px;
            }
            .volum-video--off {
              background-position: -22px -182px;
              background-size: 74px 408px;
            }
          }
        }
        .content-reels {
          color: white;
          font-weight: 500;
        }
      }
    }

    .wp-btn {
      width: 48px;
      height: 48px;
      margin: 20px;
      .wp-btn-item {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.6;
      }
    }
    .right-reels {
      .wp-btn-item {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.6;
      }

      .list-icon {
        position: absolute;
        display: flex;
        flex-direction: column;
        gap: 15px;
        bottom: -250px;
        left: 20px;
        .item-icon {
          .wp-icon {
            background-color: #1a1a1a;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            &:hover {
              background-color: #3a3a3a;
            }
            .icon-like {
              background-image: url(../../../assets/img/iconLike.png);
              background-position: -88px -110px;
              background-size: 190px 204px;
              width: 20px;
              height: 20px;
              background-repeat: no-repeat;
              display: inline-block;
              filter: hue-rotate(90deg);
              -webkit-filter: invert(89%) sepia(6%) hue-rotate(185deg);
            }
            .icon-comment {
              background-image: url(../../../assets//img/iconComment.png);
              background-position: 0px -420px;
              background-size: 26px 1118px;
              width: 20px;
              height: 20px;
              background-repeat: no-repeat;
              display: inline-block;
              filter: hue-rotate(90deg);
              -webkit-filter: invert(89%) sepia(6%) hue-rotate(185deg);
            }
            .icon-share {
              background-image: url(../../../assets//img/iconComment.png);
              background-position: 0px -882px;
              background-size: 26px 1118px;
              width: 20px;
              height: 20px;
              background-repeat: no-repeat;
              display: inline-block;
              filter: hue-rotate(90deg);
              -webkit-filter: invert(89%) sepia(6%) hue-rotate(185deg);
            }
            .activeIcon {
              filter: hue-rotate(90deg);
              -webkit-filter: invert(40%) sepia(52%) saturate(200%)
                saturate(200%) saturate(200%) saturate(189%) hue-rotate(191deg)
                brightness(103%) contrast(102%);
            }
          }
          .activeBackgroundIcon {
            background-color: #091b33 !important;
          }
          .count-like {
            font-size: 13px;
            font-weight: 700;
            color: white;
            margin-top: 5px;
            text-align: center;
          }
        }
      }
    }
  }
  .container-comment-reels {
    position: fixed;
    overflow-y: scroll;
    width: 360px;
    height: 100vh;
    background: white;
    top: 56px;
    right: 0;
    bottom: 0;
    .wp-comment {
      height: 100%;
      padding: 10px;
      .wp-curren-reels {
        border-bottom: 2px solid #ced0d4;
        padding: 10px;
        .wp-infor-user {
          display: flex;
          gap: 10px;
          .wp-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            .avatar {
              width: 40px;
              object-fit: cover;
            }
          }
          .name-user {
            font-size: 18px;
            font-weight: 600;
          }
        }
        .content-reels {
          margin-top: 6px;
        }
      }
      .list-comment-reels {
        margin: 25px 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        overflow: scroll;

        .item-comment-user {
          width: 100%;
          .reverRow {
            flex-direction: row-reverse;
          }
          .wp-item-comment-user {
            display: flex;
            gap: 8px;
            .wp-avatar {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              overflow: hidden;
              .avatar {
                width: 40px;
                height: 40px;
                object-fit: cover;
              }
            }
            .wp-comment-user {
              padding: 8px 12px;
              background-color: #f0f2f5;
              max-width: 75%;
              border-radius: 20px;
            }
            .contenText {
              color: white;
              background-color: #2d86ff;
            }
          }
        }
      }
    }
    .footer-comment {
      width: 360px;
      padding: 8px 16px 30px 16px;
      position: fixed;
      bottom: 0;
      right: 0;
      display: flex;
      gap: 8px;
      background-color: white;

      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        .avatar {
          width: 40px;
          height: 40px;
          object-fit: cover;
        }
      }
      .wp-input-comment {
        width: 100%;
        background-color: #f0f2f5;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 12px;
        border-radius: 10px;
        input {
          outline: none;
          font-size: 14px;
        }
        .share-comment {
          background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yh/r/w5HRkHSSN-4.png);
          background-position: 0px -278px;
          background-size: 26px 414px;
          width: 16px;
          height: 16px;
          background-repeat: no-repeat;
          display: inline-block;
        }
        .is-commen {
          filter: hue-rotate(202deg);
          -webkit-filter: invert(39%) sepia(57%) saturate(200%) saturate(200%)
            saturate(200%) saturate(200%) saturate(200%) saturate(147.75%)
            hue-rotate(202deg) brightness(97%) contrast(96%);
        }
      }
    }
  }
}
</style>
