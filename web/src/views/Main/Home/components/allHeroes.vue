<template>
  <div class="px-d24 pt-d15">
    <div class="flex jc-between nav">
      <span
        v-for="(item, index) in heroList"
        :class="{'active': index === showHeroIndex}"
        v-if="item.name !== '热门'"
        class="fs-d26 nav-item"
        @click="switchSection(index)"
        ref="heroSection"
      >{{item.name}}</span>
    </div>
    <div>
      <div v-for="(item, index) in heroList" v-if="index === showHeroIndex" class="mt-d32 flex">
        <router-link
          tag="div"
          :to="`/heroes/${hero._id}`"
          v-for="(hero, index) in item.heroList"
          :key="index"
          class="width-1d12 height-1d6 mr-d35 mb-d28 flex fd-column"
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
            return;
          }
        });
      });
    },
    // 查看其他分类
    switchSection(index) {
      this.$refs.heroSection.forEach(item => {
        item.classList.remove("active");
      });

      this.showHeroIndex = index;
    }
  }
};
</script>