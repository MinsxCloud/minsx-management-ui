/*! minsx v1.0.0 Copyright © 2016-2017 minsx.com All rights reserved*/
const Minsx = {
    Util: {
        /**
         * Get Param value in URL by key
         */
        getUrlParam: function (key) {
            var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
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
            var args = arguments;
            return args[0].replace(/{(\d+)}/g, function (t, n) {
                return "undefined" !== typeof args[parseInt(n) + 1] ? args[parseInt(n) + 1] : t;
            });
        }
    },
    Http:{
        get:function (url,async) {
            xmlhttp.open("GET",url,async);
        },
        post:function (url,async){
            xmlhttp.open("POST",url,async);
            xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        }
    }
}

export default Minsx
