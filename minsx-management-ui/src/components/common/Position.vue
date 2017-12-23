<template>
  <div class="position">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(position,index) in positions"
                          :to="index !== positions.length-1 ? { path: position.value } : ''"
                          :key="index">
        <i class="fa" :class="position.icon"></i> {{position.alias}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: 'position',
    data() {
      return {
      };
    },
    props: ['positions'],
    methods: {},
    components: {}
  };
</script>

<style scoped>

</style>
