<template>
  <div class="IndexClient">
     <div class="search-area">
       <el-form :inline="true" :model="query" class="demo-form-inline">
       
         <el-form-item label="外卖人员姓名">
          <el-input v-model="query.name" placeholder="姓名"></el-input>
        </el-form-item>
         <el-form-item label="进出门岗">
          <el-select v-model="query.door"  clearable placeholder="请选择">
             <el-option    v-for="item in department"  :key="item.id"  :value="item.name"   :label="item.name"></el-option>
          </el-select>
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
      <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%"  :default-sort = "{prop: 'wid', order: 'descending'}" id="table-area" stripe border>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="序号"  width="70px">
        <template slot-scope="scope"> {{scope.$index+1}}</template>
       </el-table-column>
        <el-table-column  prop="id" label="编号" sortable  width="180"></el-table-column>
        <el-table-column  prop="time" label="日期" :formatter="formatDate"  width="180"></el-table-column>
        <el-table-column  prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column  prop="entryTime" label="进入时间" width="180"></el-table-column>
        <el-table-column  prop="door" label="门岗" width="180"></el-table-column>
        <el-table-column prop="cardId" label="身份证号" ></el-table-column>
        <el-table-column  prop="endTime" label="出去时间" width="180"></el-table-column>
        <el-table-column prop="remarks" label="备注" ></el-table-column>
        <el-table-column  label="操作" width="300">
          <!-- <el-button type="text">查看</el-button>
          <el-button type="text">修改</el-button>
          <el-button type="text">删除</el-button> -->
          <template slot-scope="scope">
            <!-- <el-button size="mini" round @click="doCheck(scope.row)">查看</el-button> -->
            <el-button size="mini" round type="success"  @click="doCheck(scope.row)">修改</el-button>&nbsp;&nbsp;
            <el-popconfirm :title="'是否确定删除'+scope.row.name+'？'" @onConfirm="doDelete(scope.row)">
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
     <!-- <people-info ref="adminInfoDlg"></people-info> -->
     <take-out-info ref="takeOutInfo"></take-out-info>
  </div>
</template>

<script>
import TakeOutInfo from '../Form/TakeOutInfo'
import {TakeOUtgetform,TakeOUtselect,TakeOUtdel,getdepartment} from '@/http/api.js'
export default {
  name: 'Home',
  components:{
    TakeOutInfo
  },
  data() {
    return {
      query:{
        wcard_id:'',
        wname:'',
        dname:'',
      },
      department:[],
       tableData:[],
      pagesize:10,
      currpage:1,
      currentPage:1, 
    }
  },
  methods:{
    //查询
    doQuery(){
      
      console.log("查询事件")
      TakeOUtselect(
        this.query
      ).then(res=>{
        this.tableData=res.data
        console.log('查询成功')
        this.$message({message:'查询成功', type:'success'})
      })

    },
    //新增
    doNew(){
       this.$refs.takeOutInfo.dialogVisible = true
       this.$refs.takeOutInfo.switch='add'
     
    },
    //导出Excel
    doExport(){
        import("@/vendor/Export2Excel").then(excel => {

        //表格的表头列表

        const tHeader = ["编号","日期", "姓名","进入时间","门岗","身份证号","出去时间","备注"];

        //与表头相对应的数据里边的字段

        const filterVal = ["id","time","name","entryTime","door","cardId","endTime", "remarks"];

        const list = this.tableData;

        const data = this.formatJson(filterVal, list);

        //这里还是使用export_json_to_excel方法比较好，方便操作数据

        excel.export_json_to_excel(tHeader,data,'外卖员表');

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
      
          this.value1= new Date(value.time);//value.createdTime是prop绑定的字段名称
          let dateValue = this.$moment(this.value1).format("YYYY-MM-DD ");//$moment专门转化时间的插件（使用时需要下载引入）
          return dateValue
      },
    //修改
    doCheck(row){
       this.$refs.takeOutInfo.dialogVisible = true
       this.$refs.takeOutInfo.takeOut = row
        this.$refs.takeOutInfo.switch='update'
    },
    //删除
    doDelete(row){
      console.log('删除事件')
      TakeOUtdel({
        id:row.id
      }).then(res=>{
        console.log('删除成功')
         this.$message({showClose: true,message: '删除'+row.wname+'成功！', type: 'success' })
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
    console.log('页面加载')
    TakeOUtgetform({

    }).then(res=>{
      console.log('页面加载完成')
      this.tableData =res.data
      this.$refs.takeOutInfo.dname =res.dname

    })
    //部门查询
    getdepartment({

    }).then(res=>{
    this.department=res.data
    this.$refs.takeOutInfo.dname = res.data
    })
}
}
</script>
