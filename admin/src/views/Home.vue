<template>
  <div>
    <el-container style="height: 100vh">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router :default-openeds="['1', '2']" :default-active="$route.path">
          <el-submenu v-for="(submenu, index) in menu" :index="String(++index)">
            <template slot="title">
              <i :class="submenu.icon"></i>
              {{submenu.title}}
            </template>
            <el-menu-item-group v-for="(items, index) in submenu.itemsGroup">
              <template slot="title">{{items.itemsTitle}}</template>
              <el-menu-item
                v-for="(item, index) in items.items"
                :index="item.path"
              >{{item.itemName}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header>
          <span class="logout" @click="logout">退出</span>
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
            },
            {
              items: [
                {
                  itemName: "新建铭文",
                  path: "/rune/create"
                },
                {
                  itemName: "铭文列表",
                  path: "/rune/list"
                }
              ]
            },
            {
              itemsTitle: "英雄",
              items: [
                {
                  itemName: "新建英雄",
                  path: "/hero/create"
                },
                {
                  itemName: "英雄列表",
                  path: "/hero/list"
                }
              ]
            },
            {
              itemsTitle: "文章",
              items: [
                {
                  itemName: "新建文章",
                  path: "/article/create"
                },
                {
                  itemName: "文章列表",
                  path: "/article/list"
                }
              ]
            },
            {
              itemsTitle: "首页轮播图",
              items: [
                {
                  itemName: "添加轮播图",
                  path: "/carousel/create"
                },
                {
                  itemName: "轮播图列表",
                  path: "/carousel/list"
                }
              ]
            }
          ]
        },
        {
          title: "系统管理",
          icon: "el-icon-message",
          itemsGroup: [
            {
              itemsTitle: "权限",
              items: [
                {
                  itemName: "新建管理员",
                  path: "/admin/create"
                },
                {
                  itemName: "管理员列表",
                  path: "/admin/list"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    // 退出账号
    logout() {
      localStorage.token = "";
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  height: 50px !important;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .logout {
    padding-right: 10px;
    color: #fff;
    cursor: pointer;
    font-size: 14px;
  }
}

.el-aside {
  color: #333;
}
</style>
