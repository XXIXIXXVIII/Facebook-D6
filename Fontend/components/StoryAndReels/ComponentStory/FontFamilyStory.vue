<template>
  <label id="" class="wp-select-text">
    <div class="wp-icon-text"></div>
    <select v-model="isfontFamily" @change="emitFontFamily">
      <option
        v-for="fontFamily in arrFontFamily"
        :key="fontFamily"
        :selected="fontFamily === 'Simple'"
        :value="fontFamily"
      >
        {{ fontFamily }}
      </option>
    </select>
    <div class="icon-drop"></div>
  </label>
</template>

<script>
export default {
  name: 'FontFamilyStory',
  data() {
    return {
      // fonts: ['Simple', 'Clean', 'Casual', 'Fancy', 'Headline'],
      arrFontFamily: [
        'Arial',
        'Verdana',
        'Times New Roman',
        'Courier New',
        'Georgia',
      ],
      isfontFamily: 'Arial',
    }
  },
  methods: {
    emitFontFamily() {
      this.$emit('fontSelected', this.isfontFamily);
    },
  },
}
</script>

<style scoped>
.wp-select-text {
  position: relative;
  border-radius: 5px;
  border: 1px solid #ced0d4;
  height: 54px;
  width: 100%;
  gap: 4px;
}
select {
  width: 100%;
  outline: none;
  height: 100%;
  padding-left: 40px;
}
.wp-icon-text {
  position: absolute;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  display: inline-block;
  background-image: url(../../../assets/img/icon-text.png);
  background-position: 0px -356px;
  background-size: 26px 526px;
  top: calc(50% - 10px);
  left: 10px;
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
  position: absolute;
  bottom: calc(50% - 10px);
}
</style>
