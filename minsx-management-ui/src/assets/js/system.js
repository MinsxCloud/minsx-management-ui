import Minsx from './minsx.js'
import Config from './config.js'

const System = {
  checkToken: function (router) {
    if (Minsx.Cookie.get("access_token") === null) {
      window.location.href = Config.LOGIN_URI;
    }
  }
}
export default System
