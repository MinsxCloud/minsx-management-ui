import minsx from './minsx.js'

const System = {
  checkToken: function (router) {
    router.beforeEach((to, from, next) => {
      if (to.matched.some(m => m.meta.auth)) {
        if (minsx.Cookie.get("access_token") === null) {
          window.location.href = 'http://localhost:8080/loginServer/login?redir=http%3A%2F%2Flocalhost';
        }else{
          next();
        }
      }else {
        next();
      }
    });
  }
}

export default System
