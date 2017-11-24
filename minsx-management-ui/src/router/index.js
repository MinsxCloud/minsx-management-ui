import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import UserInfo from '@/components/user/UserInfo'
import ChangePass from '@/components/user/ChangePass'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/user/userInfo',
      name: 'UserInfo',
      component: UserInfo
    },
    {
      path: '/user/changePass',
      name: 'ChangePass',
      component: ChangePass
    }
  ]
})
