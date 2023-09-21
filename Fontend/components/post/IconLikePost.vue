<template>
    <div class="flex">
      <div
        v-for="icon in animatedIconLikePost"
        :key="icon.id"
        class="w-12 h-12 flex items-center justify-center cursor-pointer"
        @click.stop="handleLike(icon)"
      >
        <img
          class="w-full h-full  object-cover hover:scale-150 transition duration-300 ease-in-out"
          :src="icon.icon"
        />
      </div>
    </div>
</template>
<script>
import { animatedIconLikePost } from '../../utils/createPost/iconLikePost'
import {RepositoryFactory} from '../../apiConfig/RepositoryFactory'
const reactionRepository = RepositoryFactory.get("likePostRepository")
export default {
  props:{
    id:{
      type:Number,
      default: 0
    }
  },
  data() {
    return {
      animatedIconLikePost,
      flag:true
    }
  },
  computed:{
    userId(){
      return this.$store.state.authModule.user?.user_id
    }
  }
  ,
  methods:{
    handleLike(icon){
      console.log(icon);
      reactionRepository.postLike({userId: this.userId, postId: this.id, type:icon.name})
      this.$emit("handleAddLike", icon)
    }
  }
}
</script>
<style lang=""></style>
