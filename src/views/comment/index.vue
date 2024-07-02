<template>
  <div class="app-container">
    <!-- 评论表格 -->
    <el-table
      v-loading="listLoading"
      :data="commentData"
      border
      highlight-current-row
      fit
      style="width: 100%"
    >
      <!-- 序号 -->
      <el-table-column label="序号" width="80" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + (currentPage - 1) * eachPage + 1 }}</span>
        </template>
      </el-table-column>

      <!-- 头像 -->
      <el-table-column label="头像" width="120" align="center">
        <template slot-scope="scope">
          <el-avatar :src="scope.row.avatar" size="large"></el-avatar>
        </template>
      </el-table-column>

      <!-- 昵称 -->
      <el-table-column label="昵称" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>

      <!-- 评论文章 -->
      <el-table-column label="评论文章" align="center" width="200">
        <template slot-scope="scope">
          {{ scope.row.blog.title }}
        </template>
      </el-table-column>

      <!-- 评论内容 -->
      <el-table-column label="评论内容" align="center">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>

      <!-- 评论日期 -->
      <el-table-column label="评论日期" align="center" width="240">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="2000"
            style="background-color: #9400ff; border: #9400ff"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="deleteCommentClickHandle(scope.row.id)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 评论分页 -->
    <el-pagination
      style="margin-top: 30px"
      background
      layout="prev, pager, next, total,->, sizes, jumper"
      :total="count"
      :page-sizes="[5, 10, 15, 20]"
      :current-page="currentPage"
      :page-size="eachPage"
      @prev-click="commentPrevClickHandle"
      @next-click="commentNextClickHandle"
      @current-change="commentCurrentChangeHandle"
      @size-change="commentSizeChangeHandle"
    >
    </el-pagination>
  </div>
</template>

<script>
import * as commentApi from '@/api/comment'
import { BaseUrl } from '@/urlConfig'
import { formatDate } from '@/utils/tools'
export default {
  data() {
    return {
      commentData: [],
      listLoading: false,
      eachPage: 5, // 每页显示的条数
      currentPage: 1, // 当前页码,默认进来是第一页
      totalPage: 0, // 总页数
      count: 0, // 总条数
      pageCurrentPage: 1 // 分页栏的当前页码
    }
  },
  created() {
    this.fetchCommentData()
  },
  methods: {
    async fetchCommentData() {
      this.listLoadin = true
      const { data } = await commentApi.getCommentList(
        this.currentPage,
        this.eachPage
      )
      data.rows.forEach((item) => {
        item.avatar = BaseUrl + item.avatar
        item.createDate = formatDate(item.createDate)
      })
      this.commentData = data.rows
      this.count = data.total // 计算总条数
      this.totalPage = Math.ceil(this.count / this.eachPage) // 计算总页数
      this.listLoading = false
      if (this.currentPage > this.totalPage) {
        this.currentPage = this.totalPage
        this.fetchCommentData()
      }
    },
    deleteCommentClickHandle(id) {
      this.$confirm('是否永久删除该评论?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          commentApi.deleteComment(id).then(() => {
            this.fetchCommentData()
            this.$message.success('删除成功!')
          })
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    // 上一页
    commentPrevClickHandle() {
      this.currentPage -= 1
    },
    // 下一页
    commentNextClickHandle() {
      this.currentPage += 1
    },
    // 设置当前页码
    commentCurrentChangeHandle(page) {
      this.currentPage = page
    },
    // 设置每页显示的条数
    commentSizeChangeHandle(size) {
      this.currentPage = 1
      this.pageCurrentPage = 1
      this.eachPage = ~~size
      this.fetchCommentData()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
