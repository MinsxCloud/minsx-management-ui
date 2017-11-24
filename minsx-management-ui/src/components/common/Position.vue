<template>
  <div class="position">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item,index) in positionlist"
                          :to="index !== positionlist.length-1 ? { path: item.path } : ''" :key="index">
        <i class="fa" :class="item.iconClass"></i> {{item.name}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: 'position',
    data() {
      return {};
    },
    props: ['positionlist'],
    mounted() {
    },
    methods: {},
    components: {}
  };
</script>

<style scoped>

</style>
