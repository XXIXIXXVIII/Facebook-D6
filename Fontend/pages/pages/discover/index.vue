<template lang="">
  <div class="bg-[#F0F2F5] min-h-screen">
    <div class="px-[131px] py-8">
      <div class="text-2xl font-bold">Khám phá Trang</div>
      <div class="text-2xl font-bold mt-2 mb-5">Gợi ý cho bạn</div>
      <div class="grid grid-cols-3 gap-2">
        <!-- ====item====== -->



        <div v-for="(page,index) in listPages" :key="index">
          <pageItemList :page="page"/>
        </div>



        <!-- ====item====== -->
      </div>
    </div>
  </div>
</template>
<script>
import {RepositoryFactory} from '../../../apiConfig/RepositoryFactory'
import pageItemList from '../../../components/pages/pageItemList.vue'
const pagesRepository = RepositoryFactory.get('pagesRepository')
export default {
  name: 'DiscoverPage',
  components:{pageItemList},
  layout: 'layoutPage',
  data(){
    return{
      user: null,
      listPages: null
    }
  },
  watch:{
    '$store.state.authModule.user': {
      handler(val) {
        this.user = val
      },
      immediate: true,
      deep: true,
    },
  },
  created(){
    this.fetchPages()
  },

  methods:{
    async fetchPages(){
      try {
        const result = await pagesRepository.getAllPage({userId: this.user.user_id})
        this.listPages = result.data.pages  
 
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>
<style scoped lang="css">
.item {
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
}
</style>
