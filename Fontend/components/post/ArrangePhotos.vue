<template lang="">
  <div class="w-full h-full cursor-pointer">
    <!-- =========Tổng bằng 1 ============= -->
    <div v-if="listMedia.length === 1">
      <div v-if="landscape.length === 1" >
        <div
          v-for="(item, index) in landscape"
          :key="index"
          class="w-full h-full flex items-center justify-center"
        >
          <img
            v-if="item.type === 'image'"
            class="object-cover w-full"
            :src="item.url"
            @click="handlePostDetailt(item.postId)"
          />
          <video v-else class="object-cover w-full" controls>
            <source :src="item.url" type="video/mp4" />
          </video>
        </div>
      </div>
      <div v-else>
        <div
          v-for="(item, index) in portrait"
          :key="index"
          class="w-full h-full flex items-center justify-center bg-black"
          @click="handlePostDetailt(item.postId)"
        >
          <img
            v-if="item.type === 'image'"
            class="object-cover w-full"
            :src="item.url"
            @click="handlePostDetailt(item.postId)"
          />
          <video v-else class="object-cover w-3/5" controls>
            <source :src="item.url" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>

    <!-- =========Tổng bằng 2 ============= -->
    <div v-if="listMedia.length === 2">
      <div
        v-if="landscape.length === 2"
        class="w-full flex flex-col items-center gap-1"
        :style="'height:' + height + 'px'"
      >
        <div
          v-for="(item, index) in landscape"
          :key="index"
          class="w-full flex items-center justify-center"
          :style="'height:' + height / 2 + 'px'"
        >
          <img
            v-if="item?.type === 'image'"
            class="object-cover w-full h-full"
            :src="item?.url"
            @click="handlePostDetailt(item.postId)"
          />
          <video
            v-if="item?.type === 'video'"
            class="object-cover w-full h-full"
            controls
          >
            <source :src="item?.url" type="video/mp4" />
          </video>
        </div>
      </div>

      <div
        v-if="landscape.length === 1 && portrait.length === 1"
        class="w-full flex items-center gap-1"
        :style="'height:' + height / 2 + 'px'"
      >
        <div class="w-1/2 h-full flex items-center justify-center">
          <img
            v-if="landscape[0].type === 'image'"
            class="object-cover w-full h-full"
            :src="landscape[0].url"
            @click="handlePostDetailt(landscape[0].postId)"
          />
          <video v-else class="object-cover w-full h-full" controls>
            <source :src="landscape[0].url" type="video/mp4" />
          </video>
        </div>

        <div class="w-1/2 h-full flex items-center justify-center">
          <img
            v-if="portrait[0].type === 'image'"
            class="object-cover w-full h-full"
            :src="portrait[0].url"
            @click="handlePostDetailt(portrait[0].postId)"
          />
          <video v-else class="object-cover w-full h-full" controls>
            <source :src="portrait[0].url" type="video/mp4" />
          </video>
        </div>
      </div>

      <div
        v-if="landscape.length === 0"
        class="w-full flex items-center gap-1"
        :style="'height:' + height + 'px'"
      >
        <div
          v-for="(item, index) in portrait"
          :key="index"
          class="w-1/2 flex items-center justify-center"
          :style="'height:' + height + 'px'"
        >
          <img
            v-if="item?.type === 'image'"
            class="object-cover w-full h-full"
            :src="item?.url"
            @click="handlePostDetailt(item.postId)"
          />
          <video v-else class="object-cover w-full h-full" controls>
            <source :src="item?.url" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>

    <!-- =========Tổng bằng 3 ============= -->
    <div v-if="listMedia.length === 3">
      <div
        v-if="landscape.length === 2"
        class="w-full flex flex-col items-center gap-1"
        :style="'height:' + height + 'px'"
      >
        <div
          v-for="(item, index) in portrait"
          :key="index"
          class="w-full flex items-center justify-center gap-1"
          :style="'height:' + height / 2 + 'px'"
        >
          <img
            v-if="item.type === 'image'"
            class="object-cover w-full h-full"
            :src="item.url"
            @click="handlePostDetailt(item.postId)"
          />
          <video v-else class="object-cover w-full h-full" controls>
            <source :src="item.url" type="video/mp4" />
          </video>
        </div>

        <div
          class="w-full flex items-center gap-1"
          :style="'height:' + height / 2 + 'px'"
        >
          <div
            v-for="(item, index) in landscape"
            :key="index"
            class="w-1/2 h-full flex items-center justify-center gap-1"
          >
            <img
              v-if="item.type === 'image'"
              class="object-cover w-full h-full"
              :src="item.url"
              @click="handlePostDetailt(item.postId)"
            />
            <video v-else class="object-cover w-full h-full" controls>
              <source :src="item.url" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <div
        v-if="landscape.length === 3"
        class="w-full flex flex-col items-center gap-1"
        :style="'height:' + height + 'px'"
      >
        <div
          class="w-full flex items-center justify-center"
          :style="'height:' + height / 2 + 'px'"
        >
          <img
            v-if="landscape[0]?.type === 'image'"
            class="object-cover w-full h-full"
            :src="landscape[0]?.url"
            @click="handlePostDetailt(landscape[0]?.postId)"
          />
          <video
            v-show="landscape[0]?.type === 'video'"
            class="object-cover w-full h-full"
            controls
          >
            <source :src="landscape[0]?.url" type="video/mp4" />
          </video>
        </div>

        <div
          class="w-full flex items-center gap-1"
          :style="'height:' + height / 2 + 'px'"
        >
          <div class="w-1/2 h-full flex items-center justify-center">
            <img
              v-if="landscape[1]?.type === 'image'"
              class="object-cover w-full h-full"
              :src="landscape[1]?.url"
              @click="handlePostDetailt(landscape[1]?.postId)"
            />
            <video
              v-if="landscape[1]?.type === 'video'"
              class="object-cover w-full h-full"
              controls
            >
              <source :src="landscape[1]?.url" type="video/mp4" />
            </video>
          </div>
          <div class="w-1/2 h-full flex items-center justify-center">
            <img
              v-if="landscape[2]?.type === 'image'"
              class="object-cover w-full h-full"
              :src="landscape[2]?.url"
              @click="handlePostDetailt(landscape[2]?.postId)"
            />
            <video
              v-if="landscape[2]?.type === 'video'"
              class="object-cover w-full h-full"
              controls
            >
              <source :src="landscape[2]?.url" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <div
        v-if="landscape.length === 1"
        class="w-full flex items-center gap-1"
        :style="'height:' + height + 'px'"
      >
        <div class="w-1/2 h-full flex items-center justify-center">
          <img
            v-if="portrait[0]?.type === 'image'"
            class="object-cover w-full h-full"
            :src="portrait[0]?.url"
            @click="handlePostDetailt(portrait[0]?.postId)"
          />
          <video v-else class="object-cover w-full h-full" controls>
            <source :src="portrait[0]?.url" type="video/mp4" />
          </video>
        </div>

        <div class="w-1/2 h-full flex flex-col items-center gap-1">
          <div class="w-full h-1/2 flex items-center justify-center">
            <img
              v-if="landscape[0]?.type === 'image'"
              class="object-cover w-full h-full"
              :src="landscape[0]?.url"
              @click="handlePostDetailt(landscape[0]?.postId)"
            />
            <video v-else class="object-cover w-full h-full" controls>
              <source :src="landscape[0]?.url" type="video/mp4" />
            </video>
          </div>
          <div class="w-full h-1/2 flex items-center justify-center">
            <img
              v-if="portrait[1]?.type === 'image'"
              class="object-cover w-full h-full"
              :src="portrait[1]?.url"
              @click="handlePostDetailt(portrait[1]?.postId)"
            />
            <video v-else class="object-cover w-full h-full" controls>
              <source :src="portrait[1]?.url" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <div
        v-if="landscape.length === 0"
        class="w-full flex items-center gap-1"
        :style="'height:' + height + 'px'"
      >
        <div class="w-2/3 h-full flex items-center justify-center">
          <img
            v-if="portrait[0]?.type === 'image'"
            class="object-cover w-full h-full"
            :src="portrait[0]?.url"
            @click="handlePostDetailt(portrait[0]?.postId)"
          />
          <video v-else class="object-cover w-full h-full" controls>
            <source :src="portrait[0]?.url" type="video/mp4" />
          </video>
        </div>

        <div class="w-1/3 h-full flex flex-col items-center gap-1">
          <div class="w-full h-1/2 flex items-center justify-center">
            <img
              v-if="portrait[1]?.type === 'image'"
              class="object-cover w-full h-full"
              :src="portrait[1]?.url"
              @click="handlePostDetailt(portrait[1]?.postId)"
            />
            <video v-else class="object-cover w-full h-full" controls>
              <source :src="portrait[1]?.url" type="video/mp4" />
            </video>
          </div>
          <div class="w-full h-1/2 flex items-center justify-center">
            <img
              v-if="portrait[2]?.type === 'image'"
              class="object-cover w-full h-full"
              :src="portrait[2]?.url"
              @click="handlePostDetailt(portrait[2]?.postId)"
            />
            <video v-else class="object-cover w-full h-full" controls autoplay>
              <source :src="portrait[2]?.url" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>

    <!-- =========Tổng bằng 4 ============= -->
    <div v-if="listMedia.length === 4">
      <div v-if="landscape.length === 4" :style="'height:' + height + 'px'">
        <div class="w-full h-2/3 flex items-center justify-center">
          <img
            v-if="landscape[3]?.type === 'image'"
            class="object-cover w-full h-full"
            :src="landscape[3]?.url"
            @click="handlePostDetailt(landscape[3]?.postId)"
          />
          <video v-else class="object-cover w-full h-full" controls>
            <source :src="landscape[3]?.url" type="video/mp4" />
          </video>
        </div>
        <div class="flex items-center">
          <div
            v-for="(item, index) in landscape"
            :key="index"
            class="w-1/3 h-1/3 flex items-center justify-center"
          >
            <img
              v-if="index <= 2 && item.type === 'image'"
              class="object-cover w-full h-full"
              :src="item.url"
              @click="handlePostDetailt(item.postId)"
            />
            <video
              v-if="index <= 2 && item.type === 'video'"
              class="object-cover w-full h-full"
              controls
            >
              <source :src="item.url" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <div v-if="landscape.length === 3" :style="'height:' + height + 'px'">
        <div class="w-full h-2/3 flex items-center justify-center">
          <img
            v-if="landscape[2]?.type === 'image'"
            class="object-cover w-full h-full"
            :src="landscape[2]?.url"
            @click="handlePostDetailt(landscape[2]?.postId)"
          />
          <video v-else class="object-cover w-full h-full" controls>
            <source :src="landscape[2]?.url" type="video/mp4" />
          </video>
        </div>
        <div class="flex items-center w-1/3 h-1/3">
          <div class="w-full h-full flex items-center justify-center">
            <img
              v-if="landscape[1]?.type === 'image'"
              class="object-cover w-full h-full"
              :src="landscape[1]?.url"
              @click="handlePostDetailt(landscape[1]?.postId)"
            />
            <video v-else class="object-cover w-full h-full" controls>
              <source :src="landscape[1]?.url" type="video/mp4" />
            </video>
          </div>
          <div class="w-full h-full flex items-center justify-center">
            <img
              v-if="landscape[0]?.type === 'image'"
              class="object-cover w-full h-full"
              :src="landscape[0]?.url"
              @click="handlePostDetailt(landscape[0]?.postId)"
            />
            <video v-else class="object-cover w-full h-full" controls>
              <source :src="landscape[0]?.url" type="video/mp4" />
            </video>
          </div>
          <div class="w-full h-full flex items-center justify-center">
            <img
              v-if="portrait[0]?.type === 'image'"
              class="object-cover w-full h-full"
              :src="portrait[0]?.url"
              @click="handlePostDetailt(portrait[0]?.postId)"
            />
            <video v-else class="object-cover w-full h-full" controls>
              <source :src="portrait[0]?.url" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <div v-if="landscape.length === 2" :style="'height:' + height + 'px'">
        <div class="w-full h-2/3 flex items-center justify-center">
          <img
            v-if="landscape[1]?.type === 'image'"
            class="object-cover w-full h-full"
            :src="landscape[1]?.url"
            @click="handlePostDetailt(landscape[1]?.postId)"
          />
          <video v-else class="object-cover w-full h-full" controls>
            <source :src="landscape[1]?.url" type="video/mp4" />
          </video>
        </div>
        <div class="flex w-1/3 h-1/3 items-center">
          <div class="w-full h-full flex items-center justify-center">
            <img
              v-if="landscape[0]?.type === 'image'"
              class="object-cover w-full h-full"
              :src="landscape[0]?.url"
              @click="handlePostDetailt(landscape[0]?.postId)"
            />
            <video v-else class="object-cover w-full h-full" controls>
              <source :src="landscape[0]?.url" type="video/mp4" />
            </video>
          </div>
          <div class="w-full h-full flex items-center justify-center">
            <img
              v-if="portrait[1]?.type === 'image'"
              class="object-cover w-full h-full"
              :src="portrait[1]?.url"
              @click="handlePostDetailt(portrait[1]?.postId)"
            />
            <video v-else class="object-cover w-full h-full" controls>
              <source :src="portrait[1]?.url" type="video/mp4" />
            </video>
          </div>
          <div class="w-full h-full flex items-center justify-center">
            <img
              v-if="portrait[0]?.type === 'image'"
              class="object-cover w-full h-full"
              :src="portrait[0]?.url"
              @click="handlePostDetailt(portrait[0]?.postId)"
            />
            <video v-else class="object-cover w-full h-full" controls>
              <source :src="portrait[0]?.url" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <div
        v-if="landscape.length === 1"
        class="w-full flex items-center gap-1"
        :style="'height:' + height + 'px'"
      >
        <div class="w-2/3 h-full flex items-center justify-center">
          <img
            v-if="portrait[2]?.type === 'image'"
            class="object-cover w-full h-full"
            :src="portrait[2]?.url"
            @click="handlePostDetailt(portrait[2]?.postId)"
          />
          <video v-else class="object-cover w-full h-full" controls>
            <source :src="portrait[2]?.url" type="video/mp4" />
          </video>
        </div>
        <div class="w-1/3 h-full flex flex-col items-center gap-1">
          <div class="w-full h-1/3 flex items-center justify-center">
            <img
              v-if="landscape[0]?.type === 'image'"
              class="object-cover w-full h-full"
              :src="landscape[0]?.url"
              @click="handlePostDetailt(landscape[0]?.postId)"
            />
            <video v-else class="object-cover w-full h-full" controls>
              <source :src="landscape[0]?.url" type="video/mp4" />
            </video>
          </div>
          <div
            v-for="(item, index) in portrait"
            :key="index"
            class="w-full h-1/3 flex items-center justify-center"
          >
            <img
              v-if="index < 2 && item.type === 'image'"
              class="object-cover w-full h-full"
              :src="item.url"
              @click="handlePostDetailt(item.postId)"
            />
            <video
              v-if="index < 2 && item.type === 'video'"
              class="object-cover w-full h-full"
              controls
            >
              <source :src="item.url" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <div
        v-if="landscape.length === 0"
        class="w-full flex items-center gap-1"
        :style="'height:' + height + 'px'"
      >
        <div class="w-2/3 h-full flex items-center justify-center">
          <img
            v-if="portrait[3]?.type === 'image'"
            class="object-cover w-full h-full"
            :src="portrait[3]?.url"
            @click="handlePostDetailt(portrait[3]?.postId)"
          />
          <video v-else class="object-cover w-full h-full" controls>
            <source :src="portrait[3]?.url" type="video/mp4" />
          </video>
        </div>
        <div class="w-1/3 h-full flex flex-col items-center gap-1">
          <div
            v-for="(item, index) in portrait"
            :key="index"
            class="w-full h-1/3 flex items-center justify-center"
          >
            <img
              v-if="index < 3 && item.type === 'image'"
              class="object-cover w-full h-full"
              :src="item.url"
              @click="handlePostDetailt(item.postId)"
            />
            <video
              v-if="index < 3 && item.type === 'video'"
              class="object-cover w-full h-full"
              controls
            >
              <source :src="item.url" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>

    <!-- =========Tổng bằng >=5 ============= -->
    <div v-if="listMedia.length >= 5">
      <div
        v-if="landscape.length >= 5"
        class="flex gap-1"
        :style="'height:' + height + 'px'"
      >
        <div class="flex flex-col items-center w-1/2 gap-1">
          <div class="w-full h-1/2 flex items-center justify-center">
            <img
              v-if="landscape[4]?.type === 'image'"
              class="object-cover w-full h-full"
              :src="landscape[4]?.url"
              @click="handlePostDetailt(landscape[4]?.postId)"
            />
            <video v-else class="object-cover w-full h-full" controls>
              <source
                :src="landscape[4]?.url"
                type="video/mp4"
              />
            </video>
          </div>
          <div class="w-full h-1/2 flex items-center justify-center">
            <img
              v-if="landscape[3]?.type === 'image'"
              class="object-cover w-full h-full"
              :src="landscape[3]?.url"
              @click="handlePostDetailt(landscape[3]?.postId)"
            />
            <video v-else class="object-cover w-full h-full" controls>
              <source
                :src="landscape[3]?.url"
                type="video/mp4"
              />
            </video>
          </div>
        </div>

        <div class="flex flex-col items-center w-1/2 gap-1 relative">
          <div class="w-full h-1/3 flex items-center justify-center">
            <img
              v-if="landscape[2]?.type === 'image'"
              class="object-cover w-full h-full"
              :src="landscape[2]?.url"
              @click="handlePostDetailt(landscape[2]?.postId)"
            />
            <video v-else class="object-cover w-full h-full" controls>
              <source :src="landscape[2]?.url" type="video/mp4" />
            </video>
          </div>
          <div class="w-full h-1/3 flex items-center justify-center">
            <img
              v-if="landscape[1]?.type === 'image'"
              class="object-cover w-full h-full"
              :src="landscape[1]?.url"
              @click="handlePostDetailt(landscape[1]?.postId)"
            />
            <video v-else class="object-cover w-full h-full" controls>
              <source :src="landscape[1]?.url" type="video/mp4" />
            </video>
          </div>
          <div class="w-full h-1/3 flex items-center justify-center relative">
            <img
              v-if="landscape[0]?.type === 'image'"
              class="object-cover w-full h-full"
              :src="landscape[0]?.url"
              @click="handlePostDetailt(landscape[0]?.postId)"
            />
            <video v-else class="object-cover w-full h-full" controls>
              <source :src="landscape[0]?.url" type="video/mp4" />
            </video>
            <div
              class="absolute z-20 text-white font-semibold text-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              +{{ listMedia.length - 5 }}
            </div>
            <div class="absolute bg-black z-10 w-full h-full opacity-50"></div>
          </div>
        </div>
      </div>

      <div
        v-if="landscape.length === 4"
        class="flex flex-col gap-1"
        :style="'height:' + height + 'px'"
      >
        <div class="flex items-center w-1/2 h-1/2 gap-1">
          <div class="w-full h-full flex items-center justify-center">
            <img
              v-if="landscape[landscape.length - 1]?.type === 'image'"
              class="object-cover w-full h-full"
              :src="landscape[landscape.length - 1]?.url"
              @click="handlePostDetailt(landscape[landscape.length - 1]?.postId)"
            />
            <video v-else class="object-cover w-full h-full" controls>
              <source
                :src="landscape[landscape.length - 1]?.url"
                type="video/mp4"
              />
            </video>
          </div>
          <div class="w-full h-full flex items-center justify-center">
            <img
              v-if="landscape[landscape.length - 2]?.type === 'image'"
              class="object-cover w-full h-full"
              :src="landscape[landscape.length - 2]?.url"
              @click="handlePostDetailt(landscape[landscape.length - 2]?.postId)"
            />
            <video v-else class="object-cover w-full h-full" controls>
              <source
                :src="landscape[landscape.length - 2]?.url"
                type="video/mp4"
              />
            </video>
          </div>
        </div>

        <div class="flex items-center w-full h-1/2 gap-1 relative">
          <div class="w-1/3 h-full flex items-center justify-center">
            <img
              v-if="portrait[0]?.type === 'image'"
              class="object-cover w-full h-full"
              :src="portrait[0]?.url"
              @click="handlePostDetailt(portrait[0]?.postId)"
            />
            <video v-else class="object-cover w-full h-full" controls>
              <source :src="portrait[0]?.url" type="video/mp4" />
            </video>
          </div>
          <div class="w-1/3 h-full flex items-center justify-center">
            <img
              v-if="landscape[1]?.type === 'image'"
              class="object-cover w-full h-full"
              :src="landscape[1]?.url"
              @click="handlePostDetailt(landscape[1]?.postId)"
            />
            <video v-else class="object-cover w-full h-full" controls>
              <source :src="landscape[1]?.url" type="video/mp4" />
            </video>
          </div>
          <div class="w-1/3 h-full flex items-center justify-center relative">
            <img
              v-if="landscape[0]?.type === 'image'"
              class="object-cover w-full h-full"
              :src="landscape[0]?.url"
              @click="handlePostDetailt(landscape[0]?.postId)"
            />
            <video v-else class="object-cover w-full h-full" controls>
              <source :src="landscape[0]?.url" type="video/mp4" />
            </video>
            <div
              class="absolute z-20 text-white font-semibold text-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              +{{ listMedia.length - 5 }}
            </div>
            <div class="absolute bg-black z-10 w-full h-full opacity-50"></div>
          </div>
        </div>
      </div>

      <div
        v-if="landscape.length === 3"
        class="flex gap-1"
        :style="'height:' + height + 'px'"
      >
        <div class="flex flex-col w-1/2 h-full gap-1">
          <div class="w-full h-1/2 flex items-center justify-center">
            <img
              v-if="portrait[0]?.type === 'image'"
              class="object-cover w-full h-full"
              :src="portrait[0]?.url"
              @click="handlePostDetailt(portrait[0]?.postId)"
            />
            <video v-else class="object-cover w-full h-full" controls>
              <source :src="portrait[0]?.url" type="video/mp4" />
            </video>
          </div>
          <div class="w-full h-1/2 flex items-center justify-center">
            <img
              v-if="portrait[1]?.type === 'image'"
              class="object-cover w-full h-full"
              :src="portrait[1]?.url"
              @click="handlePostDetailt(portrait[1]?.postId)"
            />
            <video v-else class="object-cover w-full h-full" controls>
              <source :src="portrait[1]?.url" type="video/mp4" />
            </video>
          </div>
        </div>

        <div class="flex flex-col items-center w-1/2 h-full gap-1">
          <div class="w-full h-1/3 flex items-center justify-center">
            <img
              v-if="landscape[0]?.type === 'image'"
              class="object-cover w-full h-full"
              :src="landscape[0]?.url"
              @click="handlePostDetailt(landscape[0]?.postId)"
            />
            <video v-else class="object-cover w-full h-full" controls>
              <source :src="landscape[0]?.url" type="video/mp4" />
            </video>
          </div>
          <div class="w-full flex items-center justify-center" :style="'height:' + height/3 + 'px'">
            <img
              v-if="landscape[1]?.type === 'image'"
              class="object-cover w-full h-full"
              :src="landscape[1]?.url"
              @click="handlePostDetailt(landscape[1]?.postId)"
            />
            <video v-else class="object-cover w-full h-full" controls>
              <source :src="landscape[1]?.url" type="video/mp4" />
            </video>
          </div>
          <div class="w-full h-1/3 flex items-center justify-center relative">
            <img
              v-if="portrait[2]?.type === 'image'"
              class="object-cover w-full h-full"
              :src="portrait[2]?.url"
              @click="handlePostDetailt(portrait[2]?.postId)"
            />
            <video v-else class="object-cover w-full h-full" controls>
              <source :src="portrait[2]?.url" type="video/mp4" />
            </video>
            <div
              class="absolute z-20 text-white font-semibold text-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              +{{ listMedia.length - 5 }}
            </div>
            <div class="absolute bg-black z-10 w-full h-full opacity-50"></div>
          </div>
        </div>
      </div>

      <div  v-if="landscape.length === 2" class="flex flex-col gap-1" :style="'height:' + height + 'px'">
        <div class="w-full h-1/2 flex gap-1 items-center justify-center">
          <div class="w-1/2 h-full">
            <img
              v-if="landscape[1]?.type === 'image'"
              class="object-cover w-full h-full"
              :src="landscape[1]?.url"
              @click="handlePostDetailt(landscape[1]?.postId)"
            />
            <video v-else class="object-cover w-full h-full" controls>
              <source :src="landscape[1]?.url" type="video/mp4" />
            </video>
          </div>
          <div class="w-1/2 h-full">
            <img
              v-if="landscape[0]?.type === 'image'"
              class="object-cover w-full h-full"
              :src="landscape[0]?.url"
              @click="handlePostDetailt(landscape[0]?.postId)"
            />
            <video v-else class="object-cover w-full h-full" controls>
              <source :src="landscape[0]?.url" type="video/mp4" />
            </video>
          </div>
        </div>
        <div class="flex items-center gap-1 h-1/2">
          <div class="w-1/3 h-full flex gap-1 items-center justify-center">
            <img
              v-if="portrait[2]?.type === 'image'"
              class="object-cover w-full h-full"
              :src="portrait[2]?.url"
              @click="handlePostDetailt(portrait[2]?.postId)"
            />
            <video v-else class="object-cover w-full h-full" controls>
              <source :src="portrait[2]?.url" type="video/mp4" />
            </video>
          </div>
          <div class="w-1/3 h-full flex gap-1 items-center justify-center">
            <img
              v-if="portrait[1]?.type === 'image'"
              class="object-cover w-full h-full"
              :src="portrait[1]?.url"
              @click="handlePostDetailt(portrait[1]?.postId)"
            />
            <video v-else class="object-cover w-full h-full" controls>
              <source :src="portrait[1]?.url" type="video/mp4" />
            </video>
          </div>
          <div class="w-1/3 h-full flex gap-1 items-center justify-center relative">
            <img
              v-if="portrait[0]?.type === 'image'"
              class="object-cover w-full h-full"
              :src="portrait[0]?.url"
              @click="handlePostDetailt(portrait[0]?.postId)"
            />
            <video v-else class="object-cover w-full h-full" controls>
              <source :src="portrait[0]?.url" type="video/mp4" />
            </video>
            <div
              class="absolute z-20 text-white font-semibold text-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              +{{ listMedia.length - 5 }}
            </div>
            <div class="absolute bg-black z-10 w-full h-full opacity-50"></div>
          </div>
        </div>
      </div>

      <div
        v-if="landscape.length === 1"
        class="w-full flex items-center gap-1"
        :style="'height:' + height + 'px'"
      >
        <div class="w-2/3 h-full flex items-center justify-center">
          <img
            v-if="portrait[2]?.type === 'image'"
            class="object-cover w-full h-full"
            :src="portrait[2]?.url"
            @click="handlePostDetailt(portrait[2]?.postId)"
          />
          <video v-else class="object-cover w-full h-full" controls>
            <source :src="portrait[2]?.url" type="video/mp4" />
          </video>
        </div>
        <div class="w-1/3 h-full flex flex-col items-center gap-1">
          <div class="w-full h-1/3 flex items-center justify-center">
            <img
              v-if="landscape[0]?.type === 'image'"
              class="object-cover w-full h-full"
              :src="landscape[0]?.url"
              @click="handlePostDetailt(landscape[0]?.postId)"
            />
          </div>
          <div
            v-for="(item, index) in portrait"
            :key="index"
            class="w-full h-1/3 flex items-center justify-center"
          >
            <img
              v-if="index < 2 && item.type === 'image'"
              class="object-cover w-full h-full"
              :src="item.url"
              @click="handlePostDetailt(item.postId)"
            />
            <video
              v-if="index < 2 && item.type === 'video'"
              class="object-cover w-full h-full"
              controls
            >
              <source :src="item.url" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <div
        v-if="landscape.length === 0"
        class="w-full flex items-center gap-1"
        :style="'height:' + height + 'px'"
      >
        <div class="w-2/3 h-full flex items-center justify-center">
          <img
            v-if="portrait[3]?.type === 'image'"
            class="object-cover w-full h-full"
            :src="portrait[3]?.url"
            @click="handlePostDetailt(portrait[3]?.postId)"
          />
          <video v-else class="object-cover w-full h-full" controls>
            <source :src="portrait[3]?.url" type="video/mp4" />
          </video>
        </div>
        <div class="w-1/3 h-full flex flex-col items-center gap-1">
          <div
            v-for="(item, index) in portrait"
            :key="index"
            class="w-full h-1/3 flex items-center justify-center"
          >
            <img
              v-if="index < 3 && item.type === 'image'"
              class="object-cover w-full h-full"
              :src="item.url"
              @click="handlePostDetailt(item.postId)"
            />
            <video
              v-if="index < 3 && item.type === 'video'"
              class="object-cover w-full h-full"
              controls
            >
              <source :src="item.url" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ArrangePhotos',
  props: {
    listImages: {
      type: Array,
      default: () => [],
    },
    listVideos: {
      type: Array,
      default: () => [],
    },
    height: {
      type: String,
      default: '466',
    },
  },

  data() {
    return {
      landscape: [],
      portrait: [],
      listMedia: [],
    }
  },
  // computed:{
  //   user() {
  //     return this.$store.state.authModule.user
  //   },
  // }
  // ,

  created() {
    this.listMedia = [...this.listImages, ...this.listVideos]
    
    this.listImages.forEach((imgUrl) => {
      if (imgUrl.url) {
        const img = new Image()
        img.src = imgUrl.url
        img.onload = () => {
          img.naturalWidth >= img.naturalHeight
            ? this.landscape.push({ url: imgUrl.url, type: 'image', postId: imgUrl?.postId })
            : this.portrait.push({ url: imgUrl.url, type: 'image', postId: imgUrl?.postId })
        }
      }
    })


    this.listVideos.forEach((videoUrl) => {
      if (videoUrl.url) {
        // eslint-disable-next-line nuxt/no-globals-in-created
        const video = document.createElement('video')
        video.src = videoUrl.url
        video.onloadedmetadata = () => {
          const videoWidth = video.videoWidth
          const videoHeight = video.videoHeight
          if (videoWidth >= videoHeight) {
            this.landscape.push({ url: videoUrl.url, type: 'video', postId: videoUrl?.postId})
          } else {
            this.portrait.push({ url: videoUrl.url, type: 'video', postId: videoUrl?.postId })
          }
        }
      }
    })

  },
  methods:{
    handlePostDetailt(item){
      this.$router.push(`/photo/${item}`)
    }
  }
}
</script>
<style lang="css"></style>
