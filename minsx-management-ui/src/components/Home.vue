<template>
  <div class="home">
    <el-row>
      <el-col :span="12"><div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="12"><div class="grid-content bg-purple-light">

        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="date"
            label="服务器信息"
            width="200">
          </el-table-column>
          <el-table-column
            prop="address"
            label="">
          </el-table-column>
        </el-table>
      </div></el-col>
      </el-row>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        address: '王小虎'
      }, {
        date: '2016-05-04',
        address: '王小虎'
      }, {
        date: '2016-05-01',
        address: '王小虎'
      }, {
        date: '2016-05-03',
        address: '王小虎'
      }]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    height: 500px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
