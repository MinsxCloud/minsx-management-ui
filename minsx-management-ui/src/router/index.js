import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import UserInfo from '@/components/user/UserInfo'
import ChangePass from '@/components/user/ChangePass'


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta:{auth:true}
    },
    {
      path: '/user/userInfo',
      name: 'UserInfo',
      component: UserInfo,
      meta:{auth:true}
    },
    {
      path: '/user/changePass',
      name: 'ChangePass',
      component: ChangePass,
      meta:{auth:true}
    }
  ]
});
