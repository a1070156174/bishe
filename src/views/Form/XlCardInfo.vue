// <!--
//  * @Author: your name
//  * @Date: 2020-02-18 13:23:55
//  * @LastEditTime: 2020-05-05 13:58:51
//  * @LastEditors: Please set LastEditors
//  * @Description: In User Settings Edit
//  * @FilePath: \demo\src\views\Management\AdminInfoForm.vue
//  -->
<template>
    <div>
       <el-dialog title="打卡信息" :visible.sync="dialogVisible"  width="400px">
          <el-form ref="XLCard"       label-width="80px">
            <el-form-item label="日期">
              <el-date-picker v-model="XLCard.createTime" type="date" value-format="yyyy-MM-dd"   style="width:100%"  placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="姓名">
              <!-- <el-input v-model="XLCard.name" readonly clearable  placeholder="只读"></el-input> -->
              <el-select v-model="XLCard.name" clearable style="width:100%"   @change="selectinfo($event)"  placeholder="请选择">
                <el-option
                  v-for="item in name"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="ID">
              <el-input  v-model="XLCard.id" readonly   placeholder="只读"></el-input>
            </el-form-item>
            <!-- <el-form-item label="部门">
              <el-input  v-model="XLCard.dname" readonly  placeholder="只读"></el-input>
            </el-form-item> -->
            <el-form-item label="开始时间" >
              <el-date-picker v-model="XLCard.onPatrol"   value-format="yyyy-MM-dd HH:mm:ss"  style="width:100%"   type="datetime" placeholder="打卡开始时间"> </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker v-model="XLCard.offPatrol"   value-format="yyyy-MM-dd HH:mm:ss"  style="width:100%"   type="datetime" placeholder="结束时间时间"> </el-date-picker>
            </el-form-item>
             <el-form-item label="备注">
              <el-input v-model="XLCard.patrol_remarks"   clearable placeholder="备注"></el-input>
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
import {XLCardselectinfo,XLCardadd,XLCardupdate} from'@/http/api.js'
  export default {
    data() {
      return {
           dialogVisible: false,
           XLCard: {
          
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
          XLCardadd(
           this.XLCard
          ).then(res=>{
             this.$message({ message: '恭喜你！新增成功',  type: 'success'  });
             this.dialogVisible= false 
          })
        }
        else if (this.switch==='update'){
          console.log('修改页面')
          XLCardupdate(
            this.XLCard
          ).then(res=>{
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
           XLCardselectinfo({
            name:this.XLCard.name
           }).then(res=>{
             console.log(this.XLCard)
             this.XLCard.id=res.data.id
             this.XLCard.dname=res.data.dname
           })
         }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>