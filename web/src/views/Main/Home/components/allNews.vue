<template>
  <div>
    <div class="height-d7 flex nav mb-d3">
      <span
        v-for="(item, index) in newsList"
        :class="{'active': index === showIndex}"
        class="fs-d26 fg-1 flex jc-center ai-center nav-item"
        @click="switchSection(item, index)"
        ref="newsSection"
      >{{item.name}}</span>
    </div>
    <div>
      <div
        v-for="(category, index) in newsList"
        v-if="index === showIndex"
        class="mt-d32 flex fd-column mx-d2 fs-d28"
      >
        <router-link
          tag="div"
          :to="`article/${item._id}`"
          v-for="(item, index) in category.list"
          :key="index"
          class="flex ai-center mb-d3 jc-between"
        >
          <span class="ws-nowrap overflow-ellipsis width-5d86">{{item.title}}</span>
          <span class="text-666 fs-d26">{{item.createdAt | convertDate}}</span>
        </router-link>
        <p
          v-if="category.page !== category.pages"
          @click="showMore(category, index)"
          class="flex jc-center text-grey py-d1 bg-e8"
        >点击加载更多</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "allNews",
  data() {
    return {
      // 文章列表
      newsList: [],
      // 当前显示的分类 index
      showIndex: 0
    };
  },
  async mounted() {
    await this.getTitle();

    this.getNewsList(this.newsList[0], 0);
  },
  methods: {
    // 获取 tab 标题
    async getTitle() {
      let url = this.API_CONFIG.getNewsSubTitle;
      await this.$.get(url).then(res => {
        res.data.forEach(item => {
          item.list = []; // 文章列表
          item.page = 1; // 当前页数
          item.pageSize = 15; // 每页条数
          item.totalCount = 0; // 总条数
          item.pages = 0; // 总页数
        });
        this.newsList = res.data;
      });
    },
    /**
     * 查看其他分类
     * @param {object} item 点击的分类信息
     * @param {number} index 分类集合索引
     */
    switchSection(item, index) {
      if (this.showIndex === index) return;

      this.$refs.newsSection.forEach(item => {
        item.classList.remove("active");
      });

      this.showIndex = index;

      if (!item.list.length) {
        this.getNewsList(item, index);
      }
    },
    /**
     * 获取指定分类的文章列表
     * @param {object} item 点击的分类信息
     * @param {number} index 分类集合索引
     * @returns 文章列表
     */
    getNewsList(item, index) {
      let { _id, page, pageSize } = item;

      let url = `${this.API_CONFIG.getGivenNews}?id=${_id}&page=${page}&pageSize=${pageSize}`;

      this.$.get(url).then(res => {
        let { code, totalCount, pages, data, page } = res.data;
        this.newsList[index].totalCount = totalCount;
        this.newsList[index].page = page;
        this.newsList[index].pages = pages;

        data.forEach(item => {
          this.newsList[index].list.push(item);
        });
      });
    },
    /**
     * 获取更多文章
     * @param {object} item 点击的分类信息
     * @param {number} index 分类集合索引
     */
    showMore(item, index) {
      item.page++;
      this.getNewsList(item, index);
    }
  }
};
</script>