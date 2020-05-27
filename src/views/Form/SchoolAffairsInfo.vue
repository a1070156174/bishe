<!--
 * @Author: your name
 * @Date: 2020-02-18 13:23:55
 * @LastEditTime: 2020-05-11 22:59:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\src\views\Management\AdminInfoForm.vue
 -->
<template>
    <div>
       <el-dialog title="事务管理" :visible.sync="dialogVisible"  width="400px">
        <el-form ref="schoolAffairs"       label-width="80px">
           <el-form-item label="编号">
            <el-input v-model="schoolAffairs.id" placeholder="ID"></el-input>
          </el-form-item>
           <el-form-item label="注册日期">
              <el-date-picker  v-model="schoolAffairs.handleTime"   value-format="yyyy-MM-dd"  type="date"  style="width:100%"  placeholder="选择日期">
             </el-date-picker>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="schoolAffairs.title" placeholder="标题"></el-input>
          </el-form-item>
           <el-form-item label="处理情况">
             <el-select v-model="schoolAffairs.handleStatus"   style="width:100%" placeholder="处理情况">
              <el-option   value="已上报"> </el-option>
              <el-option   value="已收到"> </el-option>
              <el-option   value="处理中"> </el-option>
              <el-option   value="已处理"> </el-option>
             </el-select>
          </el-form-item>
          <el-form-item label="内容">
            <el-input v-model="schoolAffairs.content"  type="textarea"  :autosize="{ minRows: 2, maxRows: 10}"  placeholder="内容"></el-input>
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
import {SchoolAffairsadd,SchoolAffairsupdate} from '@/http/api.js'
  export default {
    data() {
      return {
        schoolAffairs:{},
        dialogVisible: false,
        switch:'',
        }
      },
      
    
    methods: {
      onSubmit(){
        if(this.switch==='add'){
          console.log('新增事件')
          SchoolAffairsadd(
           this.schoolAffairs
          ).then(res=>{
            console.log('新增成功')
            this.dialogVisible = false 
            this.$message({message:'恭喜你！新增成功',type:'success'})
            this.$parent.doQuery()
          })
        }
        else if(this.switch==='update'){
          console.log('修改事件')
          SchoolAffairsupdate(
            this.schoolAffairs
          ).then(res=>{
            console.log('修改成功')
            this.dialogVisible = false 
            this.$message({message:'恭喜你！修改成功',type:'success'})
            this.$parent.doQuery()
          })
        }
      },
      offSubmit() {
       this.dialogVisible = false 
      }
    }
  }
  
</script>

<style lang="less" scoped>
  .transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }
</style>