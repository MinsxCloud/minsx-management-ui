// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import './assets/theme/index.css'
import System from './assets/js/system.js';

System.checkToken(router);
Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App}
});
