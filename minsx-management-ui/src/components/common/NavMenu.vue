<template>
  <div class="navMenu">

    <label v-for="navMenu in menuData">

        <el-menu-item v-if="navMenu.childs==null&&navMenu.entity&&((showEnableOnly&&navMenu.entity.state==='ENABLE')||(!showEnableOnly))"
                      :key="navMenu.entity.id" :data="navMenu" :index="navMenu.entity.name"
                      :route="navMenu.entity.value"
                      disabled="">
          <i :class="navMenu.entity.icon"></i>
          <span slot="title">{{navMenu.entity.alias}}</span>
        </el-menu-item>

        <el-submenu v-if="navMenu.childs&&navMenu.entity&&((showEnableOnly&&navMenu.entity.state==='ENABLE')||(!showEnableOnly))"
                    :key="navMenu.entity.id" :data="navMenu" :index="navMenu.entity.name">
          <template slot="title">
            <i :class="navMenu.entity.icon"></i>
            <span> {{navMenu.entity.alias}}</span>
          </template>
          <NavMenu :menuData="navMenu.childs"></NavMenu>
        </el-submenu>

    </label>

  </div>
</template>

<script>
  export default {
    name: 'NavMenu',
    props: ['menuData', 'showEnableOnly'],
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style scoped>

</style>
