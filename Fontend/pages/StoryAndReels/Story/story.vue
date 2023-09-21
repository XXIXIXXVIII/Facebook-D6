<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="container-story">
    <div class="sidebar-story">
      <div class="wp-title">
        <h1 class="title-story">Stories</h1>
        <nuxt-link to="/watch/:id" class="archive">Archive</nuxt-link>
      </div>
      <div class="wp-your-story">
        <h1 class="title-stories">Your story</h1>
        <div class="wp-create-story">
          <nuxt-link to="/StoryAndReels/CreateStory" class="wp-icon-story">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div v-html="createStoryBlue"></div>
          </nuxt-link>
          <div class="wp-create-story-text">
            <p class="font-semibold text-sm">Create a story</p>
            <p class="text-xs">Share a photo or write something</p>
          </div>
        </div>
      </div>
      <div class="wp-title-allStory">
        <h1 class="text-[18px] font-semibold">All stories</h1>
        <div class="list-stories">
          <div
            v-for="item in dataStory"
            :key="item.story_id"
            class="item-stories"
            :style="{
              backgroundColor: item.story_id === idStory ? '#f0f2f5' : '',
            }"
            @click="changeStory(item.story_id)"
          >
            <div class="wp-user-story">
              <img :src="item.avatar" alt="" class="img-user" />
            </div>
            <div class="wp-infor">
              <p class="font-semibold text-sm">{{ item.fullName }}</p>
              <p class="text-sm"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-story">
      <div class="display-story">
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
        <div class="center-story">
          <div class="wp-story-user">
            <!-- <div class="timer-story">
              <div :class="{ 'run-timer': statusRunTime }"></div>
            </div> -->
            <div class="wp-infor">
              <div class="wp-avarta-story">
                <img :src="currentStory.avatar" alt="" class="avarta" />
              </div>
              <div class="name-user">{{ currentStory.fullName }}</div>
            </div>
          </div>
          <img :src="currentStory.background" alt="" class="story-curren" />
          <div class="wp-content">
            <p
              :style="{
                fontFamily: currentStory.font,
                color: currentStory.color_text,
              }"
            >
              {{ currentStory.content }}
            </p>
          </div>
          <!-- comment user -->
          <div v-if="statusComment" class="container-comment">
            <div class="h-[20%]"></div>
            <div class="wp-comment">
              <div class="wp-comment-title">
                <p class="leading-[50px]">Bình luận</p>
                <div
                  class="closer-comment"
                  @click="handleComment"
                  v-html="closer"
                ></div>
              </div>
              <div class="body-comment">
                <div class="user-comment">
                  <div class="user-avatar">
                    <img :src="currentUser.avarta" alt="" class="avatar" />
                  </div>
                  <div class="content-comment">
                    <p class="namme-user">Vũ Văn Mạnh</p>
                    <p class="commen-user">M về à</p>
                  </div>
                </div>
              </div>
              <div class="footer-comment">
                <div class="wp-avatar">
                  <img
                    :src="currentUser.avatar"
                    alt=""
                    class="avatar-current-user"
                  />
                </div>
                <div class="wp-input">
                  <input type="text" placeholder="Viết bình luận..." />
                  <div class="post-comment"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="wp-btn">
          <div
            v-if="statusNext"
            class="wp-btn-item"
            @click="handleNext(currentStory.story_id)"
          >
            <button class="right-btn">
              <span v-html="btnRight"></span>
            </button>
          </div>
        </div>
      </div>
      <div v-if="!statusComment" class="wp-comment-story">
        <div class="wp-comment" @click="handleComment">
          <div class="" v-html="comment"></div>
          <p>comment</p>
        </div>
        <div class="list-icon">
          <img
            v-for="item in animatedIconLikePost"
            :key="item.id"
            v-tippy="{ animateFill: false, animation: 'shift-toward' }"
            :content="item.name"
            :src="item.icon"
            alt=""
            class="w-10 h-10 icon-facebock-story"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createStoryBlue } from '../../../assets/img/svg'
import { animatedIconLikePost } from '../../../utils/createPost/iconLikePost.js'
import { storyMixin } from '../../../mixin/storyMixin'

export default {
  mixins: [storyMixin],
  data() {
    return {
      animatedIconLikePost,
      createStoryBlue,
      // statusRunTime: false,
    }
  },

  methods: {
    changeStory(id) {
      console.log(id)
      this.idStory = id
      this.indexStory = this.dataStory.findIndex((item) => item.story_id === id)
      if (this.indexStory === 0) {
        this.statusPrevious = false
      } else {
        this.statusPrevious = true
      }
      if (this.indexStory === this.dataStory.length - 1) {
        this.statusNext = false
      } else {
        this.statusNext = true
      }
      this.currentStory = this.dataStory.find((item) => item.story_id === id)
    },
    handleComment() {
      console.log('first')
      this.statusComment = !this.statusComment
    },
  },
}
</script>

<style scoped lang="scss">
.container-story {
  position: relative;
  .sidebar-story {
    position: fixed;
    height: 100%;
    width: 360px;
    overflow: scroll;
    padding: 12px 16px;
    top: 56px;
    bottom: 0;
    left: 0;
    height: 100vh;
    .wp-title {
      .title-story {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 12px;
        line-height: 32px;
      }
      .archive {
        color: #1876f3;
      }
    }
    .wp-your-story {
      margin-top: 20px;
      margin-bottom: 4px;
      .title-stories {
        font-size: 18px;
        font-weight: 600;
      }
      .wp-create-story {
        padding: 8px 0;
        margin: 2px;
        display: flex;
        align-items: center;
        gap: 10px;
        .wp-icon-story {
          width: 60px;
          height: 60px;
          background-color: #f0f2f5;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
      }
    }
    .wp-title-allStory {
      margin-top: 20px;
      .list-stories {
        margin-top: 8px;
        display: flex;
        flex-direction: column;
        .item-stories {
          display: flex;
          gap: 10px;
          border-radius: 10px;
          padding: 8px;
          align-items: center;
          cursor: pointer;
          &:hover {
            background-color: #f0f2f5;
          }
          .wp-user-story {
            border-radius: 50%;
            border: 3px solid #ced0d4;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 60px;
            height: 60px;
            .img-user {
              width: 50px;
              height: 50px;
              object-fit: cover;
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
  .content-story {
    margin-left: 360px;
    background-color: #000000;
    position: relative;
    height: 100vh;
    .display-story {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
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
      .wp-copy-btn {
        width: 48px;
        height: 48px;
        margin: 20px;
      }
      .center-story {
        position: relative;
        width: 300px;
        height: 525px;
        overflow: hidden;
        border-radius: 8px;
        margin: 10px;
        display: flex;

        .story-curren {
          width: 100%;
          object-fit: cover;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .wp-content {
          position: absolute;
          left: calc(50% - 100px);
          width: 70%;
          font-size: 20px;
          font-weight: 600;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .wp-story-user {
          position: absolute;
          top: 0;
          width: 100%;
          z-index: 10;
          padding: 12px;

          .timer-story {
            width: 100%;
            height: 6px;
            border-radius: 4px;
            background-color: rgba(255, 255, 255, 0.5);

            .run-timer {
              height: 100%;
              background-color: white;
              border-radius: 4px;
              animation: growth linear 2.2s;
            }
            @keyframes growth {
              from {
                width: 0px;
              }
              to {
                width: 100%;
              }
            }
          }
          .wp-infor {
            display: flex;
            align-items: center;
            gap: 10px;
            .wp-avarta-story {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              overflow: hidden;
              margin-top: 12px;
              .avarta {
                width: 40px;
                height: 40px;
                object-fit: cover;
              }
            }
            .name-user {
              margin-right: 10px;
              color: white;
              font-weight: 600;
            }
          }
        }
      }
      .container-comment {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(255, 255, 255, 0.5);
        z-index: 20;
        display: flex;
        flex-direction: column;
        .wp-comment {
          width: 100%;
          height: 80%;
          background-color: white;
          border-radius: 8px;
          .wp-comment-title {
            position: relative;
            width: 100%;
            height: 50px;
            text-align: center;
            border-bottom: 1px solid #ced0d4;
            font-size: 18px;
            font-weight: 600;
            .closer-comment {
              position: absolute;
              top: 8px;
              right: 8px;
              transform: rotate(45deg);
            }
          }
          .body-comment {
            width: 100%;
            padding: 12px 0 0 16px;
            height: 300px;
            overflow-y: scroll;
            border-bottom: 1px solid #ced0d4;
            display: flex;
            flex-direction: column;
            gap: 8px;
            .user-comment {
              display: flex;
              gap: 5px;
              .user-avatar {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                overflow: hidden;
                .avatar {
                  width: 32px;
                  height: 32px;
                  object-fit: cover;
                }
              }
              .content-comment {
                background-color: #f0f2f5;
                padding: 8px 12px;
                border-radius: 20px;
                max-width: 75%;
                .namme-user {
                  font-size: 14px;
                  font-weight: 600;
                }
              }
            }
          }
          .footer-comment {
            width: 100%;
            display: flex;
            gap: 8px;
            padding: 12px 16px;
            .wp-avatar {
              width: 32px;
              height: 32px;
              border-radius: 50%;
              overflow: hidden;
              .avatar-current-user {
                width: 32px;
                height: 32px;
                object-fit: cover;
              }
            }
            .wp-input {
              background-color: #f0f2f5;
              width: 80%;
              border-radius: 10px;
              display: flex;
              align-items: center;
              padding: 8px 12px;
              input {
                outline: none;
                width: 90%;
              }
              .post-comment {
                background-image: url(../../../assets/img/imgComment.png);
                background-position: 0px -278px;
                background-size: 26px 386px;
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
    .wp-comment-story {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px auto;
      width: 100%;
      .wp-comment {
        width: 150px;
        height: 40px;
        background-color: #4d4d4d;
        border-radius: 20px;
        display: flex;
        align-items: center;
        padding: 11px;
        color: white;
        gap: 10px;
        font-weight: 500;
        font-size: 14px;
      }
      .list-icon {
        margin-left: 5px;
        display: flex;
        gap: 2px;
        .icon-facebock-story:hover {
          transform: scale(1.4);
        }
      }
    }
  }
}
</style>
