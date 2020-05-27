<!--
 * @Author: your name
 * @Date: 2020-02-18 13:23:55
 * @LastEditTime: 2020-05-11 22:15:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\src\views\Management\AdminInfoForm.vue
 -->
<template>
    <div>
       <el-dialog title="校内车辆信息" :visible.sync="dialogVisible"  width="400px">
        <el-form ref="schoolcar"       label-width="80px">
           <!-- <el-form-item label="编号">
            <el-input v-model="schoolcar.id" placeholder="ID"></el-input>
          </el-form-item> -->
           <el-form-item label="注册日期">
              <el-date-picker  v-model="schoolcar.scentryTime"    value-format="yyyy-MM-dd"  type="date"   placeholder="选择日期">
             </el-date-picker>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="schoolcar.owner" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="单位">
            <el-input v-model="schoolcar.unit" placeholder="单位"></el-input>
          </el-form-item>
          <el-form-item label="车牌号">
            <el-input v-model="schoolcar.carId" placeholder="车牌号"></el-input>
          </el-form-item>
           <el-form-item label="联系方式">
            <el-input v-model="schoolcar.phone" placeholder="联系方式"></el-input>
          </el-form-item>
           <el-form-item label="备注">
            <el-input v-model="schoolcar.remarks" placeholder="备注"></el-input>
          </el-form-item>
          <el-form-item> 
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button  @click="offSubmit" >取消</el-button>
          </el-form-item>
</el-form>
</el-dialog>
</div>
</template>
<script>
import{SchoolCarupdate,SchoolCaradd} from '@/http/api.js'
  export default {
    data() {
      return {
        schoolcar:{},
           dialogVisible: false,
        schoolcar: {
        },
        switch:'',
      }
      
    },
    methods: {
      onSubmit() {
      if(this.switch==='add'){
        console.log('新增操作')
        SchoolCaradd(
         this.schoolcar
        ).then(res=>{
          console.log('新增成功')
          this.dialogVisible= false 
          this.$message({message:'恭喜你！新增成功' ,type:'success'})
          this.$parent.doQuery()
        }
        )   
      }
      else if(this.switch==='update'){
        console.log('修改操作')
        SchoolCarupdate(
         this.schoolcar
        ).then(res=>{
          console.log('修改成功')
          this.dialogVisible= false 
          this.$message({message:'恭喜你！修改成功' ,type:'success'})
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