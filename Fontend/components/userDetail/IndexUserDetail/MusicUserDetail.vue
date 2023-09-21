<template>
  <div>
    <div class="w-full my-4">
      <div class="w-[1031px] m-auto">
        <div
          class="about w-[1017px] rounded-lg border border-gray-300 p-4 ml-2"
        >
          <div class="flex justify-between w-full h-[36px] mb-2">
            <div class="text-[20px] font-bold">Âm nhạc</div>
              <div
                class="w-[48px] h-[36px] bg-[#ECF3FF] flex justify-center items-center rounded-md hover:bg-[#e6eefc]"
              >
                <button class="mt-[-9px] text-black font-bold text-xl">
                  ...
                </button>
              </div>
          </div>
          <div class="mb-5">
            <button
                class="btn-active w-[110px] h-full font-semibold text-[15px] pb-[12px]"
              >
                Nghệ sĩ
            </button>
          </div>
          <div class="text-center text-[24px] text-gray-500 font-bold">
            Không có Nghệ sĩ để hiển thị
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped lang="css">
.about {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.btn-active{
  color: rgb(4, 117, 255) !important;
  border-bottom: 3px solid rgb(4, 117, 255);
}

</style>