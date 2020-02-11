<template>
  <div class="web-home">
    <!-- 顶部轮播图 -->
    <swiper ref="mySwiper" :options="swiperOption">
      <swiper-slide v-for="item in carouselList">
        <a :href="item.path || '#'">
          <img :src="item.imgUrl" class="width-100p height-192" />
        </a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

    <!-- 新闻资讯模块 -->
    <siteCard title="新闻资讯" :categories="newsList">
      <template #items="{category}">
        <router-link
          tag="div"
          :to="`article/${item._id}`"
          v-for="(item, index) in category.newsList"
          :key="index"
          class="py-2 flex ai-center"
        >
          <span class="text-grey ws-nowrap">[{{item.categoryName}}]</span>
          <span class="px-1">|</span>
          <span class="ws-nowrap overflow-ellipsis">{{item.title}}</span>
          <span class="text-666">{{item.createdAt | convertDate}}</span>
        </router-link>
      </template>
    </siteCard>

    <!-- 英雄列表模块 -->
    <siteCard title="英雄列表" :categories="heroList">
      <template v-slot:header>
        <router-link :to="`/heroes/${newestHero._id}`">
          <div class="newestHero width-100p position-re height-110">
            <img :src="newestHero.banner" class="width-100p" />
            <div class="fs-sm position-ab position-l-1 position-t-30p text-white">
              <h3 class="fs-lg mb-2">最新英雄：{{newestHero.name}}</h3>
              <p v-if="newestHero.categories" class="mb-3">职业定位：{{newestHero.categories[0].name}}</p>
              <p class="mt-1">上线时间：{{newestHero.createdAt | convertDate}}</p>
            </div>
          </div>
        </router-link>
      </template>
      <template #items="{category}">
        <div class="flex flex-wrap">
          <router-link
            tag="div"
            :to="`/heroes/${hero._id}`"
            v-for="(hero, index) in category.heroList"
            :key="index"
            class="width-20p"
          >
            <img :src="hero.avatar" class="width-55" />
            <p class="flex jc-center width-55">{{hero.name}}</p>
          </router-link>
        </div>
      </template>
    </siteCard>
  </div>
</template>

<script>
import siteCard from "./components/card";
export default {
  name: "home",
  data() {
    return {
      // 新闻资讯列表
      newsList: [],
      // 英雄分类列表
      heroList: [],
      // 最新英雄
      newestHero: {},
      // 轮播图列表
      carouselList: [],
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        },
        autoplay: true
      }
    };
  },
  components: {
    siteCard
  },
  mounted() {
    this.getNewsList();
    this.getHeroList();
    this.getCarousel();
    this.getNewestHero();
  },
  methods: {
    // 获取新闻资讯
    getNewsList() {
      let url = this.API_CONFIG.getNewsCategories;
      this.$.get(url).then(res => {
        this.newsList = res.data;
      });
    },
    // 获取最新英雄
    getNewestHero() {
      let url = this.API_CONFIG.getNewestHero;
      this.$.get(url).then(res => {
        this.newestHero = res.data;
        console.log(this.newestHero);
      });
    },
    // 获取英雄列表
    getHeroList() {
      let url = this.API_CONFIG.getHeroList;
      this.$.get(url).then(res => {
        this.heroList = res.data;
      });
    },
    // 获取轮播图
    getCarousel() {
      let url = this.API_CONFIG.getCarousel;
      this.$.get(url).then(res => {
        this.carouselList = res.data;
      });
    }
  }
};
</script>

<style lang="scss">
.swiper-wrapper {
  height: auto !important;
}
</style>

<style lang="scss" scoped>
.web-home {
  .newestHero {
    overflow: hidden;
    z-index: 10000000;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    img {
      z-index: -1100;
    }

    > div {
      opacity: 0.8;
    }
  }
}
</style>

<style lang="scss">
.web-home {
  .swiper-pagination {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    padding-right: 20px;
    margin-bottom: 20px;
    
    .swiper-pagination-bullet {
      background: #fff;
      opacity: 1;
      width: 0.17rem;
      height: 0.17rem;
      border-radius: 2px;

      &.swiper-pagination-bullet-active {
        background: #4b67af;
      }
    }
  }
}
</style>