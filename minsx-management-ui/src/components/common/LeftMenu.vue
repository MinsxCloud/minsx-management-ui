<template>
  <div class="LeftMenu">

    <el-submenu v-if="menuItem.childs&&menuItem.entity&&menuItem.entity.state==='ENABLE'" v-for="menuItem in menuItems"
                :key="menuItem.entity.id" :data="menuItem" :index="menuItem.entity.name">
      <template slot="title">
        <i :class="menuItem.entity.icon"></i>
        <span> {{menuItem.entity.alias}}</span>
      </template>
      <LeftMenu :menuItems="menuItem.childs"></LeftMenu>
    </el-submenu>

    <el-menu-item v-if="menuItem.childs==null&&menuItem.entity&&menuItem.entity.state==='ENABLE'" v-for="menuItem in menuItems"
                  :key="menuItem.entity.id" :data="menuItem" :index="menuItem.entity.name">
      <i :class="menuItem.entity.icon"></i>
      <span slot="title">{{menuItem.entity.alias}}</span>
    </el-menu-item>

  </div>
</template>

<script>
  export default {
    name: 'LeftMenu',
    props: ['menuItems'],
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style scoped>

</style>
