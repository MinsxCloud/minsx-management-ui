<template>
  <div class="systemInfo">
    <el-table
      :data="systemInfo"
      stripe
      :border="true"
      header-cell-class-name="TableHeader"
      size="medium"
      style="width: 100%">
      <el-table-column
        prop="key"
        label="系统信息"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="value">
      </el-table-column>
    </el-table>

    <el-table
      :data="developerTeams"
      stripe
      :border="true"
      header-cell-class-name="TableHeader"
      size="medium"
      style="width: 100%">
      <el-table-column
        prop="key"
        label="开发团队"
        width="180">
      </el-table-column>
      <el-table-column
        prop="value">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import Axios from '../assets/js/axios';

  export default {
    name: 'Index',
    data() {
      return {
        systemInfo: [],
        developerTeams: []
      }
    },
    methods: {
      getSystemInfo() {
        Axios.get('/system/systemInfo')
          .then(response => {
            this.systemInfo = response.data;
          }).catch(error => {
          console.log(error);
        });
      },
      getDeveloperTeams(){
        Axios.get('/system/developerTeams')
          .then(response => {
            this.developerTeams = response.data;
          }).catch(error => {
          console.log(error);
        });
      }
    },
    created: function () {
      this.getSystemInfo();
      this.getDeveloperTeams();
    }
  }
</script>
<style scoped>

</style>

