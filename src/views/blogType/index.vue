<template>
  <div class="app-container">
    <!-- 分类搜索框 -->
    <div style="margin-top: 15px; margin-bottom: 20px">
      <el-input
        placeholder="请输入要添加的分类,左边选择该分类的等级"
        v-model="input"
        class="input-with-select"
        style="margin-right: 10px; width: 400px"
      >
        <el-select v-model="select" slot="prepend" @change="fetchBlogTypeData">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
        </el-select>
      </el-input>
      <el-button type="primary" @click="addBlogTypeData">发送</el-button>
    </div>
    <!-- 分类列表 -->
    <el-table
      :data="blogTypeList"
      style="width: 100%"
      border
      v-loading="listLoading"
    >
      <el-table-column prop="date" label="序号" width="80" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>

      <el-table-column prop="name" label="博客类别" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>

      <el-table-column prop="articleCount" label="文章数量" align="center">
        <template slot-scope="scope">{{ scope.row.articleCount }}</template>
      </el-table-column>

      <el-table-column
        prop="description"
        label="操作"
        width="150"
        align="center"
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
              @click="editBlogTypeHandle(scope.row)"
            ></el-button>
          </el-tooltip>

          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="deleteBlogTypeHandle(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑分类" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="文章类别">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="form.order" placeholder="分类等级">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelClick">取 消</el-button>
        <el-button type="primary" @click="confirmClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as blogTypeApi from '@/api/blogType.js'
export default {
  data() {
    return {
      blogTypeList: [],
      input: '',
      select: '1',
      listLoading: false,
      dialogFormVisible: false,
      form: {
        name: '',
        order: ''
      }
    }
  },
  created() {
    this.fetchBlogTypeData(this.select)
  },
  methods: {
    // 获取文章分类数据
    // async fetchBlogTypeData() {
    //   this.listLoading = true;
    //   const resp = await blogTypeApi.getBlogType();
    //   this.blogTypeList = resp.data;
    //   this.listLoading = false;
    // },
    // 选择文章分类的序号
    async fetchBlogTypeData(orderNumber) {
      this.listLoading = true
      this.blogTypeList = []
      const resp = await blogTypeApi.getBlogType()
      resp.data.forEach((item) => {
        if (item.order === orderNumber) {
          this.blogTypeList.push(item)
        }
      })
      this.listLoading = false
    },
    // 编辑文章分类
    async editBlogTypeHandle({ id }) {
      this.dialogFormVisible = true
      const resp = await blogTypeApi.findOneBlogType(id)
      this.form = resp.data
    },
    // 删除文章分类
    deleteBlogTypeHandle({ id }) {
      this.$confirm(
        '删除分类后,分类下的所有文章将变为无分类状态,是否继续?',
        '是否确认删除该分类',
        {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          blogTypeApi.delBlogType(id).then(() => {
            this.$message.success('删除成功!!')
            this.fetchBlogTypeData(this.select)
          })
        })
        .catch(() => {
          this.$message.info('拉机,就知道你不敢删😀')
        })
    },
    // 添加文章分类
    async addBlogTypeData() {
      if (this.input === '') {
        this.$message.error('分类不能为空,请填写分类!!')
      } else {
        await blogTypeApi.addBlogType({
          name: this.input,
          order: this.select
        })
        this.$message.success('添加成功!!')
        this.input = ''
        this.fetchBlogTypeData(this.select)
      }
    },
    // 编辑分类弹窗取消按钮
    // 取消
    cancelClick() {
      this.dialogFormVisible = false
      this.$message.info('已取消修改')
    },
    // 确认
    async confirmClick() {
      // const resp = await blogTypeApi.updateOneBlogType({
      //   id: this.form.id,
      //   data: this.form
      // })
      this.fetchBlogTypeData(this.select)
      this.dialogFormVisible = false
      this.$message.success('修改成功!')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
