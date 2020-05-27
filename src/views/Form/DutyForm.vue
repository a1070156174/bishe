<!--
 * @Author: your name
 * @Date: 2020-02-18 13:23:55
 * @LastEditTime: 2020-05-11 23:10:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\src\views\Management\AdminInfoForm.vue
 -->
<template>
    <div>
       <el-dialog title="值班信息"  :visible.sync="dialogVisible"  width="500px">
        <el-form ref="form"       label-width="80px">
            <!-- <el-form-item label="编号">
            <el-input v-model="form.id"  style="width:300px"  clearable   placeholder="编号"></el-input>          
          </el-form-item> -->
          <el-form-item label="时间">
            <!-- <el-input v-model="duty.dutydete"    type="date"    placeholder="日期"></el-input> -->
            <el-date-picker v-model="form.dutyDate" type="date" style="width:300px"  value-format="yyyy-MM-dd"  placeholder="选择日期"> </el-date-picker>
          </el-form-item>
          <el-form-item label="部门">            
        <el-select v-model="form.door" placeholder="请选择"  filterable  @change="dnamechange($event)"   style="width:300px" >
            <el-option v-for="item in department " :key="item.id"  :label="item.name"  :value="item.name"></el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="值班队长">
            <!-- <el-input v-model="duty.bossname" placeholder="值班队长"></el-input> -->
            <el-select v-model="form.bossname" filterable style="width:300px" placeholder="请选择">
              <el-option v-for="item in namevalue" :key="item.id"  :label="item.name"  :value="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="值班员" >
            <el-select v-model="form.user"  clearable filterable  multiple placeholder="请选择" style="width:300px" >
             <el-option v-for="item in namevalue" :key="item.id" :label="item.name"  :value="item.name"> </el-option>
            </el-select>
          </el-form-item>
</el-form>
<div slot="footer"> 
    <el-button type="primary" @click="onSubmit">确定</el-button>
    <el-button  @click="offSubmit">取消</el-button>
  </div>
</el-dialog>
</div>
</template>
<script>
import {DutyInfoadd,DutyInfoupdate,IndexClientselect,DutyInfogetname} from '@/http/api.js'
  export default {
    data() {
      return {
           dialogVisible: false,
            form:
              {  id:'',
                 dutyDate:'',
                 door:'',
                 user:[],
                 bossname:'',
                 department:''
              }
            ,
            namevalue:[],
            department:[],
            switch:'',
      }
    },
    methods: {
      onSubmit() {
        this.dialogVisible= false 
        if(this.switch==='add'){
          console.log('添加事件')
          DutyInfoadd(
            this.form
          ).then(res=>{
          console.log('添加成功')
          this.$message({  message: '恭喜你！添加成功', type: 'success' });
          this. dialogVisible= false 
          this.$parent.doQuery()
          })
        }
        else{
          console.log('修改命令 ')
          DutyInfoupdate(
            this.form
          ).then(res=>{
            console.log('修改成功')
            this.$message({ message: '恭喜你！修改成功', type: 'success'  }) 
            this.dialogVisible= false 
            this.$parent.doQuery()
          })

        }
        
      },
      //选择器改变事件
      dnamechange(val){
        if(val != null && val != '' && val != undefined)
          {
             IndexClientselect({
               
            }).then(res=>{
              this.namevalue=res.data
             console.log(this.namevalue)
              
            })}
      },
      	offSubmit() {
			this.dialogVisible = false;
    },
    handleChange(){
      
    }
    },
     mounted() {
      
    }
  }
</script>

<style lang="less" scoped>
  .transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }
</style>