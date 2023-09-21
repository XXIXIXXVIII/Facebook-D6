<template>
  <div
    class="flex flex-col"
    tabindex="0"
    @focusout="setFocus(false)"
    @focusin="setFocus(true)"
  >
    <!-- Phần trên của inboxOne -->
    <messenger-inbox-top :messenger-other-value="messengerOtherValue" />

    <!-- Nội dung bên trong -->
    <div class="flex h-[410px] flex-col justify-between">
      <!-- Phần hội thoại -->
      <div
        ref="chatHistory"
        :style="{
          'max-height': value.previewImg
            ? '220px'
            : value.replyMessageContent && value.inputData
            ? '268px'
            : value.replyMessageContent
            ? '288px'
            : value.inputData
            ? '310px'
            : '347px',
        }"
        class="flex flex-col justify-start min-h-[485px] w-full overflow-y-scroll mt-8"
      >
        <!-- Nếu không có tin nhắn -->
        <none-messenger-list
          :messenger-other-value="messengerOtherValue"
          :messages-list="messagesList"
        />

        <!-- Nếu có tin nhắn -->
        <div
          v-for="(session, sessionIndex) in messagesList.slice(
            0,
            messagesList?.length - 1
          )"
          :key="sessionIndex"
        >
          <div
            v-if="messagesList?.length > 0"
            class="flex justify-center items-center text-xs text-[#65676b] pl-4 pr-4 pt-4 pb-2 font-medium"
          >
            <div>{{ session.time }}</div>
          </div>
          <div v-if="messagesList?.length > 0">
            <div>
              <div
                v-for="(message, messageIndex) in session.messages"
                :key="messageIndex"
              >
                <!-- Tin nhắn của người khác -->
                <!-- InboxOne -->
                <div
                  v-if="
                    message.userId == messengerOtherValue?.toUserId &&
                    message.userId !== user.user_id
                  "
                  class="flex items-end mt-2 mb-2 cursor-pointer"
                >
                  <div
                    style="border: 1px rgb(206, 206, 206) solid"
                    class="w-7 h-7 rounded-full overflow-hidden ml-2 mr-2"
                  >
                    <img
                      class="w-full h-full"
                      :src="messengerOtherValue?.toUserAvatar"
                      alt=""
                    />
                  </div>

                  <!-- Tin nhắn thường cộng phản hồi của người khác -->
                  <div class="flex flex-col items-start">
                    <!-- Phần trên của tin nhắn phản hồi -->
                    <div
                      v-if="message.messageReplyContent && messengerOtherValue"
                      class="flex items-center text-[12px] text-gray-500 ml-3 mt-2 mb-2"
                    >
                      <div class="w-[15px] h-[15px]">
                        <img
                          class="w-full h-full object-cover"
                          src="../../../../assets/icons/share.png"
                          alt=""
                        />
                      </div>
                      <div class="ml-1">
                        <span>{{ messengerOtherValue?.toUserName }}</span> đã
                        trả lời bạn
                      </div>
                    </div>

                    <!-- Tin phản hồi -->
                    <div
                      v-if="message.messageReplyContent"
                      :style="{
                        width:
                          message.messageReplyContent?.length > 26
                            ? '248px'
                            : 'auto',
                      }"
                      style="box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px"
                      class="rounded-xl bg-gray-100 p-2 text-[15px] text-gray-600 ml-2 max-h-[100px] overflow-hidden"
                      @click="handleToContent"
                    >
                      <div class="pl-1 pr-1">
                        {{ message.messageReplyContent }}
                      </div>
                    </div>
                    <!-- Tin nhắn thường -->
                    <div
                      v-if="message.messageContent"
                      class="normal-message text-[15px] flex items-center cursor-pointer"
                    >
                      <div
                        :style="{
                          width:
                            message.messageContent?.length > 26
                              ? '185px'
                              : 'auto',
                        }"
                        class="pl-3 pr-3 pt-2 pb-2 rounded-[18px] bg-[#e4e6eb]"
                      >
                        {{ message.messageContent }}
                      </div>
                      <!-- Phần phản hồi tin nhắn -->
                      <div class="options cursor-pointer">
                        <!-- Trả lời -->
                        <div
                          v-tippy="{
                            content: 'Trả lời',
                            theme: 'material',
                            placement: 'top',
                          }"
                          class="message-icon w-[25px] h-[25px] overflow-hidden rounded-full p-1 ml-1"
                          @click="handleRenderReply(message)"
                        >
                          <img
                            class="w-full h-full object-cover"
                            src="../../../../assets/icons/share.png"
                            alt=""
                          />
                        </div>

                        <!-- Gỡ, xóa -->
                        <div
                          v-tippy="{
                            content: 'Gỡ, xóa',
                            theme: 'material',
                            placement: 'top',
                          }"
                          class="message-icon w-[25px] h-[25px] overflow-hidden rounded-full p-1"
                          @click="
                            handlePatchMessage({
                              action: 'remove',
                              sessionId: session.sessionId,
                              messageId: message.messageId,
                              accountHasLoginId: user.user_id,
                            })
                          "
                        >
                          <img
                            class="w-full h-full object-cover"
                            src="../../../../assets/icons/eject.png"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Tin nhắn thu hồi -->
                  <div
                    v-if="message.messageNote"
                    style="
                      border: 1px solid rgb(186, 186, 186);
                      color: rgb(186, 186, 186);
                    "
                    class="w-[210px] rounded-[18px] p-2 text-[15px] cursor-pointer"
                  >
                    <span> {{ message.messageNote }}</span>
                  </div>

                  <!-- Ảnh -->
                  <div
                    v-if="message.messageImg"
                    class="w-[60%] overflow-hidden p-2"
                  >
                    <img
                      style="border: 1px solid rgb(221, 221, 221)"
                      class="rounded-xl w-full object-cover"
                      :src="message.messageImg"
                      alt=""
                    />
                  </div>
                  <!-- Sticker -->
                  <div
                    v-if="message.messageSticker"
                    class="w-[64px] overflow-hidden ml-2 flex items-end"
                  >
                    <img
                      class="rounded-xl w-full object-cover"
                      :src="message.messageSticker"
                      alt=""
                    />
                  </div>
                </div>

                <!-- Tin nhắn của người dùng -->
                <div
                  v-if="message.userId == user.user_id"
                  class="flex items-end justify-end mt-2 mb-2 mr-2"
                >
                  <!-- Tin nhắn thường cộng phản hồi của người dùng -->
                  <div class="flex flex-col items-end">
                    <!-- Phần trên của tin nhắn phản hồi -->
                    <!-- InboxOne -->
                    <div
                      v-if="message.messageReplyContent && messengerOtherValue"
                      class="flex items-center text-[12px] text-gray-500 mr-3 mt-2 mb-2"
                    >
                      <div class="w-[15px] h-[15px]">
                        <img
                          class="w-full h-full object-cover"
                          src="../../../../assets/icons/share.png"
                          alt=""
                        />
                      </div>
                      <div class="ml-1">
                        Bạn đã trả lời
                        <span> chính mình</span>
                      </div>
                    </div>

                    <!-- Tin phản hồi -->
                    <div
                      v-if="message.messageReplyContent"
                      :style="{
                        width:
                          message.messageReplyContent?.length > 26
                            ? '248px'
                            : 'auto',
                      }"
                      style="box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px"
                      class="rounded-xl bg-gray-100 p-2 text-[15px] text-gray-600 mr-3 max-h-[100px] overflow-hidden"
                    >
                      <div class="pl-1 pr-1">
                        {{ message.messageReplyContent }}
                      </div>
                    </div>
                    <!-- Tin nhắn thường -->
                    <div
                      v-if="message.messageContent"
                      class="normal-message text-[15px] flex items-center cursor-pointer"
                    >
                      <!-- Phần phản hồi tin nhắn -->
                      <div class="options">
                        <!-- Trả lời -->
                        <div
                          v-tippy="{
                            content: 'Trả lời',
                            theme: 'material',
                            placement: 'top',
                          }"
                          class="message-icon w-[25px] h-[25px] overflow-hidden rounded-full p-1 ml-1 cursor-pointer"
                          @click="handleRenderReply(message)"
                        >
                          <img
                            class="w-full h-full object-cover"
                            src="../../../../assets/icons/share.png"
                            alt=""
                          />
                        </div>
                        <!-- Thu hồi -->
                        <div
                          v-tippy="{
                            content: 'Thu hồi',
                            theme: 'material',
                            placement: 'top',
                          }"
                          class="message-icon w-[25px] h-[25px] overflow-hidden rounded-full p-1"
                          @click="
                            handlePatchMessage({
                              action: 'evicted',
                              sessionId: session.sessionId,
                              messageId: message.messageId,
                              accountHasLoginId: user.user_id,
                            })
                          "
                        >
                          <img
                            class="w-full h-full object-cover"
                            src="../../../../assets/icons/remove.png"
                            alt=""
                          />
                        </div>
                        <!-- Gỡ, xóa -->
                        <div
                          v-tippy="{
                            content: 'Gỡ, xóa',
                            theme: 'material',
                            placement: 'top',
                          }"
                          class="message-icon w-[25px] h-[25px] overflow-hidden rounded-full p-1"
                          @click="
                            handlePatchMessage({
                              action: 'remove',
                              sessionId: session.sessionId,
                              messageId: message.messageId,
                              accountHasLoginId: user.user_id,
                            })
                          "
                        >
                          <img
                            class="w-full h-full object-cover"
                            src="../../../../assets/icons/eject.png"
                            alt=""
                          />
                        </div>
                      </div>
                      <div
                        :style="{
                          width:
                            message.messageContent?.length > 26
                              ? '185px'
                              : 'auto',
                        }"
                        class="rounded-[18px] bg-[#0084ff] p-2 text-[15px] text-white"
                      >
                        {{ message.messageContent }}
                      </div>
                    </div>
                  </div>

                  <!-- Tin nhắn thu hồi -->
                  <div
                    v-if="message.messageNote"
                    style="
                      border: 1px solid rgb(186, 186, 186);
                      color: rgb(186, 186, 186);
                    "
                    class="w-[210px] rounded-[18px] p-2 text-[15px]"
                  >
                    <span>
                      {{ message.messageNote }}
                    </span>
                  </div>

                  <!-- Ảnh -->
                  <div
                    v-if="message.messageImg"
                    class="w-[60%] overflow-hidden p-2 flex justify-end"
                  >
                    <img
                      style="border: 1px solid rgb(221, 221, 221)"
                      class="rounded-xl w-full object-cover"
                      :src="message.messageImg"
                      alt=""
                    />
                  </div>

                  <!-- Sticker -->
                  <div
                    v-if="message.messageSticker"
                    class="w-[64px] overflow-hidden mr-2 flex justify-end"
                  >
                    <img
                      class="rounded-xl w-full object-cover"
                      :src="message.messageSticker"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Đã gửi hoặc đã xem -->
        <div
          v-for="(sessionTwo, sessionTwoIndex) in messagesList.slice(
            messagesList?.length - 1,
            messagesList?.length
          )"
          :key="sessionTwoIndex"
        >
          <div
            v-if="messagesList?.length > 0"
            class="flex justify-center items-center text-xs text-[#65676b] pl-4 pr-4 pt-4 pb-2 font-medium"
          >
            <div>{{ sessionTwo.time }}</div>
          </div>
          <div v-if="messagesList?.length > 0">
            <div>
              <div
                v-for="(messageTwo, messageTwoIndex) in sessionTwo.messages"
                :key="messageTwoIndex"
              >
                <!-- Tin nhắn của người khác -->
                <!-- InboxOne -->
                <div
                  v-if="
                    messageTwo.userId == messengerValueOne?.toUserId &&
                    messageTwo.userId !== user.user_id
                  "
                  class="flex items-end mt-2 mb-2 cursor-pointer"
                >
                  <div
                    style="border: 1px rgb(206, 206, 206) solid"
                    class="w-7 h-7 rounded-full overflow-hidden ml-2 mr-2"
                  >
                    <img
                      class="w-full h-full"
                      :src="messengerValueOne?.toUserAvatar"
                      alt=""
                    />
                  </div>
                  <!-- Tin nhắn thường cộng phản hồi của người khác -->
                  <div class="flex flex-col items-start">
                    <!-- Phần trên của tin nhắn phản hồi -->

                    <div
                      v-if="messageTwo.messageReplyContent && messengerValueOne"
                      class="flex items-center text-[12px] text-gray-500 ml-3 mt-2 mb-2"
                    >
                      <div class="w-[15px] h-[15px]">
                        <img
                          class="w-full h-full object-cover"
                          src="../../../../assets/icons/share.png"
                          alt=""
                        />
                      </div>
                      <div class="ml-1">
                        <span>{{ messengerValueOne?.toUserName }}</span> đã trả
                        lời bạn
                      </div>
                    </div>

                    <!-- Tin phản hồi -->
                    <div
                      v-if="messageTwo.messageReplyContent"
                      :style="{
                        width:
                          messageTwo.messageReplyContent?.length > 26
                            ? '248px'
                            : 'auto',
                      }"
                      style="box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px"
                      class="rounded-xl bg-gray-100 p-2 text-[15px] text-gray-600 ml-2 max-h-[100px] overflow-hidden"
                    >
                      <div class="pl-1 pr-1">
                        {{ messageTwo.messageReplyContent }}
                      </div>
                    </div>
                    <!-- Tin nhắn thường -->
                    <div
                      v-if="messageTwo.messageContent"
                      class="normal-message text-[15px] flex items-center cursor-pointer"
                    >
                      <div
                        :style="{
                          width:
                            messageTwo.messageContent?.length > 26
                              ? '185px'
                              : 'auto',
                        }"
                        class="pl-3 pr-3 pt-2 pb-2 rounded-[18px] bg-[#e4e6eb]"
                      >
                        {{ messageTwo.messageContent }}
                      </div>
                      <!-- Phần phản hồi tin nhắn -->
                      <div class="options cursor-pointer">
                        <!-- Trả lời -->
                        <div
                          v-tippy="{
                            content: 'Trả lời',
                            theme: 'material',
                            placement: 'top',
                          }"
                          class="message-icon w-[25px] h-[25px] overflow-hidden rounded-full p-1 ml-1"
                          @click="handleRenderReply(messageTwo)"
                        >
                          <img
                            class="w-full h-full object-cover"
                            src="../../../../assets/icons/share.png"
                            alt=""
                          />
                        </div>

                        <!-- Gỡ, xóa -->
                        <div
                          v-tippy="{
                            content: 'Gỡ, xóa',
                            theme: 'material',
                            placement: 'top',
                          }"
                          class="message-icon w-[25px] h-[25px] overflow-hidden rounded-full p-1"
                          @click="
                            handlePatchMessage({
                              action: 'remove',
                              sessionId: sessionTwo.sessionId,
                              messageId: messageTwo.messageId,
                              accountHasLoginId: user.user_id,
                            })
                          "
                        >
                          <img
                            class="w-full h-full object-cover"
                            src="../../../../assets/icons/eject.png"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Tin nhắn thu hồi -->
                  <div
                    v-if="messageTwo.messageNote"
                    style="
                      border: 1px solid rgb(186, 186, 186);
                      color: rgb(186, 186, 186);
                    "
                    class="w-[210px] rounded-[18px] p-2 text-[15px]"
                  >
                    <span> {{ messageTwo.messageNote }}</span>
                  </div>

                  <!-- Ảnh -->
                  <div
                    v-if="messageTwo.messageImg"
                    class="w-[60%] overflow-hidden p-2"
                  >
                    <img
                      style="border: 1px solid rgb(221, 221, 221)"
                      class="rounded-xl w-full object-cover"
                      :src="messageTwo.messageImg"
                      alt=""
                    />
                  </div>

                  <!-- Sticker -->
                  <div
                    v-if="messageTwo.messageSticker"
                    class="w-[64px] overflow-hidden ml-2 flex items-end"
                  >
                    <img
                      class="rounded-xl w-full object-cover"
                      :src="messageTwo.messageSticker"
                      alt=""
                    />
                  </div>
                </div>

                <!-- Tin nhắn của người dùng -->
                <div
                  v-if="messageTwo.userId == user.user_id"
                  class="flex items-end justify-end mt-2 mb-2 mr-2"
                >
                  <!-- Tin nhắn thường cộng phản hồi của người dùng -->
                  <div class="flex flex-col items-end">
                    <!-- Phần trên của tin nhắn phản hồi -->
                    <!-- InboxOne -->
                    <div
                      v-if="messageTwo.messageReplyContent && messengerValueOne"
                      class="flex items-center text-[12px] text-gray-500 mr-3 mt-2 mb-2"
                    >
                      <div class="w-[15px] h-[15px]">
                        <img
                          class="w-full h-full object-cover"
                          src="../../../../assets/icons/share.png"
                          alt=""
                        />
                      </div>
                      <div class="ml-1">
                        Bạn đã trả lời
                        <span> chính mình</span>
                      </div>
                    </div>

                    <!-- Tin phản hồi -->
                    <div
                      v-if="messageTwo.messageReplyContent"
                      :style="{
                        width:
                          messageTwo.messageReplyContent?.length > 26
                            ? '248px'
                            : 'auto',
                      }"
                      style="box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px"
                      class="rounded-xl bg-gray-100 p-2 text-[15px] text-gray-600 mr-3 max-h-[100px] overflow-hidden"
                    >
                      <div class="pl-1 pr-1">
                        {{ messageTwo.messageReplyContent }}
                      </div>
                    </div>
                    <!-- Tin nhắn thường -->
                    <div
                      v-if="messageTwo.messageContent"
                      class="normal-message text-[15px] flex items-center cursor-pointer"
                    >
                      <!-- Phần phản hồi tin nhắn -->
                      <div class="options">
                        <!-- Trả lời -->
                        <div
                          v-tippy="{
                            content: 'Trả lời',
                            theme: 'material',
                            placement: 'top',
                          }"
                          class="message-icon w-[25px] h-[25px] overflow-hidden rounded-full p-1 ml-1 cursor-pointer"
                          @click="handleRenderReply(messageTwo)"
                        >
                          <img
                            class="w-full h-full object-cover"
                            src="../../../../assets/icons/share.png"
                            alt=""
                          />
                        </div>
                        <!-- Thu hồi -->
                        <div
                          v-tippy="{
                            content: 'Thu hồi',
                            theme: 'material',
                            placement: 'top',
                          }"
                          class="message-icon w-[25px] h-[25px] overflow-hidden rounded-full p-1"
                          @click="
                            handlePatchMessage({
                              action: 'evicted',
                              sessionId: sessionTwo.sessionId,
                              messageId: messageTwo.messageId,
                              accountHasLoginId: user.user_id,
                            })
                          "
                        >
                          <img
                            class="w-full h-full object-cover"
                            src="../../../../assets/icons/remove.png"
                            alt=""
                          />
                        </div>
                        <!-- Gỡ, xóa -->
                        <div
                          v-tippy="{
                            content: 'Gỡ, xóa',
                            theme: 'material',
                            placement: 'top',
                          }"
                          class="message-icon w-[25px] h-[25px] overflow-hidden rounded-full p-1"
                          @click="
                            handlePatchMessage({
                              action: 'remove',
                              sessionId: sessionTwo.sessionId,
                              messageId: messageTwo.messageId,
                              accountHasLoginId: user.user_id,
                            })
                          "
                        >
                          <img
                            class="w-full h-full object-cover"
                            src="../../../../assets/icons/eject.png"
                            alt=""
                          />
                        </div>
                      </div>
                      <div
                        :style="{
                          width:
                            messageTwo.messageContent?.length > 26
                              ? '185px'
                              : 'auto',
                        }"
                        class="rounded-[18px] bg-[#0084ff] p-2 text-[15px] text-white"
                      >
                        {{ messageTwo.messageContent }}
                      </div>
                    </div>
                  </div>

                  <!-- Tin nhắn thu hồi -->
                  <div
                    v-if="messageTwo.messageNote"
                    style="
                      border: 1px solid rgb(186, 186, 186);
                      color: rgb(186, 186, 186);
                    "
                    class="w-[210px] rounded-[18px] p-2 text-[15px]"
                  >
                    <span>
                      {{ messageTwo.messageNote }}
                    </span>
                  </div>

                  <!-- Ảnh -->
                  <div
                    v-if="messageTwo.messageImg"
                    class="w-[60%] overflow-hidden p-2 flex justify-end"
                  >
                    <img
                      style="border: 1px solid rgb(221, 221, 221)"
                      class="rounded-xl w-full object-cover"
                      :src="messageTwo.messageImg"
                      alt=""
                    />
                  </div>

                  <!-- Sticker -->
                  <div
                    v-if="messageTwo.messageSticker"
                    class="w-[64px] overflow-hidden mr-2 flex justify-end"
                  >
                    <img
                      class="rounded-xl w-full object-cover"
                      :src="messageTwo.messageSticker"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Phần hiện ở cuối -->
          <!-- InboxOne -->
          <div
            v-if="messengerOtherValue && messengerOtherValue.unread > 0"
            class="flex justify-end items-center mr-2 text-xs text-[#65676b]"
          >
            Đã gửi
          </div>

          <!-- Avatar ở cuối -->
          <div
            v-if="messengerOtherValue && messengerOtherValue.unread == 0"
            class="flex justify-end items-center mr-2"
          >
            <span
              class="w-4 h-4 flex justify-end items-center rounded-full overflow-hidden"
            >
              <img
                class="w-full h-full object-cover"
                :src="messengerOtherValue?.toUserAvatar"
                alt=""
              />
            </span>
          </div>
          <div
            v-if="messengerValueTwo && messengerValueTwo.unread == 0"
            class="flex justify-end items-center mr-2"
          >
            <span
              class="w-4 h-4 flex justify-end items-center rounded-full overflow-hidden"
            >
              <img
                class="w-full h-full object-cover"
                :src="messengerValueTwo?.toUserAvatar"
                alt=""
              />
            </span>
          </div>
        </div>
      </div>

      <!-- Phần reply -->
      <div
        v-if="value.replyMessageContent"
        style="border-top: 1px rgb(186, 186, 186) solid"
        class="h-[58.46px] w-full pt-[10px] pl-[15px] pr-[15px] pb-[3px]"
      >
        <div class="flex w-full justify-between items-center">
          <div class="text-[12px]">
            Đang trả lời
            <span class="font-medium">{{ value.replyUser }}</span>
          </div>

          <div
            style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px"
            class="w-[25px] h-[25px] overflow-hidden bg-white hover:bg-slate-100 rounded-full flex items-center justify-center cursor-pointer"
            @click="handleCancelReply"
          >
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="icons.previewImgX"></span>
          </div>
        </div>
        <div class="text-[12px] h-[36px] overflow-hidden text-gray-500">
          {{ value.replyMessageContent }}
        </div>
      </div>

      <!-- Phần input  -->
      <div class="relative min-h-[60px] flex items-end pt-3 pb-3">
        <!-- p1 -->
        <div
          v-tippy="{
            content: 'Mở hành động khác',
            theme: 'material',
            placement: 'top',
          }"
          class="flex items-center"
        >
          <div
            :style="{ display: toggle.inboxOneFocus ? 'block' : 'none' }"
            class="message-icon p-1 m-1 cursor-pointer"
          >
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="icons.messengerPlusActive"></span>
          </div>
          <div
            v-if="!toggle.inboxOneFocus"
            class="message-icon p-1 m-1 cursor-pointer"
          >
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="icons.messengerPlus"></span>
          </div>
        </div>
        <!-- p2 -->
        <div class="flex items-end">
          <div
            :class="{
              'input-middle-icon': value.inputData || value.previewImg,
            }"
            class="flex items-end"
          >
            <!-- Icon ảnh -->

            <div
              v-tippy="{
                content: 'Đính kèm ảnh',
                theme: 'material',
                placement: 'top',
              }"
            >
              <label class="custom-file-upload">
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*,.gif"
                  @change="handleFileUpload"
                />
                <!-- Ghi ở dưới để hiển thị thay thế cho input file -->
                <div
                  :style="{ display: toggle.inboxOneFocus ? 'block' : 'none' }"
                  class="message-icon p-1 ml-1 mr-1 mb-1 cursor-pointer"
                >
                  <!-- eslint-disable-next-line vue/no-v-html -->
                  <span v-html="icons.messengerImageActive"></span>
                </div>
              </label>

              <div
                v-if="!toggle.inboxOneFocus"
                class="message-icon p-1 ml-1 mr-1 mb-1 cursor-pointer"
              >
                <!-- eslint-disable-next-line vue/no-v-html -->
                <span v-html="icons.messengerImage"></span>
              </div>
            </div>

            <!-- Icon nhãn dán  -->
            <div
              v-tippy="{
                content: 'Chọn nhãn dán',
                theme: 'material',
                placement: 'top',
              }"
            >
              <div class="relative">
                <div
                  :style="{ display: toggle.inboxOneFocus ? 'block' : 'none' }"
                  class="message-icon p-1 ml-1 mr-1 mb-1 cursor-pointer"
                  @click.stop="handleShowSticker"
                >
                  <!-- eslint-disable-next-line vue/no-v-html -->
                  <span v-html="icons.messengerStickerActive"></span>
                </div>
                <!-- Nhãn dán -->
                <div class="iconButton cursor-pointer relative">
                  <div
                    v-if="toggle.showStickers"
                    style="
                      box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px
                        rgba(0, 0, 0, 0.23) 0px 6px 6px;
                    "
                    class="absolute bottom-[47px] left-[23px] -translate-x-1/2 w-[265px] h-[346px] rounded-lg bg-white overflow-hidden pt-1"
                  >
                    <sticker @handle-send-sticker="handleSendSticker" />
                  </div>
                </div>
              </div>

              <div
                v-if="!toggle.inboxOneFocus"
                class="message-icon p-1 ml-1 mr-1 mb-1 cursor-pointer"
              >
                <!-- eslint-disable-next-line vue/no-v-html -->
                <span v-html="icons.messengerSticker"></span>
              </div>
            </div>

            <!-- Icon Thẻ Gif  -->
            <div
              v-tippy="{
                content: 'Chọn file gif',
                theme: 'material',
                placement: 'top',
              }"
            >
              <div class="relative">
                <div
                  :style="{ display: toggle.inboxOneFocus ? 'block' : 'none' }"
                  class="message-icon p-1 ml-1 mr-1 mb-1 cursor-pointer"
                  @click="handleShowGif"
                >
                  <!-- eslint-disable-next-line vue/no-v-html -->
                  <span v-html="icons.messengerGifActive"></span>
                </div>
                <!-- Gif -->
                <div class="iconButton cursor-pointer relative">
                  <div
                    v-if="toggle.showGifs"
                    style="
                      box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px
                        rgba(0, 0, 0, 0.23) 0px 6px 6px;
                    "
                    class="absolute bottom-[47px] left-[23px] -translate-x-1/2 w-[275px] h-[335px] rounded-lg bg-white overflow-hidden pt-1"
                  >
                    <gif @handle-send-gif="handleSendGif" />
                  </div>
                </div>
              </div>

              <div
                v-if="!toggle.inboxOneFocus"
                class="message-icon p-1 ml-1 mr-1 mb-1 cursor-pointer"
              >
                <!-- eslint-disable-next-line vue/no-v-html -->
                <span v-html="icons.messengerGif"></span>
              </div>
            </div>
          </div>

          <!-- input -->
          <label
            :style="{
              'border-radius':
                value.inputData || value.previewImg ? '8px' : '25px',
            }"
            style="border: 1px solid rgb(233, 233, 233)"
            class="min-h-[40px] pl-1 relative box-border flex flex-col justify-center cursor-default align-middle bg-[#f0f2f5]"
          >
            <!-- Phần preview ảnh -->
            <div
              v-if="value.previewImg"
              class="flex items-center justify-center p-3 relative"
            >
              <div class="overflow-hidden w-[85px] h-[85px] rounded-lg">
                <img
                  class="w-full h-full object-cover"
                  :src="value.previewImg"
                  alt=""
                />
              </div>
              <div
                style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px"
                class="absolute top-[5%] right-[28%] w-[25px] h-[25px] overflow-hidden bg-white hover:bg-slate-100 rounded-full flex items-center justify-center cursor-pointer"
                @click="() => (value.previewImg = undefined)"
              >
                <!-- eslint-disable-next-line vue/no-v-html -->
                <span v-html="icons.previewImgX"></span>
              </div>
            </div>
            <!-- Phần nhập dữ liệu -->
            <div class="flex items-end">
              <textarea
                ref="messengerInput"
                v-model="value.inputData"
                tabindex="2"
                :rows="calculateRows"
                :cols="calculateCols"
                placeholder="Aa"
                style="padding: 7px 8px 9px; resize: none; line-height: 1.3333"
                class="outline-none text-[.9375rem] text-[#050505] placeholder:text-[#707276] bg-transparent overflow-x-hidden overflow-y-auto"
                @keyup.enter="
                  toggle.disableEnter ? () => {} : handleSendMessenger()
                "
              ></textarea>

              <div
                v-tippy="{
                  content: 'Chọn biểu tượng cảm xúc',
                  theme: 'material',
                  placement: 'top',
                }"
              >
                <div class="relative">
                  <div
                    :style="{
                      display: toggle.inboxOneFocus ? 'block' : 'none',
                    }"
                    class="message-icon p-1 mb-1 mr-1 cursor-pointer"
                    @click.stop="handleShowIcons"
                  >
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <span v-html="icons.messengerIconActive"></span>
                  </div>
                  <!-- Icon -->
                  <div class="iconButton cursor-pointer relative">
                    <div
                      v-if="toggle.showIcons"
                      style="
                        box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px
                          rgba(0, 0, 0, 0.23) 0px 6px 6px;
                      "
                      class="absolute bottom-[47px] left-[-140px] -translate-x-1/2 w-[324px] h-[264px] rounded-lg bg-white overflow-hidden pt-1"
                    >
                      <Icon @update:addIcon="addIcon" />
                    </div>
                  </div>
                  <!-- Icon -->
                </div>
                <div
                  v-if="!toggle.inboxOneFocus"
                  class="message-icon p-1 mb-1 mr-1 cursor-pointer"
                >
                  <!-- eslint-disable-next-line vue/no-v-html -->
                  <span v-html="icons.messengerIcon"></span>
                </div>
              </div>
            </div>
          </label>

          <!-- Input biến đổi -->
        </div>
        <!-- p3 -->
        <div
          v-tippy="{
            content: 'Gửi lượt thích',
            theme: 'material',
            placement: 'top',
          }"
          class="message-icon absolute p-2 ml-1 mr-1 mt-1 mb-[3px] cursor-pointer right-0"
        >
          <div :style="{ display: toggle.inboxOneFocus ? 'block' : 'none' }">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="icons.messengerLikeActive"></span>
          </div>
          <div v-if="!toggle.inboxOneFocus">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="icons.messengerLike"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { RepositoryFactory } from '../../../../apiConfig/RepositoryFactory'
import { socket } from '../../../../plugins/socket.io'
import {
  messengerPlus,
  messengerPlusActive,
  messengerMenu,
  messengerReact,
  messengerReply,
  messengerLikeActive,
  messengerLike,
  messengerIconActive,
  messengerIcon,
  messengerGifActive,
  messengerGif,
  messengerStickerActive,
  messengerSticker,
  messengerImageActive,
  messengerImage,
  previewImgX,
} from '../../../../assets/icons/icons'
import Icon from '../../../post/Icon.vue'
import Sticker from './Sticker.vue'
import Gif from './Gif.vue'
import MessengerInboxTop from './messengerInboxTop/messengerInboxTop.vue'
import NoneMessengerList from './messengerInboxMiddle/NoneMessengerList.vue'
const messengerRepository = RepositoryFactory.get('messenger')
export default {
  name: 'MessengerOtherInbox',
  components: { Icon, Sticker, Gif, MessengerInboxTop, NoneMessengerList },
  props: {
    messengerOtherValue: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      icons: {
        messengerPlus,
        messengerPlusActive,
        messengerMenu,
        messengerReact,
        messengerReply,
        messengerLikeActive,
        messengerLike,
        messengerIconActive,
        messengerIcon,
        messengerGifActive,
        messengerGif,
        messengerStickerActive,
        messengerSticker,
        messengerImageActive,
        messengerImage,
        previewImgX,
      },
      value: {
        inputData: undefined,
        previewImg: undefined,
        messageImg: undefined,
        messageSticker: undefined,
        replyMessageId: undefined,
        replyMessageContent: undefined,
        replyUser: undefined,
        gif: undefined,
        rows: 1,
      },
      toggle: {
        inboxOneFocus: false,
        showIcons: false,
        showStickers: false,
        showGifs: false,
        disableEnter: false,
      },
      messagesList: [],
      test: true,
    }
  },
  computed: {
    // Thay đổi chiều dài của input khi nhập dữ liệu
    calculateRows() {
      return this.value.inputData || this.value.previewImg ? 2 : 1
    },
    user() {
      return this.$store.state.authModule.user
    },
  },
  watch: {
    messengerOtherValue() {
      this.handleRenderConversation()
    },
  },
  created() {
    this.handleRenderConversation()
    socket.on('receive_messages', () => {
      this.handleRenderConversation()
      console.log('a3')
    })
  },
  mounted() {
    // Tập trung vào phần tử input sau khi component được kết nối vào DOM.
    this.$refs.messengerInput.focus()
    // this.handleRenderConversation()
    socket.on('receive_messages', () => {
      try {
        this.handleRenderConversation()
        console.log('a3')
      } catch (error) {
        console.log('error', error)
      }
    })
  },

  methods: {
    // Render hội thoại
    async handleRenderConversation() {
      try {
        let response

        if (this.messengerOtherValue.conversationId) {
          response = await messengerRepository.renderByConversationId({
            accountHasLoginId: this.user.user_id,
            conversationId: this.messengerOtherValue.conversationId,
          })
          console.log('111111', response.data)
        }

        this.messagesList = response.data
        this.$nextTick(this?.scrollToBottom)
        setTimeout(() => {
          this.$nextTick(this?.scrollToBottom)
        }, 5)
      } catch (error) {
        console.log(error)
      }
    },

    scrollToBottom() {
      const chatHistory = this.$refs.chatHistory
      if (chatHistory) {
        chatHistory.scrollTop = chatHistory?.scrollHeight
      }
    },

    // Gửi tin nhắn
    async handleSendMessenger() {
      console.log('Giá trị input ====>', this.value.inputData)
      if (this.value.inputData || this.value.messageImg) {
        if (this.messengerValueOne) {
          try {
            await messengerRepository.sendMessage({
              messageContent: this.value.inputData.trim(),
              fromUserId: this.user.user_id,
              toUserId: this.messengerValueOne.toUserId,
              messageImg: this.value.messageImg,
              replyMessageId: this.value.replyMessageId,
              replyMessageContent: this.value.replyMessageContent,
            })
            socket.emit('send_message', this.messengerValueOne.toUserId)
            this.value.inputData = undefined
            this.value.previewImg = undefined
            this.value.messageImg = undefined
            this.value.replyMessageId = undefined
            this.value.replyMessageContent = undefined
            this.handleRenderConversation()
          } catch (error) {}
        }
      }
    },

    // Gửi sticker
    async handleSendSticker(value) {
      if (this.messengerValueOne) {
        try {
          await messengerRepository.sendMessage({
            fromUserId: this.user.user_id,
            toUserId: this.messengerValueOne.toUserId,
            messageSticker: value,
          })
          socket.emit('send_message', this.messengerValueOne.toUserId)
          this.toggle.showStickers = false
          this.handleRenderConversation()
        } catch (error) {}
      }
      if (this.messengerValueTwo) {
        try {
          await messengerRepository.sendMessage({
            fromUserId: this.user.user_id,
            toUserId: this.messengerValueTwo.toUserId,
            messageSticker: value,
          })
          socket.emit('send_message', this.messengerValueTwo.toUserId)
          this.toggle.showStickers = false
          this.handleRenderConversation()
        } catch (error) {}
      }
    },

    // Gửi gif
    async handleSendGif(value) {
      if (this.messengerValueOne) {
        try {
          await messengerRepository.sendMessage({
            fromUserId: this.user.user_id,
            toUserId: this.messengerValueOne.toUserId,
            messageImg: value,
          })
          socket.emit('send_message', this.messengerValueOne.toUserId)
          this.toggle.showGifs = false
          this.handleRenderConversation()
        } catch (error) {}
      }
      if (this.messengerValueTwo) {
        try {
          await messengerRepository.sendMessage({
            fromUserId: this.user.user_id,
            toUserId: this.messengerValueTwo.toUserId,
            messageImg: value,
          })
          socket.emit('send_message', this.messengerValueTwo.toUserId)
          this.toggle.showGifs = false
          this.handleRenderConversation()
        } catch (error) {}
      }
    },

    // focus vào thì đổi màu
    setFocus(value) {
      this.toggle.inboxOneFocus = value
      // this.$refs.messengerInput.focus()
    },

    async handleFileUpload() {
      this.toggle.disableEnter = true
      const file = this.$refs.fileInput.files[0]
      const fileType = file?.type
      if (fileType.includes('image/') || fileType === 'image/gif') {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.value.previewImg = e.target.result
        }
        reader.readAsDataURL(file)
      }

      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'facebook')
      try {
        const [uploadMedia] = await Promise.all([
          axios.post(
            'https://api.cloudinary.com/v1_1/dfftvwiej/image/upload',
            formData
          ),
        ])
        this.value.messageImg = uploadMedia.data.secure_url
        this.toggle.disableEnter = false
      } catch (error) {
        // Xử lý lỗi khi gửi yêu cầu lên Cloudinary
        console.error('Lỗi khi tải lên hình ảnh:', error)
      }
    },

    // Hàm hiện lên trả lời tin nhắn
    handleRenderReply(value) {
      console.log('rpl', value.userId)
      if (+value.userId === this.user.user_id) {
        this.value.replyUser = ' chính mình'
      }
      if (+value.userId !== +this.user.user_id) {
        if (this.messengerValueOne) {
          this.value.replyUser = this.messengerValueOne.toUserName
        } else {
          this.value.replyUser = this.messengerValueTwo.toUserName
        }
      }
      this.value.replyMessageId = value.messageId
      this.value.replyMessageContent = value.messageContent
    },

    handleCancelReply() {
      this.value.replyMessageId = undefined
      this.value.replyMessageContent = undefined
    },

    async handlePatchMessage(value) {
      if (this.messengerValueOne) {
        try {
          await messengerRepository.patchMessage(value)

          socket.emit('send_message', this.messengerValueOne.toUserId)
          this.handleRenderConversation()
        } catch (error) {}
      }
    },

    handleShowSticker() {
      this.toggle.showStickers = !this.toggle.showStickers
      this.toggle.showIcons = false
      this.toggle.showGifs = false
    },

    handleShowGif() {
      this.toggle.showGifs = !this.toggle.showGifs
      this.toggle.showIcons = false
      this.toggle.showStickers = false
    },

    handleShowIcons() {
      this.toggle.showIcons = !this.toggle.showIcons
      this.toggle.showGifs = false
      this.toggle.showStickers = false
    },
  },
}
</script>

<style scoped>
.inbox-one {
  opacity: 0;
}

.input-middle-icon {
  display: none !important;
}

.message-icon:hover {
  border-radius: 100%;
  background-color: #e3e5eba3;
  cursor: pointer;
}

/* Ẩn nút "Chọn tệp..." */
input[type='file'] {
  display: none;
}

.custom-file-upload::before {
  content: ''; /* Xóa văn bản */
}

.options {
  display: none;
}

.normal-message:hover .options {
  display: flex;
  align-items: center;
}
</style>
