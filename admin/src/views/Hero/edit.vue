<template>
  <div class="item-container">
    <h1>{{id ? '编辑' : '新建'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="info.name"></el-input>
      </el-form-item>
      <el-form-item label="称号">
        <el-input v-model="info.title"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="`${$.defaults.baseURL}upload`"
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
      <el-form-item>
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
        teamTips: ""
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
    }
  }
};
</script>

<style lang="scss">
.item-container {
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>