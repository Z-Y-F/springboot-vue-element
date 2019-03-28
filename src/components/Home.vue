<template>
  <div>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="query">
        <el-form-item>
          <el-input v-model="query.personName" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getUsers">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="addUser">新增</el-button>
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

      <!--进行修改和查询操作-->
      <el-table-column label="操作" align="center" min-width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="checkDetail(scope.row)">查看详情</el-button>
          <el-button type="primary" @click="updatePerson(scope.row)">修改</el-button>
          <el-button type="danger" @click="deletePerson(scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="35%" :close-on-click-modal="false">
      <el-form :model="addFormData" :rules="rules2" ref="addFormData" label-width="0px"
               class="demo-ruleForm login-container">
        <el-form-item prop="personName">
          <el-input type="text" v-model="addFormData.personName" auto-complete="off" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item prop="personSex">
          <el-radio v-model="addFormData.personSex" label="男">男</el-radio>
          <el-radio v-model="addFormData.personSex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item prop="personBirthday">
          <div class="block">
            <span class="demonstration">出生年月</span>
            <el-date-picker
              v-model="addFormData.personBirthday"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item prop="personAddress">
          <el-input type="text" v-model="addFormData.personAddress" auto-complete="off" placeholder="地址"></el-input>
        </el-form-item>
        <el-form-item prop="personEmail">
          <el-input type="text" v-model="addFormData.personEmail" auto-complete="off" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="personHobby">
          <el-input type="text" v-model="addFormData.personHobby" auto-complete="off" placeholder="爱好"></el-input>
        </el-form-item>
        <el-form-item prop="personRemark">
          <el-input type="text" v-model="addFormData.personRemark" auto-complete="off" placeholder="备注"></el-input>
        </el-form-item>
        <el-form-item prop="personMark">
          <el-input type="text" v-model="addFormData.personMark" auto-complete="off"
                    placeholder="标识(0不显示1显示)"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button
                  @click.native="dialogVisible = false,addFormData={pid:'',personName:'',personSex:'',personBirthday:'',personAddress:'',personEmail:'',personHobby:'',personRemark:'',personMark:''}">取 消</el-button>
                <el-button v-if="isView" type="primary" @click.native="addSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  //引入api.js  好调用里面的接口
  import {
    getPersonList
  } from '../api/api';
  import axios from 'axios';
  import qs from 'qs';

  export default {
    //name: 'Home',
    data() {
      return {
        userInfoList: [],
        addFormReadOnly: true,
        dialogVisible: false,
        isView: true,
        addFormData: {
          pid: '',
          personName: '',
          personSex: '',
          personBirthday: '',
          personAddress: '',
          personEmail: '',
          personHobby: '',
          personRemark: '',
          personMark: ''
        },
        rules2: {
          personName: [{
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          }],
          personSex: [{
            required: true,
            message: '性别不能为空',
            trigger: 'blur'
          }],
          personBirthday: [{
            required: true,
            message: '出生年月不能为空',
            trigger: 'blur'
          }],
          personAddress: [{
            required: true,
            message: '地址不能为空',
            trigger: 'blur'
          }],
          personEmail: [{
            required: true,
            message: '邮箱不能为空',
            trigger: 'blur'
          }],
          personHobby: [{
            required: true,
            message: '爱好不能为空',
            trigger: 'blur'
          }],
          personRemark: [{
            required: true,
            message: '备注不能为空',
            trigger: 'blur'
          }]
        },
        query: {
          personName: ''
        }
      }
    },

    mounted: function () {
      this.loadData();
    },

    methods: {
      //进入页面自动触发展示用户列表
      loadData() {
        let param = {personName: this.query.personName};
        axios.post('/person/getPersonList', qs.stringify(param)).then((result) => {
          var _data = result.data;
          this.userInfoList = _data;
        });
      },

      //根据姓名查询
      getUsers() {
        this.loadData();
      },

      //查看详情
      checkDetail(rowData) {
        //用vue路由跳转到详情页
        this.$router.push({
          path: '/Details',
          query: {
            rowData: rowData.personName
          }
        });
      },

      //增加用户
      addUser() {
        this.addFormData = {
          pid: '',
          personName: '',
          personSex: '',
          personBirthday: '',
          personAddress: '',
          personEmail: '',
          personHobby: '',
          personRemark: ''
        };
        this.isView = true;
        this.dialogVisible = true;
        //    this.addFormReadOnly = false;
      },

      ///修改用户
      updatePerson(rowData) {
        //用vue路由跳转到后台主界面
        this.$router.push({
          path: '/Edit',
          query: {
            rowData: rowData.pid,
          }
        });
        this.isView = true;
        this.dialogVisible = true;
      },

      //删除用户
      deletePerson(rowData) {
        this.$alert('是否删除此用户', '信息删除', {
          confirmButtonText: '确定',
          callback: action => {
            var params = {
              pid: rowData.pid
            };
            axios.post("/person/deletePerson", qs.stringify(params)).then((result) => {
              console.info(result);
              if (result.data.success) {
                this.$message({
                  type: 'info',
                  message: `已删除`
                });
              } else {
                this.$message({
                  type: 'info',
                  message: `删除失败`
                });
              }
              this.loadData();
            });
          }
        });
      },

      //点击确定按钮触发
      addSubmit() {
        //先判断表单是否通过了判断
        this.$refs.addFormData.validate((valid) => {
          //代表通过验证 ,将参数传回后台
          if (valid) {
            let param = Object.assign({}, this.addFormData);
            axios.post("/person/submit", qs.stringify(param)).then((result) => {
              if (result.data.success) {
                this.$message({
                  type: 'info',
                  message: '添加成功',
                });
                this.loadData();
              } else {
                this.$message({
                  type: 'info',
                  message: '添加失败',
                });
              }
              this.dialogVisible = false;
            });
          }
        });
      }
    }
  }
</script>

<style>
  body {
    background: #DFE9FB;
  }
</style>

