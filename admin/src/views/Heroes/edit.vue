<template>
  <div class="container">
    <h1>{{id ? '编辑' : '新建'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card">
        <!-- 基本信息 -->
        <el-tab-pane label="基本信息">
          <el-form-item label="名称">
            <el-input v-model.trim="info.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model.trim="info.title"></el-input>
          </el-form-item>
          <el-form-item label="背景图">
            <el-upload
              class="avatar-uploader banner"
              :action="uploadUrl"
              :headers="getAuthorization()"
              :on-success="res => $set(info, 'banner', res.data)"
              :show-file-list="false"
            >
              <img v-if="info.banner" :src="info.banner" class="icon" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthorization()"
              :on-success="res => $set(info, 'avatar', res.data)"
              :show-file-list="false"
            >
              <img v-if="info.avatar" :src="info.avatar" class="icon" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="分类">
            <el-select filterable v-model="info.categories" multiple>
              <el-option
                v-for="(item, index) in categoryList"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate style="margin-top: 0.6rem" :max="10" show-score v-model="info.scores.difficult"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate style="margin-top: 0.6rem" :max="10" show-score v-model="info.scores.skills"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate style="margin-top: 0.6rem" :max="10" show-score v-model="info.scores.attack"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate style="margin-top: 0.6rem" :max="10" show-score v-model="info.scores.survive"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select filterable v-model="info.items1" multiple>
              <el-option
                v-for="(item, index) in itemList"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select filterable v-model="info.items2" multiple>
              <el-option
                v-for="(item, index) in itemList"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="铭文推荐">
            <el-select filterable v-model="info.rune" multiple>
              <el-option
                v-for="(item, index) in runeList"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model.trim="info.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model.trim="info.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model.trim="info.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>

        <!-- 技能 -->
        <el-tab-pane label="技能">
          <el-button type="text" @click="addSkill">
            <i class="el-icon-plus"></i> 添加技能
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col
              style="margin-top: 20px;"
              :md="12"
              v-for="(item, index) in info.skills"
              :key="index"
            >
              <el-form-item label="名称">
                <el-input v-model.trim="item.name"></el-input>
              </el-form-item>
              <el-form-item label="冷却值">
                <el-input v-model.trim="item.delay"></el-input>
              </el-form-item>
              <el-form-item label="消耗">
                <el-input v-model.trim="item.cost"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthorization()"
                  :on-success="res => $set(item, 'icon', res.data)"
                  :show-file-list="false"
                >
                  <img v-if="item.icon" :src="item.icon" class="icon" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model.trim="item.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="delSkill(index)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <!-- 最佳搭档 -->
        <el-tab-pane label="最佳搭档">
          <el-button type="text" @click="addPartner">
            <i class="el-icon-plus"></i> 添加搭档
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col
              style="margin-top: 20px;"
              :md="12"
              v-for="(item, index) in info.partners"
              :key="index"
            >
              <el-form-item label="英雄">
                <el-select v-model="item.hero" filterable placeholder="请选择英雄">
                  <el-option
                    v-for="item in heroList"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model.trim="item.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="delPartners(index)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <!-- 被谁克制 -->
        <el-tab-pane label="被谁克制">
          <el-button type="text" @click="addControledBy">
            <i class="el-icon-plus"></i> 添加
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col
              style="margin-top: 20px;"
              :md="12"
              v-for="(item, index) in info.controledBy"
              :key="index"
            >
              <el-form-item label="英雄">
                <el-select v-model="item.hero" filterable placeholder="请选择英雄">
                  <el-option
                    v-for="item in heroList"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model.trim="item.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="delControledBy(index)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <!-- 克制英雄 -->
        <el-tab-pane label="克制英雄">
          <el-button type="text" @click="addControl">
            <i class="el-icon-plus"></i> 添加
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col
              style="margin-top: 20px;"
              :md="12"
              v-for="(item, index) in info.control"
              :key="index"
            >
              <el-form-item label="英雄">
                <el-select v-model="item.hero" filterable placeholder="请选择英雄">
                  <el-option
                    v-for="item in heroList"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model.trim="item.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="delControl(index)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <el-form-item style="margin-top: 1rem;">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
let info = {
  //名称
  name: "",
  //称号
  title: "",
  // 背景图
  banner: "",
  //头像
  avatar: "",
  //分类
  categories: [],
  //顺风出装
  items1: [],
  //逆风出装
  items2: [],
  //评分
  scores: {
    difficult: 0,
    skills: 0,
    attack: 0,
    survive: 0
  },
  //使用技巧
  usageTips: "",
  //对抗技巧
  battleTips: "",
  //团战思路
  teamTips: "",
  //技能
  skills: [],
  //铭文推荐
  rune: [],
  //最佳搭档
  partners: [],
  //被谁克制
  controledBy: [],
  //克制谁
  control: []
};

export default {
  name: "heroCreate",
  props: {
    id: {}
  },
  data() {
    return {
      //英雄信息
      info,
      //英雄分类
      categoryList: [],
      //装备（物品）列表
      itemList: [],
      //英雄列表
      heroList: [],
      //铭文列表
      runeList: []
    };
  },
  created() {
    this.getItemsList();
    this.getCategories();
    this.init();
    this.getHeroesList();
    this.getRuneList();
  },
  methods: {
    init() {
      if (this.id) {
        this.getInfo();
      } else {
        this.info = JSON.parse(JSON.stringify(info));
      }
    },
    //获取英雄信息
    getInfo() {
      let url = `rest/hero/${this.id}`;

      this.$.get(url).then(res => {
        let { code, data } = res.data;
        if (code === 1) {
          this.info = data;
        }
      });
    },
    //获取英雄分类
    getCategories() {
      let url = "rest/category/category/subList?parentName=英雄列表";

      this.$.get(url).then(res => {
        let { code, data } = res.data;
        if (code === 1) {
          this.categoryList = data;
        }
      });
    },
    //获取装备（物品）
    getItemsList() {
      let url = "rest/item?pageSize=all";

      this.$.get(url).then(res => {
        let { code, data } = res.data;
        if (code === 1) {
          this.itemList = data;
        }
      });
    },
    //获取铭文列表
    getRuneList() {
      let url = "rest/rune?pageSize=all";

      this.$.get(url).then(res => {
        let { code, data } = res.data;
        if (code === 1) {
          this.runeList = data;
        }
      });
    },
    //保存信息
    save() {
      let { id, info } = this;
      let url = "rest/hero";
      let method;
      let data = info;

      if (id) {
        url = `${url}/${id}`;
        method = "put";
      } else {
        method = "post";
      }

      this.$({
        url,
        method,
        data
      }).then(res => {
        res.data.code === 1 && this.$router.push("/hero/list");
      });
    },
    //添加技能
    addSkill() {
      this.info.skills.push({});
    },
    //删除技能
    delSkill(index) {
      this.$confirm("确认删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        this.info.skills.splice(index, 1);
      });
    },
    /**
     * 添加最佳搭档
     */
    addPartner() {
      this.info.partners.push({});
    },
    /**
     * 删除最佳搭档
     * @param {number} index 删除对象所在索引
     */
    delPartners(index) {
      this.$confirm("请确认是否删除？", "提示", {
        type: "error"
      }).then(() => {
        this.info.partners.splice(index, 1);
      });
    },
    //添加被克制英雄
    addControledBy() {
      this.info.controledBy.push({});
    },
    /**
     * 删除被克制英雄
     * @param {number} index 删除对象所在索引
     */
    delControledBy(index) {
      this.$confirm("请确认是否删除？", "提示", {
        type: "error"
      }).then(() => {
        this.info.controledBy.splice(index, 1);
      });
    },
    //添加克制英雄
    addControl() {
      this.info.control.push({});
    },
    /**
     * 删除克制英雄
     * @param {number} index 删除对象所在索引
     */
    delControl(index) {
      this.$confirm("请确认是否删除？", "提示", {
        type: "error"
      }).then(() => {
        this.info.control.splice(index, 1);
      });
    },
    /**
     * 获取英雄列表
     */
    getHeroesList() {
      let url = "rest/hero?pageSize=all";

      this.$.get(url).then(res => {
        let { code, data } = res.data;
        if (code === 1) {
          this.heroList = data;
        }
      });
    }
  },
  watch: {
    $route: "init"
  }
};
</script>
