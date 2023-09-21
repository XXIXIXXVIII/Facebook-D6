<template>
  <div class="gap-2 w-[460px]" style="display: flex">
    <label class="wp-create-photo">
      <div class="">
        <div class="wp-conten">
          <div class="icon photo"></div>
        </div>
        <p class="font-semibold text-xs text-white">Tạo tin ảnh</p>
      </div>
      <input
        ref="file"
        type="file"
        accept="image/gif, 
      image/jpeg, image/png"
        hidden
        @change="photoFile"
      />
    </label>
    <div class="wp-create-text" @click="createTextStory">
      <div class="">
        <div class="wp-conten">
          <div class="icon text"></div>
        </div>
        <p class="font-semibold text-xs text-white">Tạo định dạng văn bản</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    preview: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {}
  },
  methods: {
    createTextStory() {
      this.$emit('open-textStory')
    },
    photoFile(e) {
      if (!e.target.files) return
      this.$emit('open-photo', e.target.files[0])
    },
  },
}
</script>

<style>
.wp-create-photo {
  width: 220px;
  height: 330px;
  border-radius: 10px;
  background-color: white;
  background-image: url(../../../assets/img/create-story.png);
  background-position: 0px 0px;
  background-size: 222px 690px;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wp-conten {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  margin: 5px auto;
}
.icon {
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  display: inline-block;
}
.photo {
  background-image: url(../../../assets/img/icon.png);
  background-position: 0px -426px;
  background-size: 42px 646px;
}
.text {
  background-image: url(../../../assets/img/icon-text.png);
  background-position: 0px -356px;
  background-size: 26px 526px;
}
.wp-create-text {
  border-radius: 10px;
  background-color: white;
  background-image: url(../../../assets/img/create-story.png);
  background-position: 0px -332px;
  background-size: 222px 690px;
  width: 220px;
  height: 330px;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
