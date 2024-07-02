<template>
  <div class="app-container">
    <!-- 网站信息 -->
    <div class="siteItem">
      <h1>网站信息</h1>
      <span class="block">网站标题</span>
      <el-input
        v-model="setting.siteTitle"
        disabled
        placeholder="请输入标题"
      ></el-input>

      <!-- 邮箱 -->
      <span class="block">邮箱</span>
      <el-input
        v-model="setting.mail"
        disabled
        placeholder="请输入邮箱"
      ></el-input>

      <!-- 备案号 -->
      <span class="block">备案号</span>
      <el-input
        v-model="setting.icp"
        disabled
        placeholder="请输入备案号"
      ></el-input>
    </div>

    <!-- 网站头像信息 -->
    <div class="siteItem">
      <h1>网站头像信息</h1>
      <el-image
        style="width: 178px; height: 178px"
        :src="setting.avatar"
        fit="cover"
      ></el-image>
    </div>

    <!-- 网址图标信息 -->
    <div class="siteItem">
      <h1>网址图标信息</h1>
      <span class="block">网址图标地址</span>
      <el-input
        v-model="setting.favicon"
        disabled
        placeholder="请输入网址图标地址"
      ></el-input>

      <span class="block">网址图标浏览</span>
      <el-image
        style="width: 60px; height: 60px"
        :src="setting.favicon"
        fit="cover"
      ></el-image>
    </div>

    <!-- GitHub 信息 -->
    <div class="siteItem">
      <h1>GitHub 信息</h1>
      <span class="block">github 名字</span>
      <el-input
        v-model="setting.githubName"
        disabled
        placeholder="请输入GitHub 名字"
      ></el-input>
      <span class="block">github 地址</span>
      <el-input
        v-model="setting.github"
        disabled
        placeholder="请输入GitHub 地址"
      ></el-input>
    </div>

    <!-- QQ信息 -->
    <div class="siteItem">
      <h1>QQ信息</h1>
      <span class="block">QQ 号码</span>
      <el-input
        v-model="setting.qq"
        disabled
        placeholder="请输入QQ号"
      ></el-input>
      <span class="block">QQ二维码图片预览</span>
      <el-image
        style="width: 150px; height: 150px"
        :src="setting.qqQrCode"
        fit="cover"
      ></el-image>
    </div>

    <!-- 微信信息 -->
    <div class="siteItem">
      <h1>微信信息</h1>
      <span class="block">微信号码</span>
      <el-input
        v-model="setting.weixin"
        disabled
        placeholder="请输入QQ号"
      ></el-input>
      <span class="block">微信二维码图片预览</span>
      <el-image
        style="width: 150px; height: 150px"
        :src="setting.weixinQrCode"
        fit="cover"
      ></el-image>
    </div>

    <!-- 编辑 -->
    <el-button type="primary" style="margin-top: 20px" @click="openEditSetting"
      >进入编辑模式</el-button
    >

    <!-- 编辑页面 -->
    <el-dialog
      title="编辑网站信息"
      fullscreen
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form">
        <!-- 网站标题 -->
        <el-form-item label="网站标题">
          <el-input
            v-model="form.siteTitle"
            placeholder="请输入标题"
          ></el-input>
        </el-form-item>

        <!-- 邮箱 -->
        <el-form-item label="邮箱">
          <el-input v-model="form.mail" placeholder="请输入邮箱"></el-input>
        </el-form-item>

        <!-- 备案号 -->
        <el-form-item label="备案号">
          <el-input v-model="form.icp" placeholder="请输入备案号"></el-input>
        </el-form-item>

        <!-- 网站头像信息 -->
        <Upload v-model="form.avatar" uploadTitle="网站头像" />

        <!-- 网址图标信息 -->
        <el-form-item label="网址图标地址">
          <el-input
            v-model="form.favicon"
            placeholder="请输入图标地址"
          ></el-input>
        </el-form-item>

        <!-- GitHub信息 -->
        <el-form-item label="GitHub名字">
          <el-input
            v-model="form.githubName"
            placeholder="请输入GitHub名字"
          ></el-input>
        </el-form-item>

        <!-- GitHub地址 -->
        <el-form-item label="GitHub地址">
          <el-input
            v-model="form.github"
            placeholder="请输入GitHub地址"
          ></el-input>
        </el-form-item>

        <!-- qq号码 -->
        <el-form-item label="QQ号码">
          <el-input v-model="form.qq" placeholder="请输入QQ号"></el-input>
        </el-form-item>

        <!-- qq二维码图片 -->
        <Upload v-model="form.qqQrCode" uploadTitle="QQ二维码图片上传" />

        <!-- 微信号码 -->
        <el-form-item label="微信号码">
          <el-input v-model="form.weixin" placeholder="请输入微信号"></el-input>
        </el-form-item>

        <!-- 微信二维码图片 -->
        <Upload v-model="form.weixinQrCode" uploadTitle="微信二维码图片上传" />
      </el-form>

      <!-- 修改成功 -->
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editSettingSave">保 存</el-button>
        <el-button @click="editSettingCancel">取 消 编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as settingApi from '@/api/setting'
import Upload from '@/components/Upload'
import { BaseUrl } from '@/urlConfig'
export default {
  data() {
    return {
      btnContent: '编辑',
      dialogFormVisible: false,
      setting: {
        siteTitle: '',
        mail: '',
        icp: '',
        avatar: '',
        favicon: '',
        githubName: '',
        github: '',
        qq: '',
        qqQrCode: '',
        weixin: '',
        weixinQrCode: ''
      },
      form: {
        siteTitle: '',
        mail: '',
        icp: '',
        avatar: '',
        favicon: '',
        githubName: '',
        github: '',
        qq: '',
        qqQrCode: '',
        weixin: '',
        weixinQrCode: ''
      }
    }
  },
  components: {
    Upload
  },
  created() {
    this.fetchSettingData()
  },
  methods: {
    async fetchSettingData() {
      const { data } = await settingApi.getSetting()
      data.avatar = BaseUrl + data.avatar
      data.qqQrCode = BaseUrl + data.qqQrCode
      data.weixinQrCode = BaseUrl + data.weixinQrCode
      this.setting = data
    },
    openEditSetting() {
      this.dialogFormVisible = true
      this.form = { ...this.setting }
      console.log(this.form)
    },
    // 取消编辑
    editSettingCancel() {
      this.dialogFormVisible = false
      this.$message.info('取消编辑成功')
    },
    // 保存编辑
    async editSettingSave() {
      this.form.avatar = this.form.avatar.replace(BaseUrl, '')
      this.form.qqQrCode = this.form.qqQrCode.replace(BaseUrl, '')
      this.form.weixinQrCode = this.form.weixinQrCode.replace(BaseUrl, '')
      await settingApi.updateSetting(this.form)
      this.dialogFormVisible = false
      this.$message.success('修改成功')
      this.fetchSettingData()
    }
  }
}
</script>

<style lang="scss" scoped>
.block {
  margin: 15px 0;
  display: block;
  font-weight: 500;
  font-size: 20px;
}
.siteItem {
  padding-bottom: 30px;
  border-bottom: 2px solid #ccc;
}
</style>
