<!--
 * @Author: your name
 * @Date: 2020-02-13 19:47:10
 * @LastEditTime: 2020-05-06 11:23:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\src\views\layout\Header.vue
 -->
<template>
  <div class="lc-header el-button--primary" >
        <router-link to="/home" >
          <div class="logo" :class="{'logo-hide': !openNav}">
            <img src="../../assets/logo/logo.png" class="image">
            <span class="text">LC管理系统</span>
          </div>
        </router-link>
        <!-- 菜单隐藏和显示 -->
        <div class="content">
          <i class="el-icon-s-fold toggle" @click="navOpenToggle"  v-show="openNav"></i>
          <i class="el-icon-s-unfold toggle" @click="navOpenToggle"  v-show="!openNav"></i>
        </div>
        <div class="right max-right">
          <!-- 消息图标 -->
          <div class="right-item">
            <i class="el-icon-message" style="font-size: 18px;"></i>
            <el-badge :value="520" class="item"></el-badge>
          </div>
        <!-- 换主题 -->
          <div class="right-item">  
            LC自定义皮肤
            <theme-picker> </theme-picker>
          </div>
        <!-- 我的图标 -->
          <div class="right-item">
            <el-dropdown trigger="click">
              <p class="user-info">
                {{ LoginName }}<i class="el-icon-s-custom" style="margin-left: 10px"></i>
              </p>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <!-- <router-link to="/login">
                    <el-link :underline="false">{{修改密码}}</el-link>
                  </router-link> -->
                </el-dropdown-item>
                <el-dropdown-item divided @click.native="logout()">
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import ThemePicker from '../homeapp/ThemePicker/ThemePicker'
    export default {
      props: ['openNav'],
        components: {
          ThemePicker
       },
          data() {
      
      return {
      
        // adminon:true,
        // menuok:false,
      };
      
    },
        methods:{
           ...mapMutations(['delToken'],),
            logout(){

               this.$store.commit('delToken')
                this.$router.push({path: '/login'})
                 var storage=window.localStorage
                console.log('退出登录')
                console.log('window.localStorage的token为：'+ storage.getItem('token'))
            },
            handleSelect(){
              
            },
        
            navOpenToggle () {
              this.$emit('toggle-open')
            },
          
        },
        computed:{
            LoginName(){
                return  this.$store.state.userInfo.username
            }
        },
        created(){
            console.log(this.$store.state.userInfo.username);
        }
    }
</script>

<style lang="scss" scoped>

.lc-header {
  color: #ffffff;
  line-height: 59px;
  user-select: none;
  

  div {
    display: inline-block;
  }

  .logo {
    width: 200px;
    border-right: 1px solid #C0C4CC;
    margin-left: 0px;
    text-align: center;
    font-size: 25px;
    cursor: pointer;

    .image {
      width: 40px;
      height: 40px;
      vertical-align: middle;
    }

    .text {
      color: #ffffff;
    }
  }

  .logo-hide {
    width: 63px;

    .text {
      display: none;
    }
  }

  .content {
    padding: 0 20px;

    .toggle {
      font-size: 22px;
      cursor: pointer;
    }
  }

  .right {
    float: right;

    .right-item {
      display: inline-block;
      padding: 0 10px;
      min-width: 60px;
      text-align: center;
      font-size: 14px;
      cursor: pointer;

      .drop-icon {
        transition: transform 0.2s;
      }
    }

    .right-item:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }

    .user-info {
      color: #ffffff;
    }
  }

  .min-right {
    display: none;
  }
}

@media (max-width: 768px) {
  .header {
    .logo {
      border: none;
      display: contents;

      .text {
        display: inline-block !important;
      }
    }

    .content {
      float: left;
      margin-left: -20px;
    }
  }

  .max-right {
    display: none !important;
  }

  .min-right {
    display: inline-block !important;
  }
}
  a {
  text-decoration: none;
}
 
.router-link-active {
  text-decoration: none;
}
 
</style>