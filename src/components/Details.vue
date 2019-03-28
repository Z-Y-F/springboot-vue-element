<template>
  <div>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="backList()">返回主页</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="userInfoList" style="width: 98%">
      <el-table-column prop="pid" label="ID" width="180">
      </el-table-column>
      <el-table-column prop="personName" label="名字" width="180">
      </el-table-column>
      <el-table-column prop="personSex" label="性别" width="180">
      </el-table-column>
      <el-table-column prop="personBirthday" label="出生年月" width="180">
      </el-table-column>
      <el-table-column prop="personAddress" label="地址" width="180">
      </el-table-column>
      <el-table-column prop="personEmail" label="邮箱" width="180">
      </el-table-column>
      <el-table-column prop="personHobby" label="爱好" width="180">
      </el-table-column>
      <el-table-column prop="personRemark" label="备注" width="180">
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
  import {
    getPersonList
  } from '../api/api';
  import axios from 'axios';
  import qs from 'qs';

  export default {
    //name: "Details",
    data() {
      return {
        userInfoList: [],
      }
    },

    mounted: function () {
      this.loadData();
    },

    methods: {
      //进入页面自动触发展示用户列表
      loadData() {
        var params = {personName: this.$route.query.rowData}
        axios.post('/person/getPersonList', qs.stringify(params)).then((result) => {
          var _data = result.data;
          this.userInfoList = _data;
        });
      },

      //用vue路由跳转到主界面
      backList() {
        this.$router.push({
          path: '/Home',
        });
      }
    }

  }
</script>

<style scoped>

</style>
