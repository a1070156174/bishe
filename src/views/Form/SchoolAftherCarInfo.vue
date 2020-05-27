<!--
 * @Author: your name
 * @Date: 2020-02-18 13:23:55
 * @LastEditTime: 2020-05-11 22:15:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\src\views\Management\AdminInfoForm.vue
 -->
<template>
    <div>
       <el-dialog title="校内车辆信息" :visible.sync="dialogVisible"  width="400px">
        <el-form ref="schoolafthercar"       label-width="80px">
           <!-- <el-form-item label="编号">
            <el-input v-model="schoolafthercar.id" placeholder="ID" ></el-input>
          </el-form-item>  -->
          <el-form-item label="日期">
              <el-date-picker  v-model="schoolafthercar.time"    value-format="yyyy-MM-dd"  type="date"  style="width:100%"   placeholder="选择日期">
             </el-date-picker>
          </el-form-item>
          <el-form-item label="进入时间">
             <el-date-picker v-model="schoolafthercar.entryTime"  value-format="yyyy-MM-dd HH:mm:ss" type="datetime"   style="width:100%"  placeholder="选择日期时间">
          </el-date-picker>
          </el-form-item>
          <el-form-item label="车牌号">
            <el-input v-model="schoolafthercar.carId" placeholder="车牌号"></el-input>
          </el-form-item>
           <el-form-item label="出去时间">
             <el-date-picker v-model="schoolafthercar.endTime"  value-format="yyyy-MM-dd HH:mm:ss" type="datetime"  style="width:100%"   placeholder="选择日期时间">
          </el-date-picker>
          </el-form-item>
           <el-form-item label="车主">
            <el-input v-model="schoolafthercar.owner" placeholder="车主"></el-input>
          </el-form-item>
           <el-form-item label="联系方式">
            <el-input v-model="schoolafthercar.phone" placeholder="联系方式"></el-input>
          </el-form-item>
           <el-form-item label="到访原因">
            <el-input v-model="schoolafthercar.cause" placeholder="到访原因"></el-input>
          </el-form-item>
            <el-form-item label="备注">
            <el-input v-model="schoolafthercar.remarks" placeholder="备注"></el-input>
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
import{SchoolAftherCaradd,SchoolAftherCarupdate} from'@/http/api.js'
  export default {
    data() {
      return {
        dialogVisible: false,
        schoolafthercar:{},
        switch:'',
      }
      
    },
    watch: {

    },
    methods: {
      onSubmit() {
        if(this.switch==='add'){
          console.log('新增事件')
          SchoolAftherCaradd(
            this.schoolafthercar
          ).then(res=>{
            console.log('新增成功')
            this.$message({message:'恭喜你！新增成功',type:'success'})
            this.dialogVisible=false
            this.$parent.doQuery()
          })
       
        } 
      else if(this.switch==='update'){
        console.log('修改事件')
        SchoolAftherCarupdate(
          this.schoolafthercar
        ).then(res=>{
           console.log('修改成功')
            this.$message({message:'恭喜你！修改成功',type:'success'})
            this.dialogVisible=false
            this.$parent.doQuery()
        })
      }
      },
      offSubmit(){
         this.dialogVisible= false 
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