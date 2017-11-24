import Vue from 'vue';

const API_ROOT='http://localhost/';

  export default({
    getMenu :function () {
      Vue.http.get(API_ROOT+'/system/getMenu');
    },
    getCurrentUser :function () {
      Vue.http.get(API_ROOT+'/system/getCurrentUser');
    },
    getUser :function (id) {
      Vue.http.get(API_ROOT+'/system/getUser/'+id);
    }
  });
