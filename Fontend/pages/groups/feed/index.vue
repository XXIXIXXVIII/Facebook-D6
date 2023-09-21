<template>
  <div class="container-feels">
    <div class="container-main">
      <div class="wp-post-group">
        <div
          v-for="post in dataPostsGroups"
          :key="post.post_id"
          class="w-[576px] mt-4 rounded-xl bg-white border border-gray-200 shadow-xl"
        >
          <externalPost :post="post" :is-groups="isGroups" />
        </div>
      </div>
    </div>
    <div class="container-chat">
      <p class="title-join-chat">Đoạn chat mà bạn nên tham gia</p>
      <div class="wp-list-room">
        <div class="item-rom">
          <div class="wp-img">
            <div class="relative h-12">
              <div class="img-item-rom">
                <img :src="luffy" alt="" />
              </div>
              <div class="img-item-chat">
                <img
                  src="https://scontent.xx.fbcdn.net/v/t1.15752-9/311070626_1205014643680530_1668259112361737223_n.png?stp=dst-png_p100x100&_nc_cat=1&ccb=1-7&_nc_sid=58c789&_nc_ohc=-YeU58NRx0sAX8mBozy&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdQEISCuKsucrpkeAYRswTR5j1hHj6aPGLxkrkbHALxkqw&oe=6526EA87"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="wp-groups">
            <p class="name-groups">Nazari</p>
            <p class="text-[13px] opacity-70">Click to join</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { RepositoryFactory } from '../../../apiConfig/RepositoryFactory.js'
import luffy from '../../../assets/img/lufyNgo.jpg'
import externalPost from '../../../components/post/ExternalPost.vue'
// const apiPostGroup = RepositoryFactory.get('posts')
export default {
  props: {
    externalPost,
  },
  data() {
    return {
      luffy,
      dataPostsGroups: [],
      currentUser: '',
      isGroups: true,
    }
  },
  watch: {
    '$store.state.authModule.user': {
      handler(val) {
        this.currentUser = val
      },
      immediate: true,
      deep: true,
    },
  },
  // created() {
  //   this.fechPost()
  // },

  // methods: {
  //   async fechPost() {
  //     try {
  //       console.log(this.currentUser.user_id)
  //       const response = await apiPostGroup.getPostGroup(
  //         this.currentUser.user_id
  //       )
  //       console.log(response.data)
  //       this.dataPostsGroups = response.data
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   },
  // },
}
</script>

<style lang="scss" scoped>
.container-feels {
  position: relative;
  height: 100vh;
  .container-main {
    width: 65%;
    display: flex;
    justify-content: center;
    .wp-post-group {
      display: flex;
      justify-content: center;
      width: 80%;
      flex-direction: column;
      margin-top: 10px;
    }
  }
  .container-chat {
    position: fixed;
    top: 78px;
    right: 16px;
    background-color: white;
    border-radius: 8px;
    padding: 8px;
    width: 360px;
    overflow-y: auto;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

    .title-join-chat {
      font-size: 17px;
      font-weight: 600;
      margin-bottom: 4px;
      margin-left: 8px;
      margin-top: 12px;
    }
    .wp-list-room {
      display: flex;
      flex-direction: column;
      .item-rom {
        display: flex;
        // padding: 12px 8px;
        border-radius: 8px;
        gap: 10px;
        &:hover {
          background-color: #f0f2f5;
        }
        .wp-img {
          padding: 6px;
          width: 60px;
          height: 60px;
          .img-item-rom {
            position: absolute;
            width: 32px;
            height: 32px;
            top: 0px;
            right: 0;
            border-radius: 4px;
            overflow: hidden;
            img {
              width: 32px;
              height: 32px;
              object-fit: cover;
            }
          }
          .img-item-chat {
            position: absolute;
            bottom: 0px;
            left: 0px;
            width: 32px;
            height: 32px;
            border: 3px solid white;
            border-radius: 50%;
            overflow: hidden;
            background-color: white;
          }
        }
        .wp-groups {
          .name-groups {
            font-size: 15px;
            font-weight: 600;
          }
        }
      }
    }
  }
}
</style>
