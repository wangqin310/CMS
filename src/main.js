// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Axios from 'axios'
import Qs from 'qs';
import '@/assets/icon/iconfont.css'
import '@/assets/icon/iconfont.js'


// Axios.defaults.baseURL='/api';
// Vue.prototype.HOST='/api';
Vue.prototype.$axios=Axios;
Vue.prototype.$qs=Qs;
Axios.defaults.withCredentials=true;

import ElementUI from 'element-ui'
import './../node_modules/element-ui/lib/theme-chalk/index.css'
import 'babel-polyfill'

Vue.config.productionTip = false

// 添加响应拦截器
window.tipLock = false;
Axios.interceptors.response.use(function (response) {
  if(response.data.msg == 'timeout'&&window.tipLock == false){
    console.log('您的登录已超时！');
    window.tipLock = true;
    Vue.prototype.$alert('您的登录已超时！请重新登录', '超时', {
      confirmButtonText: '确定',
      callback: action => {
    window.tipLock = false;
      router.push({
        path: 'login',
      });
      }
  
    });
    
  }
  return response;
}, function (error) {

});

Vue.use(ElementUI);

router.beforeEach(function (to,from,next) {
  /**
   * 解决页面刷新挑到登录页面问题：
   * @type {boolean}
   */
  store.state.mutations.loginUserInfo.isLogin=sessionStorage.getItem("loginUserInfo")?JSON.parse(sessionStorage.getItem("loginUserInfo")).isLogin:false;
  if(to.path=='/'){
    store.state.mutations.loginUserInfo.isLogin=false;
  }

  if(store.state.mutations.loginUserInfo.isLogin==false){
    if(to.path=='/CMM/index'){
      next();
    }else{
      next('/CMM/index');
    }
  }else{
    next();
    store.state.mutations.tableLimit.params.start=0;
  }
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  computed:{
    /**
     * 获取登录信息：
     */
    loginUserInfo(){
      var storageUserInfo=JSON.parse(sessionStorage.getItem("loginUserInfo"));
      for(var i in this.$store.state.mutations.loginUserInfo){
        if(this.$store.state.mutations.loginUserInfo[i]==''||this.$store.state.mutations.loginUserInfo[i]==false&&storageUserInfo){
          this.$store.commit('getUerInfo',storageUserInfo);
        }
      }
      return this.$store.getters.loginUserInfo;
    },
  },
  components: { App },
  template: '<App/>'
})
