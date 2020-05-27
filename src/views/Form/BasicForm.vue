<!--
 * @Author: your name
 * @Date: 2020-02-18 13:23:55
 * @LastEditTime: 2020-05-11 16:27:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\src\views\Management\AdminInfoForm.vue
 -->
<template>
    <div>
       <el-dialog title="工资信息" :visible.sync="dialogVisible"  width="680px">
         
          <el-form ref="form"    :disabled="tabledisabled"  label-width="80px" inline>
           <!-- <el-form-item label="薪水编号"  prop="employeeId">
            <el-input v-model="form.id "  readonly  placeholder="只读"></el-input>
          </el-form-item> -->
          <el-form-item label="时间" prop="startTime" >
            <!-- <el-input v-model="form.start_time"    type="date"    placeholder="日期"></el-input> -->
             <el-date-picker v-model="form.startTime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" style="width:200px"></el-date-picker>
          </el-form-item>
          <el-form-item label="姓名"  prop="name"   >
            <el-select v-model="form.name"     @change="setid($event)"   @focus="focus($event)"   filterable  clearable placeholder="请选择"  style="width:200px" >
              <el-option  v-for="item in namevalue" :key="item.id" :label="item.name" :value="item.name"> </el-option>  
            </el-select>
          </el-form-item>
           <el-form-item label="ID"  prop="employeeId">
            <el-input v-model="form.employeeId"  placeholder="只读"></el-input>
          </el-form-item>
         
         <el-form-item label="部门"  prop="dname">
            <el-input v-model="form.door" readonly placeholder="只读"></el-input>
          </el-form-item>
          <el-form-item label="岗位" prop="post">
                 <el-input v-model="form.post" readonly placeholder="只读"></el-input>
          </el-form-item>
          <el-form-item label="基本工资" prop="basicsSalary">
            <el-input v-model="form.basicsSalary" placeholder="基本工资"></el-input>
          </el-form-item>
          <el-form-item label="迟到罚款" prop="late">
            <el-input v-model="form.late" placeholder="迟到罚款" ></el-input>
          </el-form-item>
           <el-form-item label="奖金抽成" prop="bonus">
            <el-input v-model="form.bonus" placeholder="奖金抽成"  ></el-input>
          </el-form-item>
           <el-form-item label="个税"  prop="tax">
            <el-input v-model="form.tax" placeholder="个人所得税"  ></el-input>
          </el-form-item>
          <el-form-item label="实际工资"  prop="salary">
            <el-input v-model="form.salary" placeholder="实际工资"  ></el-input>
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
import {BasicInfogetname, BasicInfoupdate,BasicInfoadd,IndexClientgetform,IndexClientselect}from'@/http/api.js'
export default {
	data() {
		return {
      dialogVisible: false,
      tabledisabled: false,
			form: {
      },
      switch:'',
      namevalue:[],
      value: '',
		};
	},
	methods: {
		onSubmit() {
      (this.dialogVisible = false),
       console.log('submit!')
        if(this.switch==='add'){
          console.log('新增按钮按下',this.form)
           BasicInfoadd(
            this.form
           ).then(res=>{
             this.dialogVisible = false
             this.$message({ message: '恭喜你，新增成功', type: 'success' })
             this.$parent.doQuery()
           })
        }
        else if(this.switch==='update'){
          console.log('修改按钮按下事件',this.form)
          BasicInfoupdate(
            this.form
          ).then(res=>{
             this.dialogVisible = false
             this.$message({ message: '恭喜你，修改成功', type: 'success' })
             this.$parent.doQuery()
          })
        }
    },
    //通过姓名选择器 绑定员工id，部门，岗位
    setid(val){
      
      if(val != null && val != '' && val != undefined){
        console.log('选择器改变',this.form.name)
       IndexClientselect({
        name:this.form.name
    }).then(res=>{
      console.log('获取的res.data ',res.data)
      this.form.door=res.data[0].department,
      this.form.post=res.data[0].post,
      this.form.employeeId=res.data[0].id
      console.log('获取姓名res',res.data)
     
     
    })
  }
    },
    focus(val){
         if(val != null && val != '' && val != undefined){
        IndexClientselect({
    
    }).then(res=>{
       console.log('name:+++++++++++',this.form.name)
      console.log(66666666,res.data)
       this.namevalue=res.data
      console.log('value',this.namevalue)
      this.form.dname=res.data.department,
      this.form.post=res.data.post,
      this.form.employeeId=res.data.id
 
    })
  }
    },
    	offSubmit() {
			this.dialogVisible = false;
		}
  },
  watch:{
    dialogVisible(val){
      if(val){
         
            if(this.switch==='add'){
              console.log("新增命令",this.$refs.form)
                // this.$nextTick(()=>{
                //  this.$refs['form'].resetFields()
                // })
            
         
            }
            else{
              console.log("修改命令")
            
            }
      }
    }
  },
  mounted(){
    IndexClientgetform({

    }).then(res=>{
      console.log('获取姓名',res.data)
      this.namevalue=res.data
      console.log('value',this.namevalue)
    })
  }
  
};
</script>

<style lang="less" scoped>
.transfer-footer {
	margin-left: 20px;
	padding: 6px 5px;
}
</style>