<template>
  <div>
    <!-- ====hien nut luc dau==== -->
    <div v-if="profile && status && status === 'Myself'">
      <div
        class="mt-5 mb-2 flex gap-3 w-[569px] h-[36px]"
        @click="showForm = true"
        v-if="!showForm && profile && !profile.company && !profile.position && !profile.city"
      >
        <div>
          <i
            data-visualcompletion="css-img"
            class="x1b0d499 xi3auck"
            style="
              background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/y1/r/pA6GGzdsH2B.png');
              background-position: 0px -156px;
              background-size: 26px 258px;
              width: 24px;
              height: 24px;
              background-repeat: no-repeat;
              display: inline-block;
            "
          ></i>
        </div>
        <div class="text-[15px] font-semibold text-[#1876F2] hover:underline">
          Thêm nơi làm việc
        </div>
      </div>
    </div>
    <!-- ====hien thong tin luc da luu==== -->
    <div v-if="profile && profile.position && profile.company" class="mb-5">
      <div class="font-bold mb-4 text-[18px]">Công việc</div>
      <div class="flex justify-between">
      <div class="flex gap-3">
        <div class="justify-center flex items-center">
          <img
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yE/r/oXhO_oSl40g.png"
            alt=""
            height="24"
            width="24"
          />
        </div>
        <p>{{ profile.position }} tại <strong>{{ profile.company }}</strong></p>
      </div>
      <div class="flex gap-6" v-if="status && status === 'Myself'">
        <div class="mt-[10px]">
          <img
            class="x1b0d499 x1d69dk1"
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/_SWMQstHB2g.png"
            alt="Công khai"
            height="16"
            width="16"
          />
        </div>
        <div
          class="w-[35px] h-[35px] bg-gray-200 rounded-full flex justify-center items-center hover:bg-gray-300"
          @click="showForm=true"
        >
          <i
            data-visualcompletion="css-img"
            class="x1b0d499 xep6ejk"
            style="
              background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/CBzEZmbq4RG.png');
              background-position: -22px -226px;
              background-size: 74px 408px;
              width: 20px;
              height: 20px;
              background-repeat: no-repeat;
              display: inline-block;
            "
          ></i>
        </div>
        <div @click="removeCompany()" class="flex justify-center items-center w-[37px] h-[37px] bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
          <div class="w-5 h-5 flex items-center justify-center overflow-hidden"><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Font_Awesome_5_regular_trash-alt.svg/896px-Font_Awesome_5_regular_trash-alt.svg.png' class="w-full h-full object-cover"></div>
        </div>
      </div>
    </div>
    </div>
    <!-- nếu là người khác chưa có thông tin -->
    <div v-if="status && status !== 'Myself' && profile && !profile.position && !profile.company" class="mb-5">
      <div class="text-[18px] font-medium mb-4">Công việc</div>
      <div class="flex gap-3">
        <div class="justify-center flex items-center">
          <img
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yE/r/oXhO_oSl40g.png"
            alt=""
            height="24"
            width="24"
          />
        </div>
        <p class="font-medium text-gray-600">Không có nơi làm việc để hiển thị</p>
      </div>
    </div>
    <!-- ====hien o input de nhap thong tin==== -->
    <div v-if="showForm" class="mb-8">
      <div>
        <input
          class="inputForm w-full h-[56px] rounded-lg outline-none px-4 pt-[26px] pb-[20px] mb-3"
          type="text"
          placeholder="Công ty"
          v-model="company"
        />
        <input
          class="inputForm w-full h-[56px] rounded-lg outline-none px-4 pt-[26px] pb-[20px] mb-3"
          type="text"
          placeholder="Chức vụ"
          v-model="position"
        />
        <input
          class="inputForm w-full h-[56px] rounded-lg outline-none px-4 pt-[26px] pb-[20px] mb-3"
          type="text"
          placeholder="Thành phố/thị xã"
          v-model="city"
        />
        <input
          class="inputForm w-full h-[75px] rounded-lg outline-none px-4 pt-[26px] pb-[20px] mb-3"
          type="text"
          placeholder="Mô tả"
          v-model="description"
        />
      </div>
      <hr class="mb-[7px] border-gray-300" />
      <div class="flex justify-between">
        <div
          class="flex justify-center items-center w-[108px] h-[35px] px-3 py-2 font-semibold bg-slate-200 rounded-lg mt-2"
        >
          <div>
            <img
              class="x1b0d499 x1d69dk1"
              src="https://static.xx.fbcdn.net/rsrc.php/v3/ys/r/L39Daxsxmmw.png"
              alt="Công khai"
              height="12"
              width="12"
            />
          </div>
          <button class="px-1 font-semibold">Công khai</button>
        </div>
        <div>
          <button
            class="w-[60px] h-[40px] bg-gray-200 font-semibold rounded-lg hover:bg-gray-300"
            @click="cancelWorkplace"
          >
            Hủy
          </button>
          <button
            class="w-[60px] h-[40px] bg-blue-500 font-semibold rounded-lg text-white hover:bg-gray-300"
            :class="{
              'bg-gray-200': company === '',
              'btn-disabled': company === '',
            }"
            :disabled="company === ''"
            @click="saveWorkplace"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>

     <!-- ====hien nut luc dau của trường học==== -->
    <div v-if="profile && status && status === 'Myself'">
    <div
      class="mt-5 mb-2 flex gap-3 w-[569px] h-[36px]"
      @click="showFromSchool = true"
      v-if="!showFromSchool && profile && !profile.schoolName"
    >
      <div>
        <i
          data-visualcompletion="css-img"
          class="x1b0d499 xi3auck"
          style="
            background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/y1/r/pA6GGzdsH2B.png');
            background-position: 0px -156px;
            background-size: 26px 258px;
            width: 24px;
            height: 24px;
            background-repeat: no-repeat;
            display: inline-block;
          "
        ></i>
      </div>
      <div class="text-[15px] font-semibold text-[#1876F2] hover:underline">
        Thêm trường trung học
      </div>
    </div>
    </div>
  <!-- ====hien thong tin luc da luu của trường học==== -->
    <div v-if="profile && profile.schoolName" class="mb-5">
      <div class="font-bold mb-4 text-[18px]">Trường Trung Học</div>
      <div class="flex justify-between">
      <div class="flex gap-3">
        <div class="justify-center flex items-center">
          <img class="x1b0d499 xuo83w3" src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/tzVYBX7RQ1q.png" alt="" height="24" width="24">
        </div>
        <p>Từng học tại <strong> {{ profile.schoolName }} </strong></p>
      </div>
      <div class="flex gap-6" v-if="status && status === 'Myself'">
        <div class="mt-[10px]">
          <img
            class="x1b0d499 x1d69dk1"
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/_SWMQstHB2g.png"
            alt="Công khai"
            height="16"
            width="16"
          />
        </div>
        <div
          class="w-[35px] h-[35px] bg-gray-200 rounded-full flex justify-center items-center hover:bg-gray-300"
          @click="showFromSchool=true"
        >
          <i
            data-visualcompletion="css-img"
            class="x1b0d499 xep6ejk"
            style="
              background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/CBzEZmbq4RG.png');
              background-position: -22px -226px;
              background-size: 74px 408px;
              width: 20px;
              height: 20px;
              background-repeat: no-repeat;
              display: inline-block;
            "
          ></i>
        </div>
        <div @click="removeSchool()" class="flex justify-center items-center w-[37px] h-[37px] bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
          <div class="w-5 h-5 flex items-center justify-center overflow-hidden"><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Font_Awesome_5_regular_trash-alt.svg/896px-Font_Awesome_5_regular_trash-alt.svg.png' class="w-full h-full object-cover"></div>
        </div>
      </div>
      </div>
    </div>
    <!-- nếu chưa có thông tin trường học -->
    <div v-if="status && status !== 'Myself' && profile && !profile.schoolName" class="mb-5">
      <div class="text-[18px] font-medium mb-4">Đại học</div>
      <div class="flex gap-3">
        <div class="justify-center flex items-center">
          <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/tzVYBX7RQ1q.png" alt="" height="24" width="24">
        </div>
        <p class="font-medium text-gray-600">Không có trường học nào để hiển thị</p>
      </div>
    </div>
    <!-- ====hien o input de nhap thong tin của trường học==== -->
    <div v-if="showFromSchool" class="mb-8">
      <div>
        <input
          class="inputForm w-full h-[56px] rounded-lg outline-none px-4 pt-[26px] pb-[20px] mb-3"
          type="text"
          placeholder="Trường học"
          v-model="schoolName"
        />

        <input
          class="inputForm w-full h-[75px] rounded-lg outline-none px-4 pt-[26px] pb-[20px] mb-3"
          type="text"
          placeholder="Mô tả"
          v-model="descriptionSchool"
        />
      </div>
      <hr class="mb-[7px] border-gray-300" />
      <div class="flex justify-between">
        <div
          class="flex justify-center items-center w-[108px] h-[35px] px-3 py-2 font-semibold bg-slate-200 rounded-lg mt-2"
        >
          <div>
            <img
              class="x1b0d499 x1d69dk1"
              src="https://static.xx.fbcdn.net/rsrc.php/v3/ys/r/L39Daxsxmmw.png"
              alt="Công khai"
              height="12"
              width="12"
            />
          </div>
          <button class="px-1 font-semibold">Công khai</button>
        </div>
        <div>
          <button
            class="w-[60px] h-[40px] bg-gray-200 font-semibold rounded-lg hover:bg-gray-300"
            @click="cancelWorkSchool"
          >
            Hủy
          </button>
          <button
            class="w-[60px] h-[40px] bg-blue-500 font-semibold rounded-lg text-white hover:bg-gray-300"
            :class="{
              'bg-gray-200': schoolName === '',
              'btn-disabled': schoolName === '',
            }"
            :disabled="schoolName === ''"
            @click="saveWorkSchool"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>

 <!-- ====hien nut luc dau của đại học==== -->
   <div v-if="profile && status && status === 'Myself'">
    <div
      class="mt-5 mb-2 flex gap-3 w-[569px] h-[36px]"
      @click="showUniversity = true"
      v-if="!showUniversity && profile && !profile.university && !profile.specialized_1 && !profile.specialized_2"
    >
      <div>
        <i
          style="
            background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/y1/r/pA6GGzdsH2B.png');
            background-position: 0px -156px;
            background-size: 26px 258px;
            width: 24px;
            height: 24px;
            background-repeat: no-repeat;
            display: inline-block;
          "
        ></i>
      </div>
      <div class="text-[15px] font-semibold text-[#1876F2] hover:underline">
        Thêm trường cao đẳng/dại học
      </div>
    </div>
  </div>
  <!-- hiển thị thông tin của university -->
    <div v-if="profile && profile.university && (profile.specialized_1 || profile.specialized_2)" class="mb-5">
      <div class="font-bold mb-4 text-[18px]">Trường Đại Học</div>
      <div class="flex justify-between">
      <div class="flex gap-3">
        <div class="justify-center flex items-center">
          <img class="x1b0d499 xuo83w3" src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/tzVYBX7RQ1q.png" alt="" height="24" width="24">
        </div>
        <p>Học chuyên ngành {{ profile.specialized_1 }} tại <strong> {{ profile.university }} </strong></p>
      </div>
      <div class="flex gap-6" v-if="status && status === 'Myself'">
        <div class="mt-[10px]">
          <img
            class="x1b0d499 x1d69dk1"
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/_SWMQstHB2g.png"
            alt="Công khai"
            height="16"
            width="16"
          />
        </div>
        <div
          class="w-[35px] h-[35px] bg-gray-200 rounded-full flex justify-center items-center hover:bg-gray-300"
          @click="showUniversity = true"
        >
          <i
            data-visualcompletion="css-img"
            class="x1b0d499 xep6ejk"
            style="
              background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/CBzEZmbq4RG.png');
              background-position: -22px -226px;
              background-size: 74px 408px;
              width: 20px;
              height: 20px;
              background-repeat: no-repeat;
              display: inline-block;
            "
          ></i>
        </div>
        <div @click="removeUniversity()"  class="flex justify-center items-center w-[37px] h-[37px] bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
          <div class="w-5 h-5 flex items-center justify-center overflow-hidden"><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Font_Awesome_5_regular_trash-alt.svg/896px-Font_Awesome_5_regular_trash-alt.svg.png' class="w-full h-full object-cover"></div>
        </div>
      </div>
      </div>
    </div>
    <!-- nếu chưa có thông tin -->
    <div v-if="status && status !== 'Myself' && profile && !profile.university" class="mb-5">
      <div class="text-[18px] font-medium mb-4">Trường trung học</div>
      <div class="flex gap-3">
        <div class="justify-center flex items-center">
          <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/tzVYBX7RQ1q.png" alt="" height="24" width="24">
        </div>
        <p class="font-medium text-gray-600">Không có trường học nào để hiển thị</p>
      </div>
    </div>
    <div v-if="showUniversity" class="mb-8">
      <div>
        <input
          class="inputForm w-full h-[56px] rounded-lg outline-none px-4 pt-[26px] pb-[20px] mb-3"
          type="text"
          placeholder="Trường học"
          v-model="university"
        />

        <input
          class="inputForm w-full h-[75px] rounded-lg outline-none px-4 pt-[26px] pb-[20px] mb-3"
          type="text"
          placeholder="Mô tả"
          v-model="descriptionUniversity"
        />
      </div>
      <div>
        <p class="text-[15px] font-semibold">Chuyên nghành</p>
        <input
          class="inputForm w-full h-[56px] rounded-lg outline-none px-4 pt-[26px] pb-[20px] mb-3"
          type="text"
          placeholder="Chuyên ngành"
          v-model="specialized_1"
        />
        <input
          class="inputForm w-full h-[56px] rounded-lg outline-none px-4 pt-[26px] pb-[20px] mb-3"
          type="text"
          placeholder="Chuyên ngành"
          v-model="specialized_2"
        />
      </div>
      <hr class="mb-[7px] border-gray-300" />
      <div class="flex justify-between">
        <div
          class="flex justify-center items-center w-[108px] h-[35px] px-3 py-2 font-semibold bg-slate-200 rounded-lg mt-2"
        >
          <div>
            <img
              class="x1b0d499 x1d69dk1"
              src="https://static.xx.fbcdn.net/rsrc.php/v3/ys/r/L39Daxsxmmw.png"
              alt="Công khai"
              height="12"
              width="12"
            />
          </div>
          <button class="px-1 font-semibold">Công khai</button>
        </div>
        <div>
          <button
            class="w-[60px] h-[40px] bg-gray-200 font-semibold rounded-lg hover:bg-gray-300"
            @click="cancelUniversity"
          >
            Hủy
          </button>
          <button
            class="w-[60px] h-[40px] bg-blue-500 font-semibold rounded-lg text-white hover:bg-gray-300"
            :class="{
              'bg-gray-200': university === '' || specialized_1 === '',
              'btn-disabled': university === '' || specialized_1 === '',
            }"
            :disabled="university === '' || specialized_1 === ''"
            @click="saveUniversity"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>

    <div class="mt-3 mb-5 flex justify-between gap-3 w-full h-[36px]" v-if="status && status === 'Myself'">
      <div class="flex gap-3">
        <div class="flex justify-center items-center mt-[-13px]">
          <img
            class="x1b0d499 xuo83w3"
            src="https://static.xx.fbcdn.net/rsrc.php/v3/y4/r/HNzy6p26p_d.png"
            alt=""
            height="24"
            width="24"
          />
        </div>
        <div class="text-[15px] hover:underline">
          sống tại <strong>Hà Nội</strong>
        </div>
      </div>
      <div class="flex gap-6">
        <div class="mt-[10px]">
          <img
            class="x1b0d499 x1d69dk1"
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yT/r/JZe0NC6Um6y.png"
            alt="Chỉ mình tôi"
            height="16"
            width="16"
          />
        </div>
        <div
          class="w-[35px] h-[35px] bg-gray-200 rounded-full flex justify-center items-center hover:bg-gray-300"
        >
          <i
            data-visualcompletion="css-img"
            class="x1b0d499 xep6ejk"
            style="
              background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/CBzEZmbq4RG.png');
              background-position: -22px -226px;
              background-size: 74px 408px;
              width: 20px;
              height: 20px;
              background-repeat: no-repeat;
              display: inline-block;
            "
          ></i>
        </div>
      </div>
    </div>

    <div v-if="profile && status && status === 'Myself'">
    <div
      class="mt-5 mb-2 flex gap-3 w-[569px] h-[36px]"
      @click="showHomeTown = true"
      v-if="!showHomeTown && profile && !profile.homeTown"
    >
      <div>
        <i
          data-visualcompletion="css-img"
          class="x1b0d499 xi3auck"
          style="
            background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/y1/r/pA6GGzdsH2B.png');
            background-position: 0px -156px;
            background-size: 26px 258px;
            width: 24px;
            height: 24px;
            background-repeat: no-repeat;
            display: inline-block;
          "
        ></i>
      </div>
      <div class="text-[15px] font-semibold text-[#1876F2] hover:underline">
        Thêm quê quán
      </div>
    </div>
    </div>
    <!-- có thông tin -->
    <div v-if="profile && profile.homeTown" class="mb-5">
      <div class="font-bold mb-4 text-[18px]">Nơi sống</div>
      <div class="flex justify-between">
      <div class="flex gap-3">
        <div class="justify-center flex items-center">
          <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yy/r/9RISa0HPFnB.png" alt="" height="24" width="24" class="x1b0d499 xuo83w3">
        </div>
        <p>Đến từ <strong>{{ profile.homeTown }}</strong></p>
      </div>
      <div class="flex gap-6" v-if="status && status === 'Myself'">
        <div class="mt-[10px]">
          <img class="x1b0d499 xuo83w3" src="https://static.xx.fbcdn.net/rsrc.php/v3/yy/r/9RISa0HPFnB.png" alt="" height="24" width="24">
        </div>
        <div
          class="w-[35px] h-[35px] bg-gray-200 rounded-full flex justify-center items-center hover:bg-gray-300"
          @click="showHomeTown = true"
        >
          <i
            data-visualcompletion="css-img"
            style="
              background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/CBzEZmbq4RG.png');
              background-position: -22px -226px;
              background-size: 74px 408px;
              width: 20px;
              height: 20px;
              background-repeat: no-repeat;
              display: inline-block;
            "
          ></i>
        </div>
        <div @click="removeHomeTown()" class="flex justify-center items-center w-[37px] h-[37px] bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
          <div class="w-5 h-5 flex items-center justify-center overflow-hidden"><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Font_Awesome_5_regular_trash-alt.svg/896px-Font_Awesome_5_regular_trash-alt.svg.png' class="w-full h-full object-cover"></div>
        </div>
      </div>
    </div>
    </div>
    <!-- nếu chưa có thông tin -->
    <div v-if="status && status !== 'Myself' && profile && !profile.homeTown" class="mb-5">
      <div class="text-[18px] font-medium mb-4">Nơi từng sống</div>
      <div class="flex gap-3">
        <div class="justify-center flex items-center">
          <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yy/r/9RISa0HPFnB.png" alt="" height="24" width="24">
        </div>
        <p class="font-medium text-gray-600">Không có địa điểm nào để hiển thị</p>
      </div>
    </div>
    <div v-if="showHomeTown" class="mb-8">
      <div>
        <input
          class="inputForm w-full h-[56px] rounded-lg outline-none px-4 pt-[26px] pb-[20px] mb-3"
          type="text"
          placeholder="Quê quán"
          v-model="homeTown"
        />
      </div>
      <hr class="mb-[7px] border-gray-300" />
      <div class="flex justify-between">
        <div
          class="flex justify-center items-center w-[108px] h-[35px] px-3 py-2 font-semibold bg-slate-200 rounded-lg mt-2"
        >
          <div>
            <img
              src="https://static.xx.fbcdn.net/rsrc.php/v3/ys/r/L39Daxsxmmw.png"
              alt="Công khai"
              height="12"
              width="12"
            />
          </div>
          <button class="px-1 font-semibold">Công khai</button>
        </div>
        <div>
          <button
            class="w-[60px] h-[40px] bg-gray-200 font-semibold rounded-lg hover:bg-gray-300"
            @click="cancelHomeTown"
          >
            Hủy
          </button>
          <button
            class="w-[60px] h-[40px] bg-blue-500 font-semibold rounded-lg text-white hover:bg-gray-300"
            :class="{
              'bg-gray-200': homeTown === '',
              'btn-disabled': homeTown === '',
            }"
            :disabled="homeTown === ''"
            @click="saveHomeTown"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>

    <div v-if="profile && status && status === 'Myself'">
    <div
      class="mt-5 mb-2 flex gap-3 w-[569px] h-[36px]"
      @click="showRelationship = true"
      v-if="!showRelationship && profile && !profile.relationship"
    >
      <div>
        <i
          data-visualcompletion="css-img"
          class="x1b0d499 xi3auck"
          style="
            background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/y1/r/pA6GGzdsH2B.png');
            background-position: 0px -156px;
            background-size: 26px 258px;
            width: 24px;
            height: 24px;
            background-repeat: no-repeat;
            display: inline-block;
          "
        ></i>
      </div>
      <div class="text-[15px] font-semibold text-[#1876F2] hover:underline">
        Thêm tình trang mối quan hệ
      </div>
    </div>
  </div>
  <!-- có dữ liệu -->
    <div v-if="profile && profile.relationship" class="mb-4">
      <div class="font-bold mb-4 text-[18px]">Mối quan hệ</div>
      <div class="flex justify-between">
      <div class="flex gap-3">
        <div class="justify-center flex items-center mt-[-5px]">
          <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/GDS3B7rCUbW.png" alt="" height="24" width="24">
        </div>
        <p>{{ profile.relationship }} </p>
      </div>
      <div class="flex gap-6"  v-if="status && status === 'Myself'">
        <div class="mt-[10px]">
          <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yy/r/9RISa0HPFnB.png" alt="" height="24" width="24">
        </div>
        <div
          class="w-[35px] h-[35px] bg-gray-200 rounded-full flex justify-center items-center hover:bg-gray-300"
          @click="showRelationship = true"
        >
        <i data-visualcompletion="css-img" class="x1b0d499 xep6ejk" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/yg/r/N9cdS2nwudk.png&quot;); background-position: 0px -374px; background-size: 22px 616px; width: 20px; height: 20px; background-repeat: no-repeat; display: inline-block;"></i>
        </div>
      <div @click="removeRelationship()" class="flex justify-center items-center w-[37px] h-[37px] bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
        <div class="w-5 h-5 flex items-center justify-center overflow-hidden"><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Font_Awesome_5_regular_trash-alt.svg/896px-Font_Awesome_5_regular_trash-alt.svg.png' class="w-full h-full object-cover"></div>
      </div>
      </div>
    </div>
    </div>
    <!-- nếu không có dữ liệu -->
    <div v-if="status && status !== 'Myself' && profile && !profile.relationship" class="mb-5">
      <div class="text-[18px] font-medium mb-4">Mối quan hệ</div>
      <div class="flex gap-3">
        <div class="justify-center flex items-center">
          <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yt/r/fG0kmhRY2IE.png" alt="" height="24" width="24">
        </div>
        <p class="font-medium text-gray-600">Không có thông tin mối quan hệ nào để hiển thị</p>
      </div>
    </div>
    <div v-if="showRelationship" class="mb-8">
      <div>
        <select
          class="inputForm w-full h-[30px] rounded-lg outline-none px-4 mb-3 bg-gray-200 font-bold"
          v-model="relationship"
        >
          <option value="" disabled>Trạng thái</option>
          <option value="Độc thân">Độc thân</option>
          <option value="Hẹn hò">Hẹn hò</option>
          <option value="Đã kết hôn">Đã kết hôn</option>
          <option value="Có mối quan hệ phức tạp">
            Có mối quan hệ phức tạp
          </option>
          <option value="Đã ly hôn">Đã ly hôn</option>
        </select>
      </div>
      <hr class="mb-[7px] border-gray-300" />
      <div class="flex justify-between">
        <div
          class="flex justify-center items-center w-[108px] h-[35px] px-3 py-2 font-semibold bg-slate-200 rounded-lg mt-2"
        >
          <div>
            <img
              class="x1b0d499 x1d69dk1"
              src="https://static.xx.fbcdn.net/rsrc.php/v3/ys/r/L39Daxsxmmw.png"
              alt="Công khai"
              height="12"
              width="12"
            />
          </div>
          <button class="px-1 font-semibold">Công khai</button>
        </div>
        <div>
          <button
            class="w-[60px] h-[40px] bg-gray-200 font-semibold rounded-lg hover:bg-gray-300"
            @click="cancelRelationship"
          >
            Hủy
          </button>
          <button
            class="w-[60px] h-[40px] bg-blue-500 font-semibold rounded-lg text-white hover:bg-gray-300"
            :class="{
              'bg-gray-200': relationship === '',
              'btn-disabled': relationship === '',
            }"
            :disabled="relationship === ''"
            @click="saveRelationship"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { RepositoryFactory } from '../../../apiConfig/RepositoryFactory'
const userRepository = RepositoryFactory.get('user')
export default {
  data() {
    return {
      showForm: false,
      showFromSchool: false,
      showUniversity: false,
      showHomeTown: false,
      showRelationship: false,
      profileCompany: false,
      profileSchool: false,
      profileFrom: false,
      profileRelationship: false,
      company: '',
      position: '',
      city: '',
      description: '',
      schoolName: '',
      descriptionSchool: '',
      university: '',
      descriptionUniversity: '',
      specialized_1: '',
      specialized_2: '',
      homeTown: '',
      relationship: '',
      userId:'',
      user:null
    }
  },

  computed: {
    profile() {
      return this.$store.state.idFriendModule.userDetail
    },

    status() {
      return this.$store.state.idFriendModule.status
    }
  },
  watch:{
    '$store.state.authModule.user': {
      handler(val) {
        this.user = val
        this.userId = val.user_id
      },
      immediate: true,
      deep:true
    },
  },


  methods: {
    async saveWorkplace() {
      this.profile.company = this.company
      this.profile.position = this.position
      if(!this.user?.check){
        try {
        await userRepository.profileUser(this.userId, {
          company: this.company,
          position: this.position,
          city: this.city,
          description: this.description,
        })
      } catch (error) {
        console.log(error)
      }
      }else{
        try {
        await userRepository.profilePage(this.userId, {
          company: this.company,
          position: this.position,
          city: this.city,
          description: this.description,
        })
      } catch (error) {
        console.log(error)
      }
      }

      this.showForm = false
    },
    async removeCompany() {
      this.profile.company = ''
      this.profile.position = ''
      if(!this.user?.check){
        try {
        await userRepository.profileUser(this.userId, {
          company: '',
          position: '',
          city: '',
          description: '',
        })
      } catch (error) {
        console.log(error)
      }
      }else{
        try {
        await userRepository.profilePage(this.userId, {
          company: '',
          position: '',
          city: '',
          description: '',
        })
      } catch (error) {
        console.log(error)
      }
      }

    },
    cancelWorkplace() {
      this.showForm = false
    },
    async saveWorkSchool() {
      this.profile.schoolName = this.schoolName
      if(!this.user?.check){
        try {
        await userRepository.profileUser(this.userId, {
          schoolName: this.schoolName,
        })
      } catch (error) {
        console.log(error)
      }
      }else{
        try {
        await userRepository.profilePage(this.userId, {
          schoolName: this.schoolName,
        })
      } catch (error) {
        console.log(error)
      }
      }

      this.showFromSchool = false
    },
    async removeSchool(){
      this.profile.schoolName = ''
      try {
        await userRepository.profileUser(this.userId, {
          schoolName: ''
        })
      } catch (error) {
        console.log(error)
      }
    },
    cancelWorkSchool() {
      this.showFromSchool = false
    },
    async saveUniversity() {
      this.profile.university = this.university
      this.profile.specialized_1 = this.specialized_1
      this.profile.specialized_2 = this.specialized_2
      try {
        await userRepository.profileUser(this.userId, {
          university: this.university,
          specialized_1: this.specialized_1,
          specialized_2: this.specialized_2,
        })
      } catch (error) {
        console.log(error)
      }
      this.showUniversity = false
    },
    async removeUniversity (){
      this.profile.university = ''
      this.profile.specialized_1 = ''
      this.profile.specialized_2 = ''
      try {
        await userRepository.profileUser(this.userId, {
          university: '',
          specialized_1: '',
          specialized_2: '',
        })
      } catch (error) {
        console.log(error)
      }
    },
    cancelUniversity() {
      this.showUniversity = false
    },
    async saveHomeTown() {
      this.profile.homeTown = this.homeTown
      if(!this.user?.check){
        try {
        await userRepository.profileUser(this.userId, {
          homeTown: this.homeTown,
        })
      } catch (error) {
        console.log(error)
      }
      }else{
        try {
        await userRepository.profilePage(this.userId, {
          homeTown: this.homeTown,
        })
      } catch (error) {
        console.log(error)
      }
      }
      

      this.showHomeTown = false
    },
    async removeHomeTown() {
      this.profile.homeTown = ''
      try {
        await userRepository.profileUser(this.userId, {
          homeTown: '',
        })
      } catch (error) {
        console.log(error)
      }
    },
    cancelHomeTown() {
      this.showHomeTown = false
    },
    async saveRelationship() {
      this.profile.relationship = this.relationship
      try {
        await userRepository.profileUser(this.userId, {
          relationship: this.relationship,
        })
      } catch (error) {
        console.log(error)
      }
      this.showRelationship = false
    },
    async removeRelationship () {
      this.profile.relationship = ''
      try {
        await userRepository.profileUser(this.userId, {
          relationship: '',
        })
      } catch (error) {
        console.log(error)
      }
    },
    cancelRelationship() {
      this.showRelationship = false
    },
  
  },
}
</script>
<style>
.inputForm {
  border: 1px solid rgb(161, 159, 159);
}

.inputForm:hover {
  border: 1px solid rgb(113, 112, 112);
}
</style>
