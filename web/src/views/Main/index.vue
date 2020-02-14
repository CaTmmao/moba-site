<template>
  <div>
    <div class="topbar flex bg-black ai-center height-d9">
      <router-link to="/">
        <img src="@/assets/logo.png" class="ml-d3 width-d7" />
      </router-link>
      <div class="fg-1 pl-d2 height-d7 flex fd-column jc-start">
        <p class="text-white fs-d26 pb-dd3">王者荣耀</p>
        <p class="text-666 fs-d16">团队成就更多</p>
      </div>
      <button type="button" class="btn bg-primary width-1d2 height-d48 mr-d3">
        <a class="text-333 fw-bold" href="https://pvp.qq.com/zlkdatasys/mct/d/play.shtml">立即下载</a>
      </button>
    </div>
    <div class="bg-primary height-d84"></div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Main"
};
</script>

<style lang="scss">
.topbar {
  position: sticky;
  top: 0;
  z-index: 10000;
}
</style>