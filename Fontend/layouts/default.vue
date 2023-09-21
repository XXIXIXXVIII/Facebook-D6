<template>
  <div>
    <header-vue />
    <div class="mt-14">
      <nuxt />
    </div>
  </div>
</template>

<script>
import HeaderVue from '../components/header/HeaderVue.vue'
export default {
  name: 'DefaultLayout',
  components: [HeaderVue],
}
</script>
