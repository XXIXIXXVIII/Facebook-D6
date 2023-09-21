<template lang="">
  <div>
    <div class="pl-4 pt-1 flex gap-2 my-1">
      <div class="w-8 h-8 rounded-full overflow-hidden">
        <img class="w-full h-full object-cover" :src="comment.avatar" />
      </div>
      <div class="">
        <div
          class="px-3 py-1 bg-[#F0F2F5] rounded-2xl overflow-hidden dark:bg-[#3A3B3C]"
        >
          <div class="text-[13px] font-semibold dark:text-[#E4E6EB]">
            <nuxt-link :to="`/${comment.user_id}`">{{
              comment.fullName
            }}</nuxt-link>
          </div>
          <div
            class="text-sm font-normal dark:text-[#E4E6EB]"
            v-html="comment.content"
          ></div>
        </div>
        <div class="flex">
          <div
            class="text-[#65676B] font-bold text-[11px] cursor-pointer hover:underline ml-3"
          >
            Thích
          </div>
          <div
            class="text-[#65676B] font-bold text-[11px] cursor-pointer hover:underline ml-3"
            @click="showInput = true"
          >
            Phản hồi
          </div>
          <div
            class="text-[#65676B] font-bold text-[11px] cursor-pointer hover:underline ml-3"
          >
            Chia sẻ
          </div>
          <div
            class="text-[#65676B] text-[11px] cursor-pointer hover:underline ml-3"
          >
            {{ comment.created_at }}
          </div>
        </div>
        <div
          class="ml-3 text-[#65676B] text-sm font-semibold hover:underline cursor-pointer flex items-center mt-1"
        >
          <div
            v-if="reComments?.length > 0 && !showRecomment"
            class="flex items-center gap-2"
            @click="handleShowRecomment"
          >
            <i
              style="
                background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yn/r/mMPDyvofC5V.png');
                background-position: 0px -404px;
                background-size: 26px 422px;
                width: 16px;
                height: 16px;
                background-repeat: no-repeat;
                display: inline-block;
                filter: invert(40%);
              "
            ></i>
            Xem thêm {{ reComments.length }} phản hồi
          </div>
        </div>
        <div v-if="showRecomment">
          <div v-for="(reComment, index) in reComments" :key="index">
            <RecommentDetail :re-comment="reComment" />
          </div>
        </div>
        <div v-if="showInput || showRecomment">
          <InputComment @addMess="addMess" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { RepositoryFactory } from '../../apiConfig/RepositoryFactory'
import RecommentDetail from './RecommentDetail.vue'
import InputComment from './InputComment.vue'

const postRepository = RepositoryFactory.get('posts')
export default {
  components: { RecommentDetail, InputComment },
  props: {
    comment: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      showRecomment: false,
      reComments: [],
      showInput: false,
      user: null,
    }
  },
  watch: {
    '$store.state.authModule.user': {
      handler(val) {
        this.user = val
      },
      immediate: true,
      deep: true,
    },
  },
  created() {
    this.fetchRecomment()
  },

  methods: {
    handleShowPost() {
      this.$emit('showPostDetail')
    },
    async fetchRecomment() {
      try {
        const result = await postRepository.getReComment({
          commentId: this.comment.id,
        })
        this.reComments = result.data
        console.log(result.data)
      } catch (error) {
        console.log(error)
      }
    },
    handleShowRecomment() {
      this.showRecomment = true
      this.fetchRecomment()
    },
    async addMess(value) {
      try {
        await postRepository.createReComment({
          commentId: this.comment.id,
          content: value.value,
          userId: this.user.user_id,
        })
        const reComment = {
          avatar: this.user.avatar,
          content: value.value,
          fullName: this.user.fullName,
          user_id: this.user.user_id,
        }
        this.reComments.unshift(reComment)
        this.showRecomment = true
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
<style lang=""></style>
