<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <!-- <svg-icon icon-class="user" /> -->
          <i class="el-icon-user-solid"></i>
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username" 
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"                       
        />  
            <!-- autocomplete:自动输入 -->
            <!-- tabindex：table键顺序 -->
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <!-- <svg-icon icon-class="password" /> -->
             <i class="el-icon-key"></i>
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="on"   
           @keyup.enter.native="handleLogin"  
          />    
        </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>
      <div style="position:relative">
        <div class="tips">
          <span>管理员：账号 : admin</span>
          <span>密码: admin</span>
        </div>
        <div class="tips">
          <span style="margin-right:18px;">保安: 账号 : user </span>
          <span>密码 : user</span>
        </div>
      </div>
    </el-form>

    <el-dialog title="Or connect with" :visible.sync="showDialog">
      Can not be simulated on local, so please combine you own business simulation! ! !
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import {Login} from '@/http/api.js'
// import { validUsername } from '@/utils/validate'
// import SocialSign from './components/SocialSignin'
export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error('账号长度至少四位，请重新输入'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error('密码长度至少四位，请重新输入'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
},
//VUE生命周期函数    当用户名，密码为空时，焦点事件
 mounted() {   
   if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
},


methods:{
  ...mapMutations(['setToken'],),
    handleLogin(){
      let _this = this;
      this.$refs.loginForm.validate(valid=>{
        if(valid){
          this.loading=true
            Login(this.loginForm).then(res=>{
            this.loading=false
             let tokens =res.data
             console.log('传入后台的值：',this.loginForm)
             console.log('后台获取的tokens：',tokens)
            this.$store.commit('setToken',tokens)
             console.log('window.localStorage值：',window.localStorage.getItem('token'))
            this.$router.push({name:'Home'});
          }).catch(err=>{
            console.log('失败')
            this.$message({message:'登入失败，用户名或密码错误，请重新输入', type:'warning'})
            console.log(err)
            this.loading =false;
          });
        }
        else{
          console.log('error sumbit')
        }
      });

    }
     

}

}
</script>

<style lang="less">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

@supports (-webkit-mask: none) and (not (cater-color: #fff)) {
  .login-container .el-input input {
    color: #fff;
  }
}
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
      background-color:#35c019 ;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #fff;
      height: 47px;
      caret-color: #fff;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #35c019 inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #9bbcee;
  }
}
</style>

<style lang="less" scoped>

.login-container {
  min-height: 100%;
  width: 100%;
  background-image:url('../assets/kj.jpg');
  background-repeat:no-repeat;
  background-size:100% 100%; 
  background-color: #9bbcee;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 3px 5px 4.8px 15px;
    background-color:#ffff;
    // vertical-align: middle;
    width: 40px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: #fff;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #283443;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}

</style>