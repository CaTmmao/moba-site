<template>
  <div id="article-wrapper">
    <div class="header py-3 flex jc-between">
      <div class="flex width-90p text-dark-1">
        <span class="px-2 arrow" @click="home"><</span>
        <strong class="overflow-ellipsis fs-md">{{data.title}}</strong>
      </div>
      <span class="text-grey">{{data.createdAt | convertDate}}</span>
    </div>
    <div class="p-3 fs-lg" v-html="data.body"></div>
    <div class="mt-5 mb-3 border-top-grey pt-3">
      <div class="px-2 mb-2">
        <strong>相关资讯</strong>
      </div>
      <router-link
        :to="`/article/${item._id}`"
        v-for="item in related"
        class="flex py-1 px-2 jc-between"
      >
        <span class="text-dark-1 overflow-ellipsis fs-md">{{item.title}}</span>
        <span class="text-grey">{{item.createdAt | convertDate}}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "articles",
  props: {
    // 文章 id
    id: { required: true }
  },
  data() {
    return {
      // 文章详情信息
      data: {},
      // 相关资讯集合
      related: []
    };
  },
  mounted() {
    this.getArticle();
  },
  methods: {
    // 获取文章详情
    getArticle() {
      let id = this.id;
      let url = `${this.API_CONFIG.getArticleDetail}/${id}`;
      this.$.get(url).then(res => {
        let { data, related } = res.data;
        this.data = data;
        this.related = related;
      });
    },
    // 回到首页
    home() {
      this.$router.push("/home");
    }
  },
  watch: {
    id: "getArticle"
  }
};
</script>

<style lang="scss">
#article-wrapper {
  p {
    line-height: 2rem;
  }

  img {
    max-width: 100%;
    height: auto;
  }
}
</style>

<style lang="scss" scoped>
#article-wrapper {
  .header {
    box-shadow: 0 0 2px 0 #737373;
  }
  .arrow {
    transform: scaleY(1.5);
  }
}
</style>