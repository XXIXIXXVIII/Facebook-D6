<template lang="">
  <div class="bg-[#F0F2F5] min-h-screen">
    <div class="px-12">
      <div
        class="w-[940px] h-[168px] rounded-lg bg-[#4fc3fa] mx-auto -mt-1 flex items-center justify-between overflow-hidden"
      >
        <div class="w-[55%] m-8">
          <div class="text-[28px] font-bold break-words leading-[1.1429] my-2">
            Chào mừng bạn đến với Bảng điều khiển chuyên nghiệp!
          </div>
          <div class="text-[17px] break-words leading-[1.1765] my-2">
            Bạn sẽ tìm thấy mọi thứ ở cùng một nơi - từ thông tin chi tiết, công
            cụ quản lý đến quy trình tạo quảng cáo.
          </div>
        </div>
        <div class="w-[45%]">
          <i
            data-visualcompletion="css-img"
            class=""
            style="
              background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/AO5J4F7jzDf.png');
              background-position: 0px 0px;
              background-size: 362px 192px;
              width: 360px;
              height: 168px;
              background-repeat: no-repeat;
              display: inline-block;
            "
          ></i>
        </div>
      </div>

      <div class="w-[1000px] mx-auto">
        <div class="m-2">
          <div class="bg-white shadowWrap rounded-md p-4 mt-5">
            <div>
              <div class="text-xl font-bold">Tổng quan về trang</div>
              <div class="text-[17px] text-[#63676B] my-[6px]">
                Người theo dõi: {{follow?.length}}
              </div>
              <div class="text-[13px] text-[#63676B] font-medium my-[6px]">
                28 ngày qua
              </div>
              <div
                class="mt-3 grid grid-cols-3 gap-2 items-center justify-between"
              >
                <div class="p-3 mr-[6px] bg-[#F0F2F5] rounded-md">
                  <div class="flex items-center gap-3">
                    <i
                      style="
                        background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yy/r/EoT3jXVJw8-.png');
                        background-position: 0px -292px;
                        background-size: 26px 810px;
                        width: 20px;
                        height: 20px;
                        background-repeat: no-repeat;
                        display: inline-block;
                      "
                    ></i>
                    <div class="text-[15px] font-semibold">
                      Số người bài viết tiếp cận
                    </div>
                    <i
                      style="
                        background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yT/r/kdSjn8SnURN.png');
                        background-position: 0px -290px;
                        background-size: 26px 422px;
                        width: 16px;
                        height: 16px;
                        background-repeat: no-repeat;
                        display: inline-block;
                        filter: invert(50%);
                      "
                    ></i>
                  </div>
                  <div class="text-2xl font-bold pt-4">
                    {{ dataPage?.interact }}
                  </div>
                </div>

                <div class="p-3 mr-[6px] bg-[#F0F2F5] rounded-md">
                  <div class="flex items-center gap-3">
                    <i
                      data-visualcompletion="css-img"
                      style="
                        background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/AO5J4F7jzDf.png');
                        background-position: -22px -170px;
                        background-size: 362px 192px;
                        width: 20px;
                        height: 20px;
                        background-repeat: no-repeat;
                        display: inline-block;
                      "
                    ></i>
                    <div class="text-[15px] font-semibold">
                      Lượt tương tác với bài viết
                    </div>
                    <i
                      style="
                        background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yT/r/kdSjn8SnURN.png');
                        background-position: 0px -290px;
                        background-size: 26px 422px;
                        width: 16px;
                        height: 16px;
                        background-repeat: no-repeat;
                        display: inline-block;
                        filter: invert(50%);
                      "
                    ></i>
                  </div>
                  <div class="text-2xl font-bold pt-4">{{dataPage?.react}}</div>
                </div>

                <div class="p-3 mr-[6px] bg-[#F0F2F5] rounded-md">
                  <div class="flex items-center gap-3">
                    <i
                      data-visualcompletion="css-img"
                      style="
                        background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yy/r/EoT3jXVJw8-.png');
                        background-position: 0px -336px;
                        background-size: 26px 810px;
                        width: 20px;
                        height: 20px;
                        background-repeat: no-repeat;
                        display: inline-block;
                      "
                    ></i>
                    <div class="text-[15px] font-semibold">
                      Lượt thích Trang mới
                    </div>
                    <i
                      style="
                        background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yT/r/kdSjn8SnURN.png');
                        background-position: 0px -290px;
                        background-size: 26px 422px;
                        width: 16px;
                        height: 16px;
                        background-repeat: no-repeat;
                        display: inline-block;
                        filter: invert(50%);
                      "
                    ></i>
                  </div>
                  <div v-if="dataPage?.react-2>=0" class="text-2xl font-bold pt-4">{{dataPage?.react-2}}</div>
                  <div v-else class="text-2xl font-bold pt-4">{{dataPage?.react}}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-5 flex gap-5 items-start justify-between">
            <div class="w-[56%]">
              <div class="bg-white shadowWrap rounded-md p-4">
                <div class="text-xl font-bold">Nội dung gần đây</div>
                <div class="text-[13px] text-[#63676B] font-medium my-[6px]">
                  30 ngày qua
                </div>
                <div class="px-5 pt-2">
                  <div
                    class="px-3 p-[10px] hover:bg-gray-200 rounded-lg cursor-pointer flex items-center justify-between"
                  >
                    <div class="flex items-center gap-3">
                      <div
                        class="w-16 h-16 overflow-hidden flex items-center justify-center rounded-md"
                      >
                        <img
                          class="w-full h-full object-cover"
                          :src="dataPost[0]?.media[0].url"
                        />
                      </div>
                      <div>
                        <div class="font-medium text-[13px]" v-html="dataPost[0]?.content"></div>
                        <div class="text-[13px] text-[#63676B]">
                          {{dataPost[0]?.created_at}}
                        </div>
                      </div>
                    </div>

                    <div class="flex items-center gap-3">
                      <div class="flex flex-col justify-end items-end">
                        <div class="text-[13px]">
                          Số người bài viết tiếp cận
                        </div>
                        <div class="font-medium">{{dataPost[0]?.interact}}</div>
                      </div>
                      <div class="flex flex-col justify-end items-end">
                        <div class="text-[13px]">Lượt tương tác</div>
                        <div class="font-medium">--</div>
                      </div>
                    </div>
                  </div>
                  <button
                    class="bg-[#E7F3FF] h-9 mt-2 hover:bg-blue-300 font-medium rounded-md text-blue-500 w-full flex items-center justify-center"
                  >
                    Xem thêm
                  </button>
                </div>
              </div>
              <div class="bg-white shadowWrap rounded-md p-4 mt-5">
                <div class="text-[15px] font-medium flex items-center gap-2">
                  <i
                    style="
                      background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yy/r/EoT3jXVJw8-.png');
                      background-position: 0px 0px;
                      background-size: 26px 810px;
                      width: 24px;
                      height: 24px;
                      background-repeat: no-repeat;
                      display: inline-block;
                    "
                  ></i>
                  Nội dung gần đây
                </div>

                <div class="px-2 pt-4 flex items-center gap-3">
                  <div
                    class="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center"
                  >
                    <i
                      style="
                        background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yy/r/EoT3jXVJw8-.png');
                        background-position: 0px -182px;
                        background-size: 26px 810px;
                        width: 20px;
                        height: 20px;
                        background-repeat: no-repeat;
                        display: inline-block;
                      "
                    ></i>
                  </div>
                  <div class="text-[17px] font-semibold">
                    Dễ dàng chuyển giữa Trang và trang cá nhân
                  </div>
                </div>

                <div class="px-4 pt-4 pb-5 text-[15px]">
                  <div>
                    Bạn hiện đã chuyển sang
                    <span class="font-medium">{{dataPage?.fullName}}</span> để tương tác với vai
                    trò Trang và hoàn thành mọi việc. Bạn có thể chuyển về trang
                    cá nhân của mình bất cứ lúc nào.
                  </div>
                  <button
                    class="w-full h-9 flex items-center justify-center font-medium bg-[#E4E6EB] hover:bg-gray-300 mt-1 rounded-md"
                  >
                    Tìm hiểu cách chuyển
                  </button>
                </div>

                <div class="border border-gray-300 mb-5"></div>

                <div class="px-2 pt-4 flex items-center gap-3">
                  <div
                    class="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center"
                  >
                    <i
                      style="
                        background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yg/r/oDSPbw-yf-Y.png');
                        background-position: 0px -358px;
                        background-size: 34px 596px;
                        width: 20px;
                        height: 20px;
                        background-repeat: no-repeat;
                        display: inline-block;
                      "
                    ></i>
                  </div>
                  <div class="text-[17px] font-semibold">Bảng tin</div>
                </div>

                <div class="px-4 pt-4 pb-5 text-[15px]">
                  <div>
                    Khi theo dõi các trang cá nhân hoặc Trang khác dưới tên
                    <span class="font-medium">{{dataPage?.fullName}}</span> , bạn có thể xem
                    thông tin mới và tương tác với họ trong Bảng feed của Trang.
                    Mọi việc bạn làm trong Bảng feed này đều hiển thị dưới tên
                    Trang của bạn.
                  </div>
                  <button
                    class="w-full h-9 flex items-center justify-center font-medium bg-[#E4E6EB] hover:bg-gray-300 mt-1 rounded-md"
                  >
                    Tìm hiểu cách chuyển
                  </button>
                </div>
              </div>
            </div>

            <div class="bg-white shadowWrap rounded-md w-[43%] mr-4">
              <div class="px-4 py-5 mb-3">
                <div class="text-xl font-bold break-words leading-[1.2]">
                  Để phát triển đối tượng, hãy hoàn tất quy trình thiết lập
                  Trang
                </div>
                <div class="text-[17px] my-[6px] break-words leading-[1.1765]">
                  Bạn có thể thêm các chi tiết khác để nhiều người kết nối với
                  bạn hơn.
                </div>
                <div class="text-[13px] font-medium text-[#63676B] my-2">
                  Đã hoàn tất {{step}}/8 bước
                </div>
                <div
                  class="grid gap-1"
                  style="grid-template-columns: repeat(8, minmax(0, 1fr))"
                >
                  <div v-for="n in 8" :key="n">
                    <div
                      v-if="step >= n"
                      class="bg-[#1B74E4] rounded h-2"
                    ></div>
                    <div v-else class="bg-gray-200 rounded h-2"></div>
                  </div>
                </div>
                <div class="w-full border-b border-gray-200 mt-4"></div>
              </div>

              <div class="px-2">
                <div
                  class="p-2 rounded-md hover:bg-gray-200 flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <div class="text-[#67636B] text-[13px] font-medium mb-1">
                      Còn 1 bước nữa
                    </div>
                    <div class="text-[17px] font-medium mb-1">
                      Thiết lập danh tính của Trang
                    </div>
                  </div>
                  <div>
                    <i
                      style="
                        background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yv/r/QCj9H9Vf5Du.png');
                        background-position: 0px -88px;
                        background-size: 190px 190px;
                        width: 20px;
                        height: 20px;
                        background-repeat: no-repeat;
                        display: inline-block;
                        filter: invert(50%);
                      "
                    ></i>
                  </div>
                </div>
                <div class="border-b border-gray-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { RepositoryFactory } from '../../apiConfig/RepositoryFactory'
const pageRepository = RepositoryFactory.get('pagesRepository')
const postRepository = RepositoryFactory.get('posts')

export default {
  name: 'ProfessionalDashboard',
  layout: 'professionalDashboard',
  data() {
    return {
      step: 9,
      user: null,
      dataPage: null,
      follow: null,
      dataPost: []
    }
  },
  watch: {
    '$store.state.authModule.user': {
      handler(val) {
        this.user = val
      },
      immediate: true,
      deep: true,
    },
  },
  created() {
    this.fetchDataPage()
    this.fetchPost()
  },

  methods: {
    async fetchDataPage() {
      const result = await pageRepository.getProfilePage({
        pageId: this.user.user_id,
      })
      this.dataPage = result.data.page
      this.follow = result.data.followers
      this.step =  this.dataPage.step
      console.log(this.dataPage);
    },
    async fetchPost (){
      const result = await postRepository.getPostforPage({pageId: this.user.user_id})
      this.dataPost = result.data.filter(item => item.media.length>0)
      console.log(this.dataPost);
    }
  },
}
</script>
<style scoped lang="css">
.shadowWrap {
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
}
</style>
