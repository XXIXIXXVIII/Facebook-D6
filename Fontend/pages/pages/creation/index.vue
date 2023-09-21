<template lang="">
  <div class="flex w-full">
    <div v-if="loading"><Loading4 /></div>
    <div v-if="showIviteFriendsLikePage">
      <IviteFriendsLikePage
        @ShowHideIviteFriendsLikePage="handleShowIviteFriendsLikePage"
      />
    </div>
    <div className="w-[360px] min-h-screen"></div>

    <!-- ============ navBar ================ -->

    <!-- ============ navBar1 ================ -->
    <div
      v-show="step === 1"
      class="navbar w-[360px] fixed bg-white min-h-screen"
    >
      <div class="h-14 w-full header"></div>
      <div>
        <div class="mt-5 mx-4 mb-3">
          <div class="text-[13px] text-[#65676B]">
            Trang <span class="text-xs"> › </span> Tạo Trang
          </div>
          <div class="text-2xl font-bold">Tạo Trang</div>
          <div class="text-[17px] text-[#65676B] leading-[1.1765] my-[7px]">
            Trang sẽ hiển thị thông tin về bạn để mọi người tìm hiểu thêm. Hãy
            chắc chắn là Trang của bạn có mọi thông tin cần thiết nhé
          </div>
        </div>

        <div class="mt-2 px-2">
          <div class="px-2">
            <InputCreationPage
              placeholder="Tên Trang (bắt buộc)"
              :check="checkNamePage"
              @checkValue="handleCheckPageName"
              @setValue="handleSetValuePageName"
            />
            <div class="my-1">
              <span
                v-if="checkNamePage === 'wrong'"
                class="text-[hsl(350,87%,55%)] text-[12px] leading-[0] font-normal"
              >
                Tên "{{ valueNamePage }}" không hợp lệ. Nếu bạn vẫn muốn tạo
                Trang mới, chọn tên khác như "2 không chính thức".
              </span>
              <span class="text-[12px] leading-[0] font-normal text-[#65676B]"
                >Dùng tên doanh nghiệp/thương hiệu/tổ chức của bạn hoặc tên góp
                phần giải thích về Trang của bạn. Tìm hiểu thêm</span
              >
            </div>
          </div>
          <div class="px-2 mt-2">
            <div class="relative">
              <div>
                <InputCreationPage
                  placeholder="Hạng mục (bắt buộc)"
                  :check="checkCategoryPage"
                  @checkValue="handleCheckPageCategory"
                  @setValue="handleSetValueCategory"
                />
              </div>
              <!-- <div
                v-if="valueCategory"
                class="shadowCategory w-full rounded-lg p-2 bg-white absolute z-10 top-full min-h-[36px]"
              >
                <div
                  class="px-4 py-2 hover:bg-gray-200 rounded-md cursor-pointer"
                >
                  Bất động sản
                </div>
                <div
                  class="px-4 py-2 hover:bg-gray-200 rounded-md cursor-pointer"
                >
                  Nhà hàng
                </div>
              </div> -->
            </div>
            <span
              v-if="checkCategoryPage === 'wrong'"
              class="text-[hsl(350,87%,55%)] text-[12px] leading-[0] font-normal"
            >
              Trang của bạn cần có hạng mục.
            </span>
            <span class="text-[12px] leading-[0] font-normal text-[#65676B]"
              >Hãy nhập hạng mục mô tả chính xác nhất về bạn nhé.</span
            >
          </div>

          <div class="px-2 mt-2">
            <label maxlength="102" rows="3" htmlFor="describe">
              <div :class="{ WrapdivFocus: focusInput }">
                <div class="rounded-lg relative border border-[#CED0D4]">
                  <div class="w-full">
                    <span
                      class="absolute left-4"
                      :class="{
                        spanBlur: !focusInput && !describe,
                        spanFocus: focusInput || describe,
                      }"
                      >Tiểu sử (không bắt buộc)</span
                    >
                    <textarea
                      id="describe"
                      v-model="describe"
                      class="pt-[26px] px-4 pb-[10px] outline-none w-full"
                      @focus="focusInput = true"
                      @blur="handleBlur"
                    ></textarea>
                  </div>
                </div>
              </div>
            </label>
            <span class="text-[12px] leading-[0] font-normal text-[#65676B]"
              >Hãy chia sẻ đôi nét về những gì bạn làm nhé.</span
            >
          </div>
        </div>
      </div>

      <div class="w-full bottom absolute bottom-0">
        <div class="px-4 pt-4 pb-1">
          <button
            :class="{
              blurButton: checkNamePage !== 'ok' || checkCategoryPage !== 'ok',
            }"
            class="w-full h-9 flex items-center justify-center bg-[#1B74E4] text-[15px] font-semibold rounded-lg text-white hover:bg-blue-500"
            @click="step = 2"
          >
            Tạo Trang
          </button>
        </div>
        <div
          class="text-center text-[12px] leading-[1.3333] font-normal text-[#65676B] p-2 break-words"
        >
          Bằng việc tạo Trang, bạn đồng ý với
          <span class="text-[#1B74E4] hover:underline cursor-pointer"
            >Chính sách về Trang, Nhóm và Sự kiện</span
          >
        </div>
      </div>
    </div>
    <!-- ============ navBar1 ================ -->

    <!-- ============= navBar2 ===================== -->
    <div
      v-show="step === 2"
      class="navbar w-[360px] fixed bg-white min-h-screen"
    >
      <div class="h-14 w-full header"></div>
      <div class="mx-4 mt-5 mb-3">
        <div class="text-2xl font-bold">Hoàn tất quá trình thiết lập Trang</div>
        <div class="text-[17px] text-[#65676B] mt-2">
          Thành công rồi! Bạn đã tạo được
          <span class="font-medium">{{ valueNamePage }}</span
          >. Hãy bổ sung chi tiết ngay để mọi người dễ kết nối với bạn nhé.
        </div>
      </div>
      <div class="mx-4 mt-2">
        <div class="text-[17px] font-medium pt-2 mb-2">Thông tin liên hệ</div>
        <div class="my-2">
          <InputCreationPage
            placeholder="Trang web"
            :check="checkWeb"
            @checkValue="handleCheckWeb"
            @setValue="handleSetValueWeb"
          />
        </div>
        <div class="my-2">
          <InputCreationPage
            placeholder="Số điện thoại"
            :check="checkPhone"
            @checkValue="handleCheckPhone"
            @setValue="handleSetValuePhone"
          />
          <span
            v-if="checkPhone === 'wrong'"
            class="text-[hsl(350,87%,55%)] text-xs"
            >Số điện thoại đã cung cấp phải hợp lệ</span
          >
        </div>
        <div class="my-2">
          <InputCreationPage
            placeholder="Email"
            :check="checkEmail"
            @checkValue="handleCheckEmail"
            @setValue="handleSetValueEmail"
          />
        </div>

        <div class="font-semibold text-[17px] pt-2">Vị trí</div>

        <div class="my-2">
          <InputCreationPage
            placeholder="Vị trí"
            :check="checkAndress"
            @checkValue="handleCheckAndress"
            @setValue="handleSetValueAndress"
          />
        </div>
      </div>

      <div
        class="flex w-[90%] items-center justify-center gap-3 absolute bottom-3 left-1/2 -translate-x-1/2"
      >
        <button
          class="w-1/2 h-9 flex items-center justify-center bg-gray-200 text-[15px] font-semibold rounded-lg text-black hover:bg-gray-300"
          @click="step = 1"
        >
          Trước
        </button>
        <button
          :class="{
            blurButton:
              checkWeb !== 'ok' ||
              checkPhone !== 'ok' ||
              checkEmail !== 'ok' ||
              checkAndress !== 'ok',
          }"
          class="w-1/2 h-9 flex items-center justify-center bg-blue-200 text-[15px] font-semibold rounded-lg text-blue-500 hover:bg-blue-300"
          @click="step = 3"
        >
          Tiếp
        </button>
      </div>
    </div>
    <!-- ============= navBar2 ===================== -->

    <!-- ============ navBar3 =============== -->
    <div
      v-show="step === 3"
      class="navbar w-[360px] fixed bg-white min-h-screen"
    >
      <div class="h-14 w-full header"></div>
      <div class="mx-4 mt-5 mb-3">
        <div class="text-2xl font-bold">Tùy chỉnh Trang</div>
        <div class="text-[17px] text-[#65676B] mt-2">
          Ảnh đại diện của bạn là một trong những thứ đầu tiên mọi người nhìn
          thấy. Hãy thử dùng logo hoặc hình ảnh khiến họ dễ liên tưởng đến bạn.
        </div>
        <div
          class="w-full h-[150px] rounded-md flex items-center justify-center overflow-hidden mt-4 border border-gray-300 relative"
        >
          <label v-if="!avatarUrlPreview" htmlFor="avatar">
            <div
              class="flex items-center justify-center flex-col cursor-pointer"
            >
              <div
                class="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full"
              >
                <i
                  style="
                    background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/9oLIQ46ecpP.png');
                    background-position: 0px -64px;
                    background-size: 38px 122px;
                    width: 20px;
                    height: 20px;
                    background-repeat: no-repeat;
                    display: inline-block;
                  "
                ></i>
              </div>
              <div class="text-[17px] font-medium">Thêm ảnh đại diện</div>
              <div class="text-[13px] text-[#63676B]">Hoặc kéo và thả</div>
            </div>
            <input
              id="avatar"
              type="file"
              class="hidden"
              @change="handlePreviewAvatar($event)"
            />
          </label>
          <img
            v-if="avatarUrlPreview"
            class="w-full h-full object-cover"
            :src="avatarUrlPreview"
          />
          <div
            v-if="avatarUrlPreview"
            class="absolute w-10 h-10 overflow-hidden rounded-full flex items-center justify-center cursor-pointer bg-gray-200 hover:bg-gray-300 top-1 right-1"
            @click="avatarUrlPreview = null"
          >
            <i
              style="
                background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yY/r/jjfrL7PwMcp.png');
                background-position: -18px -448px;
                background-size: 38px 466px;
                width: 16px;
                height: 16px;
                background-repeat: no-repeat;
                display: inline-block;
              "
            ></i>
          </div>
        </div>

        <div
          class="w-full h-[150px] rounded-md flex items-center justify-center overflow-hidden mt-4 border border-gray-300 relative"
        >
          <label v-if="!coverImageUrlPreview" htmlFor="coverImage">
            <div
              class="flex items-center justify-center flex-col cursor-pointer"
            >
              <div
                class="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full"
              >
                <i
                  style="
                    background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/9oLIQ46ecpP.png');
                    background-position: 0px -64px;
                    background-size: 38px 122px;
                    width: 20px;
                    height: 20px;
                    background-repeat: no-repeat;
                    display: inline-block;
                  "
                ></i>
              </div>
              <div class="text-[17px] font-medium">Thêm ảnh bìa</div>
              <div class="text-[13px] text-[#63676B]">Hoặc kéo và thả</div>
            </div>
            <input
              id="coverImage"
              type="file"
              class="hidden"
              @change="handlePreviewCoverImage($event)"
            />
          </label>
          <img
            v-if="coverImageUrlPreview"
            class="w-full h-full object-cover"
            :src="coverImageUrlPreview"
          />
          <div
            v-if="coverImageUrlPreview"
            class="absolute w-10 h-10 overflow-hidden rounded-full flex items-center justify-center cursor-pointer bg-gray-200 hover:bg-gray-300 top-1 right-1"
            @click="coverImageUrlPreview = null"
          >
            <i
              style="
                background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yY/r/jjfrL7PwMcp.png');
                background-position: -18px -448px;
                background-size: 38px 466px;
                width: 16px;
                height: 16px;
                background-repeat: no-repeat;
                display: inline-block;
              "
            ></i>
          </div>
        </div>
      </div>
      <div
        class="flex w-[90%] items-center justify-center gap-3 absolute bottom-3 left-1/2 -translate-x-1/2"
      >
        <button
          class="w-1/2 h-9 flex items-center justify-center bg-gray-200 text-[15px] font-semibold rounded-lg text-black hover:bg-gray-300"
          @click="step = 2"
        >
          Trước
        </button>
        <button
          class="w-1/2 h-9 flex items-center justify-center bg-blue-200 text-[15px] font-semibold rounded-lg text-blue-500 hover:bg-blue-300"
          @click="step = 4"
        >
          Tiếp
        </button>
      </div>
    </div>
    <!-- ============ navBar3 =============== -->

    <!-- ============ navBar4 =============== -->
    <div
      v-show="step === 4"
      class="navbar w-[360px] fixed bg-white min-h-screen"
    >
      <div class="h-14 w-full header"></div>
      <div class="mx-4 mt-5 mb-3">
        <div class="text-2xl font-bold">Xây dựng đối tượng cho Trang</div>
        <div class="text-[17px] text-[#65676B] mt-2">
          Mời bạn bè kết nối với Trang để phát triển {{ valueNamePage }}.
        </div>

        <button
          class="w-full rounded-md font-medium text-[15px] bg-[#1B74E4] text-white h-9 hover:bg-blue-600 mt-4"
          @click="showIviteFriendsLikePage = true"
        >
          Mời bạn bè
        </button>
      </div>
      <div
        class="flex w-[90%] items-center justify-center gap-3 absolute bottom-3 left-1/2 -translate-x-1/2"
      >
        <button
          class="w-1/2 h-9 flex items-center justify-center bg-gray-200 text-[15px] font-semibold rounded-lg text-black hover:bg-gray-300"
          @click="step = 3"
        >
          Trước
        </button>
        <div
          class="w-1/2 h-9 flex items-center justify-center bg-blue-200 text-[15px] font-semibold rounded-lg text-blue-500 hover:bg-blue-300 cursor-pointer"
          @click="handleCreatePage"
        >
          Xong
        </div>
      </div>
    </div>

    <!-- ============ navBar4 =============== -->

    <!-- ============ navBar ================ -->

    <!-- ============preview =================== -->
    <div class="w-[calc(100vw-360px)] ml-[360px] bg-[#F0F2F5] h-screen">
      <div
        :style="`width: ${width}%`"
        class="WrapMain h-[90%] bg-white m-auto mt-14 rounded-xl"
      >
        <div class="flex items-center justify-between px-4">
          <div
            v-if="watchPcOrMobile === 'pc'"
            class="text-[15px] font-semibold my-5 pb-1"
          >
            Xem trước trên máy tính
          </div>
          <div
            v-if="watchPcOrMobile === 'mobile'"
            class="text-[15px] font-semibold my-5 pb-1"
          >
            Xem trước trên di động
          </div>
          <div class="flex items-center gap-2">
            <div
              class="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
              :style="{
                background:
                  watchPcOrMobile === 'pc' ? 'hsl(214, 89%, 52%)' : '',
              }"
              @click=";(watchPcOrMobile = 'pc'), (width = 84)"
            >
              <i
                style="
                  background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/0_etHRYkr4X.png');
                  background-position: -52px -664px;
                  background-size: 222px 690px;
                  width: 20px;
                  height: 20px;
                  background-repeat: no-repeat;
                  display: inline-block;
                "
                :style="{
                  filter:
                    watchPcOrMobile === 'pc' ? 'invert(100%)' : 'invert(0%)',
                }"
              ></i>
            </div>

            <div
              class="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
              :style="{
                background:
                  watchPcOrMobile === 'mobile' ? 'hsl(214, 89%, 52%)' : '',
              }"
              @click=";(watchPcOrMobile = 'mobile'), (width = 46)"
            >
              <i
                data-visualcompletion="css-img"
                class="x1b0d499 x1d69dk1"
                style="
                  background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/IOkwzH65arb.png');
                  background-position: 0px -284px;
                  background-size: 34px 620px;
                  width: 20px;
                  height: 20px;
                  background-repeat: no-repeat;
                  display: inline-block;
                "
                :style="{
                  filter:
                    watchPcOrMobile === 'mobile'
                      ? 'invert(100%)'
                      : 'invert(0%)',
                }"
              ></i>
            </div>
          </div>
        </div>
        <div>
          <div
            class="itemMain mx-auto w-[94.8%] h-[589.6px] bg-white rounded-lg overflow-y-auto"
          >
            <div :style="`height: ${width + 30}%`">
              <div
                class="w-full h-[50%] bg-[#F0F2F5] rounded-lg relative overflow-hidden"
              >
                <img
                  v-if="coverImageUrlPreview"
                  class="w-full h-full object-cover"
                  :src="coverImageUrlPreview"
                />
                <div
                  class="w-48 h-48 border-[5px] border-white rounded-full overflow-hidden flex items-center justify-center absolute left-1/2 -translate-x-1/2 -bottom-5"
                >
                  <img
                    v-if="avatarUrlPreview"
                    class="w-full h-full object-cover"
                    :src="avatarUrlPreview"
                  />
                  <img
                    v-if="!avatarUrlPreview"
                    class="w-full h-full object-cover"
                    src="https://scontent.fhan14-4.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=JcTGo4bFUI4AX-_yPKk&_nc_ht=scontent.fhan14-4.fna&oh=00_AfDgnUUbQKGdA9qYafyB_U9Lo0-H3bEf-IbmG9-Zzgnj3g&oe=6524BD38"
                  />
                </div>
              </div>
              <div
                v-if="!valueNamePage"
                class="font-bold text-3xl text-center mt-5 text-slate-300"
              >
                Tên Trang
              </div>
              <div
                v-if="valueNamePage"
                class="font-bold text-3xl text-center mt-5"
              >
                {{ valueNamePage }}
              </div>
              <div v-if="describe" class="text-center mt-2">{{ describe }}</div>
              <div class="w-[96%] mx-auto border-b border-gray-300 mt-6"></div>
              <div class="w-full px-6 flex items-center justify-between">
                <div
                  class="font-medium text-[#65676B] flex items-center -ml-6 py-4"
                >
                  <div
                    v-for="(nav, index) in NavPreviewPage"
                    :key="index"
                    class="flex items-center justify-center"
                  >
                    <div
                      v-if="nav.mobile || watchPcOrMobile === 'pc'"
                      class="ml-6"
                    >
                      {{ nav.title }}
                    </div>
                  </div>
                  <div class="flex items-center gap-1 ml-6">
                    Xem thêm
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      class="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6 xlup9mm x1kky2od"
                      width="16"
                      height="16"
                    >
                      <path
                        d="M10 14a1 1 0 0 1-.755-.349L5.329 9.182a1.367 1.367 0 0 1-.205-1.46A1.184 1.184 0 0 1 6.2 7h7.6a1.18 1.18 0 0 1 1.074.721 1.357 1.357 0 0 1-.2 1.457l-3.918 4.473A1 1 0 0 1 10 14z"
                        fill="#65676B"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <div
                    class="font-medium flex items-center gap-1 px-4 py-2 rounded-md bg-gray-300 opacity-30"
                  >
                    <img
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/yn/r/yDipalkSE-s.png"
                      alt=""
                      height="16"
                      width="16"
                    />
                    Theo dõi
                  </div>
                  <div
                    class="font-medium flex items-center gap-1 px-4 py-2 rounded-md bg-gray-300 opacity-30"
                  >
                    <img
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/yE/r/1z-5F6qDswz.png"
                      alt=""
                      height="16"
                      width="16"
                    />
                    Nhắn tin
                  </div>
                  <div
                    class="font-medium flex items-center justify-center w-12 h-9 rounded-md bg-gray-300 opacity-30"
                  >
                    <svg
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      width="1em"
                      height="1em"
                    >
                      <circle cx="12" cy="12" r="2.5"></circle>
                      <circle cx="19.5" cy="12" r="2.5"></circle>
                      <circle cx="4.5" cy="12" r="2.5"></circle>
                    </svg>
                  </div>
                </div>
              </div>

              <div class="w-full bg-[#F0F2F5]">
                <div
                  class="flex items-start flex-wrap w-[96%] justify-between mx-auto pb-6"
                >
                  <div
                    :style="{
                      width: watchPcOrMobile === 'pc' ? '43%' : '100%',
                    }"
                    class="shadow mt-6 bg-white rounded-lg overflow-hidden p-4"
                  >
                    <div class="font-bold text-xl">Giới thiệu</div>
                    <div class="mt-4">
                      <div class="font-medium flex items-center gap-3">
                        <i
                          style="
                            background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yY/r/jjfrL7PwMcp.png');
                            background-position: 0px -214px;
                            background-size: 38px 466px;
                            width: 20px;
                            height: 20px;
                            background-repeat: no-repeat;
                            display: inline-block;
                            filter: invert(50%);
                          "
                        ></i>
                        0 người theo dõi
                      </div>

                      <div class="font-medium flex items-center gap-3 mt-5">
                        <i
                          style="
                            background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/UMAvBmuqi-U.png');
                            background-position: -66px -110px;
                            background-size: 190px 200px;
                            width: 20px;
                            height: 20px;
                            background-repeat: no-repeat;
                            display: inline-block;
                            filter: invert(50%);
                          "
                        ></i>
                        Trang ·
                        <span
                          v-if="!valueCategory"
                          class="text-base font-normal"
                          >Hạng mục</span
                        >
                        <span
                          v-if="valueCategory"
                          class="text-base font-normal"
                          >{{ valueCategory }}</span
                        >
                      </div>

                      <div
                        v-if="valueWeb"
                        class="font-medium flex items-center gap-3 mt-5"
                      >
                        <img
                          src="https://static.xx.fbcdn.net/rsrc.php/v3/y-/r/DzX7o-tOmJ6.png"
                          alt=""
                          height="20"
                          width="20"
                          style="filter: invert(50%)"
                        />
                        <span class="text-base font-normal">{{
                          valueWeb
                        }}</span>
                      </div>

                      <div
                        v-if="valuePhone"
                        class="font-medium flex items-center gap-3 mt-5"
                      >
                        <img
                          src="https://static.xx.fbcdn.net/rsrc.php/v3/yE/r/7KDVc3hw483.png"
                          alt=""
                          height="20"
                          width="20"
                          style="filter: invert(50%)"
                        />
                        <span class="text-base font-normal">{{
                          valuePhone
                        }}</span>
                      </div>

                      <div
                        v-if="valueEmail"
                        class="font-medium flex items-center gap-3 mt-5"
                      >
                        <img
                          src="https://static.xx.fbcdn.net/rsrc.php/v3/yO/r/W4m-1QXtJyK.png"
                          alt=""
                          height="20"
                          width="20"
                          style="filter: invert(50%)"
                        />
                        <span class="text-base font-normal">{{
                          valueEmail
                        }}</span>
                      </div>
                      <div
                        v-if="valueAndress"
                        class="font-medium flex items-center gap-3 mt-5"
                      >
                        <img
                          src="https://static.xx.fbcdn.net/rsrc.php/v3/yZ/r/V632KGZoHho.png"
                          alt=""
                          height="20"
                          width="20"
                          style="filter: invert(50%)"
                        />
                        <span class="text-base font-normal">{{
                          valueAndress
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    :style="{
                      width: watchPcOrMobile === 'pc' ? '54%' : '100%',
                    }"
                    class="shadow mt-6 bg-white rounded-lg overflow-hidden p-4 flex items-center justify-between"
                  >
                    <div class="font-bold text-xl">Bài viết</div>
                    <div
                      class="font-medium flex items-center gap-2 p-2 rounded-md bg-gray-300"
                    >
                      <i
                        style="
                          background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/cm9_3hGilr0.png');
                          background-position: 0px -96px;
                          background-size: 34px 186px;
                          width: 16px;
                          height: 16px;
                          background-repeat: no-repeat;
                          display: inline-block;
                          filter: invert(50%);
                        "
                      ></i>
                      Bộ lọc
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ============preview =================== -->
  </div>
</template>
<script>
import axios from 'axios'
import Loading4 from '../../../components/alert/Load4.vue'
import InputCreationPage from '../../../components/pages/InputCreationPage'
import IviteFriendsLikePage from '../../../components/pages/IviteFriendsLikePage'
import NavPreviewPage from '../../../utils/page/CreationPage'

export default {
  name: 'CreationPage',
  components: { InputCreationPage, IviteFriendsLikePage, Loading4 },
  layout: 'headerTransparent',
  data() {
    return {
      checkNamePage: '',
      checkCategoryPage: '',
      checkWeb: '',
      checkPhone: '',
      checkEmail: '',
      checkAndress: '',

      valueNamePage: '',
      valueCategory: '',
      valueWeb: '',
      valuePhone: '',
      valueEmail: '',
      valueAndress: '',
      describe: '',

      focusInput: false,
      watchPcOrMobile: 'pc',
      width: 84,
      NavPreviewPage,
      step: 1,
      avatarUrlPreview: null,
      avatarFile: null,
      coverImgFile: null,
      coverImageUrlPreview: null,
      showIviteFriendsLikePage: false,
      loading: false,
    }
  },
  computed: {
    user() {
      return this.$store.state.authModule.user
    },
  },
  methods: {
    // =========== check=========
    handleCheckPageName(value) {
      if (value.trim().length > 1) {
        this.checkNamePage = 'ok'
      } else {
        this.checkNamePage = 'wrong'
      }
    },
    handleCheckPageCategory(value) {
      if (value.trim().length > 1) {
        this.checkCategoryPage = 'ok'
      } else {
        this.checkCategoryPage = 'wrong'
      }
    },
    handleCheckWeb(value) {
      const regex = /^[^.]*\.[^.]*$/;
  const check= regex.test(value);
      if (
        value.trim().split('.')[1]?.length > 1 &&
        value.trim().split('.')[0]?.length > 3 && check
      ) {
        this.checkWeb = 'ok'
      } else {
        this.checkWeb = 'wrong'
      }
    },
    handleCheckPhone(value) {
      const regex = /^[0-9]{8,12}$/;
  const check = regex.test(value);
      if (value.trim().length > 7 && value.trim().length < 13 && check) {
        this.checkPhone = 'ok'
      } else {
        this.checkPhone = 'wrong'
      }
    },
    handleCheckEmail(value) {
      const regex = /^[^.]*\.[^.]*$/;
  const check= regex.test(value);
      const arraySplit1 = value.trim().split('@')
      const arraySplit2 = arraySplit1[1]?.trim().split('.')
      if (
        arraySplit1[0]?.length > 1 &&
        arraySplit1[1]?.length > 1 &&
        arraySplit2[1]?.length > 1 && 
        check
      ) {
        this.checkEmail = 'ok'
      } else {
        this.checkEmail = 'wrong'
      }
    },
    handleCheckAndress(value) {
      if (value.length > 3) {
        this.checkAndress = 'ok'
      } else {
        this.checkAndress = 'wrong'
      }
    },
    // =========== check=========

    // ========setValue==============
    handleSetValuePageName(value) {
      this.valueNamePage = value
    },
    handleSetValueCategory(value) {
      this.valueCategory = value
    },
    handleSetValueWeb(value) {
      this.valueWeb = value
    },
    handleSetValuePhone(value) {
      this.valuePhone = value
    },
    handleSetValueEmail(value) {
      this.valueEmail = value
    },
    handleSetValueAndress(value) {
      this.valueAndress = value
    },
    // ========setValue==============

    handleBlur() {
      this.focusInput = false
    },

    // ======= xử lý ảnh ===========

    handlePreviewAvatar(event) {
      if (event.target.files) {
        const files = event.target.files[0]
        this.avatarFile = files
        this.avatarUrlPreview = URL.createObjectURL(files)
      }
    },

    handlePreviewCoverImage(event) {
      if (event.target.files) {
        const files = event.target.files[0]
        this.coverImgFile = files
        this.coverImageUrlPreview = URL.createObjectURL(files)
      }
    },

    // ======= xử lý ảnh ===========

    handleShowIviteFriendsLikePage(value) {
      this.showIviteFriendsLikePage = value
    },

    async handleCreatePage() {
      this.loading = true
      let avatarUrl
      let coverImgUrl
      if (this.avatarFile) {
        const formAvatar = new FormData()
        formAvatar.append('file', this.avatarFile)
        formAvatar.append('upload_preset', 'facebookImage')
        try {
          const [uploadAvatar] = await Promise.all([
            axios.post(
              'https://api.cloudinary.com/v1_1/dpztwoefq/image/upload',
              formAvatar
            ),
          ])
          avatarUrl = uploadAvatar.data.secure_url
        } catch (error) {
          console.log(errror)
        }
      }else {
        avatarUrl = 'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg'
      }

      if(this.coverImgFile){
        try {
        const formCoverImg = new FormData()
        formCoverImg.append('file', this.coverImgFile)
        formCoverImg.append('upload_preset', 'facebookImage')

        const [uploadCoverImg] = await Promise.all([
          axios.post(
            'https://api.cloudinary.com/v1_1/dpztwoefq/image/upload',
            formCoverImg
          ),
        ])

         coverImgUrl = uploadCoverImg.data.secure_url

      } catch {
        console.log('errror')
      }
      }else{
        coverImgUrl='https://img4.thuthuatphanmem.vn/uploads/2020/05/12/hinh-anh-xam-don-gian_103624444.jpg'
      }


      
      this.$store.dispatch('createPage', {
          namePage: this.valueNamePage,
          category: this.valueCategory,
          web: this.valueWeb,
          phone: this.valuePhone,
          describe: this.describe,
          avatar: avatarUrl,
          coverImg: coverImgUrl,
          userId: this.user.user_id,
          email: this.valueEmail,
          address: this.valueAndress
        })
        this.loading = false
        this.$router.push('/')
     
    },
  },
}
</script>
<style scoped lang="css">
.navbar {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.header {
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
}
.bottom {
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
}
.spanFocus {
  color: hsl(214, 89%, 52%);
  top: 10px;
  font-size: 12px;
}
.spanBlur {
  color: #65676b;
  transform: translateY(-50%);
  top: 50%;
  left: 16px;
}
.WrapdivFocus {
  padding: 2px;
  outline: 3px solid #3498db;
  border-radius: 10px;
}

.WrapMain {
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}

.itemMain {
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}
.shadow {
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}
.blurButton {
  pointer-events: none;
  opacity: 40%;
}
.shadowCategory {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}
</style>
