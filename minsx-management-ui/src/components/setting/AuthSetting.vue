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
        <el-button type="primary" @click="search()">搜索</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="showAuthFormDialogWithClear(true)">添加权限</el-button>
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
          <el-button @click="deleteAuth(scope.row.id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加权限" :visible.sync="dialogFormVisible" label-width="80px" width="600px">
      <el-form :model="form" style="padding-right: 10px;" size="medium" ref="authForm">
        <el-form-item label="权限ID" prop="id" :label-width="formLabelWidth">
          <el-input v-model="form.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="权限分类" prop="category" :label-width="formLabelWidth"
                      :rules="[{ required: true, message: '权限分类不能为空'}]">
          <el-input v-model="form.category"></el-input>
        </el-form-item>
        <el-form-item label="权限类型" prop="type" :label-width="formLabelWidth"
                      :rules="[{ required: true, message: '权限类型不能为空'}]">
          <el-select v-model="form.type" placeholder="请选择权限类型">
            <el-option label="URL" value="URL"></el-option>
            <el-option label="DATA" value="DATA"></el-option>
            <el-option label="MENU" value="MENU"></el-option>
            <el-option label="METHOD" value="METHOD"></el-option>
            <el-option label="BUTTON" value="BUTTON"></el-option>
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
        <el-button @click="cancelSaveAuth">取 消</el-button>
        <el-button type="primary" @click="saveAuth">确 定</el-button>
      </div>
    </el-dialog>

    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 30, 50,100]"
        :page-size="eachPageSize"
        layout="sizes, prev, pager, next"
        :total="total">
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
          id: null,
          category: null,
          type: null,
          value: null,
          state: false,
          description: null,
        },
        formLabelWidth: '80px',
        /***分页***/
        eachPageSize:10,
        currentPage: 1,
        total:0,
      }
    },
    methods: {
      getAuths() {
        let param = {
            page: this.currentPage-1,
            size: this.eachPageSize
        }
        Axios.get('/auth/auths', param)
          .then(response => {
            this.authList = response.data.content;
            this.total=response.data.totalElements;
          }).catch(error => {
          console.log(error);
        });
      },
      showAuthFormDialogWithClear(isClear) {
        this.dialogFormVisible = true;
        if (isClear) {
          this.resetForm();
        }
      },
      handleSizeChange(val) {
        this.eachPageSize=val;
        this.getAuths();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getAuths();
      },
      search() {
        this.$notify.success({
          title: '温馨提示：',
          message: '搜索暂不可用!',
          showClose: false
        });
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
                  this.resetForm();
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
      deleteAuth(id) {
        this.$confirm('您确定要删除该权限吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Axios.delete('/auth/auths/' + id, null)
            .then(response => {
              if (response.status === 200) {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                });
                this.getAuths();
              }
            }).catch(error => {
            if (error.response.status === 404) {
              this.$message.warning('该权限不存在,请尝试刷新页面后再进行操作');
            } else {
              this.$message.error('保存失败!');
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      cancelSaveAuth() {
        this.dialogFormVisible = false;
        this.resetForm();
      },
      formToAuthEntity() {
        return {
          id: this.form.id,
          category: this.form.category,
          type: this.form.type,
          value: this.form.value,
          state: this.form.state ? 'ENABLE' : 'DISABLE',
          description: this.form.description
        };
      },
      resetForm() {
        this.form = {};
      },
      showAuthInfo(rowData) {
        this.form.id = rowData.id;
        this.form.category = rowData.category;
        this.form.type = rowData.type;
        this.form.value = rowData.value;
        this.form.state = rowData.state === 'ENABLE';
        this.form.description = rowData.description;
        this.showAuthFormDialogWithClear(false);
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
