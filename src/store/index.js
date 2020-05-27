/*
 * @Author: your name
 * @Date: 2020-02-13 18:47:57
 * @LastEditTime: 2020-05-11 22:54:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);





export default new Vuex.Store({
  state: {
    role:'',
    userInfo:{ },
    token: localStorage.getItem('token') ? localStorage.getItem('token') : ''
  },
  mutations: {
    setToken(state,token){
      state.token= token,
      localStorage.setItem("token",token)
    },
    delToken(state) {
      state.token = ''
      state.role = ''
      state.userInfo = {}
      localStorage.removeItem("token");
    },
    setUserInfo(state,userInfo){
      state.userInfo=userInfo
    },
    setRole(state,role){
      state.role=role; 

    }
  },
  actions: {

    
  },
  modules: {
  }
})
