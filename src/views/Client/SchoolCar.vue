<template>
  <div class="IndexClient">
     <div class="search-area">
       <el-form :inline="true" :model="query" class="demo-form-inline">
        <el-form-item label="编号">
          <el-input v-model="query.id" placeholder="ID"></el-input>
        </el-form-item>
         <el-form-item label="姓名">
          <el-input v-model="query.owner" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  icon="el-icon-search" @click="doQuery">查询</el-button>
          <el-button type="success" icon="el-icon-edit" @click="doNew">新增</el-button>
          <el-button  @click="doExport" icon="el-icon-upload2" >导出</el-button>
          <el-button  @click="doPrint" v-print="'#table-area'"  icon="el-icon-printer">打印</el-button>
        </el-form-item>
      </el-form>
     </div>
     <div class="table-area">
      <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"  style="width: 100%"  :default-sort = "{prop: 'scid', order: 'descending'}" id="table-area" stripe border>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="序号"  width="70px">
          <template slot-scope="scope"> {{scope.$index+1}}</template>
       </el-table-column>
        <el-table-column  prop="id" label="编号"  sortable  width="180"></el-table-column>
        <el-table-column  prop="scentryTime" label="注册时间" sortable width="180"></el-table-column>
        <el-table-column  prop="owner" label="姓名" width="180"></el-table-column>
        <el-table-column  prop="unit" label="单位" width="180"></el-table-column>
        <el-table-column prop="carId" label="车牌号" ></el-table-column>
        <el-table-column  prop="phone" label="联系方式" width="180"></el-table-column>
        <el-table-column  prop="remarks" label="备注" width="180"></el-table-column>
        <el-table-column  label="操作" width="300">
          <!-- <el-button type="text">查看</el-button>
          <el-button type="text">修改</el-button>
          <el-button type="text">删除</el-button> -->
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
     <school-car-info ref="schoolCarInfo"></school-car-info>
  </div>
</template>

<script>
import SchoolCarInfo from '../Form/SchoolCarInfo'
import {SchoolCargetform,SchoolCarselect,SchoolCardel} from '@/http/api.js'
export default {
  name: 'Home',
  components:{
    SchoolCarInfo
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
      SchoolCarselect(
       this.query
      ).then(res=>{
        console.log('查询成功')
        this.tableData=res.data
        this.$message({message:'恭喜你!查询成功',type:'success'})
      })
    },
    //新增
    doNew(){
        this.$refs.schoolCarInfo.dialogVisible = true
        this.$refs.schoolCarInfo.switch='add'
    },
    //导出Excel
    doExport(){
        import("@/vendor/Export2Excel").then(excel => {

        //表格的表头列表

        const tHeader = [ "编号","注册时间","姓名","单位","车牌号","电话","备注"];

        //与表头相对应的数据里边的字段

        const filterVal = ["id","scentryTime","owner","unit","carId","phone", "remarks"];

        const list = this.tableData;

        const data = this.formatJson(filterVal, list);

        //这里还是使用export_json_to_excel方法比较好，方便操作数据

        excel.export_json_to_excel(tHeader,data,'校内车辆表');

      });
    },
     formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => { return v[j]}));
      },
      //打印
    doPrint(){
      
    },
    //修改
    doCheck(row){ 
       this.$refs.schoolCarInfo.dialogVisible = true
       this.$refs.schoolCarInfo.schoolcar = row
        this.$refs.schoolCarInfo.switch='update'
       
    },
    //删除
    doDelete(row){
      console.log('删除操作')
      SchoolCardel({
        id:row.id
      }).then(res=>{
        console.log('删除成功')
        this.$message({showClose: true, message: '删除'+row.scarname+'成功！',  type: 'success' })
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
    //页面加载
    console.log('页面加载成功')
    SchoolCargetform({

    }).then(res=>{
      this.tableData=res.data
      console.log('页面加载成功')
    })

  }
}
</script>
