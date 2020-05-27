<!--
 * @Author: your name
 * @Date: 2020-02-18 13:23:55
 * @LastEditTime: 2020-04-24 23:58:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\src\views\Management\AdminInfoForm.vue
 -->
<template>
    <div>
       <el-dialog title="报修信息" :visible.sync="dialogVisible"  width="400px">
        <el-form ref="baoxiu"       label-width="80px">
          <el-form-item label="时间">
             <el-date-picker v-model="baoxiu.time" type="date" placeholder="选择日期"  style="width:100%" value-format="yyyy-MM-dd">
          </el-date-picker>
          </el-form-item>
           <el-form-item label="ID">
            <el-input v-model="baoxiu.id"  readonly placeholder="只读"></el-input>
          </el-form-item>
          <el-form-item label="设备名">
            <el-input v-model="baoxiu.name" readonly  placeholder="只读"></el-input>
          </el-form-item>
          <el-form-item label="所属门岗">
            <el-input v-model="baoxiu.door"   readonly  placeholder="只读"></el-input>
          </el-form-item>
           <el-form-item label="是否报修">
            <!-- <el-input v-model="baoxiu.repair" placeholder="请输入"></el-input> -->
           <el-select v-model="baoxiu.repair" style="width:100%"  placeholder="请选择">
             <el-option value="是" ></el-option>
             <el-option value="否" ></el-option>
           </el-select>
          </el-form-item>
          <el-form-item label="上报状态">
            <!-- <el-input v-model="baoxiu.fix" placeholder="请输入"></el-input> -->
            <el-select v-model="baoxiu.fix"   style="width:100%" placeholder="请选择">
            <el-option value="" ></el-option>
             <el-option value="已上报" ></el-option>
             <el-option value="正在处理" ></el-option>
             <el-option value="已完成" ></el-option>
           </el-select>
          </el-form-item>
           <el-form-item label="故障描述">
            <el-input  type="textarea"  v-model="baoxiu.notes" placeholder="请输入"  :autosize="{ minRows: 2, maxRows: 10}" ></el-input>
          </el-form-item>
          <el-form-item> 
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button   @click="offSubmit">取消</el-button>
          </el-form-item>
</el-form>
</el-dialog>
</div>
</template>
<script>
import{Baoxiuupdate,Equipmentupdate} from '@/http/api.js'
  export default {
    data() {
      return {
        dialogVisible: false,
        baoxiu: {},
      }
      
    },
    methods: {
      onSubmit() {
        console.log('修改事件')
      Equipmentupdate(
        this.baoxiu
      ).then(res=>{
        console.log('修改成功')
        this.dialogVisible= false
        this.$message({message:'恭喜你！处理成功',type:'success'})
        this.$parent.doQuery()
      })
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