<template>
  <el-card slot="header">
    <break-c>
      <div slot="title">评论列表</div>
    </break-c>
    <template style="margin-top:20px;">
      <el-table style="width: 100%" :data="list">
        <el-table-column prop="title" label="标题" width="400px"></el-table-column>
        <el-table-column :formatter="formatter" prop="comment_status" label="评论状态"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评数量"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column prop label="操作">
          <template slot-scope="obj">
            <el-button type="text">修改</el-button>
            <el-button
              type="text"
              @click="closeOrOpen(obj.row)"
            >{{obj.row.comment_status?'关闭评论':'打开评论'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-row type="flex" justify="center" style="margin:20px 0">
      <el-pagination
        @current-change="changePage"
        background
        layout="prev, pager, next"
        :total="page.total"
        :page-size="page.pageSize"
        :current-page="page.currentPage"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
    return {
      list: [],
      page: {
        pageSize: 10,
        total: 0,
        currentPage: 1
      }
    }
  },
  methods: {
    changePage (newPage) {
      // 用最新页码去查询
      this.page.currentPage = newPage
      this.get()
    },
    // 加载页面
    get () {
      let pageParams = { page: this.page.currentPage,
        per_page: this.page.pageSize }
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment',
          ...pageParams
        }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    },
    // 让状态显示
    formatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    // 控制关闭或者打开  涉及大数字类型的处理
    closeOrOpen (row) {
      // console.log(row)
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您确定要${mess}评论吗`, '提示').then(() => {
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status }
        }).then(() => {
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

<style>
</style>
