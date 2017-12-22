import Minsx from './minsx.js'
import Config from './config.js'

const System = {
  checkToken: function (router) {
    router.beforeEach((to, from, next) => {
      if (to.matched.some(m => m.meta.auth)) {
        if (Minsx.Cookie.get("access_token") === null) {
          window.location.href = Config.LOGIN_URI;
        } else {
          next();
        }
      } else {
        next();
      }
    });
  }
}

export default System
