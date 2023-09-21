<template lang="">
  <div class="relative">
    <div
      class="wrap w-[768px] fixed h-[640px] bg-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[52] rounded-lg"
    >
      <div
        class="h-[60px] relative text-xl font-bold flex items-center justify-center border-b border-gray-300"
      >
        Mời bạn bè
        <div
          class="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
          @click="hide"
        >
          <i
            style="
              background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/UMAvBmuqi-U.png');
              background-position: 0px -110px;
              background-size: 190px 200px;
              width: 20px;
              height: 20px;
              background-repeat: no-repeat;
              display: inline-block;
              filter: invert(30%);
            "
          ></i>
        </div>
      </div>

      <div
        class="w-full h-14 flex items-center justify-between px-4 border-b border-gray-300"
      >
        <div
          class="text-[15px] font-semibold px-3 hover:bg-slate-200 rounded-md h-9 flex items-center cursor-pointer gap-2"
        >
          Tất cả bạn bè
          <i
            style="
              background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yJ/r/cGzgMi6dLwF.png');
              background-position: 0px -182px;
              background-size: 22px 330px;
              width: 16px;
              height: 16px;
              background-repeat: no-repeat;
              display: inline-block;
              filter: invert(40%);
            "
          ></i>
        </div>
        <div
          class="text-[15px] text-[#1877F2] font-semibold px-3 hover:bg-slate-200 rounded-md h-9 flex items-center cursor-pointer"
        >
          Chọn tất cả (131)
        </div>
      </div>

      <div class="flex gap-4 ml-4">
        <div
          class="cursor-pointer rounded px-4"
          :class="{
            'hover:bg-gray-200': pickNav !== 'notInvited',
            'text-[#1876F2]': pickNav === 'notInvited',
          }"
          @click="pickNav = 'notInvited'"
        >
          <div class="h-12 py-[6px] text-[15px] font-medium flex items-center">
            Chưa mời (131)
          </div>
          <div
            v-if="pickNav === 'notInvited'"
            class="w-full border-b-[3px] border-[hsl(214,89%,52%)]"
          ></div>
        </div>
        <div
          class="cursor-pointer rounded px-4"
          :class="{
            'hover:bg-gray-200 ': pickNav !== 'selected',
            'text-[#1876F2]': pickNav === 'selected',
          }"
          @click="pickNav = 'selected'"
        >
          <div class="h-12 py-[6px] text-[15px] font-medium flex items-center">
            Đã chọn (0)
          </div>
          <div
            v-if="pickNav === 'selected'"
            class="w-full border-b-[3px] border-[hsl(214,89%,52%)]"
          ></div>
        </div>
        <div
          class="cursor-pointer rounded px-4"
          :class="{
            'hover:bg-gray-200 ': pickNav !== 'invited',
            'text-[#1876F2]': pickNav === 'invited',
          }"
          @click="pickNav = 'invited'"
        >
          <div class="h-12 py-[6px] text-[15px] font-medium flex items-center">
            Đã mời (0)
          </div>
          <div
            v-if="pickNav === 'invited'"
            class="w-full border-b-[3px] border-[hsl(214,89%,52%)]"
          ></div>
        </div>
      </div>

      <div class="w-full border-b-2 border-gray-300"></div>
      <div class="py-2 px-3 overflow-y-auto h-96">
        <div class=" pt-2">
          <InputSearch />
        </div>
        <div class="text-[#65676B] text-[13px] font-medium pt-2">
          Kết nối những mối quan hệ của bạn
        </div>
        <div class="text-[#65676B] text-[13px] ">
          Chọn bạn bè từ trang cá nhân Nguyễn Xuân Trường để mời họ theo dõi
          Trang 222222111 của bạn.
        </div>
        <div class="pt-2 h-[26rem]">
          <!-- ========= item =============== -->
          <label htmlFor="checkbox">
            <div class="px-2 flex hover:bg-gray-200 rounded-md items-center cursor-pointer justify-between">
              <div class="px-2 flex  items-center">
                <div class="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center my-2 mr-3">
                  <img class="w-full h-full object-cover" src="https://vapa.vn/wp-content/uploads/2022/12/anh-rose-blackpink-cute-010.jpg"/>
                </div>
                <div class="text-[17px] font-semibold">Roseeeee</div>
              </div>
              <div id="checkbox" class="w-4 h-4"><input class="w-full h-full" type="checkbox"/></div>
            </div>
          </label>
          <label htmlFor="checkbox">
            <div class="px-2 flex hover:bg-gray-200 rounded-md items-center cursor-pointer justify-between">
              <div class="px-2 flex  items-center">
                <div class="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center my-2 mr-3">
                  <img class="w-full h-full object-cover" src="https://vapa.vn/wp-content/uploads/2022/12/anh-rose-blackpink-cute-010.jpg"/>
                </div>
                <div class="text-[17px] font-semibold">Roseeeee</div>
              </div>
              <div id="checkbox" class="w-4 h-4"><input class="w-full h-full" type="checkbox"/></div>
            </div>
          </label>
          <label htmlFor="checkbox">
            <div class="px-2 flex hover:bg-gray-200 rounded-md items-center cursor-pointer justify-between">
              <div class="px-2 flex  items-center">
                <div class="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center my-2 mr-3">
                  <img class="w-full h-full object-cover" src="https://vapa.vn/wp-content/uploads/2022/12/anh-rose-blackpink-cute-010.jpg"/>
                </div>
                <div class="text-[17px] font-semibold">Roseeeee</div>
              </div>
              <div id="checkbox" class="w-4 h-4"><input class="w-full h-full" type="checkbox"/></div>
            </div>
          </label>
          <label htmlFor="checkbox">
            <div class="px-2 flex hover:bg-gray-200 rounded-md items-center cursor-pointer justify-between">
              <div class="px-2 flex  items-center">
                <div class="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center my-2 mr-3">
                  <img class="w-full h-full object-cover" src="https://vapa.vn/wp-content/uploads/2022/12/anh-rose-blackpink-cute-010.jpg"/>
                </div>
                <div class="text-[17px] font-semibold">Roseeeee</div>
              </div>
              <div id="checkbox" class="w-4 h-4"><input class="w-full h-full" type="checkbox"/></div>
            </div>
          </label>
          <label htmlFor="checkbox">
            <div class="px-2 flex hover:bg-gray-200 rounded-md items-center cursor-pointer justify-between">
              <div class="px-2 flex  items-center">
                <div class="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center my-2 mr-3">
                  <img class="w-full h-full object-cover" src="https://vapa.vn/wp-content/uploads/2022/12/anh-rose-blackpink-cute-010.jpg"/>
                </div>
                <div class="text-[17px] font-semibold">Roseeeee</div>
              </div>
              <div id="checkbox" class="w-4 h-4"><input class="w-full h-full" type="checkbox"/></div>
            </div>
          </label>
          <label htmlFor="checkbox">
            <div class="px-2 flex hover:bg-gray-200 rounded-md items-center cursor-pointer justify-between">
              <div class="px-2 flex  items-center">
                <div class="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center my-2 mr-3">
                  <img class="w-full h-full object-cover" src="https://vapa.vn/wp-content/uploads/2022/12/anh-rose-blackpink-cute-010.jpg"/>
                </div>
                <div class="text-[17px] font-semibold">Roseeeee</div>
              </div>
              <div id="checkbox" class="w-4 h-4"><input class="w-full h-full" type="checkbox"/></div>
            </div>
          </label>
          <label htmlFor="checkbox">
            <div class="px-2 flex hover:bg-gray-200 rounded-md items-center cursor-pointer justify-between">
              <div class="px-2 flex  items-center">
                <div class="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center my-2 mr-3">
                  <img class="w-full h-full object-cover" src="https://vapa.vn/wp-content/uploads/2022/12/anh-rose-blackpink-cute-010.jpg"/>
                </div>
                <div class="text-[17px] font-semibold">Roseeeee</div>
              </div>
              <div id="checkbox" class="w-4 h-4"><input class="w-full h-full" type="checkbox"/></div>
            </div>
          </label>
          <label htmlFor="checkbox">
            <div class="px-2 flex hover:bg-gray-200 rounded-md items-center cursor-pointer justify-between">
              <div class="px-2 flex  items-center">
                <div class="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center my-2 mr-3">
                  <img class="w-full h-full object-cover" src="https://vapa.vn/wp-content/uploads/2022/12/anh-rose-blackpink-cute-010.jpg"/>
                </div>
                <div class="text-[17px] font-semibold">Roseeeee</div>
              </div>
              <div id="checkbox" class="w-4 h-4"><input class="w-full h-full" type="checkbox"/></div>
            </div>
          </label>
          <label htmlFor="checkbox">
            <div class="px-2 flex hover:bg-gray-200 rounded-md items-center cursor-pointer justify-between">
              <div class="px-2 flex  items-center">
                <div class="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center my-2 mr-3">
                  <img class="w-full h-full object-cover" src="https://vapa.vn/wp-content/uploads/2022/12/anh-rose-blackpink-cute-010.jpg"/>
                </div>
                <div class="text-[17px] font-semibold">Roseeeee</div>
              </div>
              <div id="checkbox" class="w-4 h-4"><input class="w-full h-full" type="checkbox"/></div>
            </div>
          </label>
          <label htmlFor="checkbox">
            <div class="px-2 flex hover:bg-gray-200 rounded-md items-center cursor-pointer justify-between">
              <div class="px-2 flex  items-center">
                <div class="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center my-2 mr-3">
                  <img class="w-full h-full object-cover" src="https://vapa.vn/wp-content/uploads/2022/12/anh-rose-blackpink-cute-010.jpg"/>
                </div>
                <div class="text-[17px] font-semibold">Roseeeee</div>
              </div>
              <div id="checkbox" class="w-4 h-4"><input class="w-full h-full" type="checkbox"/></div>
            </div>
          </label>
          <label htmlFor="checkbox">
            <div class="px-2 flex hover:bg-gray-200 rounded-md items-center cursor-pointer justify-between">
              <div class="px-2 flex  items-center">
                <div class="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center my-2 mr-3">
                  <img class="w-full h-full object-cover" src="https://vapa.vn/wp-content/uploads/2022/12/anh-rose-blackpink-cute-010.jpg"/>
                </div>
                <div class="text-[17px] font-semibold">Roseeeee</div>
              </div>
              <div id="checkbox" class="w-4 h-4"><input class="w-full h-full" type="checkbox"/></div>
            </div>
          </label>
          <label htmlFor="checkbox">
            <div class="px-2 flex hover:bg-gray-200 rounded-md items-center cursor-pointer justify-between">
              <div class="px-2 flex  items-center">
                <div class="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center my-2 mr-3">
                  <img class="w-full h-full object-cover" src="https://vapa.vn/wp-content/uploads/2022/12/anh-rose-blackpink-cute-010.jpg"/>
                </div>
                <div class="text-[17px] font-semibold">Roseeeee</div>
              </div>
              <div id="checkbox" class="w-4 h-4"><input class="w-full h-full" type="checkbox"/></div>
            </div>
          </label>
          <label htmlFor="checkbox">
            <div class="px-2 flex hover:bg-gray-200 rounded-md items-center cursor-pointer justify-between">
              <div class="px-2 flex  items-center">
                <div class="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center my-2 mr-3">
                  <img class="w-full h-full object-cover" src="https://vapa.vn/wp-content/uploads/2022/12/anh-rose-blackpink-cute-010.jpg"/>
                </div>
                <div class="text-[17px] font-semibold">Roseeeee</div>
              </div>
              <div id="checkbox" class="w-4 h-4"><input class="w-full h-full" type="checkbox"/></div>
            </div>
          </label>
          <label htmlFor="checkbox">
            <div class="px-2 flex hover:bg-gray-200 rounded-md items-center cursor-pointer justify-between">
              <div class="px-2 flex  items-center">
                <div class="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center my-2 mr-3">
                  <img class="w-full h-full object-cover" src="https://vapa.vn/wp-content/uploads/2022/12/anh-rose-blackpink-cute-010.jpg"/>
                </div>
                <div class="text-[17px] font-semibold">Roseeeee</div>
              </div>
              <div id="checkbox" class="w-4 h-4"><input class="w-full h-full" type="checkbox"/></div>
            </div>
          </label>
          <!-- ========= item =============== -->
        </div>
      </div>

      <div class="w-full h-12 border-t border-gray-300 bg-white px-3 pt-4 mb-3 absolute bottom-0">
        <button class="w-full bg-[#1B74E4] rounded-md text-[15px] font-semibold h-9 text-white"> Gửi lời mời </button>
      </div>
    </div>
    <div
      class="w-screen h-screen bg-[rgba(244,244,244,0.8)] fixed z-[51]"
      @click="hide"
    ></div>
  </div>
</template>
<script>
import InputSearch from './InputSearch.vue'

export default {
  name: 'IviteFriendsLikePage',
  components: { InputSearch },
  data() {
    return {
      pickNav: 'notInvited',
    }
  },
  methods:{
    hide(){
      this.$emit("ShowHideIviteFriendsLikePage", false)
    }
  }
}
</script>
<style scoped lang="css">
.wrap {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>
