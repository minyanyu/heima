<template>
  <el-container>
    <el-aside style="width:200px">
      <com-aside></com-aside>
    </el-aside>
    <el-container>
      <el-header>
        <com-header></com-header>
      </el-header>
      <el-main>主要</el-main>
    </el-container>
  </el-container>
</template>

<script>
import comAside from '../../components/home/aside'
import Header from '../../components/home/header'
export default {
  components: {
    'com-aside': comAside,
    'com-header': Header
  }
}
</script>
