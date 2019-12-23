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
    <siteCard title="新闻" :categories="categories">
      <template #items="{category}">
        <div v-for="(item, index) in category.list" :key="index" class="py-2">
          <span>[{{item.categoryName}}]</span>
          <span>|</span>
          <span>{{item.title}}</span>
          <span>{{item.date}}</span>
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
      categories: [
        {
          name: "热门",
          list: new Array(5).fill({}).map(() => ({
            categoryName: "公告",
            title: "xxxx",
            date: "6/01"
          }))
        },
        {
          name: "新闻",
          list: new Array(5).fill({}).map(() => ({
            categoryName: "公告",
            title: "xxxx",
            date: "6/01"
          }))
        },
        {
          name: "热门",
          list: new Array(5).fill({}).map(() => ({
            categoryName: "公告",
            title: "xxxx",
            date: "6/01"
          }))
        },
        {
          name: "热门",
          list: new Array(5).fill({}).map(() => ({
            categoryName: "公告",
            title: "xxxx",
            date: "6/01"
          }))
        },
        {
          name: "热门",
          list: new Array(5).fill({}).map(() => ({
            categoryName: "公告",
            title: "xxxx",
            date: "6/01"
          }))
        }
      ]
    };
  },
  components: {
    siteCard
  }
};
</script>
