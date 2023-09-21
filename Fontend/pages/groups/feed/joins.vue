<template>
  <div class="container-discover">
    <div class="wp-main-discover">
      <div class="title-disscover">
        <p class="all-join">Tất cả các nhóm bạn đã tham gia</p>
        <p class="arrange">Sắp xếp</p>
      </div>
      <div class="list-groud">
        <div v-for="group in dataGroup" :key="group.groupId" class="item-groud">
          <div class="infor-groud">
            <div class="wp-avatar">
              <img
                v-if="group.coverAvatar"
                :src="group.coverAvatar"
                alt=""
                class="avatar"
              />
              <img v-else :src="imgGruop" alt="" class="avatar" />
            </div>
            <div class="wp-text-infor">
              <p class="name-groud">{{ group.groupName }}</p>
              <p class="access-groud">Lần truy cập mới nhất</p>
            </div>
          </div>
          <div class="wp-btn-join">
            <div class="join-ground">Xem nhóm</div>
            <div class="see-more">
              <div class="icon-see-more"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RepositoryFactory } from '../../../apiConfig/RepositoryFactory'
import imgGruop from '../../../assets/img/imgGroups.png'

const apiGroup = RepositoryFactory.get('groupsRepository')

export default {
  data() {
    return {
      imgGruop,
      dataGroup: [],
      userId: this.$store.getters.getUser,
    }
  },
  created() {
    this.fechDataGroud()
  },
  methods: {
    async fechDataGroud() {
      try {
        const response = await apiGroup.getJoinGroups(this.userId.user_id)
        this.dataGroup = response.data
        console.log(this.dataGroup)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container-discover {
  width: 100%;
  height: 100vh;

  .wp-main-discover {
    margin: 0 auto;
    padding: 0 64px;
    .title-disscover {
      display: flex;
      justify-content: space-between;
      padding: 20px 0;
      .all-join {
        font-size: 18px;
        font-weight: 600;
      }
      .arrange {
        color: #2e6fdb;
      }
    }
    .list-groud {
      display: grid;
      grid-template-columns: auto auto;
      gap: 12px;
      width: 100%;

      .item-groud {
        padding: 16px;
        border-radius: 10px;
        background-color: white;
        min-width: 320px;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        .infor-groud {
          display: flex;
          align-items: center;
          .wp-avatar {
            margin-right: 16px;
            width: 80px;
            height: 80px;
            border-radius: 10px;
            overflow: hidden;
            .avatar {
              width: 80px;
              height: 80px;
              border-radius: 10px;
              object-fit: cover;
            }
          }
          .wp-text-infor {
            .name-groud {
              font-weight: 600;
            }
            .access-groud {
              font-size: small;
            }
          }
        }
        .wp-btn-join {
          display: flex;
          gap: 8px;
          width: 100%;
          justify-content: space-between;
          margin-top: 16px;
          .join-ground {
            width: 88%;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background-color: #e7f3ff;
            color: #1877f2;
            border-radius: 8px;
            cursor: pointer;
            &:hover {
              background-color: #d4e3f7;
            }
          }
          .see-more {
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #e4e6eb;
            border-radius: 8px;
            width: 10%;
            .icon-see-more {
              padding: 16px auto;
              background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yN/r/nML6birD3vd.png);
              background-position: -90px -154px;
              background-size: 190px 200px;
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
}
</style>
