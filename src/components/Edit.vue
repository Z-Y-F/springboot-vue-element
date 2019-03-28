<template>
  <div>
    <!--编辑界面-->
    <el-dialog title="修改用户信息" :visible.sync="dialogVisible" width="35%" :close-on-click-modal="false">
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
        <!--<el-form-item prop="personMark">
          <el-radio v-model="addFormData.personMark" label="0">0</el-radio>
          <el-radio v-model="addFormData.personMark" label="1">1</el-radio>
        </el-form-item>-->
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
        addFormReadOnly: true,
        dialogVisible: false,
        isView: true,
        addFormData: {
          personName: '',
          personSex: '',
          personBirthday: '',
          personAddress: '',
          personEmail: '',
          personHobby: '',
          personRemark: '',
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
      }
    },

    created: function () {
      this.updatePerson();
    },

    methods: {
      //修改用户
      updatePerson() {
        var params = {pid: this.$route.query.rowData}
        this.addFormData = Object.assign({}, params);
        this.isView = true;
        this.dialogVisible = true;
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
                  message: '修改成功',
                });
                history.back();  //返回跳转原页面
              } else {
                this.$message({
                  type: 'info',
                  message: '修改失败',
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

