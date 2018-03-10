<template>
  <div class="RoleSetting">
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
        <el-button type="primary" @click="showRoleFormDialogWithClear(true)">添加角色</el-button>
      </el-form-item>

    </el-form>

    <el-table
      :data="RoleList"
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
        prop="name"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="alias"
        label="显示名称"
        width="100">
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
          <el-button @click="showRoleInfo(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="deleteRole(scope.row.id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加角色" :visible.sync="dialogFormVisible" label-width="80px" width="600px">
      <el-form :model="form" style="padding-right: 10px;" size="medium" ref="RoleForm">
        <el-form-item label="角色ID" prop="id" :label-width="formLabelWidth">
          <el-input v-model="form.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="系统名称" prop="name" :label-width="formLabelWidth"
                      :rules="[{ required: true, message: '系统名称不能为空'}]">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="显示名称" prop="alias" :label-width="formLabelWidth"
                      :rules="[{ required: true, message: '显示名称不能为空'}]">
          <el-input v-model="form.alias"></el-input>
        </el-form-item>
        <el-form-item label="是否可用" prop="state" :label-width="formLabelWidth">
          <el-switch v-model="form.state"></el-switch>
        </el-form-item>
        <el-form-item label="角色描述" prop="description" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSaveRole">取 消</el-button>
        <el-button type="primary" @click="saveRole">确 定</el-button>
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
    name: 'RoleSetting',
    data() {
      return {
        /***搜索***/
        options: [{
          value: 'id',
          label: 'ID'
        }, {
          value: 'name',
          label: '系统名称'
        }, {
          value: 'alias',
          label: '显示名称'
        }, {
          value: 'auths',
          label: '拥有权限'
        }, {
          value: 'state',
          label: '状态'
        }],
        query: {
          key: null,
          value: null
        },
        /***角色列表数据***/
        RoleList: [],
        /***编辑角色表单***/
        dialogFormVisible: false,
        form: {
          id: null,
          name: null,
          alias: null,
          auths: null,
          state: false,
          description: null,
        },
        formLabelWidth: '80px',
        /***分页***/
        eachPageSize: 10,
        currentPage: 1,
        total: 0,
      }
    },
    methods: {
      getRoles() {
        let param = {
          page: this.currentPage - 1,
          size: this.eachPageSize
        }
        Axios.get('/role/roles', param)
          .then(response => {
            this.RoleList = response.data.content;
            this.total = response.data.totalElements;
          }).catch(error => {
          console.log(error);
        });
      },
      showRoleFormDialogWithClear(isClear) {
        this.dialogFormVisible = true;
        if (isClear) {
          this.resetForm();
        }
      },
      handleSizeChange(val) {
        this.eachPageSize = val;
        this.getRoles();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getRoles();
      },
      search() {
        this.$notify.success({
          title: '温馨提示：',
          message: '搜索暂不可用!',
          showClose: false
        });
      },
      saveRole() {
        this.$refs['RoleForm'].validate((valid) => {
          if (valid) {
            Axios.putJson('/Role/Roles', this.formToRoleEntity(), null)
              .then(response => {
                if (response.status === 200) {
                  this.$message({
                    message: '保存成功',
                    type: 'success'
                  });
                  this.getRoles();
                  this.dialogFormVisible = false;
                  this.resetForm();
                }
              }).catch(error => {
              if (error.response.status === 404) {
                this.$message.warning('该角色不存在,请尝试刷新页面后再进行操作');
              } else {
                this.$message.error(error.response.data);
              }
            });
          } else {
            return false;
          }
        });
      },
      deleteRole(id) {
        this.$confirm('您确定要删除该角色吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Axios.delete('/Role/Roles/' + id, null)
            .then(response => {
              if (response.status === 200) {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                });
                this.getRoles();
              }
            }).catch(error => {
            if (error.response.status === 404) {
              this.$message.warning('该角色不存在,请尝试刷新页面后再进行操作');
            } else {
              this.$message.error(error.response.data);
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      cancelSaveRole() {
        this.dialogFormVisible = false;
        this.resetForm();
      },
      formToRoleEntity() {
        return {
          id: this.form.id,
          name: this.form.name,
          alias: this.form.alias,
          auths: this.form.auths,
          state: this.form.state ? 'ENABLE' : 'DISABLE',
          description: this.form.description
        };
      },
      resetForm() {
        this.form = {};
      },
      showRoleInfo(rowData) {
        this.form.id = rowData.id;
        this.form.name = rowData.name;
        this.form.alias = rowData.alias;
        this.form.auths = rowData.auths;
        this.form.state = rowData.state === 'ENABLE';
        this.form.description = rowData.description;
        this.showRoleFormDialogWithClear(false);
      }
    },
    created: function () {
      this.getRoles();
    }
  }
</script>

<style scoped>
  .pagination {
    margin-top: 20px;
    margin-left: -10px;
  }
</style>
