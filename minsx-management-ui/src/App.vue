<template>
  <div id="app">
    <div id="header">
      <div class="logo"></div>
      <div class="user-info">
        <img class="head-ico" src="./assets/image/head-ico.jpg"/>
        <div class="user-name">
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link" style="color: white;text-align:center;">
              {{userInfo.userNick}} <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="userInfo">个人资料</el-dropdown-item>
              <el-dropdown-item command="changePass">修改密码</el-dropdown-item>
              <el-dropdown-item command="clearSession">清除缓存</el-dropdown-item>
              <el-dropdown-item command="logout">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>

    <div id="nav">
      <el-menu
        default-active="0"
        class="el-menu-vertical-demo"
        @select="menuSelected"
        background-color="#F0F6F6"
        text-color="#3C3F41"
        active-text-color="black">
        <!--左侧菜单组件-->
        <LeftMenu :menus="menus"></LeftMenu>
      </el-menu>
    </div>

    <div id="section">
      <div id="section-header">
        <!--内容顶部当前位置组件-->
        <Position :positions="positions"></Position>
      </div>
      <div id="section-content">
        <router-view/>
      </div>
    </div>

    <div id="footer">
      Copyright © 2016-2017 minsx.com All rights reserved
    </div>
  </div>
</template>

<script>
  import Position from './components/common/Position.vue';
  import LeftMenu from './components/common/LeftMenu.vue'
  import Minsx from './assets/js/minsx.js';
  import Axios from './assets/js/axios.js';
  import Config from './assets/js/config.js';

  export default {
    name: 'app',
    data() {
      return {
        menus: [],
        positions: [],
        userInfo: {}
      }
    },
    methods: {
      menuSelected(key, keyPath, value) {
        let menu = value.$attrs.data.entity;
        if (menu.type === 'LINK') {
          this.$router.push(menu.value);
        }
        this.positions = getPositionsByMenus(value);
      },
      handleCommand(command) {
        if ("logout" === command) {
          Minsx.Cookie.remove("access_token");
          window.location.href = Config.LOGIN_URI;
        } else if ('clearSession' === command) {
          /*清除缓存*/
        } else {
          let position = {};
          if (command === 'userInfo') {
            position = {
              value: '/user/userInfo',
              icon: 'el-icon-info',
              alias: '个人资料'
            };
          } else if (command === 'changePass') {
            position = {
              value: '/user/changePass',
              icon: 'el-icon-view',
              alias: '修改密码'
            };
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
      getMenuItems() {
        Axios.get('/menu/menus')
          .then(response => {
            this.menus = response.data.childs;
          }).catch(error => {
          console.log(error);
        });
      }
    },
    created: function () {
      this.initialPosition();
      this.getUserName();
      this.getMenuItems();
    },

    components: {
      Position: Position,
      LeftMenu: LeftMenu
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
    background-color: #3C3F41;
    position: absolute;
    left: 0;
    right: 0;
    height: 59px;
    border-bottom: 1px solid #555555;
  }

  #header .logo {
    width: 205px;
    height: 60px;
    background: url(./assets/image/logo.png) no-repeat left center;
    background-size: 80%;
    background-position-x: 20px;
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
    width: 205px;
    float: left;
    position: absolute;
    top: 60px;
    bottom: 50px;
    left: 0px;
    overflow: hidden;
  }

  #section {
    float: left;
    position: absolute;
    top: 60px;
    bottom: 50px;
    left: 205px;
    right: 0;
    border-left: 1px solid #A9A9A9;
    overflow: auto;
  }

  #section #section-header {
    position: absolute;
    right: 0;
    top: 0;
    left: 0;
    height: 14px;
    background-color: #F2F2F2;
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
    padding: 20px;
    overflow: auto;
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
    border-bottom: 5px solid #3C3F41;
  }


</style>
