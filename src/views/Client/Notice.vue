<!--
 * @Author: your name
 * @Date: 2020-02-15 15:04:15
 * @LastEditTime: 2020-05-14 14:37:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\views\Client\Notice.vue
 -->
<template>
  <div class="AfterSchoolAffairs">
     <div class="search-area">
       <el-form :inline="true" :model="query" class="demo-form-inline">
      
         <el-form-item label="编号">
          <el-input v-model="query.id" placeholder="编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  icon="el-icon-search" @click="doQuery">查询</el-button>
          <el-button type="success" icon="el-icon-edit" @click="doNew">新增</el-button>
          <el-button  @click="doExport" icon="el-icon-upload2" >导出</el-button>
          <el-button  @click="doPrint" v-print="'#table-area'"  icon="el-icon-printer">打印</el-button>
        </el-form-item>
      </el-form>
     </div>
     <div class="table-area" >
       <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%"  :default-sort = "{prop: 'nid', order: 'descending'}" id="table-area" stripe border>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="序号"  width="70px">
          <template slot-scope="scope"> {{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column  prop="id" label="编号" sortable width="150"></el-table-column>
        <el-table-column  prop="createTime"  :formatter="formatDate" label="时间" width="180"></el-table-column>
        <el-table-column  prop="title" label="标题" ></el-table-column>
        <!-- <el-table-column prop="createId" label="发布人" width="150" ></el-table-column> -->
        <el-table-column prop="content" label="内容" ></el-table-column>
        <el-table-column  label="操作" width="300">
          <template slot-scope="scope">
            <!-- <el-button size="mini" round @click="doCheck(scope.row)">查看</el-button> -->
            <el-button size="mini" round type="success"  @click="doCheck(scope.row)">修改</el-button>&nbsp;&nbsp;
            <el-popconfirm :title="'是否确定删除'+scope.row.id+'？'" @onConfirm="doDelete(scope.row)">
            <el-button  slot="reference" size="mini" round type="danger" >删除</el-button>
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
    <notice-info ref="noticeInfo"></notice-info>
  </div>
</template>

<script>
import  NoticeInfo from '../Form/NoticeInfo'
import {Noticegetform,Noticeselect,Noticedel} from '@/http/api.js'
export default {
  name: 'Home',
  components:{
 NoticeInfo
  },
  data() {
    return {
      query:{
      
      },
      tableData:[],
      pagesize:10,
      currpage:1,
      currentPage:1, 
    }
  },
  methods:{
    //查询
    doQuery(){
      console.log('查询事件')
      Noticeselect(
       this.query
       ).then(res=>{
        console.log('恭喜你！查询成功')
        this.$message({message:'恭喜你！查询成功',type:'success'})
        this.tableData=res.data
      })
      
    },
    //新增
    doNew(){
       this.$refs.noticeInfo.dialogVisible = true
       this.$refs.noticeInfo.switch='add'
    },
    //导出Excel
    doExport(){
        import("@/vendor/Export2Excel").then(excel => {

        //表格的表头列表

        const tHeader = [ "编号", "时间","标题","发布人","内容"];

        //与表头相对应的数据里边的字段

        const filterVal = ["id","createTime","title","createId",'content', ];

        const list = this.tableData;

        const data = this.formatJson(filterVal, list);

        //这里还是使用export_json_to_excel方法比较好，方便操作数据

        excel.export_json_to_excel(tHeader,data,'公告表');

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
      
          this.value1= new Date(value.createTime);//value.createdTime是prop绑定的字段名称
          let dateValue = this.$moment(this.value1).format("YYYY-MM-DD ");//$moment专门转化时间的插件（使用时需要下载引入）
          return dateValue
      },
    //修改
    doCheck(row){
       this.$refs.noticeInfo.dialogVisible = true
       this.$refs.noticeInfo.notice= row
       this.$refs.noticeInfo.switch='update'
    },
    //删除
    doDelete(row){
      console.log('删除事件')
      Noticedel({
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
  mounted(){
    console.log('页面加载')
    Noticegetform({

    }).then(res=>{
      this.tableData=res.data
      console.log('页面加载成功')
    })
  }
}
</script>
