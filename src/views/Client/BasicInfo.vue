<template>
  <div class="IndexClient">
     <div class="search-area">
       <el-form :inline="true" :model="query" class="demo-form-inline">
        <el-form-item label="员工ID">
          <el-input v-model="query.employeeId" placeholder="ID"></el-input>
        </el-form-item>
         <el-form-item label="员工姓名">
          <el-input v-model="query.name" placeholder="姓名"></el-input>
        </el-form-item>
         <!-- <el-form-item label="员工部门">
          <el-select v-model="query.status"  clearable placeholder="请选择">
               <el-option v-for="item in department" :key="item.id" :label="item.name"  :value="item.id" ></el-option>      
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary"  icon="el-icon-search" @click="doQuery">查询</el-button>
          <el-button type="success" icon="el-icon-edit"  @click="doNew">新增</el-button>
          <el-button  @click="doExport" icon="el-icon-upload2" >导出</el-button>
          <el-button  @click="doPrint"  v-print="'#table-area'"  icon="el-icon-printer">打印</el-button>
        </el-form-item>
      </el-form>
     </div>
     <div class="table-area">
       <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%"  :default-sort = "{prop: 'id', order: 'descending'}"   id="table-area"  stripe border>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="序号"  width="70px">
          <template slot-scope="scope"> {{scope.$index+1}}</template>
       </el-table-column>
        <el-table-column  prop="id" label="工资编号" sortable width="180"></el-table-column>
        <el-table-column  prop="startTime" label="日期" :formatter="formatDate"  width="150"  sortable></el-table-column>
        <el-table-column  prop="employeeId" label="ID" width="180"></el-table-column>
        <el-table-column  prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column  prop="door" label="部门" width="100"></el-table-column>
        <el-table-column  prop="post" label="岗位" width="150"></el-table-column>
        <el-table-column  prop="basicsSalary" label="基本工资" width="100"></el-table-column>
        <el-table-column  prop="late" label="迟到罚款" width="100"></el-table-column>
        <el-table-column  prop="bonus" label="奖金抽成" width="100"></el-table-column>
        <el-table-column  prop="tax" label="个人所得税" width="100"></el-table-column>
        <el-table-column prop="salary" label="实际工资" ></el-table-column>
        <el-table-column  label="操作"  v-if="isAdmin" >
          <template slot-scope="scope" >
            <!-- <el-button size="mini" round @click="doCheck(scope.row)" >查看</el-button> -->
            <el-button size="mini" round type="success"  @click="doCheck(scope.row)"  >修改</el-button>&nbsp;&nbsp;
            <el-popconfirm :title="'是否确定删除'+scope.row.id+'？'" @onConfirm="doDelete(scope.row)">
              <el-button  slot="reference" size="mini" round type="danger"  >删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
     <el-pagination background class="lc-pagination"
			layout="prev, pager, next, sizes, total, jumper"
			:page-sizes="[5, 10, 15, 20]"
			:page-size="pagesize"
			:total="tableData.length"
			@current-change="handleCurrentChange" 
			@size-change="handleSizeChange" 
			>
		</el-pagination>
     </div>
     <basic-form ref="basicForm"></basic-form>
  </div>
  
</template>

<script>
import BasicForm from '../Form/BasicForm'
import { mapState } from 'vuex'
import {BasicInfogetform,BasicInfoselect,BasicInfoadd,BasicInfodel,BasicInfoupdate ,getdepartment}from'@/http/api.js'
export default {
  name: 'Home',
 components:{
   BasicForm
 },
  data() {
    return {
      query:{
        id:'',
        status:[],
        name:'',
      },
      
     tableData:[],
      pagesize:20,
      currpage:1,
      currentPage:1, 
        department:[],
    
      
    }
  },
  methods:{
    doQuery(){
       //查询
       console.log('查询事件')
          BasicInfoselect(
            this.query
    ).then( res=> {
            console.log('查询成功')
            this.tableData=res.data
            this.$message({message:'恭喜你！查询成功',type:'success'})
          
        }) 
      console.log("查询内容：",this.query)

    },
    //新增
    doNew(){
      this.$refs.basicForm.switch='add'
      this.$refs.basicForm.dialogVisible = true
      
    },
   //导出Excel
    doExport(){
        import("@/vendor/Export2Excel").then(excel => {

        //表格的表头列表

        const tHeader = [ "工资编号", "日期","ID","姓名","部门","岗位","基本工资","迟到罚款","奖金抽成","个人所得税","实际工资"];

        //与表头相对应的数据里边的字段

        const filterVal = ["id","startTime","employeeId","name",'door',"post","basicsSalary","late","bonus","tax","salary" ];

        const list = this.tableData;

        const data = this.formatJson(filterVal, list);

        //这里还是使用export_json_to_excel方法比较好，方便操作数据

        excel.export_json_to_excel(tHeader,data,'工资表');

      });
    },
     formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => { return v[j]}));
      },
      //打印
    doPrint(){
      
    },
     //时间格式化
    formatDate(value){
    
        this.value1= new Date(value.startTime);//value.createdTime是prop绑定的字段名称
        let dateValue = this.$moment(this.value1).format("YYYY-MM-DD ");//$moment专门转化时间的插件（使用时需要下载引入）
        return dateValue
    },
    //修改
    doCheck(row){
      this.$refs.basicForm.switch='update'
      this.$refs.basicForm.dialogVisible = true
      this.$refs.basicForm.form = row
      
    },
    //删除
    doDelete(row){
        console.log('删除事件')
        BasicInfodel({
         id:row.id
        }).then(res=>{
          console.log('删除成功')
          this.$message({message:'恭喜你！删除成功',type:'success'})
          this.doQuery()
        })
    },
     handleSizeChange: function (size) {
                this.pagesize = size;
                 //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                //点击第几页
        },

    
  }, 
   computed: {
      ...mapState([
        // 映射 this.count 为 store.state.count
        'userInfo',
        'role'
      ]),
      isAdmin(){
       
        return  this.role===0
      },
      
    },

  //页面加载表单
    mounted(){
      console.log('页面加载')
      BasicInfogetform({
        //发送的data
      }).then(res=>{ //成功后回调
      console.log("页面加载成功",res.data)
        this.tableData=res.data
        this.$refs.basicForm.namevalue=res.namevalue
       
      })
      //部门查询
        getdepartment({

        }).then(res=>{
            this.department=res.data
        })

    }
  
}
</script>
