<template>
  <el-row type="flex" class="header" justify="space-between">
    <el-col :span="8" class="left">
      <i class="el-icon-s-unfold"></i>
      <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="3" class="right">
      <img src="../../assets/img/avatar.jpg" alt />
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          下拉菜单
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>git地址</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
    return {}
  }
}
</script>

<style lang = 'less' scoped>
.header {
  padding: 15px 0;
  height: 60px;
  .left {
    display: flex;
    align-items: center;
    i {
      font-size: 24px;
    }
  }
  .right {
      display: flex;
      align-items: center;
      img {
          height: 35px;
          width: 35px;
          border-radius: 50%;
           margin-right: 4px;
      }
  }
}
</style>
