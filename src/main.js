import Vue from 'vue'
import App from './App.vue'
import "./common/stylus/index.styl"
import Router from "./router/index.js"
import attachFastClick from "fastclick" //引入该组件解决移动端300ms的延迟问题
import store from "./store/index.js"

attachFastClick.attach(document.body) //激活组件
Vue.config.productionTip = false //阻止启动生产消息

new Vue({
  render: h => h(App),
  router:Router,
  store
}).$mount('#app')
