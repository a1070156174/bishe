<!--
 * @Author: your name
 * @Date: 2020-02-18 13:23:55
 * @LastEditTime: 2020-04-25 00:01:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\src\views\Management\AdminInfoForm.vue
 -->
<template>
    <div>
       <el-dialog title="岗亭设备信息" :visible.sync="dialogVisible"  width="400px">
        <el-form ref="equipment"       label-width="80px">
           <el-form-item label="ID">
            <el-input v-model="equipment.id" placeholder="ID"></el-input>
          </el-form-item>
          <el-form-item label="设备名">
            <el-input v-model="equipment.name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="数量">
            <el-input v-model="equipment.num" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <!-- <el-input v-model="equipment.status" placeholder="请输入"></el-input> -->
                <el-select v-model="equipment.status"  style="width:100%" placeholder="请选择">
               <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label"></el-option>
             </el-select>
          </el-form-item>
           <!-- <el-form-item label="所属门岗">
            <el-input v-model="equipment.dname" placeholder="请输入"></el-input>
          </el-form-item> -->
           <el-form-item label="所属门岗">            
         <el-select v-model="equipment.door" placeholder="请选择"  filterable  clearable  @change="dnamechange($event)"   style="width:100%" >
            <el-option v-for="item in  department " :key="item.id"  :label="item.name"  :value="item.name"></el-option>
          </el-select>
          </el-form-item>
           <el-form-item label="备注">
            <el-input v-model="equipment.remarks" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item> 
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button   @click="offSubmit" >取消</el-button>
          </el-form-item>
</el-form>
</el-dialog>
</div>
</template>
<script>
import{Equipmentadd,Equipmentupdate} from '@/http/api.js'
  export default {
    data() {
      return {
        dialogVisible: false,
        equipment: {
        },
        switch:'',
        department:[],
         options: [{
          value: '选项1',
          label: '良好'
        }, {
          value: '选项2',
          label: '正常'
        }, {
          value: '选项3',
          label: '损坏'
        }, {
          value: '选项4',
          label: '报废',
        }, ],
        value: ''
      }
      
    },
    methods: {
      offSubmit() {
        this.dialogVisible= false 
      },
      onSubmit(){
        if(this.switch==='add'){
          console.log('新增事件')
          Equipmentadd(
            this.equipment
          ).then(res=>{
            console.log('新增成功！')
            this.dialogVisible= false 
            this.$message({message:'恭喜你！新增成功',type:'success'})
            this.$parent.doQuery()
          })
        }
        else if(this.switch==='update'){
          console.log('修改事件')
          Equipmentupdate(
           this.equipment
          ).then(res=>{
            console.log('修改成功！')
            this.dialogVisible= false 
            this.$message({message:'恭喜你！修改成功',type:'success'})
            this.$parent.doQuery()
        })
        }
       
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