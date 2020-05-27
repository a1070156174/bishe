<template>
  <div class="AminInfo">
     <div class="search-area">
       <el-form :inline="true" :model="query" class="demo-form-inline">
        <el-form-item label="管理员ID">
          <el-input v-model="query.id" placeholder="ID"></el-input>
        </el-form-item>
         <el-form-item label="管理员姓名">
          <el-input v-model="query.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  icon="el-icon-search" @click="doQuery">查询</el-button>
          <el-button type="success" icon="el-icon-edit" @click="doNew">新增</el-button>
          <el-button  @click="doExport" icon="el-icon-upload2" >导出</el-button>
          <el-button  @click="doPrint"  v-print="'#table-area'"  icon="el-icon-printer">打印</el-button>
        </el-form-item>
      </el-form>
     </div>
     <div class="table-area">
 
      <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%"  id="table-area"   :default-sort = "{prop: 'adminid', order: 'descending'}"  stripe border>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="序号"  width="70px">
          <template slot-scope="scope"> {{scope.$index+1}}</template>
       </el-table-column>
        <el-table-column  prop="id" label="ID" width="180"  sortable ></el-table-column>
        <el-table-column  prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="password" label="密码"   ></el-table-column>
        <el-table-column prop="createTime" label="注册时间" ></el-table-column>
        <el-table-column  label="操作" width="300">
          <!-- <el-button type="text">查看</el-button>
          <el-button type="text">修改</el-button>
          <el-button type="text">删除</el-button> -->
          <template slot-scope="scope">
            <!-- <el-button size="mini" round @click="doCheck(scope.row)">查看</el-button> -->
            <el-button size="mini" round type="success"  @click="doCheck(scope.row)">修改</el-button>&nbsp;&nbsp;
            <el-popconfirm :title="'是否确定删除'+scope.row.username+'？'" @onConfirm="doDelete(scope.row)">
              <el-button  slot="reference" size="mini" round type="danger" >删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" 	:total="tableData.length" class="lc-pagination"></el-pagination>
     </div>
    <admin-info-form ref="adminInfoForm"> </admin-info-form>
  </div>
</template>

<script>
import AdminInfoForm from './AdminInfoForm.vue';
import axios from 'axios';
import {Admingetform,Adminselect,Admindel} from '@/http/api.js'
export default {
  name: 'Home',
  components : {
     AdminInfoForm
  },
  data() {
    return {
      query:{
      name:'',
      id:'',

        // user:'',
        // status:'1',
        
      },
 
     tableData:[],
      pagesize:20,
      currpage:1,
      currentPage:1, 
    }
  },
  methods:{
    //查询
    doQuery(){
      console.log('查询事件')
      Adminselect({
        id:this.query.id,
        username:this.query.name
      }).then(res=>{
        console.log('查询成功！',res)
        this.tableData = res.data
        //  this.tableData.id=res.data.id
        //  this.tableData.usernamename=res.data.username
        //  this.tableData.password=res.data.password
        //  this.tableData.createTime=res.data.createTime
        this.$message({message:'恭喜你！查询成功',type:'success'})
      })
    },
    doNew(){
       this.$refs.adminInfoForm.switch= 'add'
       this.$refs.adminInfoForm.dialogVisible = true
    },
     //导出Excel
    doExport(){
        import("@/vendor/Export2Excel").then(excel => {

        //表格的表头列表

        const tHeader = [ "id", "管理员","注册时间"];

        //与表头相对应的数据里边的字段

        const filterVal = ["id","username","createTime",];

        const list = this.tableData;

        const data = this.formatJson(filterVal, list);

        //这里还是使用export_json_to_excel方法比较好，方便操作数据

        excel.export_json_to_excel(tHeader,data,'管理员表');

      });
    },
     formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => { return v[j]}));
      },
      //打印
    doPrint(){
      
    },
    doCheck(row){
      this.$refs.adminInfoForm.dialogVisible = true
      this.$refs.adminInfoForm.form = row
      this.$refs.adminInfoForm.switch= 'update'
    },
    doDelete(row){
     Admindel({
       id:row.id
     }).then(res=>{
       console.log('删除成功！')
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
  created(){
    console.log('页面加载')
    Admingetform({

    }).then(res=>{
      console.log('页面加载成功')
      console.log('页面加载的内容：',res.data)
      this.tableData = res.data  
      console.log('tableData:',this.tableData)
    })
  }
}
</script>
