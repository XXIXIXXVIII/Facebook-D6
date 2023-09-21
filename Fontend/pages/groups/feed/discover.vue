<template>
  <div class="container-discover">
    <div class="wp-main-discover">
      <div class="groud-popular">
        <div class="wp-groud-title">
          <div class="groud-title">
            <p class="title-ground">Nhóm phổ biến ở gần bạn</p>
            <p class="see-all">Xem tất cả</p>
          </div>
          <p class="font-popular">Nhóm phổ biến</p>
        </div>
        <div class="list-ground">
          <div
            v-for="group in dataGroup"
            :key="group.groupId"
            class="item-groud"
          >
            <div class="wp-img-groups">
              <img
                v-if="group.coverAvatar"
                :src="group.coverAvatar"
                alt=""
                class="img-groups"
              />
              <img v-else :src="imgGroups" alt="" class="img-groups" />
            </div>
            <div class="wp-infor-groud">
              <p class="name-groud">{{ group.groupName }}</p>
              <p class="coun-member"></p>
            </div>
            <div
              class="btn-join"
              @click="postJoinGroup(group.groupId, group.creator)"
            >
              Tham gia nhóm
            </div>
          </div>
        </div>
      </div>
      <div class="groud-popular">
        <div class="wp-groud-title">
          <div class="groud-title">
            <p class="title-ground-tips">Gợi ý khác</p>
          </div>
        </div>
        <div class="list-ground">
          <div class="item-groud">
            <div class="wp-img-groups">
              <img :src="luffy" alt="" class="img-groups" />
            </div>
            <div class="wp-infor-groud">
              <p class="name-groud">tên nhóm</p>
              <p class="coun-member">thời gian</p>
            </div>
            <div class="btn-join">Tham gia nhóm</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { RepositoryFactory } from '../../../apiConfig/RepositoryFactory'
import { feelMixin } from '../../../mixin/feelMixin.js'
const apiNotJoinGroups = RepositoryFactory.get('groupsRepository')
export default {
  mixins: [feelMixin],
  created() {
    this.fechDataNotJoinGroup()
  },
  methods: {
    async fechDataNotJoinGroup() {
      console.log(this.user.user_id)
      try {
        const response = await apiNotJoinGroups.getNotJoinGroups(
          this.user.user_id
        )
        this.dataGroup = response.data
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
  height: 100%;
  .wp-main-discover {
    margin: 0 auto;
    padding: 0 64px;
    .groud-popular {
      padding: 20px 0 32px 0;
      border-bottom: 1px solid #ced0d4;
      .wp-groud-title {
        .groud-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
          .title-ground-tips {
            font-weight: 700;
            font-size: 20px;
          }
          .title-ground {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 20px;
            font-weight: 600;
          }
          .see-all {
            color: #2e6fdb;
          }
        }
        .font-popular {
          opacity: 0.8;
        }
      }
      .list-ground {
        width: 100%;
        margin-top: 16px;
        display: grid;
        grid-template-columns: auto auto;
        gap: 10px;
        .item-groud {
          width: 450px;
          border-radius: 12px;
          box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
            rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
          overflow: hidden;
          background-color: white;
          .wp-img-groups {
            width: 100%;
            border-radius: 12px;

            height: 250px;
            .img-groups {
              width: 100%;
              height: 250px;
              object-fit: cover;
            }
          }

          .wp-infor-groud {
            padding: 16px;

            .name-groud {
              font-weight: 600;
            }
            .coun-member {
              font-size: 15px;
            }
          }

          .btn-join {
            width: 90%;
            height: 36px;
            background-color: #e4e6eb;
            line-height: 36px;
            text-align: center;
            border-radius: 8px;
            margin: 20px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
