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
    <siteCard title="新闻" :categories="newsList">
      <template #items="{category}">
        <div v-for="(item, index) in category.newsList" :key="index" class="py-2 flex ai-center">
          <span class="text-grey ws-nowrap">[{{item.categoryName}}]</span>
          <span class="px-1">|</span>
          <span class="ws-nowrap overflow-ellipsis mr-2">{{item.title}}</span>
          <span class="text-666 fs-sm">{{item.createdAt | date}}</span>
        </div>
      </template>
    </siteCard>
  </div>
</template>

<script>
import utils from "../../util/common";
import siteCard from "./components/card";
export default {
  name: "home",
  data() {
    return {
      // 新闻资讯列表
      newsList: []
    };
  },
  components: {
    siteCard
  },
  mounted() {
    this.getNewsList();
  },
  filters: {
    // 日期
    date(value) {
      return utils.convertDate(value);
    }
  },
  methods: {
    // 获取新闻资讯
    getNewsList() {
      let url = this.API_CONFIG.getNewsCategories;
      this.$.get(url).then(res => {
        this.newsList = res.data;
      });
    }
  }
};
</script>
