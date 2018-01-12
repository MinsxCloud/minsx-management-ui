import Vue from 'vue';
import Config from './config.js';

const API_ROOT = Config.API_URI;

export default ({
  getMenu: function () {
    Vue.http.get(API_ROOT + '/system/getMenu');
  },
  getCurrentUser: function () {
    Vue.http.get(API_ROOT + '/system/getCurrentUser');
  },
  getUser: function (id) {
    Vue.http.get(API_ROOT + '/system/getUser/' + id);
  }
});
