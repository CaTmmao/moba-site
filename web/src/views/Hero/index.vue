<template>
  <div class="hero-detail">
    <!-- 顶部 -->
    <div class="topbar text-white flex bg-black ai-center jc-between height-d9 fs-d26">
      <div class="flex ai-center">
        <router-link to="/home" class="width-d7 flex ai-center mx-d2">
          <img src="@/assets/logo.png" class="width-100p" />
        </router-link>
        <p class="mr-d2">王者荣耀</p>
        <p>攻略战</p>
      </div>
      <router-link tag="div" to="/all-hero" class="fs-d4 mr-d3 flex ai-center">
        <span class="fs-d22 mr-d2">更多英雄</span>
        >
      </router-link>
    </div>

    <!-- banner -->
    <div class="banner-wrapper position-re flex fd-column jc-end height-3d82">
      <img :src="data.banner" class="banner-bg" :style="banner" />
      <div class="text-white info position-ab position-l-d3 position-b-0">
        <p class="fs-d22">{{data.title}}</p>
        <p class="fs-d34">{{data.name}}</p>
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

    <!-- 技能 -->
    <Card>
      <div class="skills">
        <div class="flex jc-around">
          <img
            ref="skillImg"
            v-for="(item, index) in data.skills"
            :src="item.icon"
            class="width-1d2 height-1d2"
            @click="switchSkill(index)"
            :class="{'active': index === showSkillIndex}"
          />
        </div>
        <div
          class="fs-d26 pt-d4"
          v-for="(item, index) in data.skills"
          v-if="index === showSkillIndex"
        >
          <div>
            <strong class="fs-d3 width-1d5 title">{{item.name}}</strong>
            <span class="text-666">(冷却值：{{item.delay}} 消耗：{{item.cost}})</span>
          </div>
          <p v-text="item.description" class="pt-d39 pb-d2"></p>
        </div>
      </div>
    </Card>

    <!-- 出装推荐 -->
    <Card icon="https://moba-site-1257106288.cos.ap-chengdu.myqcloud.com/items.png" title="出装推荐">
      <div class="items items1 mb-d25">
        <p class="fs-d3 pb-d25">顺风出装</p>
        <div class="flex jc-between">
          <div v-for="item in data.items1" class="flex fd-column">
            <img :src="item.icon" class="width-d93 height-d93" />
            <p class="fs-d18 flex jc-center mt-d1 pb-d1">{{item.name}}</p>
          </div>
        </div>
      </div>
      <div class="items mb-d25">
        <p class="fs-d3 pb-d25">逆风出装</p>
        <div class="flex jc-between">
          <div v-for="item in data.items2" class="flex fd-column">
            <img :src="item.icon" class="width-d93 height-d93" />
            <p class="fs-d18 flex jc-center mt-d1">{{item.name}}</p>
          </div>
        </div>
      </div>
    </Card>

    <!-- 铭文推荐 -->
    <Card icon="https://moba-site-1257106288.cos.ap-chengdu.myqcloud.com/rune.png" title="铭文推荐">
      <div class="flex jc-between runeList">
        <div v-for="item in data.rune" class="flex">
          <img class="height-d79" :src="item.icon" />
          <div class="rune-text ws-nowrap">
            <p class="fs-d3">{{item.name}}</p>
            <p v-for="desc in item.desc" class="fs-d18">{{desc.text}}</p>
          </div>
        </div>
      </div>
    </Card>

    <!-- 使用技巧 -->
    <Card
      icon="https://moba-site-1257106288.cos.ap-chengdu.myqcloud.com/usageTips.png"
      title="使用技巧"
    >
      <p class="fs-d26">{{data.usageTips}}</p>
    </Card>

    <!-- 对抗技巧 -->
    <Card
      icon="https://moba-site-1257106288.cos.ap-chengdu.myqcloud.com/battleTips.png"
      title="对抗技巧"
    >
      <p class="fs-d26">{{data.battleTips}}</p>
    </Card>

    <!-- 团战思路 -->
    <Card icon="https://moba-site-1257106288.cos.ap-chengdu.myqcloud.com/teamTips.png" title="团战思路">
      <p class="fs-d26">{{data.teamTips}}</p>
    </Card>

    <!-- 英雄关系 -->
    <Card icon="https://moba-site-1257106288.cos.ap-chengdu.myqcloud.com/relation.png" title="英雄关系">
      <div class="heroRelate">
        <!-- 最佳搭档 -->
        <div>
          <p>最佳搭档</p>
          <div v-for="item in data.partners">
            <router-link :to="`/heroes/${item.hero._id}`">
              <img :src="item.hero.avatar" />
            </router-link>
            <p>{{item.description}}</p>
          </div>
        </div>
        <!-- 被谁克制 -->
        <div>
          <p>被谁克制</p>
          <div v-for="item in data.controledBy">
            <router-link :to="`/heroes/${item.hero._id}`">
              <img :src="item.hero.avatar" />
            </router-link>
            <p>{{item.description}}</p>
          </div>
        </div>
        <!-- 克制谁 -->
        <div>
          <p>克制谁</p>
          <div v-for="item in data.control">
            <router-link :to="`/heroes/${item.hero._id}`">
              <img :src="item.hero.avatar" />
            </router-link>
            <p>{{item.description}}</p>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from "./components/card";
export default {
  name: "heroes",
  props: {
    // 英雄 id
    id: { required: true }
  },
  data() {
    return {
      // 英雄详情信息
      data: {},
      // 当前显示哪个技能
      showSkillIndex: 0
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
  components: {
    Card
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
    },
    /**
     * 切换技能
     * @param {number} index 索引
     */
    switchSkill(index) {
      if (this.showHeroIndex === index) return;
      
      this.$refs.skillImg.forEach(item => {
        item.classList.remove("active");
      });
      this.showSkillIndex = index;
    }
  },
  watch: {
    "$route.params.id": function(id) {
      this.getHeroInfo();
    }
  }
};
</script>

<style lang="scss" scoped>
.hero-detail {
  @keyframes txtshow {
    from {
      opacity: 0;
      transform: translateX(-100px);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }

  .banner-wrapper {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));

    .banner-bg {
      z-index: -1000;
    }

    .info {
      > p {
        animation: txtshow 1s;
        animation-fill-mode: forwards;
        opacity: 0;
      }
      .scores {
        p {
          display: flex;
          align-items: center;
          font-size: 0.24rem;
          animation: txtshow 1s forwards;
          opacity: 0;

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
            margin-right: 0.1rem;
            margin-left: 0.02rem;
          }
        }
      }
    }
  }

  // 铭文推荐
  .runeList {
    .rune-text {
      margin-left: 9%;
    }
  }

  //出装推荐
  .items {
    img {
      border-radius: 0.46rem;
    }

    &.items1 {
      border-bottom: 1px solid #d4d9de;
    }
  }

  //技能
  .skills {
    .title {
      display: inline-block;
    }
    img {
      box-sizing: border-box;
      border-radius: 0.58rem;
      border: 0.05rem solid transparent;
      &.active {
        border-color: #d59b40;
      }
    }
  }

  //英雄关系
  .heroRelate {
    > div {
      font-size: 0.26rem;
      margin-bottom: 0.2rem;
      &:not(:last-child) {
        border-bottom: 1px solid #d4d9de;
      }

      > p {
        font-size: 0.3rem;
        padding-bottom: 0.25rem;
      }

      > div {
        padding-bottom: 0.3rem;
        display: flex;
        justify-content: space-between;

        img {
          width: 0.96rem;
          height: 0.96rem;
        }

        p {
          width: 5.86rem;
        }
      }
    }
  }
}
</style>