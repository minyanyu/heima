<template>
  <el-card>
    <break-c slot="header">
      <template slot="title">发布文章</template>
    </break-c>
    <el-form label-width="80px" :model="formData" :rules="rules" ref = 'myform'>
      <el-form-item label="标题" style="width:400px" prop="title">
        <el-input placeholder="请输入标题" v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input
          v-model="formData.content"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 10}"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <el-radio-group  v-model='formData.cover'>
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="2">三图</el-radio>
          <el-radio :label="3">无图</el-radio>
          <el-radio :label="4">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
        <el-select placeholder="请选择" v-model="formData.channel_id">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click = 'publish'>发表</el-button>
        <el-button>存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
    return {
      channels: [],
      formData: {
        title: '',
        content: '',
        channel_id: null,
        cover: 0
      },
      rules: {
        title: [{ required: true, message: '标题不能为空' }],
        content: [{ required: true, message: '内容不能为空' }],
        channel_id: [{ required: true, message: '频道不能为空' }]
      }
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        console.log(res)
        this.channels = res.data.channels
      })
    },
    publish () {
      this.$refs.myform.validate((isOk) => {
        if (isOk) {
          // 发布文章
        }
      })
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style>
</style>
