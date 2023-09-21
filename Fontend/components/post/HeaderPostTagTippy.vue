<template lang="">
  <div class="inline relative">
    <span
      class="cursor-pointer hover:underline"
      @mouseover="showInAvatar = true"
      @mouseleave="showInAvatar = false"
    >
      {{ tag.fullName }}
    </span>
<TippyAuthorVue v-if="showInAvatar" :post="tag" />
  </div>
</template>
<script>
import TippyAuthorVue from './TippyAuthor.vue'
export default {
  components: { TippyAuthorVue },
  props: {
    tag: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      showInAvatar: false,
    }
  },
}
</script>
<style lang=""></style>
