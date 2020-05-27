<!--
 * @Author: your name
 * @Date: 2020-02-18 13:23:55
 * @LastEditTime: 2020-04-22 22:42:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\src\views\Management\AdminInfoForm.vue
 -->
<template>
    <div>
       <el-dialog title="外卖人员信息" :visible.sync="dialogVisible"  width="400px">
        <el-form ref="takeOut"       label-width="80px">
          <el-form-item label="时间">
            <el-date-picker v-model="takeOut.time" type="date"    value-format="yyyy-MM-dd"  style="width:100%"  placeholder="日期">  </el-date-picker>
          </el-form-item>
          <!-- <el-form-item label="序号">
            <el-input v-model="takeOut.wid" placeholder="id"></el-input>
          </el-form-item> -->
           <el-form-item label="姓名">
            <el-input v-model="takeOut.name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="进入时间">
            <el-date-picker v-model="takeOut.entryTime" type="datetime"    value-format="yyyy-MM-dd HH:mm:ss"   style="width:100%"  placeholder="选择日期">  </el-date-picker>
          </el-form-item>
            <el-form-item label="门岗">
             <el-select v-model="takeOut.door" placeholder="请选择" style="width:100%">
                <el-option   v-for="item in dname" :key="item.id" :label="item.name"  :value="item.name"> </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="takeOut.cardId" placeholder="身份证号"></el-input>
          </el-form-item><el-form-item label="出去时间">
            <el-date-picker v-model="takeOut.endTime" type="datetime"    value-format="yyyy-MM-dd HH:mm:ss"   style="width:100%"  placeholder="选择日期">  </el-date-picker>
          </el-form-item>
          </el-form-item><el-form-item label="备注">
            <el-input v-model="takeOut.remarks" placeholder="备注"></el-input>
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
import {TakeOUtadd,TakeOUtupdate}  from '@/http/api.js'
  export default {
    data() {
      return {
           dialogVisible: false,
           takeOut: {

        },
        dname:[],
        switch:'',
      }
      
    },
    methods: {
      onSubmit() {
        if(this.switch==='add'){
          console.log('新增事件')
          TakeOUtadd(
            this.takeOut
          ).then(res=>{
            console.log('新增成功')
            this.dialogVisible = false
            this.$message({message:'恭喜你，新增成功', type:'success'})
            this.$parent.doQuery()

          })
        }
        else if(this.switch==='update'){
          console.log('修改事件')
          TakeOUtupdate(
          this.takeOut
          ).then(res=>{
            console.log('修改成功')
            this.dialogVisible = false
            this.$message({message:'恭喜你，修改成功', type:'success'})
            this.$parent.doQuery()
          })
        }
     
      },
     offSubmit(){
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