<template>
  <div class="hero-detail">
    <!-- 顶部 -->
    <div class="topbar text-white flex bg-black ai-center height-d9 fs-d26">
      <router-link to="/home" class="width-d7 flex ai-center mx-d2">
        <img src="@/assets/logo.png" class="width-100p" />
      </router-link>
      <p class="mr-d2">王者荣耀</p>
      <p>攻略战</p>
    </div>

    <div class="banner-wrapper position-re flex fd-column jc-end height-3d82">
      <img :src="data.banner" class="banner-bg" :style="banner" />
      <div class="text-white info position-ab position-l-d3 position-b-0">
        <p class="fs-d22">{{data.title}}</p>
        <h2 class="fs-d34">{{data.name}}</h2>
        <p v-if="data.categories" class="fs-d22">{{data.categories.map(v => v.name).join('/')}}</p>
        <div v-if="data.scores" class="flex scores pb-d24">
          <p>
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
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));

    .banner-bg {
      z-index: -1000;
    }

    .info {
      .scores {
        p {
          display: flex;
          align-items: center;
          font-size: 0.24rem;

          span {
            border-radius: 50%;
            font-size: 0.24rem;
            width: 0.37rem;
            height: 0.37rem;
            transform: scale(0.66);
            vertical-align: middle;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            margin-right: .1rem;
            margin-left: .02rem;
          }
        }
      }
    }
  }
}
</style>