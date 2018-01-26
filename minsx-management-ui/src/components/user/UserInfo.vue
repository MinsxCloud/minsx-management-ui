<template>

  <div class="userInfoForm">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="帐号">
        <el-input v-model="form.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="帐号状态">
        <el-input v-model="form.state" disabled></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.userNick"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="签名">
        <el-input type="textarea" v-model="form.signature"></el-input>
      </el-form-item>
      <el-form-item label="注册时间">
        <el-input v-model="form.registerTime" disabled></el-input>
      </el-form-item>
      <el-form-item label="登录时间">
        <el-input v-model="form.lastLoginTime" disabled></el-input>
      </el-form-item>
      <el-form-item label="注册IP">
        <el-input v-model="form.registerIp" disabled></el-input>
      </el-form-item>
      <el-form-item label="登录IP">
        <el-input v-model="form.lastLoginIp" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
  import Axios from '../../assets/js/axios';

  export default {
    name: 'UserInfo',
    data() {
      return {
        form: {
          username: '',
          userNick: '',
          state: '',
          email: '',
          phone: '',
          signature: '',
          registerTime: '',
          lastLoginTime: '',
          registerIp: '',
          lastLoginIp: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      getUserName() {
        Axios.get('/user/currentUserInfo')
          .then(response => {
            this.form = response.data;
          }).catch(error => {
          console.log(error);
        });
      }
    },
    created: function () {
      this.getUserName();
    }
  }
</script>

<style scoped>
.userInfoForm{
  margin: 0 auto;
  max-width: 1000px;
}
</style>
