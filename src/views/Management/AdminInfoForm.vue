<!--
 * @Author: your name
 * @Date: 2020-02-18 13:23:55
 * @LastEditTime: 2020-04-11 23:55:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\src\views\Management\AdminInfoForm.vue
 -->
<template>
    <div>
       <el-dialog title="管理员信息" :visible.sync="dialogVisible"  width="400px">
        <el-form ref="form"       label-width="80px">
  <el-form-item label="Id">
    <el-input v-model="form.id"   placeholder="管理员ID"></el-input>
  </el-form-item>
  <el-form-item label="姓名">
    <el-input v-model="form.username" placeholder="姓名"></el-input>
  </el-form-item>
   <el-form-item label="密码">
    <el-input show-password v-model="form.password" placeholder="密码"></el-input>
  </el-form-item>
  <el-form-item label="注册时间">
      <el-date-picker type="date" placeholder="注册日期" v-model="form.createTime"  style="width:100%" value-format="yyyy-MM-dd"  ></el-date-picker>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">确定</el-button>
    <el-button @click="offSubmit">取消</el-button>
  </el-form-item>
</el-form>
</el-dialog>
</div>
</template>
<script>
import {Adminupdate,Adminadd} from '@/http/api.js'
  export default {
    data() {
      return {
           dialogVisible: false,
        form: {
         
        },
        switch:''

      }
    },
    methods: {
      onSubmit() {
       if(this.switch==='add')
       {
         console.log('新增事件')
         Adminadd({
           id:this.form.id,
           username:this.form.username,
           password:this.form.password,
           createTime:this.form.createTime
         }).then(res=>{
          console.log('新增成功')
          this.dialogVisible =false
          this.$message({message:'恭喜你！新增成功',type:'success'})
          this.$parent.doQuery()
         })
       }
       else if(this.switch==='update')
       {
         Adminupdate({ id:this.form.id,
           username:this.form.username,
           password:this.form.password}).then(res=>{
          console.log('修改成功')
          this.dialogVisible =false
          this.$message({message:'恭喜你！修改成功',type:'success'})
          this.$parent.doQuery()
         })
       }
      },
      offSubmit(){
        this.dialogVisible =false
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>