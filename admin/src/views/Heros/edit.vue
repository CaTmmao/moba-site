<template>
  <div class="container">
    <h1>{{id ? '编辑' : '新建'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <el-form-item label="名称">
            <el-input v-model="info.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="info.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthorization()"
              :on-success="uploadSuccess"
              :show-file-list="false"
            >
              <img v-if="info.avatar" :src="info.avatar" class="icon" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="分类">
            <el-select v-model="info.categories" multiple>
              <el-option
                v-for="(item, index) in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate style="margin-top: 0.6rem" :max="9" show-score v-model="info.scores.difficult"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate style="margin-top: 0.6rem" :max="9" show-score v-model="info.scores.skills"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate style="margin-top: 0.6rem" :max="9" show-score v-model="info.scores.attach"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate style="margin-top: 0.6rem" :max="9" show-score v-model="info.scores.survive"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="info.items1" multiple>
              <el-option
                v-for="(item, index) in items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="info.items2" multiple>
              <el-option
                v-for="(item, index) in items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="info.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="info.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="info.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
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
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthorization()"
                  :on-success="res => $set(item, 'icon', res.url)"
                  :show-file-list="false"
                >
                  <img v-if="item.icon" :src="item.icon" class="icon" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="delSkill(index)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="xx">x</el-tab-pane>
        <el-tab-pane label="xx">x</el-tab-pane>
      </el-tabs>

      <el-form-item style="margin-top: 1rem;">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "heroCreate",
  props: {
    id: {}
  },
  data() {
    return {
      //英雄信息
      info: {
        //名称
        name: "",
        //称号
        title: "",
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
          attach: 0,
          survive: 0
        },
        //使用技巧
        usageTips: "",
        //对抗技巧
        battleTips: "",
        //团战思路
        teamTips: "",
        //技能
        skills: []
      },
      //英雄分类
      categories: [],
      //装备（物品）列表
      items: []
    };
  },
  created() {
    this.getItemsList();
    this.getCategories();
    //&&代表满足前面的条件之后才执行后面的函数
    this.id && this.getInfo();
  },
  methods: {
    //获取英雄信息
    async getInfo() {
      let res = await this.$.get(`rest/hero/${this.id}`);
      this.info = Object.assign({}, this.info, res.data);
    },
    //获取英雄分类
    async getCategories() {
      let res = await this.$.get(`rest/category`);
      this.categories = res.data;
    },
    //获取装备（物品）
    async getItemsList() {
      let res = await this.$.get("rest/item");
      this.items = res.data;
    },
    async save() {
      if (this.id) {
        await this.$.put(`rest/hero/${this.id}`, this.info);
      } else {
        await this.$.post("rest/hero", this.info);
      }
      this.$router.push("/hero/list");
    },
    //图片上传完成
    uploadSuccess(res) {
      this.info.avatar = res.url;
    },
    //添加技能
    addSkill() {
      this.info.skills.push({});
    },
    //删除技能
    delSkill(index) {
      this.info.skills.splice(index, 1);
    }
  }
};
</script>
