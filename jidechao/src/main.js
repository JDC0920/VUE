// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper);

import bootstrapVue from 'bootstrap-vue'
Vue.use(bootstrapVue);
Vue.use(Vuex);

import './assets/css/main.css'
import './assets/css/sign.css'
import './assets/css/font-awesome.min.css'
import './assets/fonts/FontAwesome.otf'
import './assets/fonts/fontawesome-webfont.eot'
import './assets/fonts/fontawesome-webfont.svg'
import './assets/fonts/fontawesome-webfont.ttf'
import './assets/fonts/fontawesome-webfont.woff'
import './assets/fonts/fontawesome-webfont.woff2'



//创建状态Vuex状态树
const store = new Vuex.Store({
  //全局状态管理的数据
  state: {
    nickName:'',
    cartCount:0,
    userId:''
  },
  //mutations 事件 改变Vuex的state的状态
  mutations: {
    //更新用户信息
    updateUserInfo(state, nickName) {
      state.nickName = nickName;
    },
    updateUserId(state,userId){
      state.userId = userId;
    },
    updateCartCount(state,cartCount){
      state.cartCount += cartCount;
    },
    updateCartCount1(state,cartCount){
      state.cartCount = cartCount;
    }
  }
});

//引入axios
// import axios from 'axios'
//引入vuex
// import Vuex from 'vuex'
//引入element-ui
// import ElementUi from 'element-ui'
//引入样式
// import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false

//创建过滤器
// Vue.filter('formatter',function(value){
//   if(value == true){
//     return '启用'
//   }
//   return '停用'
// })
// //使用vuex
// Vue.use(Vuex)
// //使用element-ui
// Vue.use(ElementUi)
//创建一个vuex的实例
// const store = new Vuex.Store({
//   //state存放数据的地方
//   state:{
//
//   },
//   //getter也是存放数据的地方，但是这里跟state的区别主要在于getter中用于计算后的结果
//   getter:{
//
//   },
//   //用于改变状态的地方
//   mutations:{
//
//   },
//   //也是用于改变状态的地方，但是通常用于异步改变
//   actions:{
//
//   },
//   //模块
//   modules:{
//
//   }
// })
new Vue({
  el: '#app',
  router,//Vue-router
  store,//VueX
  template: '<App/>',
  components: { App },
  render: i => i(App)  //渲染
})
