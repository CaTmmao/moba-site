<template>
  <div>
    <div class="flex px-3 py-2 bg-black ai-center">
      <img src="@/assets/logo.png" class="my-1 mr-3" height="35" />
      <div class="fg-1">
        <p class="text-white my-0 fs-lg">王者荣耀</p>
        <p class="text-666 fs-xs my-0 mt-1">团队成就更多</p>
      </div>
      <button type="button" class="btn bg-primary p-2 fw-bold">立即下载</button>
    </div>
    <div class="nav flex jc-around bg-primary py-2 pt-3">
      <div
        class="nav-item pb-1 mb-1"
        v-for="(item, index) in routes"
        :key="index"
        :class="$route.path === item.path ? 'active' : ''"
      >
        <router-link :to="item.path" class="text-white">{{item.label}}</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      routes: [
        {
          path: "/home",
          label: "首页"
        },
        {
          path: "/a",
          label: "攻略中心"
        },
        {
          path: "/b",
          label: "赛事中心"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>