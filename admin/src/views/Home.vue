<template>
  <div>
    <el-container style="height: 100vh">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router :default-openeds="['1']" :default-active="$route.path">
          <el-submenu v-for="(submenu, index) in menu" :index="String(++index)">
            <template slot="title">
              <i :class="submenu.icon"></i>
              {{submenu.title}}
            </template>
            <el-menu-item-group v-for="(items, index) in submenu.itemsGroup">
              <template slot="title">{{items.itemsTitle}}</template>
              <el-menu-item v-for="(item, index) in items.items" :index="item.path">{{item.itemName}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      //子菜单
      menu: [
        {
          title: "内容管理",
          icon: "el-icon-message",
          itemsGroup: [
            {
              itemsTitle: "分类",
              items: [
                {
                  itemName: "新建分类",
                  path: "/category/create"
                },
                {
                  itemName: "分类列表",
                  path: "/category/list"
                }
              ]
            },
            {
              itemsTitle: "物品",
              items: [
                {
                  itemName: "新建物品",
                  path: "/item/create"
                },
                {
                  itemName: "物品列表",
                  path: "/item/list"
                }
              ]
            }
          ]
        }
      ]
    };
  }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
