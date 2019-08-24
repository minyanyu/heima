<template>
  <el-card>
    <break-c slot="header">
      <template slot="title">内容列表</template>
    </break-c>
    <el-form style="margin-left:40px">
      <el-form-item label="文章状态">
        <el-radio-group v-model="formData.status" @change="change">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表">
        <el-select v-model="formData.channelsId" placeholder="请选择" @change="change">
          <el-option v-for="item in channels" :key="item.value" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择">
        <div class="block">
          <el-date-picker
            value-format="yyyy-MM-dd"
            @change="change"
            v-model="formData.date"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
      </el-form-item>
    </el-form>
    <div
      style="margin:20px 0;border-bottom:1px dashed #ccc;height:50px;line-height:50px;"
    >共找到{{page.total}}条符合条件的内容</div>
    <div class="articles" v-for="(item,index) in list" :key="index">
      <div class="left">
        <img :src="item.cover.images[0]" alt />
        <div class="left_content">
          <span>{{item.title}}</span>
          <el-tag class="status" :type="item.status | Statuscolor">{{item.status | articlesStatus}}</el-tag>
          <span>{{item.pubdate}}</span>
        </div>
      </div>
      <div class="right">
        <span style='cursor:pointer'>
          <i class="el-icon-edit"></i>
          修改
        </span>
        <span @click = 'del(item.id)' style='cursor:pointer'>
          <i class="el-icon-delete"></i>
          删除
        </span>
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        @current-change="changpage"
        background
        layout="prev, pager, next"
        :page-size="page.pageSize"
        :total="page.total"
        :current-page="page.currentPage"
      ></el-pagination>
    </div>
  </el-card>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
    return {
      formData: {
        status: 5,
        channelsId: null,
        date: null
      },
      channels: [],
      list: [],
      page: {
        total: 0, // 总条目数
        pageSize: 10, // 每页显示个数
        currentPage: 1 // 当前显示页数
      }
    }
  },
  methods: {
    // 删除文章
    del (id) {
      this.$confirm('您确定要删除吗').then(() => {
        this.$axios({
          method: 'delete',
          url: `/articles/${id.toString()}`
        }).then(() => {
          this.getArticles()
        })
      })
    },
    // 页码改变
    changpage (newPage) {
      this.page.currentPage = newPage
      this.getArticles(this.refresh())
    },
    // 上面三个综合
    change () {
      this.page.currentPage = 1
      this.getArticles(this.refresh())
    },
    // 所有请求的打包
    refresh () {
      // console.log(this.formData.date)
      let { status, channelsId, date } = this.formData
      let params = {
        status: status === 5 ? null : status,
        channel_id: channelsId,
        begin_pubdate: date && date.length > 0 ? date[0] : null,
        end_pubdate: date && date.length > 1 ? date[1] : null
      }
      params.page = this.page.currentPage
      params.per_page = this.page.pageSize
      return params
    },
    // 获取文章列表内容
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params: {
          ...params
        }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    },
    // 获取频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    }
  },
  filters: {
    articlesStatus (statusValue) {
      switch (statusValue) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    },
    Statuscolor (statusValue) {
      switch (statusValue) {
        case 0:
          return 'warning'
        case 1:
          return '待审核'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        case 4:
          return 'info'
      }
    }
  },

  created () {
    this.getArticles()
    this.getChannels()
  }
}
</script>

<style lang='less' scoped>
.articles {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  position: relative;
  .left {
    display: flex;
    justify-content: space-between;
    img {
      height: 100px;
      width: 150px;
    }
    .left_content {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100px;
      .status {
        width: 60px;
      }
    }
  }
  .right {
    position: absolute;
    right: 10px;
    font-size: 12px;
  }
}
.pagination {
  display: flex;
  justify-content: center;
  margin: 30px 0;
}
</style>
