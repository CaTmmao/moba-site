<template>
  <div class="home">
    <swiper ref="mySwiper">
      <swiper-slide>
        <img src="@/assets/imgs/a.jpeg" class="width-100p" />
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/imgs/b.jpeg" class="width-100p" />
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/imgs/c.jpeg" class="width-100p" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
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
    <siteCard title="英雄列表" :categories="heroList">
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
      heroList: []
    };
  },
  components: {
    siteCard
  },
  mounted() {
    this.getNewsList();
    this.getHeroList();
  },
  methods: {
    // 获取新闻资讯
    getNewsList() {
      let url = this.API_CONFIG.getNewsCategories;
      this.$.get(url).then(res => {
        this.newsList = res.data;
      });
    },
    // 获取英雄列表
    getHeroList() {
      let url = this.API_CONFIG.getHeroList;
      this.$.get(url).then(res => {
        this.heroList = res.data;
      });
    }
  }
};
</script>

<style lang="scss">
.swiper-wrapper {
  height: auto!important;
}
</style>
