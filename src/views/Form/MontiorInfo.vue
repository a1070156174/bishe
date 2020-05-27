


<!--
 * @Author: your name
 * @Date: 2020-02-18 13:23:55
 * @LastEditTime: 2020-05-06 22:41:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\src\views\Management\AdminInfoForm.vue
 -->
<template>
    <div>
       <el-dialog title="公告管理" :visible.sync="dialogVisible"  width="400px">
        <el-form ref="montior"       label-width="80px">
           <!-- <el-form-item label="编号">
            <el-input v-model="montior.id" placeholder="ID"></el-input>
          </el-form-item> -->
           <el-form-item label="设备名">
            <el-input v-model="montior.name" placeholder="设备名"></el-input>
          </el-form-item>
           <el-form-item label="注册日期">
              <el-date-picker  v-model="montior.time"     value-format="yyyy-MM-dd"  type="date" style="width:100%"   placeholder="选择日期"> </el-date-picker>
          </el-form-item>
         <el-form-item label="所属门岗" >            
            <el-select v-model="montior.door" placeholder="请选择"  filterable  clearable   style="width:100%" >
             <el-option v-for="item in  department " :key="item.id"  :label="item.name"  :value="item.name"></el-option>
           </el-select>
         </el-form-item>
          <el-form-item label="负责人">
            <el-input v-model="montior.person"  placeholder="负责人"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <!-- <el-input v-model="montior.ncontent"  placeholder="状态"></el-input> -->
           <el-select v-model="montior.status" placeholder="请选择" style="width:100%" >
             <el-option value="正常"> </el-option>
             <el-option value="良好"> </el-option>
             <el-option value="老化"> </el-option>
             <el-option value="损坏"> </el-option>
             <el-option value="报废"> </el-option>
           </el-select>
          </el-form-item>
          <el-form-item> 
            <el-button type="primary" @click="onSubmit"  >确定</el-button>
            <el-button @click="offSubmit">取消</el-button>
          </el-form-item>
</el-form>
</el-dialog>
</div>
</template>
<script>
import {Montioradd,Montiorupdate,getdepartment} from '@/http/api.js'
  export default {
    data() {
      return {
        montior:{},
           dialogVisible: false,
           switch:'',
           department:[]
        }

      },
      
    
    methods: {
      onSubmit() {
       if(this.switch==='add'){
        console.log('添加事件')
       Montioradd(
          this.montior
        ).then(res=>{
          console.log('添加成功')
          this.dialogVisible =false
          this.$message({message:'恭喜你！添加成功',type:'success'})
          this.$parent.doQuery()
        })
       }
       else if(this.switch==='update'){
         console.log('修改事件')
        Montiorupdate(
          this.montior
         ).then(res=>{
          this.dialogVisible =false
          this.$message({message:'恭喜你！修改成功',type:'success'})
          this.$parent.doQuery()
         })
       }
      },
      offSubmit(){
        this.dialogVisible=false
      }
    },
    mounted(){
       getdepartment({

     }).then(res=>{
         this.department=res.data
     })
    }
  }
  
</script>

<style lang="less" scoped>
  .transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }
</style>