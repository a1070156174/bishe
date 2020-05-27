<!--
 * @Author: your name
 * @Date: 2020-02-17 15:39:00
 * @LastEditTime: 2020-05-14 14:11:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\src\views\Management\Journal.vue
 -->
<template>
  <div class="Journal">
     <div class="search-area">
       <el-form :inline="true" :model="query" class="demo-form-inline">
        <!-- <el-form-item label="时间">
           <el-date-picker v-model="value1" type="date" placeholder="选择日期"> </el-date-picker>
        </el-form-item>
         <el-form-item label="操作人员">
          <el-input v-model="query.user" placeholder="name"></el-input>
        </el-form-item>
        <el-form-item> -->
         
          <el-button  @click="doExport" icon="el-icon-upload2" >导出</el-button>
          <el-button  @click="doPrint" icon="el-icon-printer" v-print="'#table-area'" >打印</el-button> 
        </el-form-item>
      </el-form>
     </div>
     <div class="table-area">
     <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%"  :default-sort = "{prop: 'updateTime', order: 'ascending'}"  id="table-area"  stripe border>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="序号"  width="70px">
          <template slot-scope="scope"> {{scope.$index+1}}</template>
       </el-table-column>
        <el-table-column  prop="id" label="编号"  sortable  width="180"></el-table-column>
        <el-table-column  prop="updateTime" label="时间" width="180"></el-table-column>
        <el-table-column prop="userName" label="操作人" width="180" ></el-table-column>
        <el-table-column prop="url" label="路径" ></el-table-column>
        <el-table-column prop="method" label="请求方式" ></el-table-column>
        <el-table-column prop="params" label="参数" ></el-table-column>
        <el-table-column prop="operation" label="操作行为" ></el-table-column>
        <el-table-column prop="exception" label="异常信息" ></el-table-column>
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

  </div>
</template>

<script>
import {Journalgetform} from '@/http/api.js'
export default {
  name: 'Home',
 
  data() {
    return {
      query:{
        user:'',
        status:'1'
      },
      tableData:[],
      pagesize:20,
      currpage:1,
      currentPage:1, 
    }
  },
  methods:{
    //导出
   doExport(){
        import("@/vendor/Export2Excel").then(excel => {

        //表格的表头列表

        const tHeader = [ "编号", "时间","操作人","路径","请求方式","参数","操作行为","异常信息"];

        //与表头相对应的数据里边的字段

        const filterVal = ["id","updateTime","userName","url","method","params","operation","exception"];

        const list = this.tableData;

        const data = this.formatJson(filterVal, list);

        //这里还是使用export_json_to_excel方法比较好，方便操作数据

        excel.export_json_to_excel(tHeader,data,'日志表');

      });
    },
     formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => { return v[j]}));
      },
      //打印
    doPrint(){
      
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
  mounted(){
    Journalgetform({

    }).then(res=>{
      this.tableData=res.data
    })
  }
}
</script>
