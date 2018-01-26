<template>
  <div class="AuthSetting">
    <el-form :inline="true" :model="query" class="demo-form-inline" size="small">

      <el-form-item label="搜索选项">
        <el-select v-model="query.key" placeholder="请选择" style="width: 120px;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="搜索内容">
        <el-input v-model="query.value" placeholder="请输入要搜索的内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="showAddAuthDialog">添加权限</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="authList"
      stripe
      :border="true"
      header-cell-class-name="TableHeader"
      size="medium"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="50">
      </el-table-column>
      <el-table-column
        prop="category"
        label="分类"
        width="180">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        width="100">
      </el-table-column>
      <el-table-column
        prop="value"
        label="值"
        width="250">
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        width="100">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="showAuthInfo(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加权限" :visible.sync="dialogFormVisible" label-width="80px" width="600px">
      <el-form :model="form" style="padding-right: 10px;" size="medium" ref="authForm">
        <el-form-item label="权限分类" prop="category" :label-width="formLabelWidth"
                      :rules="[{ required: true, message: '权限分类不能为空'}]">
          <el-input v-model="form.category"></el-input>
        </el-form-item>
        <el-form-item label="权限类型" prop="type" :label-width="formLabelWidth"
                      :rules="[{ required: true, message: '权限类型不能为空'}]">
          <el-select v-model="form.type" placeholder="请选择权限类型">
            <el-option label="URL" value="URL"></el-option>
            <el-option label="MENU" value="MENU"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限内容" prop="value" :label-width="formLabelWidth"
                      :rules="[{ required: true, message: '权限内容不能为空'}]">
          <el-input v-model="form.value"></el-input>
        </el-form-item>
        <el-form-item label="是否可用" prop="state" :label-width="formLabelWidth">
          <el-switch v-model="form.state"></el-switch>
        </el-form-item>
        <el-form-item label="权限描述" prop="description" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAuth">确 定</el-button>
      </div>
    </el-dialog>

    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 30, 50,100]"
        :page-size="10"
        layout="sizes, prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>

  </div>
</template>

<script>

  import Axios from '../../assets/js/axios';

  export default {
    name: 'AuthSetting',
    data() {
      return {
        /***搜索***/
        options: [{
          value: 'id',
          label: 'ID'
        }, {
          value: 'category',
          label: '分类'
        }, {
          value: 'type',
          label: '类型'
        }, {
          value: 'value',
          label: '权限值'
        }, {
          value: 'state',
          label: '状态'
        }],
        query: {
          key: null,
          value: null
        },
        /***权限列表数据***/
        authList: [],
        /***编辑权限表单***/
        dialogFormVisible: false,
        form: {
          category: '',
          type: '',
          value: '',
          state: false,
          description: ''
        },
        formLabelWidth: '80px',
        /***分页***/
        currentPage: 2
      }
    },
    methods: {
      getAuths() {
        Axios.get('/auth/auths')
          .then(response => {
            this.authList = response.data;
          }).catch(error => {
          console.log(error);
        });
      },
      showAddAuthDialog() {
        this.dialogFormVisible = true;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      saveAuth() {
        this.$refs['authForm'].validate((valid) => {
          if (valid) {
            Axios.putJson('/auth/auths', this.formToAuthEntity(), null)
              .then(response => {
                if (response.status === 200) {
                  this.$message({
                    message: '保存成功',
                    type: 'success'
                  });
                  this.getAuths();
                  this.dialogFormVisible = false;
                  this.resetForm('authForm');
                }
              }).catch(error => {
              if (error.response.status === 404) {
                this.$message.warning('该权限不存在,请尝试刷新页面后再进行操作');
              } else {
                this.$message.error('保存失败');
              }
            });
          } else {
            return false;
          }
        });
      },
      formToAuthEntity() {
        return {
          category: this.form.category,
          type: this.form.type,
          value: this.form.value,
          state: this.form.state ? 'ENABLE' : 'DISABLE',
          description: this.form.category
        };
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      showAuthInfo(rowData){
        alert(JSON.stringify(rowData));
      }
    },
    created: function () {
      this.getAuths();
    }
  }
</script>

<style scoped>
  .pagination {
    margin-top: 20px;
    margin-left: -10px;
  }
</style>
