<!--
 * @Author: your name
 * @Date: 2020-02-13 18:47:57
 * @LastEditTime: 2020-03-06 15:30:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\src\App.vue
 -->
 

<template>
  <div id="app">
     <router-view   v-if="isRouterAlive" ></router-view>
  </div>
</template>
<script>
    export default {
        name: 'App',
        provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。                                             
            return {
                reload: this.reload    
                                               
            }
        },
        data() {
            return{
                isRouterAlive: true  , 
                isaa:666                 //控制视图是否显示的变量
            }
        },
        methods: {
            reload () {
                this.isRouterAlive = false;            //先关闭，
                this.$nextTick(function () {
                    this.isRouterAlive = true;         //再打开
                }) 
            }
        }
    }
</script>


<style lang="less">
#app {
  height: 100%;
}
</style>
