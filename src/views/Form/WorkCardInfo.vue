<!--
 * @Author: your name
 * @Date: 2020-02-18 13:23:55
 * @LastEditTime: 2020-03-07 21:13:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\src\views\Management\AdminInfoForm.vue
 -->
<template>
    <div>
       <el-dialog title="打卡信息" :visible.sync="dialogVisible"  width="400px">
          <el-form ref="WorkCard"       label-width="80px">
            <el-form-item label="日期">
              <el-date-picker v-model="WorkCard.wtime" type="date" value-format="yyyy-MM-dd"   style="width:100%"  placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="姓名">
              <el-select v-model="WorkCard.name" clearable style="width:100%"   @change="selectinfo($event)"  placeholder="请选择">
                <el-option v-for="item in name":key="item"  :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="ID">
              <el-input  v-model="WorkCard.id" readonly   placeholder="只读"></el-input>
            </el-form-item>
            <el-form-item label="部门">
              <el-input  v-model="WorkCard.dname" readonly  placeholder="只读"></el-input>
            </el-form-item>
            <el-form-item label="开始时间" >
              <el-date-picker v-model="WorkCard.work_shift"   value-format="yyyy-MM-dd HH:mm:ss"  style="width:100%"   type="datetime" placeholder="打卡开始时间"> </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker v-model="WorkCard.closing_time"   value-format="yyyy-MM-dd HH:mm:ss"  style="width:100%"   type="datetime" placeholder="结束时间时间"> </el-date-picker>
            </el-form-item>
             <el-form-item label="备注">
              <el-input v-model="WorkCard.remarks"   clearable placeholder="备注"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">确定</el-button>
              <el-button @click="offSubmit" >取消</el-button>
            </el-form-item>
           </el-form>
          </el-dialog>
      </div>
</template>
<script>
import {WorkCardselectinfo,WorkCardadd,WorkCardupdate} from'@/http/api.js'
  export default {
    data() {
      return {
           dialogVisible: false,
           WorkCard: {
          
           },
           switch:'',
           name:[],
      
      }
    },
    methods: {
      onSubmit() {
       this.dialogVisible= false 
        console.log(this.switch)
     
        if(this.switch==='add'){
          console.log('新增界面')
          WorkCardadd({
            data:this.WorkCard
          }).then(res=>{
             this.$message({ message: '恭喜你！新增成功', type: 'success'});  
          })
        }
        else if (this.switch==='update'){
          console.log('修改页面')
          WorkCardupdate({
            data:this.WorkCard
          }).then(res=>{
            this.$message({ message: '恭喜你！修改成功', type: 'success'});  
            this.dialogVisible= false 
          })
        }
      },
      offSubmit(){
        this.dialogVisible =false
      },
      selectinfo(val){
         if(val != null && val != '' && val != undefined){
           WorkCardselectinfo({
            name:this.WorkCard.name
           }).then(res=>{
             console.log(this.WorkCard)
             this.WorkCard.id=res.data.id
             this.WorkCard.dname=res.data.dname
           })
         }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>