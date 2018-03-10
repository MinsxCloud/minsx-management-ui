<template>
  <div class="resourceMonitor">
    <el-alert
      title="带辅助性文字介绍"
      type="success"
      description="这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰挥发化为灰……">
    </el-alert>
    <div id="echartContainer" style="width:500px; height:500px"></div>
  </div>
</template>
<script>
  import Axios from '../../assets/js/axios';

  let echarts = require('echarts');

  export default {
    name: 'ResourceMonitor',
    data() {
      return {}
    },
    methods: {
      getUserName() {
        Axios.get('/user/currentUserInfo')
          .then(response => {
            refreshSystemInfo(response.data);
          }).catch(error => {
          console.log(error);
        });
      },
    },
    created: function () {
    },
    mounted() {
      var myChart = echarts.init(document.getElementById('echartContainer'));
      myChart.setOption({
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [100, 120, 250, 230, 200, 260, 100],
          type: 'line',
          areaStyle: {}
        }]
      });
    }
  }

</script>

<style scoped>

</style>
