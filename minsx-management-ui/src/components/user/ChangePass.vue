<template>
  <el-form ref="form" :model="form" labelWidth="80px">
    <el-form-item label="原密码">
      <el-input v-model="form.oldPass"></el-input>
    </el-form-item>
    <el-form-item label="新密码">
      <el-input v-model="form.newPass"></el-input>
    </el-form-item>
    <el-form-item label="确认密码">
      <el-input v-model="form.confirmPass"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
  export default {
    name: 'ChangePass',
    data(){
      return{
        form:{
          oldPass:'',
          newPass:'',
          confirmPass:''
        }
      }
    }
  }
</script>

<style scoped>
</style>
