<!--
 * @Author: your name
 * @Date: 2020-02-13 19:27:15
 * @LastEditTime: 2020-05-11 16:48:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\src\views\client\Menus.vue
 -->

  
<template>
<!--     
    background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b" -->
    <el-menu router
      ref="menus"
      @open="handleOpen"
      @close="handleClose"
      :collapse="!openNav"
      default-active="0"
      class="lc-menu"
    
      @select="selectMenu">
      <el-menu-item index="0" route="/home">
        <i class="el-icon-house"></i>
        <span slot="title">
           首页
        </span>
      </el-menu-item>
    <el-submenu index="1" v-if="isAdmin">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>个人信息</span>
        </template>
        <el-menu-item index="1-1" route="/indexClient" > 基本信息</el-menu-item>
        <el-menu-item index="1-2" route="/basicInfo">工资信息</el-menu-item>
        <el-menu-item index="1-3" route="/dutyInfo" >值班信息</el-menu-item>
      </el-submenu>
      <el-submenu index="2"  v-else>
        <template slot="title">
          <i class="el-icon-s-grid"></i>
          <span>信息管理</span>
        </template>
        <el-menu-item index="2-1" route="/adminInfo" > 个人信息</el-menu-item>
        <el-menu-item index="2-1" route="/indexClient" > 员工信息</el-menu-item>
        <el-menu-item index="2-2" route="/basicInfo">工资信息</el-menu-item>
        <el-menu-item index="2-3" route="/dutyInfo" >值班信息</el-menu-item>
        <el-submenu index="2-4"  >
        <template slot="title">考勤信息</template>
          <el-menu-item index="2-4-1" route="/workCard">上下班打卡</el-menu-item>
          <el-menu-item index="2-4-2" route="/xlCard">巡逻打卡 </el-menu-item>
          </el-submenu>
        <el-menu-item index="2-5" route="/outsiders"> 外来人员信息</el-menu-item>
        <el-menu-item index="2-6" route="/takeOut">外卖人员信息</el-menu-item>
        <el-menu-item index="2-7" route="/schoolCar"> 校内车辆信息</el-menu-item>
        <el-menu-item index="2-8" route="/schoolAftherCar">校外车辆信息</el-menu-item>
        <el-menu-item index="5-1" route="/equipment"> 岗亭设备信息</el-menu-item>
        <el-menu-item index="5-2" route="/baoxiu">报修信息</el-menu-item>
      </el-submenu>
      <el-submenu index="3" v-if="isAdmin">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>外来人员信息</span>
        </template>
        <el-menu-item index="3-1" route="/outsiders"> 外来人员信息</el-menu-item>
        <el-menu-item index="3-2" route="/takeOut">外卖人员信息</el-menu-item>
      </el-submenu>
        <el-submenu index="4" v-if="isAdmin ">
        <template slot="title">
          <i class="el-icon-eleme"></i>
          <span>车辆管理</span>
        </template>
        <el-menu-item index="4-1" route="/schoolCar"> 校内车辆管理</el-menu-item>
        <el-menu-item index="4-2" route="/schoolAftherCar">校外车辆管理</el-menu-item>
      </el-submenu>
        <!-- <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>监控查看</span>
        </template>
      </el-submenu> -->
      
        <el-submenu index="5" v-if="isAdmin">
        <template slot="title">
          <i class="el-icon-school"></i>
          <span>岗亭设备管理</span>
        </template>
        <el-menu-item index="5-1" route="/equipment"> 岗亭设备信息</el-menu-item>
        <el-menu-item index="5-2" route="/baoxiu">报修管理</el-menu-item>
      </el-submenu>
        <el-submenu index="6" v-if="!isAdmin" >
        <template slot="title">
          <i class="el-icon-star-on"></i>
          <span>事务管理</span>
        </template>
        <el-menu-item index="6-1" route="/schoolAffairs"> 事务上报</el-menu-item>
        <el-menu-item index="6-2" route="/notice"   >公告管理</el-menu-item>
      </el-submenu>
       <el-menu-item index="7" route="/schoolAffairs" v-if="isAdmin" >
        <i class="el-icon-star-on"></i>
        <span slot="title" >
          事务上报
        </span>
      </el-menu-item>
        <el-submenu index="8" v-if="isAdmin">
        <template slot="title">
          <i class="el-icon-crop"></i>
          <span>考勤管理</span>
        </template>
        <el-menu-item index="8-1" route="/workCard">上下班打卡</el-menu-item>
        <el-menu-item index="8-2" route="/xlCard">巡逻打卡</el-menu-item>
      </el-submenu>
       <el-submenu index="9"  v-else>
        <template slot="title">
          <i class="el-icon-video-camera-solid"></i>
          <span>监控管理</span>
        </template>
        <el-menu-item index="9-1" route="/monitorVideo">查看监控</el-menu-item>
        <el-menu-item index="9-2" route="/montior">监控设备管理</el-menu-item>
        <el-menu-item index="9-3"  >
          <a href="https://pan.baidu.com/" style='text-decoration:none'> 监控文件管理（云端）</a>
        </el-menu-item>
      </el-submenu>
        <el-menu-item index="10" route="/monitorVideo"  v-if="isAdmin" >
        <i class="el-icon-video-camera"></i>
        <span slot="title" >
          查看监控
        </span>
      </el-menu-item>
       <el-menu-item index="11" route="/journal"  v-else >
        <i class="el-icon-document"></i>
        <span slot="title" >
          操作日志
        </span>
      </el-menu-item>
      <el-menu-item index="10" route="/about">
        <i class="el-icon-info"></i>
        <span slot="title" >
          关于系统
        </span>
      </el-menu-item>
    </el-menu>
    
</template>

<style>
 
</style>

<script>
  import { mapState } from 'vuex'
  export default {
   
    props: ['openNav'],
    data() {
      
      return {
       
        // adminon:true,
        // menuok:false,
      };
      
    },
    computed: {
      ...mapState([
        // 映射 this.count 为 store.state.count
        'userInfo',
        'role'
      ]),
      isAdmin(){
       
        return  this.role===1
      },
      
    },
    methods: {
      selectMenu(){},
      
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    mounted(){
      console.log(this.$store.state.role)
    },
  }
</script>

<style lang="less" scoped>
.lc-menu{
 height: 100%;

}
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  
  }
</style>