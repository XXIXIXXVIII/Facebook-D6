<template>
  <div>
    <HeaderVue></HeaderVue>
    <div class="flex w-full">
      <div className="max-[900px]:w-[88px] w-[357px] min-h-screen mt-14"></div>
      <div
        style="box-shadow: rgba(71, 71, 71, 0.24) 0px 3px 8px"
        class="navbar max-[900px]:hidden w-[357px] fixed mt-14 h-[655px] overflow-y-auto p-3"
      >
      <nav-save-post/>
      </div>
      <div
        class="max-[900px]:ml-[88px] max-[900px]:w-full w-[76.2%] ml-[23.8%] mt-14 h-[655px] bg-[#ebecec]"
      >
        <nuxt />
      </div>
    </div>
  </div>
</template>
<script>
import HeaderVue from '../components/header/HeaderVue.vue'
import NavSavePost from '../components/userDetail/NavSavePost.vue'
export default {
  components : {HeaderVue , NavSavePost}
}
</script>
<style>
  
</style>