<!--
 * @Author: your name
 * @Date: 2020-02-18 13:23:55
 * @LastEditTime: 2020-05-11 16:22:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\src\views\Management\AdminInfoForm.vue
 -->
<template >
    <div>
       <el-dialog title="员工信息" :visible.sync="dialogVisible"  width="680px">
        <el-form ref="form"    :disabled="tabledisabled"  label-width="80px" inline>
        <el-form-item label="Id">
          <el-input v-model="form.id"   placeholder="员工ID"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="员工姓名"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="form.department" placeholder="部门"></el-input>
        </el-form-item>
        <el-form-item label="岗位">
          <el-input v-model="form.post" placeholder="岗位"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age" placeholder="年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="form.sex" placeholder="性别"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.phone" placeholder="电话"></el-input>
        </el-form-item>

        <el-form-item label="地址">
          <el-input v-model="form.address" placeholder="地址"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item label="微信">
          <el-input v-model="form.wechat" placeholder="微信"></el-input>
        </el-form-item>
        <el-form-item label="面貌">
          <el-input v-model="form.face" placeholder="面貌"></el-input>
        </el-form-item>
        <el-form-item label="入职时间">
            <el-date-picker v-model="form.entryTime" type="date"  value-format="yyyy-MM-dd"   style="width:196.42px"  placeholder="选择日期"> </el-date-picker>
        </el-form-item>
        <el-form-item label="密码">
          <el-input show-password v-model="form.password"  style="width:196.42px"    placeholder="密码"></el-input>
        </el-form-item>
  </el-form-item>
</el-form>
<div slot="footer">
  <el-button type="primary" @click="onSubmit" :disabled="tabledisabled">确定</el-button>
    <el-button @click="offSubmit">取消</el-button>
</div>
</el-dialog>
</div>
</template>
<script>
import { IndexClientupdate,IndexClientadd ,BasicInfogetid} from '@/http/api.js';
import { Indexclient } from '@/views/Client/IndexClient.vue';
export default {
	data() {
		return {
			dialogVisible: false,
      tabledisabled: false,
      switch:'',
			form: {
			
			}
		};
	},
	methods: {
    
		onSubmit() {
     
      if(this.switch=='add'){
        console.log('添加事件')
        console.log('添加的值：',this.form)
        IndexClientadd(this.form).then(res=>{
          this.dialogVisible = false
          this.$message({ message: '恭喜你！新增成功', type: 'success' })
          console.log("添加成功",)
          this.$parent.doQuery()
        })
      }
      else{	
        console.log("修改操作")
			  IndexClientupdate(
				 this.form
			).then(res => {
        this.dialogVisible = false
        this.$message({ message: '恭喜你！修改成功', type: 'success' })
        this.$parent.doQuery()
      })
     
      }
		},

		offSubmit() {
			this.dialogVisible = false;
		}
	}
};
</script>

<style lang="scss" scoped>
</style>