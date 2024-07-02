<template>
  <div class="uploadContainer">
    <div class="uploadTitle">{{ uploadTitle }}</div>
    <el-upload
      class="avatar-uploader"
      action="/api/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :headers="getHeaders"
    >
      <img v-if="value" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { BaseUrl } from "@/urlConfig.js";
export default {
  props: ["uploadTitle", "value"],
  computed: {
    imageUrl() {
      if (this.value) {
        return this.value;
      }
    },
    getHeaders() {
      return {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      };
    },
  },
  methods: {
    handleAvatarSuccess(res) {
      if (!res.code && res.data) {
        this.$emit("input", BaseUrl + res.data);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.uploadTitle {
  margin: 15px 0;
  font-weight: bold;
  font-size: 20px;
}
.avatar-uploader .el-icon-plus {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-icon-plus:hover {
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
  object-fit: cover;
}
</style>