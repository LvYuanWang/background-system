<template>
  <div class="editArticle-container">
    <!-- 文章标题 -->
    <span class="block">文章标题</span>
    <div>
      <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
    </div>

    <!-- 文章编辑 -->
    <span class="block">文章编辑</span>
    <editor
      ref="toastuiEditor"
      :initialValue="form.editorText"
      height="600px"
      :options="editorOptions"
    />

    <!-- 文章描述 -->
    <span class="block">文章描述</span>
    <div>
      <el-input
        type="textarea"
        v-model="form.description"
        placeholder="请输入描述信息"
        :rows="4"
      ></el-input>
    </div>

    <!-- 文章头图 -->
    <Upload v-model="form.thumb" uploadTitle="文章头图" />

    <!-- 选择分类 -->
    <span class="block">选择分类</span>
    <el-select
      v-model="form.categoryId"
      placeholder="请选择文章分类"
      @change="editCategoryId"
    >
      <el-option
        v-for="item in blogTypeArr"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      ></el-option>
    </el-select>

    <!-- 发布文章 -->
    <div>
      <el-button
        type="primary"
        style="margin-top: 15px"
        @click="addEditorHandle"
        >{{ btnContent }}</el-button
      >
    </div>
  </div>
</template>

<script>
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/vue-editor'
import Upload from '@/components/Upload.vue'
import { getBlogType } from '@/api/blogType.js'
import { BaseUrl } from '@/urlConfig.js'
import { addBlogApi, editBlogApi, findeOneBlogApi } from '@/api/blog.js'
import '@toast-ui/editor/dist/i18n/zh-cn'
export default {
  props: ['mode'],
  components: {
    editor: Editor,
    Upload
  },
  data() {
    return {
      form: {
        title: '',
        editorText: '',
        description: '',
        thumb: '',
        categoryId: ''
      },
      blogTypeArr: [],
      editorOptions: {
        language: 'zh-CN'
      },
      btnContent: '发布文章'
    }
  },
  async created() {
    // 获取分类Name
    const blogTypeData = await getBlogType()
    this.blogTypeArr = blogTypeData.data

    if (this.mode === 'edit') {
      // 获取文章内容
      const { data } = await findeOneBlogApi(this.$route.params.id)
      data.thumb = BaseUrl + data.thumb
      this.form = data
      this.form.categoryId = data.category === null ? '' : data.category.id
      this.$refs.toastuiEditor.invoke('setHTML', data.htmlContent)
      this.btnContent = '编辑文章'
    }
  },
  methods: {
    // 发布文章
    addEditorHandle() {
      const html = this.$refs.toastuiEditor.invoke('getHTML')
      const markdown = this.$refs.toastuiEditor.invoke('getMarkdown')
      /*
      发布文章的时候需要的参数
      Body:
      {
        'title': 'string',
        'description': 'string',
        'createDate': '时间戳',
        'categoryId': 'string',
        'toc': [],
        'htmlContent': 'string',
        'thumb': 'string',
        'markdownContent': 'string'
      }
      */
      const obj = {
        title: this.form.title,
        description: this.form.description,
        createDate: new Date().getTime(),
        categoryId: this.form.categoryId,
        toc: [],
        htmlContent: html,
        thumb: this.form.thumb.replace(BaseUrl, ''),
        markdownContent: markdown
      }
      if (obj.title && obj.description && obj.categoryId && obj.htmlContent) {
        if (this.mode === 'add') {
          addBlogApi(obj).then(() => {
            this.$message.success('添加成功!')
            this.$router.push('/blog/BlogList')
          })
        } else {
          editBlogApi({ id: this.form.id, data: obj }).then(() => {
            this.$message.success('编辑成功!')
            this.$router.push('/blog/BlogList')
          })
        }
      } else {
        this.$message.error('请填写完所有内容!')
      }
    },
    editCategoryId() {
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="scss" scoped>
.block {
  margin: 15px 0;
  display: block;
  font-weight: bold;
  font-size: 20px;
}
</style>
