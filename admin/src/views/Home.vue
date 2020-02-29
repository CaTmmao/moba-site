<template>
  <div>
    <el-container style="height: 100vh">
      <el-aside class="position-re">
        <!-- 侧边栏标题 -->
        <router-link
          to="/"
          tag="div"
          class="width-230 flex jc-center ai-center height-50 text-white bg-02a1e9 sidebar-title-wrapper"
        >
          <h1 class="sidebar-title">王者荣耀后台</h1>
        </router-link>

        <el-scrollbar wrap-class="scrollbar-wrapper">
          <el-menu
            router
            :default-active="$route.path"
            background-color="#263238"
            text-color="#8a979e"
            active-text-color="#fff"
            class="height-100p"
          >
            <el-submenu v-for="(submenu, index) in menu" :index="String(++index)">
              <template slot="title">
                <i :class="submenu.icon"></i>
                {{submenu.title}}
              </template>
              <el-menu-item
                v-for="(item, index) in submenu.itemsGroup"
                :index="item.path"
              >{{item.itemName}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-scrollbar>
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
      //侧边栏菜单
      menu: [
        {
          title: "分类管理",
          icon: "el-icon-takeaway-box",
          itemsGroup: [
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
          title: "物品管理",
          icon: "el-icon-box",
          itemsGroup: [
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
          title: "铭文管理",
          icon: "el-icon-trophy-1",
          itemsGroup: [
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
          title: "英雄管理",
          icon: "el-icon-attract",
          itemsGroup: [
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
          title: "文章管理",
          icon: "el-icon-document",
          itemsGroup: [
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
          title: "轮播图管理",
          icon: "el-icon-picture-outline-round",
          itemsGroup: [
            {
              itemName: "添加轮播图",
              path: "/carousel/create"
            },
            {
              itemName: "轮播图列表",
              path: "/carousel/list"
            }
          ]
        },
        {
          title: "管理员管理",
          icon: "el-icon-user",
          itemsGroup: [
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
  background-color: #fff;
  color: #333;
  height: 50px !important;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .logout {
    padding-right: 10px;
    color: #606266;
    cursor: pointer;
    font-size: 14px;
  }
}

.el-aside {
  color: #333;
  margin-top: 50px;

  .sidebar-title-wrapper {
    position: fixed;
    top: 0;
    cursor: pointer;
    .sidebar-title {
      font-size: 18px;
    }
  }
}
</style>

// 侧边栏滚动条样式
<style lang="scss">
.el-scrollbar__wrap {
  overflow-x: hidden;
  .el-scrollbar__view {
    height: 100%;
  }
}

.el-scrollbar {
  width: 230px;
  height: 100%;
}
</style>