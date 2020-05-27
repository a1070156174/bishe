<template>
  <div class="BaoxiuInfo">
   
     <div class="search-area">
       <el-form :inline="true" :model="query" class="demo-form-inline">
        <el-form-item label="设备ID">
          <el-input v-model="query.id" placeholder="ID"></el-input>
        </el-form-item>
         <el-form-item label="设备">
          <el-input v-model="query.name" placeholder="设备"></el-input>
        </el-form-item>
         <el-form-item label="是否报修">
          <el-select v-model="query.repair" placeholder="请选择">
             <el-option value="是" ></el-option>
             <el-option value="否" ></el-option>
             <el-option value="" ></el-option>
 
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  icon="el-icon-search" @click="doQuery">查询</el-button>
          <!-- <el-button type="success" icon="el-icon-edit" @click="doNew">新增</el-button> -->
          <el-button  @click="doExport" icon="el-icon-upload2" >导出</el-button>
          <el-button  @click="doPrint" icon="el-icon-printer"  v-print="'#table-area'"  >打印</el-button>
        </el-form-item>
      </el-form>
     </div>
     <div class="table-area">
     <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%"  :default-sort = "{prop: 'id', order: 'descending'}"   id="table-area"  stripe border>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="序号"  width="70px">
          <template slot-scope="scope"> {{scope.$index+1}}</template>
       </el-table-column>
        <!-- <el-table-column  prop="id" label="编号" width="180"></el-table-column> -->
        <el-table-column  prop="time" label="日期" sortable :formatter="formatDate" width="180"></el-table-column>
        <el-table-column  prop="id" sortable label="设备id" width="180"></el-table-column>
        <el-table-column prop="name" label="设备名称"  width="130"></el-table-column>
        <el-table-column prop="door" label="所属门岗"  width="130"></el-table-column>
        <el-table-column prop="repair" label="是否报修"  width="50"></el-table-column>
        <el-table-column prop="fix" label="上报状态"  width="150"></el-table-column>
        <el-table-column prop="notes" label="故障描述" ></el-table-column>
        
        <el-table-column  label="操作" width="300">
          <template slot-scope="scope">
            <el-button size="mini" type="success"     round  @click="doCheck(scope.row)">处理</el-button>
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
     <baoxiu-Info ref="baoxiuInfo"></baoxiu-Info >
  </div>
</template>

<script>
 import  BaoxiuInfo from '../Form/BaoxiuInfo.vue'
 import {Equipmentgetform,Baoxiuselect} from '@/http/api.js'
export default {
  name: 'Home',
  components:{
    BaoxiuInfo
  },
  data() {
    return {
      query:{},
     tableData:[],
      pagesize:20,
      currpage:1,
      currentPage:1, 
    }
  },
  methods:{
   
    doQuery(){
     //查询
     console.log('查询事件')
     Baoxiuselect(this.query).then(res=>{
       this.tableData=res.data
       this.$message({message:'恭喜你!查询成功',type:'success'})
     })
    },
    doNew(){

    },
    //导出
   doExport(){
        import("@/vendor/Export2Excel").then(excel => {

        //表格的表头列表

        const tHeader = [ "日期", "设备id","设备名称","所属门岗" ,"是否报修","上报状态" ,"故障描述"];

        //与表头相对应的数据里边的字段

        const filterVal = ["time","id","name","door",'repair', 'fix','notes'];

        const list = this.tableData;

        const data = this.formatJson(filterVal, list);

        //这里还是使用export_json_to_excel方法比较好，方便操作数据

        excel.export_json_to_excel(tHeader,data,'报修表');

      });
    },
     formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => { return v[j]}));
      },
    doPrint(){
      
    },
    doCheck(row){
      this.$refs.baoxiuInfo.dialogVisible = true
      this.$refs.baoxiuInfo.baoxiu = row
    },
    //时间格式化
    formatDate(value){
    
        this.value1= new Date(value.time);//value.createdTime是prop绑定的字段名称
        let dateValue = this.$moment(this.value1).format("YYYY-MM-DD ");//$moment专门转化时间的插件（使用时需要下载引入）
        return dateValue
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
    
  },
  mounted(){
    //页面加载
    console.log('页面加载')
    Equipmentgetform({

    }).then(res=>{
      console.log('页面加载成功！')
      this.tableData=res.data
    } )

  }
}
</script>
