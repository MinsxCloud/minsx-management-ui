import minsx from './minsx.js'

const System = {
   checkToken: function(){
     if(sessionStorage.getItem("access_token")===null){
       var access_token = minsx.Util.getUrlParam("access_token");
       if(access_token===null){
         window.location.href = 'http://localhost:8080/loginServer/login';
       }else{
         sessionStorage.setItem("access_token",access_token);
         window.location.href = '/';
       }
     }
   }
}
export default System
