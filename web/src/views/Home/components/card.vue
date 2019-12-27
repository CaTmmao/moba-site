<template>
  <div class="wrapper">
    <!-- 新闻资讯 -->
    <div class="card-wrapper bg-white mt-2 px-4 pb-4">
      <div class="card-header mb-2 flex ai-center jc-between">
        <p class="fs-xl">{{title}}</p>
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
      </div>
      <div class="card-body mt-3">
        <div class="nav jc-between pt-10">
          <div
            class="nav-item pb-1"
            v-for="(category, index) in categories"
            :key="index"
            @click="$refs.slide.swiper.slideTo(index)"
            :class="{'active': active === index}"
          >
            <div class="nav-link">{{category.name}}</div>
          </div>
        </div>

        <swiper ref="slide" class="mt-2" @slide-change="active = $refs.slide.swiper.realIndex">
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

<style lang="scss">
.wrapper {
  border-bottom: 1px #d4d9de solid;
  .card-wrapper {
    .card-header {
      border-bottom: 1px #d4d9de solid;
    }
  }
}
</style>
