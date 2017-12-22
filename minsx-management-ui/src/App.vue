<template>
  <div id="app">

    <div id="header">
      <div class="logo"></div>
      <div class="user-info">
        <img class="head-ico" src="./assets/image/head-ico.jpg"/>
        <div class="user-name">
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link" style="color: white;text-align:center;">
              {{userName}} <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="/user/userInfo">个人资料</el-dropdown-item>
              <el-dropdown-item command="/user/changePass">修改密码</el-dropdown-item>
              <el-dropdown-item command="clearSession">清除缓存</el-dropdown-item>
              <el-dropdown-item command="logout">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>

    <div id="nav">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#F0F6F6"
        text-color="#3C3F41"
        active-text-color="black">

        <!--<el-menu-item v-for="menuItem in menuItems" index="menuItem.id" :key="menuItem.id">
          <i class="el-icon-menu"></i>
          <span>{{menuItem.alias}}</span>
        </el-menu-item>-->

        <ul v-for="menuItem in theModel" :key="menuItem.menuCode">
          <LeftMenu :model="menuItem"></LeftMenu>
        </ul>

      </el-menu>
    </div>

    <div id="section">
      <div id="section-header">
        <!--<el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/user/userInfo' }">个人资料</el-breadcrumb-item>
          <el-breadcrumb-item>修改密码</el-breadcrumb-item>
        </el-breadcrumb>-->
        <Position :positionlist="positionlist"></Position>
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
  import MyPosition from './components/common/Position.vue';
  import Minsx from './assets/js/minsx.js';
  import Axios from './assets/js/axios.js';
  import Config from './assets/js/config.js';
  import LeftMenu from './components/common/LeftMenu.vue'

  export default {
    name: 'app',
    data() {
      return {
        theModel : [
          {
            'id': '1',
            'menuName': '基础管理',
            'menuCode': '10',
            'children': [
              {
                'menuName': '用户管理',
                'menuCode': '11'
              },
              {
                'menuName': '角色管理',
                'menuCode': '12',
                'children': [
                  {
                    'menuName': '管理员',
                    'menuCode': '121'
                  },
                  {
                    'menuName': 'CEO',
                    'menuCode': '122'
                  },
                  {
                    'menuName': 'CFO',
                    'menuCode': '123'
                  },
                  {
                    'menuName': 'COO',
                    'menuCode': '124'
                  },
                  {
                    'menuName': '普通人',
                    'menuCode': '124'
                  }
                ]
              },
              {
                'menuName': '权限管理',
                'menuCode': '13'
              }
            ]
          },
          {
            'id': '2',
            'menuName': '商品管理',
            'menuCode': ''
          },
          {
            'id': '3',
            'menuName': '订单管理',
            'menuCode': '30',
            'children': [
              {
                'menuName': '订单列表',
                'menuCode': '31'
              },
              {
                'menuName': '退货列表',
                'menuCode': '32',
                'children': []
              }
            ]
          },
          {
            'id': '4',
            'menuName': '商家管理',
            'menuCode': '',
            'children': []
          }
        ],
        positionlist: [
          {
            path: '/',
            iconClass: 'el-icon-location-outline',
            name: '首页'
          },
          {
            path: '/user/userInfo',
            iconClass: 'el-icon-date',
            name: '用户信息'
          },
          {
            path: '/user/changePass',
            iconClass: 'el-icon-view',
            name: '找回密码'
          }
        ],
        menuItems: [
          {alias: '菜单一'},
          {alias: '菜单二'},
          {
            alias: '菜单三',
            childs: [
              {alias: '子菜单一'},
              {alias: '子菜单二'}
            ]
          },
          {alias: '菜单四'},
          {alias: '菜单五'}
        ],
        userName: ''
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleCommand(command) {
        if ("logout" === command) {
          Minsx.Cookie.remove("access_token");
          window.location.href = Config.LOGIN_URI;
        } else if ('clearSession' === command) {

        } else {
          this.$router.push(command);
        }
      },
      getUserName() {
        Axios.get('/user/currentUserInfo')
          .then(response => {
            this.userName = response.data.userNick;
          }).catch(error => {
          console.log(error);
        });
      },
    },
    created: function () {
      this.getUserName();
    },

    components: {
      Position: MyPosition,
      LeftMenu:LeftMenu
    }
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
    padding: 30px;
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
