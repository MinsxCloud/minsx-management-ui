<template>
  <div id="app">
    <div id="header">
      <div class="logo"></div>
      <div id="topMenu">
        <!--顶部菜单导航-->
        <el-menu
          default-active="0"
          mode="horizontal"
          @select="menuSelected"
          backgroundColor="#1DA028"
          text-color="white"
          active-text-color="#FFD04B">
          <NavMenu class="TopMenu" :menuData="topMenus" :showEnableOnly="showEnableOnly" :iconSize="'24px'"></NavMenu>
        </el-menu>
      </div>

      <div class="user-info">
        <img class="head-ico" src="./assets/image/head-ico.jpg"/>
        <div class="user-name">
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link" style="color: white;text-align:center;">
              {{userInfo.userNick ? userInfo.userNick : userInfo.username}} <i
              class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="userInfo">个人资料</el-dropdown-item>
              <el-dropdown-item command="changePass">修改密码</el-dropdown-item>
              <el-dropdown-item command="personalSetting">个人设置</el-dropdown-item>
              <el-dropdown-item command="logout">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>

    <div id="nav">
      <!--左侧菜单组件-->
      <el-menu
        default-active="0"
        class="el-menu-vertical-demo"
        @select="menuSelected"
        :default-openeds="defaultOpeneds"
        background-color="#F0F6F6"
        text-color="#1DA028"
        active-text-color="white">
        <NavMenu class="LeftMenu" :menuData="leftMenus" :showEnableOnly="showEnableOnly" :iconSize="'16px'"></NavMenu>
      </el-menu>
    </div>

    <div id="section">
      <div id="positions">
        <!--内容顶部当前位置组件-->
        <Position :positions="positions"></Position>
      </div>
      <div id="section-content">
        <div id="section-header">
          <blockquote class="minsx-quote">{{instruction}}</blockquote>
       </div>
        <div id="section-body">
          <router-view/>
        </div>
      </div>
    </div>

    <div id="footer">
      Copyright © 2016-2017 minsx.com All rights reserved
    </div>
  </div>
</template>

<script>
  import Position from './components/common/Position.vue';
  import NavMenu from './components/common/NavMenu.vue'
  import Minsx from './assets/js/minsx.js';
  import Axios from './assets/js/axios.js';
  import Config from './assets/js/config.js';
  import Cookies from 'js-cookie';

  export default {
    name: 'app',
    data() {
      return {
        instruction:'暂无使用说明',
        defaultOpeneds: [],
        showEnableOnly: true,
        topMenus: [],
        leftMenus: [],
        positions: [],
        userInfo: {}
      }
    },
    methods: {
      menuSelected(key, keyPath, value) {
        let menu = value.$attrs.data.entity;
        if (menu.classifier === 'TOP') {
          if (menu.type === 'MENU') {
            this.getLeftMenus(menu.id);
          }
        } else if (menu.classifier === 'LEFT') {

        }
        /*公共部分*/
        if (menu.type === 'LINK') {
          if (menu.value !== null && menu.value !== '') {
            this.$router.push(menu.value);
            this.instruction=menu.description;
          } else {
            this.$notify.success({
              title: '温馨提示：',
              message: '对不起[' + menu.alias + ']暂未开通  您可以关注Minsx主页[www.minsx.com]随时获取项目进度!',
              showClose: false
            });
          }
        }
        this.positions = getPositionsByMenus(value);
      },
      handleCommand(command) {
        if ("logout" === command) {
          Cookies.remove('access_token', {domain: Config.COOKIE_DOMAIN, path: '/'});
          window.location.href = Config.LOGIN_URI;
        } else if ('personalSetting' === command) {
          /*个人设置*/
        } else {
          let position = {};
          if (command === 'userInfo') {
            position = {
              value: '/user/userInfo',
              icon: 'el-icon-info',
              alias: '个人资料'
            };
            this.instruction='使用说明：修改个人资料';
          } else if (command === 'changePass') {
            position = {
              value: '/user/changePass',
              icon: 'el-icon-view',
              alias: '修改密码'
            };
            this.instruction='使用说明：修改密码';
          }
          this.positions = [position];
          this.$router.push(position.value);
        }
      },
      initialPosition() {
        this.positions = [{
          value: '/',
          icon: 'el-icon-success',
          alias: '系统首页'
        }];
      },
      getUserName() {
        Axios.get('/user/currentUserInfo')
          .then(response => {
            this.userInfo = response.data;
          }).catch(error => {
          console.log(error);
        });
      },
      getLeftMenus(parentMenuId) {
        Axios.get('/menu/leftMenus/' + parentMenuId)
          .then(response => {
            this.leftMenus = response.data.childs;
            this.leftMenus.forEach(child => {
              this.defaultOpeneds.push(child.entity.name);
            });
          }).catch(error => {
          console.log(error);
        });
      },
      getTopMenus() {
        Axios.get('/menu/topMenus')
          .then(response => {
            this.topMenus = response.data.childs;
            this.getLeftMenus(1);
          }).catch(error => {
          console.log(error);
        });
      }
    },
    created: function () {
      this.initialPosition();
      this.getUserName();
      this.getTopMenus();
    },
    components: {
      Position: Position,
      NavMenu: NavMenu
    }
  }

  /*根据选取菜单改变导航面包屑*/
  function getPositionsByMenus(value) {
    let positions = [];
    let currnetMenu = value;
    while (typeof(currnetMenu.$attrs.data) !== "undefined") {
      let menu = currnetMenu.$attrs.data.entity;
      positions.push({
        value: menu.value === null ? null : (menu.value === '' ? null : "/" + menu.value),
        icon: menu.icon,
        alias: menu.alias
      });
      currnetMenu = currnetMenu.$parent.$parent;
    }
    return positions.reverse();
  }

</script>

<style>
  /* Powered by Minsx.com*/
  body, html {
    padding: 0;
    margin: 0;
    overflow: hidden;
  }

  #header {
    background-color: #1DA028;
    position: absolute;
    left: 0;
    right: 0;
    height: 60px;
  }

  #header .logo {
    width: 205px;
    height: 60px;
    background: url(./assets/image/logo.png) no-repeat left center;
    background-size: 80%;
    background-position-x: 20px;
  }

  #topMenu {
    position: absolute;
    top: 0;
    left: 206px;
    height: 60px;
    background-color: #1DA028;
  }

  #header .user-info {
    width: 180px;
    height: 50px;
    position: absolute;
    right: 0;
    top: 0;
    padding: 5px;
  }

  .user-info .head-ico {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .user-info .user-name {
    height: 50px;
    width: 120px;
    position: absolute;
    left: 60px;
    top: 5px;
    text-align: center;
    color: white;
    line-height: 50px;
    overflow: hidden;
    cursor: pointer;
  }

  #nav {
    background-color: #F0F6F6;
    width: 206px;
    float: left;
    position: absolute;
    top: 60px;
    bottom: 50px;
    left: 0;
    overflow: hidden;
    border-top: 1px solid #FFD04B;
  }

  #section {
    float: left;
    position: absolute;
    top: 60px;
    bottom: 50px;
    left: 205px;
    right: 0;
    border-left: 1px solid #A9A9A9;
    border-top: 1px solid #FFD04B;
    overflow: auto;
  }

  #section #positions {
    position: absolute;
    right: 0;
    top: 0;
    left: 0;
    height: 14px;
    background-color: #F0F6F6;
    border-bottom: 1px solid #A9A9A9;
    padding: 5px;
    overflow: hidden;
  }

  #section #section-content {
    position: absolute;
    right: 0;
    top: 25px;
    left: 0;
    bottom: 0;
    padding: 10px;
    overflow: auto;
    background-color: #F8F8F8;
  }

  #section #section-content #section-header {
    position: relative;
    right: 0;
    left: 0;
  }

  #section #section-content #section-body {
    position: relative;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #F8F8F8;
  }

  #footer {
    background-color: #F2F2F2;
    color: #7F7C7C;
    text-align: center;
    position: absolute;
    bottom: 0px;
    height: 34px;
    line-height: 35px;
    left: 0;
    right: 0;
    padding: 5px;
    border-top: 1px solid #A9A9A9;
    border-bottom: 5px solid #1DA028;
  }

  .TopMenu .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active,
  .TopMenu .el-menu-item.is-active,
  .TopMenu .el-submenu.is-active {
    background-color: #178020 !important;
  }

  .TopMenu .el-menu-item i,
  .TopMenu .el-menu-item.is-active,
  .TopMenu .el-submenu__title i,
  .TopMenu .el-submenu__title {
    color: white !important;
  }

  .LeftMenu .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active,
  .LeftMenu .el-menu-item.is-active,
  .LeftMenu .el-submenu.is-active {
    background-color: #1DA028 !important;
  }

  .LeftMenu .el-menu-item i,
  .LeftMenu .el-submenu__title i {
    color: #1DA028 !important;
  }

  .LeftMenu .el-menu-item.is-active i {
    color: white !important;
  }

  .TableHeader {
    background-color: #F0F6F6 !important;
  }

  .el-breadcrumb__inner{
    color: #909399 !important;
  }

  .minsx-quote {
    margin-bottom: 10px;
    padding: 15px;
    margin-left: 0;
    margin-top: 0;
    margin-right: 0;
    line-height: 22px;
    border-left: 5px solid #1DA028;
    border-radius: 0 2px 2px 0;
    font-size: 13px;
    color: #909399;
    background-color: #f2f2f2
  }

</style>
