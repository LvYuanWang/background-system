<template>
  <div class="app-container">
    <!-- 数据表格 -->
    <el-table :data="blogList" style="width: 100%" border>
      <el-table-column prop="date" label="序号" width="80" align="center">
        <template slot-scope="scope">{{
          scope.$index + (currentPage - 1) * eachPage + 1
        }}</template>
      </el-table-column>

      <el-table-column prop="title" label="文章名称" width="200" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            title="博客预览图"
            width="250"
            trigger="hover"
            :close-delay="100"
          >
            <el-image
              style="width: 220px"
              :src="scope.row.thumb"
              fit="contain"
              :preview-src-list="srcThumbList"
            ></el-image>
            <a
              href="#"
              target="_blank"
              slot="reference"
              @click.prevent="goToTitleHandle(scope.row)"
              >{{ scope.row.title }}</a
            >
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
        prop="description"
        label="文章描述"
        width="260"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>

      <el-table-column prop="scanNumber" label="浏览数" align="center">
        <template slot-scope="scope">{{ scope.row.scanNumber }}</template>
      </el-table-column>

      <el-table-column prop="commentNumber" label="评论量" align="center">
        <template slot-scope="scope">{{ scope.row.commentNumber }}</template>
      </el-table-column>

      <el-table-column prop="name" label="所属分类" align="center">
        <template slot-scope="scope">{{
          scope.row.category === null ? "未分类" : scope.row.category.name
        }}</template>
      </el-table-column>

      <el-table-column
        prop="createDate"
        label="创建日期"
        width="235"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.createDate }}</template>
      </el-table-column>

      <el-table-column prop="description" label="操作" align="center">
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
              style="background-color: #e6a23c; border-color: #e6a23c"
              size="mini"
              @click="editBlog(scope.row)"
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
              @click="deleteBlog(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      style="margin-top: 30px"
      background
      layout="prev, pager, next, total,->, sizes, jumper"
      :total="count"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="eachPage"
      @prev-click="prevClickHandle"
      @next-click="nextClickHandle"
      @current-change="currentChangeHandle"
      @size-change="sizeChangeHandle"
    >
    </el-pagination>
  </div>
</template>

<script>
// 端口号需更改的文件: vue.config.js   urlConfig.js  config.default.js
import { getBlog, deleteBlogApi } from "@/api/blog.js";
import { formatDate } from "@/utils/tools.js";
import { BaseUrl, siteClientUrl } from "@/urlConfig.js";
export default {
  data() {
    return {
      blogList: [],
      srcThumbList: [],
      eachPage: 5, // 每一页显示的条数
      currentPage: 1, // 当前页码,默认进来是第一页
      totalPage: 0, // 总页数
      count: 0, // 总条数
      pageCurrentPage: 1, // 分页栏的当前页码
    };
  },
  created() {
    this.fetchBlogData();
  },
  methods: {
    async fetchBlogData() {
      const resp = await getBlog(this.currentPage, this.eachPage);
      this.blogList = resp.data.rows;
      this.blogList.forEach((item) => {
        item.createDate = formatDate(item.createDate);
        item.thumb = BaseUrl + item.thumb;
        this.srcThumbList.push(item.thumb);
      });
      this.count = resp.data.total;
      this.totalPage = Math.ceil(this.count / this.eachPage); // 向上取整
      if (this.currentPage > this.totalPage) {
        this.currentPage = this.totalPage;
      }
    },
    // 跳转到文章标题
    goToTitleHandle(blogInfo) {
      window.open(`${siteClientUrl}/article/detail/${blogInfo.id}`);
    },
    // 编辑文章
    editBlog(blogInfo) {
      this.$router.push(`/blog/editBlog/${blogInfo.id}`);
    },
    // 删除文章
    deleteBlog(blogInfo) {
      this.$confirm(
        "删除该文章后,该文章下的所有评论将会被一同删除, 是否继续?",
        "是否确认删除该文章",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          deleteBlogApi(blogInfo.id).then(() => {
            this.fetchBlogData();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    currentChangeHandle(pageNumber) {
      this.currentPage = parseInt(pageNumber);
      this.fetchBlogData();
    },
    sizeChangeHandle(pageSize) {
      this.eachPage = parseInt(pageSize);
      this.currentPage = 1;
      // this.pageCurrentPage = 1;
      this.fetchBlogData();
    },
    // 上一页
    prevClickHandle() {
      this.currentPage -= 1;
    },
    // 下一页
    nextClickHandle() {
      this.currentPage += 1;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>