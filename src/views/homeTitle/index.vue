<template>
  <div class="app-container">
    <!-- 数据表格 -->
    <el-table :data="data" style="width: 100%" border>
      <el-table-column prop="date" label="序号" width="60" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="150" align="center">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column prop="description" label="描述" align="center">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>
      <el-table-column
        prop="midImg"
        label="中图预览"
        width="200"
        align="center"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 170px"
            :src="scope.row.midImg"
            fit="fill"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="bigImg"
        label="大图预览"
        width="200"
        align="center"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 170px"
            :src="scope.row.bigImg"
            fit="scale-down"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="操作"
        align="center"
        width="100"
      >
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="handleEdit(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑表格 -->
    <el-dialog title="请编辑信息" :visible.sync="dialogFormVisible" top="1vh">
      <el-form :model="form">
        <el-form-item label="标语">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" :rows="4" v-model="form.description">
          </el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="中图">
              <!-- 中图 -->
              <Upload v-model="form.midImg" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="大图">
              <!-- 大图 -->
              <Upload v-model="form.bigImg" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="setBannerData">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加标语 -->
    <el-tooltip
      class="item"
      effect="dark"
      content="添加标语"
      placement="left"
      :hide-after="2000"
    >
      <el-button
        type="primary"
        icon="el-icon-plus"
        circle
        size="medium"
        @click="addBannerData"
        style="position: fixed; right: 20px; bottom: 20px"
      ></el-button>
    </el-tooltip>
  </div>
</template>

<script>
import { getBanner, setBanner } from "@/api/banner.js";
import { BaseUrl } from "@/urlConfig.js";
import Upload from "@/components/Upload.vue";
export default {
  data() {
    return {
      data: [], // 表格数据
      dialogFormVisible: false, // 编辑对话框是否显示
      form: {
        id: "",
        title: "",
        description: "",
        midImg: "",
        bigImg: "",
      },
    };
  },
  components: {
    Upload,
  },
  created() {
    this.fetchBanner();
  },
  methods: {
    async fetchBanner() {
      const res = await getBanner();
      this.data = res.data.map((item) => {
        return {
          ...item,
          midImg: BaseUrl + item.midImg,
          bigImg: BaseUrl + item.bigImg,
        };
      });
    },
    handleEdit(data) {
      this.form = { ...data };
      this.dialogFormVisible = true;
    },
    async setBannerData() {
      let data = [...this.data];
      for (let i = 0; i < data.length; i++) {
        data[i].midImg = data[i].midImg.replace(BaseUrl, "");
        data[i].bigImg = data[i].bigImg.replace(BaseUrl, "");
        if (data[i].id == this.form.id) {
          this.form.midImg = this.form.midImg.replace(BaseUrl, "");
          this.form.bigImg = this.form.bigImg.replace(BaseUrl, "");
          data[i] = { ...this.form };
        }
      }
      await setBanner(data);
      this.$message({
        message: "修改成功",
        type: "success",
      });
      this.fetchBanner();
      this.dialogFormVisible = false;
    },
    addBannerData() {
      this.$message({
        dangerouslyUseHTMLString: true,
        message: "<strong style='color: red;'>请在数据库中添加数据</strong>",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>