<template>
  <div class="panel pt-d3 px-d3 pb-d1">
    <div class="flex ai-center pb-d25">
      <img v-if="icon" class="width-d26 height-d26" :src="icon" />
      <h2 class="fs-d32 pl-d1">{{title}}</h2>
    </div>
    <slot></slot>
  </div>
</template> 

<script>
export default {
  props: [
    // icon 图片地址
    "icon",
    // 标题
    "title"
  ]
};
</script>

<style lang="scss" scoped>
.panel {
  background: #fff;
  margin-bottom: 0.22rem;
  border-bottom: 1px solid #d4d9de;
}
</style>