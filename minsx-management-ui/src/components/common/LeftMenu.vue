<template>
  <div class="LeftMenu">

    <el-submenu v-if="menu.childs&&menu.entity&&menu.entity.state==='ENABLE'" v-for="menu in menus"
                :key="menu.entity.id" :data="menu" :index="menu.entity.name">
      <template slot="title">
        <i :class="menu.entity.icon"></i>
        <span> {{menu.entity.alias}}</span>
      </template>
      <LeftMenu :menus="menu.childs"></LeftMenu>
    </el-submenu>

    <el-menu-item v-if="menu.childs==null&&menu.entity&&menu.entity.state==='ENABLE'" v-for="menu in menus"
                  :key="menu.entity.id" :data="menu" :index="menu.entity.name">
      <i :class="menu.entity.icon"></i>
      <span slot="title">{{menu.entity.alias}}</span>
    </el-menu-item>

  </div>
</template>

<script>
  export default {
    name: 'LeftMenu',
    props: ['menus'],
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style scoped>

</style>
