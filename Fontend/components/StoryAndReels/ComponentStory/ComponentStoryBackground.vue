<template>
  <div class="wp-background">
    <p class="opacity-50 pt-3 pl-4 pb-2">Background</p>
    <div :class="{ background: true, activeList: activeListBgr }">
      <div
        v-for="background in arrBackgrounds"
        :key="background.id"
        :class="{
          itemBackground: true,
          'active-item': background.id === currentItem,
        }"
        @click="
          selectBackground(
            background.id,
            background.background,
            background.textColor
          )
        "
      >
        <img
          v-if="isBackgroundStory"
          :src="background?.background"
          alt=""
          class="object-cover w-6 h-6 rounded-full"
        />
        <div
          v-if="isTextColor"
          :style="{ backgroundColor: background.textColor }"
          class="w-6 h-6 rounded-full"
        ></div>
      </div>
    </div>

    <div
      class="wp-icon-drop flex justify-center items-center"
      @click="activeListBgr = !activeListBgr"
    >
      <div class="icon-drop"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    arrBackgrounds: {
      type: Array,
      require: true,
    },
    isBackgroundStory: {
      type: Boolean,
      require: true,
    },
    isTextColor: {
      type: Boolean,
      require: true,
    },
  },
  data() {
    return {
      currentItem: 1,
      activeListBgr: true,
    }
  },

  methods: {
    selectBackground(id, isBackground, isTextColor) {
      this.$emit('select-background', isBackground, isTextColor)
      this.currentItem = id
    },
  },
}
</script>

<style lang="scss" scoped>
.wp-background {
  display: flex;
  flex-direction: column;
  border: 1px solid #ced0d4;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
}
.wp-icon-drop {
  background-color: white;
  padding: 12px;
  height: 40px;
  width: 100%;
  border-radius: 5px;
}
.wp-icon-drop:hover {
  background-color: #e5e7eb;
}
.icon-drop {
  background-image: url(../../../assets/img/icon-FaceBook.png);
  background-position: -108px -150px;
  background-size: 190px 182px;
  width: 16px;
  height: 16px;
  background-repeat: no-repeat;
  display: inline-block;
  right: 10px;
}
.background {
  display: flex;
  flex-wrap: wrap;
  padding-left: 12px;
}
.itemBackground {
  width: 28px;
  height: 28px;
  margin: 4px;
  border-radius: 100%;
  overflow: hidden;
}
.active-item {
  border: 3px solid #1876f2;
}
.activeList {
  height: 76px;
}
</style>
