/*! minsx v1.0.0 Copyright © 2016-2017 minsx.com All rights reserved*/
const Minsx = {
  Util: {
    /**
     * Get Param value in URL by key
     */
    getUrlParam: function (key) {
      const reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
      const r = window.location.search.substr(1).match(reg);
      if (r !== null) return unescape(r[2]);
      return null;
    }
  },
  Json: {
    /**
     * Parse JSON to String
     */
    parseToString: function (JsonObject) {
      return JSON.stringify(JsonObject);
    },

    /**
     * Parse String to JSON
     */
    parseToJson: function (str) {
      return JSON.parse(str);
    }
  },
  String: {
    /**
     * Format String eg:
     * alert(Minsx.String.format("lastName:{0} firstName:{1}","Joker","John"));
     */
    format: function () {
      const args = arguments;
      return args[0].replace(/{(\d+)}/g, function (t, n) {
        return "undefined" !== typeof args[parseInt(n) + 1] ? args[parseInt(n) + 1] : t;
      });
    }
  },
  Http: {
    get: function (url, data, success, error) {
      Minsx.Http.request("GET", url, false, data, success, error);
    },
    delete:function (url, data, success, error) {
       Minsx.Http.request("DELETE", url, false, data, success, error);
    },
    put:function (url, data, success, error) {
      Minsx.Http.request("PUT", url, false, data, success, error);
    },
    putJson:function (url, data, success, error) {
      Minsx.Http.request("PUT", url, true, data, success, error);
    },
    post: function (url, data, success, error) {
      Minsx.Http.request("POST", url, false, data, success, error);
    },
    postJson: function (url, data, success, error) {
      Minsx.Http.request("POST", url, true, data, success, error);
    },
    request: function (type, url, data, isJson, success, error) {
      const xmlHttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
      xmlHttp.open(type, url, true);
      isJson ? xmlHttp.setRequestHeader("Content-Type", "application/json") : xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4) {
          if (xmlHttp.status === 200) {
            success(xmlHttp.response);
          } else {
            error(xmlHttp.response);
          }
        }
      }
      xmlHttp.send(data);
    }
  },
  Cookie: {
    get: function (key) {
      let arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
      if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
      } else {
        return null;
      }
    },
    set: function () {
      const args = arguments;
      if (args.length === 2) {
        document.cookie = args[0] + "=" + escape(args[1]);
      } else if (args.length === 3) {
        document.cookie = args[0] + "=" + escape(args[1]) + ";path=" + args[2];
      } else if (args.length === 4) {
        document.cookie = args[0] + "=" + escape(args[1]) + ";path=" + args[2] + ";domain=" + args[3];
      }
    },
    remove: function (key) {
      const cval = Minsx.Cookie.get(key);
      if (cval !== null) {
        const exp = new Date();
        exp.setTime(exp.getTime() - 1);
        document.cookie = key + "=" + cval + ";expires=" + exp.toGMTString();
      }
    }
  }
}

export default Minsx
