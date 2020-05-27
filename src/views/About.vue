<!--
 * @Author: your name
 * @Date: 2020-02-13 18:47:57
 * @LastEditTime : 2020-02-14 15:36:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\src\views\About.vue
 -->
<template>
  <div style="position: relative;">
     <div class="system-info-wapper">
      <span class="demonstration">关于系统</span>  
      <el-tag>关于本系统，由Elementui +vue +Springboot+Mybasic+Mysql制作</el-tag>
      <p> 遇到问题请联系  LC QQ:1070156174  Wecat:a1070156174 </p>
     </div>
    <vue-particles
        color="#fff"
        :particleOpacity="0.7"
        :particlesNumber="60"
        shapeType="circle"
        :particleSize="4"
        linesColor="FF0033"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        class="demo-fit"
      >
      </vue-particles>      
  </div>
</template>
<script>
  export default {
    data() {
      return {
        src: '../image/dd.jpg'
      }
    }
  }
</script>
<style lang="less" scoped>
.demonstration{
  
font-size: 50px;
font-weight: bold;
color : red;
text-align: center;
  
}
.demo-fit{
 background-image: url('../image/cc.jpg');
 
}
.system-info-wapper{
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  padding: 20px;
}
</style>


