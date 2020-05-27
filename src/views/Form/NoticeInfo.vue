


<!--
 * @Author: your name
 * @Date: 2020-02-18 13:23:55
 * @LastEditTime: 2020-04-27 20:04:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\src\views\Management\AdminInfoForm.vue
 -->
<template>
    <div>
       <el-dialog title="公告管理" :visible.sync="dialogVisible"  width="400px">
        <el-form ref="notice"       label-width="80px">
           <!-- <el-form-item label="编号">
            <el-input v-model="notice.id" placeholder="ID" readonly  ></el-input>
          </el-form-item> -->
           <el-form-item label="注册日期">
              <el-date-picker  v-model="notice.createTime" readonly placeholder="只读"  value-format="yyyy-MM-dd "  type="date"  >
             </el-date-picker>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="notice.title" placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item label="发布人">
            <el-input v-model="notice.createId"  readonly  placeholder="只读"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input v-model="notice.content" type="textarea"  :autosize="{ minRows: 2, maxRows: 10}" placeholder="内容"></el-input>
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
import {Noticeadd,Noticeupdate} from '@/http/api.js'
  export default {
    data() {
      return {
        notice:{},
           dialogVisible: false,
           switch:'',
        }

      },
      
    
    methods: {
      onSubmit() {
       if(this.switch==='add'){
        console.log('添加事件')
        Noticeadd(
          this.notice
        ).then(res=>{
          console.log('添加成功')
          this.dialogVisible =false
          this.$message({message:'恭喜你！添加成功',type:'success'})
          this.$parent.doQuery()
        })
       }
       else if(this.switch==='update'){
         console.log('修改事件')
         Noticeupdate(
         this.notice
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
    }
  }
  
</script>

<style lang="less" scoped>
  .transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }
</style>