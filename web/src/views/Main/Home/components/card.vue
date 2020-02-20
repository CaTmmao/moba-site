<template>
  <div class="wrapper border-bottom-d4d9de">
    <div class="card-wrapper px-d34 bg-white mt-d25">
      <div class="card-header flex ai-center jc-between">
        <p class="fs-d32 py-d3">{{title}}</p>
        <router-link :to="allPath" class="flex ai-center">
          <svg
            t="1576241587951"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4158"
            width="20"
            height="20"
          >
            <path
              d="M102.4 512m-102.4 0a102.4 102.4 0 1 0 204.8 0 102.4 102.4 0 1 0-204.8 0Z"
              p-id="4159"
              fill="#333"
            />
            <path
              d="M512 512m-102.4 0a102.4 102.4 0 1 0 204.8 0 102.4 102.4 0 1 0-204.8 0Z"
              p-id="4160"
              fill="#333"
            />
            <path
              d="M921.6 512m-102.4 0a102.4 102.4 0 1 0 204.8 0 102.4 102.4 0 1 0-204.8 0Z"
              p-id="4161"
              fill="#333"
            />
          </svg>
        </router-link>
      </div>
      <slot name="header"></slot>

      <div class="card-body pb-d2 border-top-d4d9de">
        <div class="nav flex jc-between py-d3">
          <div
            class="nav-item"
            v-for="(category, index) in categories"
            :key="index"
            @click="$refs.slide.swiper.slideTo(index)"
            :class="{'active': active === index}"
          >
            <div class="nav-link fs-d26">{{category.name}}</div>
          </div>
        </div>

        <swiper
          ref="slide"
          :options="{autoHeight: true}"
          @slide-change="active = $refs.slide.swiper.realIndex"
        >
          <swiper-slide v-for="(category, index) in categories" :key="index">
            <slot name="items" :category="category"></slot>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 卡片标题
    title: {
      type: String,
      required: true
    },
    // 分类
    categories: {
      type: Array,
      required: true
    },
    // 查看模块全部内容的跳转地址
    allPath: {
      type: String
    }
  },
  data() {
    return {
      // 当前活动的 tab
      active: 0
    };
  }
};
</script>