<template>
  <el-card>
    <break-c slot="header">
      <div slot="title">素材管理</div>
    </break-c>
    <el-upload class="upload" :show-file-list = 'false' action :http-request="uploadImg">
      <el-button type="primary">上传图片</el-button>
    </el-upload>
    <el-tabs class="tab" v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部图片" name="all">
        <div class="img">
          <el-card class="card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <el-row type="flex" justify="space-around" style="font-size:20px">
              <i class="el-icon-star-on" @click="collect(item)" :style="{color: item.is_collected ? 'red': ''}"></i>
              <i class="el-icon-delete" @click="del(item)"></i>
            </el-row>
          </el-card>
        </div>
        <el-row type="flex" justify="center">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="changePage"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            :total="page.total"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="收藏图片" name="collect">
        <div class="img">
          <el-card class="card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
          </el-card>
        </div>
        <el-row type="flex" justify="center">
          <el-pagination
            @current-change="changePage"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            :total="page.total"
            background
            layout="prev, pager, next"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        currentPage: 1,
        pageSize: 15,
        total: 0
      }
    }
  },
  methods: {
    // 上传图片
    uploadImg (params) {
      let formData = new FormData()
      formData.append('image', params.file)
      this.$axios({
        method: 'post',
        url: '/user/images',
        data: formData
      }).then(res => {
        this.get()
      })
    },
    // 收藏及取消
    collect (item) {
      let mess = item.is_collected ? '取消收藏' : '收藏'
      this.$confirm(`您是否要${mess}此图片`).then(() => {
        this.$axios({
          method: 'put',
          url: `/user/images/${item.id}`,
          data: { collect: !item.is_collected }
        }).then(res => {
          this.get()
        })
      })
    },
    // 切换页码
    changePage (newPage) {
      this.page.currentPage = newPage
      this.get()
    },
    // 切换页签
    changeTab () {
      this.page.currentPage = 1
      this.get()
    },
    get () {
      let pageParams = {
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect', ...pageParams }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    },
    // 删除图片
    del (item) {
      this.$confirm('您是否要删除此图片').then(() => {
        this.$axios({
          method: 'delete',
          url: `user/images/${item.id}`
        }).then(res => {
          this.get()
        })
      })
    }
  },
  created () {
    this.get()
  }
}
</script>

<style lang = 'less' socped>
.upload {
  position: absolute;
  margin-top: -10px;
  right: 20px;
  z-index: 1;
}
.tab {
  .img {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .card {
      height: 200px;
      width: 200px;
      margin: 20px;
      img {
        height: 150px;
        width: 150px;
      }
    }
  }
}
</style>
