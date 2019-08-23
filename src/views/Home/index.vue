<template>
  <el-container>
    <el-aside style="width:200px;min-height:100vh" >
      <com-aside></com-aside>
    </el-aside>
    <el-container>
      <el-header>
        <com-header>
        </com-header>
      </el-header>
      <el-main style = 'padding:0 0'>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  components: {

  }
}
</script>
