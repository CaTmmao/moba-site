<template>
  <div class="hero-detail">
    <div class="topbar text-white flex fs-lg px-3 py-1 bg-black ai-center">
      <router-link to="/home">
        <img src="@/assets/logo.png" class="my-1 mr-3" height="35" />
      </router-link>
      <p class="my-0">王者荣耀</p>
      <p class="ml-3">攻略战</p>
    </div>
    <div class="banner-wrapper flex fd-column jc-end height-183">
      <img :src="data.banner" class="banner-bg" :style="banner" />
      <div class="m-3 text-white info">
        <p class="mb-2">{{data.title}}</p>
        <h2 class="mb-2 fs-xl">{{data.name}}</h2>
        <p v-if="data.categories" class="mb-2">{{data.categories.map(v => v.name).join('/')}}</p>
        <div v-if="data.scores" class="flex mb-2 scores">
          <p class="mr-3">
            难度
            <span class="bg-difficult">{{data.scores.difficult}}</span>
          </p>
          <p>
            技能
            <span class="bg-skills">{{data.scores.skills}}</span>
          </p>
          <p>
            攻击
            <span class="bg-attack">{{data.scores.attack}}</span>
          </p>
          <p>
            生存
            <span class="bg-survive">{{data.scores.survive}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "heroes",
  props: {
    // 英雄 id
    id: { required: true }
  },
  data() {
    return {
      // 英雄详情信息
      data: {}
    };
  },
  mounted() {
    this.getHeroInfo();
  },
  computed: {
    // banner 的 css样式
    banner() {
      return {
        background: " no-repeat top center",
        width: "100%",
        height: "100%"
      };
    }
  },
  methods: {
    // 获取英雄详细信息
    getHeroInfo() {
      let id = this.id;
      let url = `${this.API_CONFIG.getHeroDetail}/${id}`;
      this.$.get(url).then(res => {
        this.data = res.data;
        console.log(this.data);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.hero-detail {
  .banner-wrapper {
    position: relative;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));

    .banner-bg {
      position: absolute;
      z-index: -1000;
    }

    .info {
      .scores {
        p {
          display: flex;
          align-items: center;
          margin-right: 0.6rem;
          span {
            margin-left: 0.3rem;
            border-radius: 50%;
            font-size: 0.8rem;
            width: 1.2rem;
            height: 1.2rem;
            display: inline-flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>