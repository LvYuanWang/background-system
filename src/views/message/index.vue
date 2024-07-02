<template>
  <div class="app-container">
    <!-- 留言板表格 -->
    <el-table
      v-loading="listLoading"
      :data="messageListData"
      border
      highlight-current-row
      fit
      style="width: 100%"
    >
      <!-- 序号 -->
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + (currentPage - 1) * eachPage + 1 }}</span>
        </template>
      </el-table-column>

      <!-- 头像 -->
      <el-table-column label="头像" width="90" align="center">
        <template slot-scope="scope">
          <el-avatar :src="scope.row.avatar" :size="50"></el-avatar>
        </template>
      </el-table-column>

      <!-- 昵称 -->
      <el-table-column label="昵称" width="140" align="center">
        <template slot-scope="scope">
          <strong>{{ scope.row.nickname }}</strong>
        </template>
      </el-table-column>

      <!-- 内容 -->
      <el-table-column label="内容" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.content }}</span>
        </template>
      </el-table-column>

      <!-- 创建日期 -->
      <el-table-column label="创建日期" align="center" width="230">
        <template slot-scope="scope">
          <strong>{{ scope.row.createDate }}</strong>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" align="center" width="80">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="2000"
            style="background-color: #ff33f5; border: #ff33f5"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              circle
              @click="deleteMessageClickHandle(scope.row.id)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 留言板分页 -->
    <el-pagination
      style="margin-top: 30px"
      background
      layout="prev, pager, next, total, -> ,sizes, jumper"
      :total="count"
      :page-size="eachPage"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      @prev-click="prevMessageClickHandle"
      @next-click="nextMessageClickHandle"
      @current-change="currentMessageChangeHandle"
      @size-change="messageSizeChangeHandle"
    ></el-pagination>
  </div>
</template>

<script>
import * as messageApi from '@/api/message'
import { BaseUrl } from '@/urlConfig'
import { formatDate } from '@/utils/tools'
export default {
  data() {
    return {
      messageListData: [],
      listLoading: false,
      eachPage: 5, // 每页显示的数据条数
      currentPage: 1, // 当前页码
      totalPage: 0, // 总页数
      count: 0, // 总条数
      pageCurrentPage: 1 // 分页栏的当前页码
    }
  },
  created() {
    this.fetchMessageList()
  },
  methods: {
    async fetchMessageList() {
      this.listLoading = true
      const { data } = await messageApi.getMessageList(
        this.currentPage,
        this.eachPage
      )
      data.rows.forEach((item) => {
        item.avatar = BaseUrl + item.avatar
        item.createDate = formatDate(item.createDate)
      })
      this.messageListData = data.rows
      this.count = data.total
      this.totalPage = Math.ceil(this.count / this.eachPage)
      this.listLoading = false
      if (this.currentPage > this.totalPage) {
        this.currentPage = this.totalPage
        this.fetchMessageList()
      }
    },
    // 上一页
    prevMessageClickHandle() {
      this.currentPage -= 1
    },
    // 下一页
    nextMessageClickHandle() {
      this.currentPage += 1
    },
    // 翻页
    currentMessageChangeHandle(newPage) {
      this.currentPage = newPage
      this.fetchMessageList()
    },
    // 设置分页栏的当前页码
    messageSizeChangeHandle(newSize) {
      this.eachPage = newSize
      this.currentPage = 1
      this.fetchMessageList()
    },
    // 删除留言
    deleteMessageClickHandle(id) {
      this.$confirm('此操作将永久删除该留言,是否继续?', '是否删除该留言', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          messageApi.deleteMessage(id).then(() => {
            this.fetchMessageList()
            this.$message.success('删除成功!')
          })
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
