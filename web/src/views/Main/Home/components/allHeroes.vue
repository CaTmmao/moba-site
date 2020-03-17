<template>
  <div class="pt-d15">
    <div class="flex jc-between nav height-d7">
      <span
        v-for="(item, index) in heroList"
        :class="{'active': index === showHeroIndex}"
        v-if="item.name !== '热门'"
        class="fs-d26 nav-item fg-1 flex jc-center ai-center"
        @click="switchSection(index)"
        ref="heroSection"
      >{{item.name}}</span>
    </div>
    <div class="px-d24">
      <div
        v-for="(item, index) in heroList"
        v-if="index === showHeroIndex"
        class="mt-d32 flex flex-wrap hero"
      >
        <router-link
          tag="div"
          :to="`/heroes/${hero._id}`"
          v-for="(hero, index) in item.heroList"
          :key="index"
          class="width-1d12 height-1d6 mr-d35 mb-d28 flex fd-column hero-item"
        >
          <img :src="hero.avatar" class="height-1d12" />
          <p class="flex jc-center fs-d24 mt-d1">{{hero.name}}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "allHeroes",
  data() {
    return {
      // 英雄分类列表
      heroList: [],
      // 当前显示的英雄分类 index
      showHeroIndex: 0
    };
  },
  mounted() {
    this.getHeroList();
  },
  methods: {
    // 获取英雄列表
    getHeroList() {
      let url = this.API_CONFIG.getHeroList;
      this.$.get(url).then(res => {
        let { data } = res;
        data.forEach((item, index) => {
          if (item.name === "热门") {
            data.splice(index, 1);
            this.heroList = data;
          }
        });
      });
    },
    // 查看其他分类
    switchSection(index) {
      if (this.showHeroIndex === index) return;

      this.$refs.heroSection.forEach(item => {
        item.classList.remove("active");
      });

      this.showHeroIndex = index;
    }
  }
};
</script>

<style lang="scss" scoped>
.hero .hero-item:nth-child(5n) {
  margin-right: 0;
}
</style>