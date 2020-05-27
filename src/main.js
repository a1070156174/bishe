/*
 * @Author: your name
 * @Date: 2020-02-13 18:47:57
 * @LastEditTime: 2020-05-16 08:17:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import './style/global.less'
import 'element-ui/lib/theme-chalk/index.css'
import Print from 'vue-print-nb'
import VueParticles from 'vue-particles'  
import axios from 'axios';
import moment from 'moment'
import './assets/icon/iconfont.css'
import echarts from 'echart'  



 Vue.prototype.$echarts = echarts;  //图表插件
Vue.prototype.$moment = moment  //时间转化插件
Vue.config.productionTip = false
Vue.use(Print); //打印组件
Vue.use(VueParticles)  //例子特效

Vue.use(Element)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

