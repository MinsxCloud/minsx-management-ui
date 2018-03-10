import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import UserInfo from '@/components/user/UserInfo'
import ChangePass from '@/components/user/ChangePass'
import MenuSetting from '@/components/setting/MenuSetting'
import AuthSetting from '@/components/setting/AuthSetting'
import RoleSetting from '@/components/setting/RoleSetting'
import ResourceMonitor from '@/components/monitor/ResourceMonitor'


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {auth: true}
    },
    {
      path: '/setting/menu',
      name: 'MenuSetting',
      component: MenuSetting,
      meta: {auth: true}
    },
    {
      path: '/setting/auth',
      name: 'AuthSetting',
      component: AuthSetting,
      meta: {auth: true}
    },
    {
      path: '/setting/role',
      name: 'RoleSetting',
      component: RoleSetting,
      meta: {auth: true}
    },
    {
      path: '/user/userInfo',
      name: 'UserInfo',
      component: UserInfo,
      meta: {auth: true}
    },
    {
      path: '/user/changePass',
      name: 'ChangePass',
      component: ChangePass,
      meta: {auth: true}
    },
    {
      path: '/monitor/resource',
      name: 'ResourceMonitor',
      component: ResourceMonitor,
      meta: {auth: true}
    }
  ]
});
