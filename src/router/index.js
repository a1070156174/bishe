/*
 * @Author: your name
 * @Date: 2020-02-13 18:47:57
 * @LastEditTime: 2020-05-11 22:52:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout/Layout.vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import IndexClient from '../views/Client/IndexClient.vue'
import BasicInfo from '../views/Client/BasicInfo.vue'
import Outsiders from '../views/Client/Outsiders.vue'
import TakeOut from '../views/Client/TakeOut.vue'
import SchoolCar from '../views/Client/SchoolCar.vue'
import SchoolAftherCar from '../views/Client/SchoolAftherCar.vue'
import Equipment from'../views/Client/Equipment.vue'
import Baoxiu from '../views/Client/Baoxiu.vue'
import SchoolAffairs from'../views/Client/SchoolAffairs.vue'

import MonitorVideo from '../views/Client/MonitorVideo.vue'
import WorkCard from '../views/Client/WorkCard.vue'
import XlCard from '../views/Client/XlCard.vue'
import DutyInfo from '../views/Client/DutyInfo.vue'
import AdminInfo from'../views/Management/AdminInfo.vue'
import Notice from '../views/Client/Notice.vue'
import Journal from'../views/Management/Journal.vue'
import Login from'../views/Login.vue'
import store from '../store'
import { Form } from 'element-ui'
import {userinfotoken} from'@/http/api.js'
import Montior from '../views/Client/Montior.vue'

Vue.use(VueRouter)

const routes = [
  {
      path :'/',
      redirect:'/login'
  },
  
  {
     
      path: '/login',
      name: 'Login',
      component: Login,
     },

    
    {path: '/layout',
    name: 'Layout',
    component: Layout,
    children:[
      {
        path:'/home',
        name: 'Home',
        component: Home,
      },
      {
        path:'/about',
        name: 'About',
        component: About,
      },
      {
        path:'/indexClient',
        name:'IndexClient',
        component: IndexClient,
      },
     {
        path:'/basicInfo',
        name:'BasicInfo',
        component: BasicInfo,
     },
     {
        path:'/outsiders',
        name:'Outsiders',
        component: Outsiders,

     },
     {
      path:'/takeout',
      name:'TakeOut',
      component: TakeOut,

      },
      {
        path:'/schoolCar',
        name:'SchoolCar',
        component: SchoolCar,

      },
      {
        path:'/schoolAftherCar',
        name:'SchoolAftherCar',
        component:SchoolAftherCar,

      },  
      {
        path:'/equipment',
        name:'Equipment',
        component:Equipment,

      },
      {
        path:'/baoxiu',
        name:'Baoxiu',
        component:Baoxiu,

      },
      {
        path:'/schoolAffairs',
        name:'SchoolAffairs',
        component:SchoolAffairs,

      },
    
      {
        path:'/monitorVideo',
        name:'MonitorVideo',
        component:MonitorVideo,

      },
      {
        path:'/workCard',
        name:'WorkCard',
        component:WorkCard,

      },
      {
        path:'/xlCard',
        name:'XlCard',
        component:XlCard,

      },
      {
        path:'/dutyInfo',
        name:'DutyInfo',
        component:DutyInfo,

      },
      {
        path:'/adminInfo',
        name:'AdminInfo',
        component:AdminInfo,

      },
      {
        path:'/notice',
        name:'Notice',
        component:Notice,

      },
      {
        path:'/journal',
        name:'Journal',
        component:Journal,

      },
      {
        path:'/montior',
        name:'Montior',
        component:Montior,
      }
      
      
      
  
    ],
   
   
  }
]



const router = new VueRouter({
  routes,

})
 router.beforeEach((to ,Form ,next)=>
 {  

  let token =localStorage.getItem('token');
  console.log(token);
  if(to.path==='/login'){   //如果进入的是登入页面 
   {
      next();
   }
  }
  else if(token === null || token === '')   
  {  //如果没有token 那么返回登录页
     next('/login');       
  }
  else if(!store.state.role) {
    console.log("用token获取userinfo")
    //如果有token就用token获取userinfo
    userinfotoken({
    
    }).then( res=>{
      let role=res.data.authorities[0].id;
      store.commit('setRole',role)
      let userInfo =res.data;
      console.log('userinfo',res.data)
      store.commit('setUserInfo',userInfo)
   
      next();
    })
     //next();
  }else{
    next();
  }
 
  

 })

export default router
