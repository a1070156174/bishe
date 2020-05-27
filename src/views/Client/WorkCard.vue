<template>
    <div class="WorkCard">
      
      <div class="search-area">
        <el-form :inline="true" :model="query" class="demo-form-inline">
        
          <el-form-item label="ID编号">
            <el-input v-model="query.id"  placeholder="编号"></el-input>
          </el-form-item>
          <el-form-item >
            <el-button type="primary"  icon="el-icon-search" @click="doQuery">查询</el-button>
            <!-- <el-button type="success" icon="el-icon-edit"   @click="doNew">新增</el-button> -->
            <el-button  @click="doExport" icon="el-icon-upload2" >导出</el-button>
             <el-button  @click="doPrint" v-print="'#table-area'"  icon="el-icon-printer">打印</el-button>
          </el-form-item>
        </el-form>
        <el-form style="text-align: center;"  >
           <el-button type="primary" @click="gowork()" >上班 </el-button>
        </el-form>
      </div>
       <div class="worktable">
            <el-table   :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"   id="table-area"    border   style="width: 100%"  :default-sort = "{prop: 'id', order: 'descending'}">  
              <el-table-column type="selection" width="55"></el-table-column>
               <el-table-column label="序号"  width="70px">
                 <template slot-scope="scope"> {{scope.$index+1}}</template>
              </el-table-column>
              <el-table-column  prop="id"  label="编号" sortable></el-table-column>
              <el-table-column  prop="createTime"  label="日期" :formatter="formatDate"   sortable></el-table-column>
              <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
              <el-table-column prop="employeeId" label="ID" width="120"></el-table-column>
              <!-- <el-table-column prop="door" label="部门"  width="120"></el-table-column> -->
              <el-table-column  prop="workShift" label="上班时间" width="300" align="conter" ></el-table-column>
              <el-table-column prop="closingTime" label="下班时间"   width="300"></el-table-column>
              <!-- <el-table-column prop="remarks" label="备注"   width="300"></el-table-column> -->
              <el-table-column  fixed="right"  label="操作"  >
                  <template slot-scope="scope">
                    <!-- <el-button  type="primary"  v-model="update" size="80px" v-if="adminon"   round>修改</el-button> -->
                     <el-button type="primary" @click="handleClick(scope.row)" >下班 </el-button>
                     <el-popconfirm :title="'是否确定删除'+scope.row.id+'？'" @onConfirm="doDelete(scope.row)">
              <el-button  slot="reference" size="mini" round type="danger" >删除</el-button>
            </el-popconfirm>
                  </template>
              </el-table-column>
            </el-table>
       </div>
         <!-- 分页 -->
       <div class="pag">  
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
      <work-card-info ref="workCardInfo"></work-card-info>
    </div>
</template>

<script>
import WorkCardInfo from '../Form/WorkCardInfo'
import {WorkCardgetform,WorkCardselect,WorkCardadd,WorkCardupdate,WorkCarddel} from '@/http/api.js'
  // inject: ['reload']
    export default {
    inject: ['reload'],
    components:{
        WorkCardInfo
    },
    data() {
      return {
        query:{
          date:'',
          id:'',
        },
        tableData:[],
      pagesize:8,
      currpage:1,
      currentPage:1, 
      }
    }, 
    methods: {
      //下班
      handleClick(row) {
        let closing_time= new Date()
          WorkCardupdate({
          employeeId:row.employeeId,
          workShift:row.workShift,
          name:row.name,
          closingTime:closing_time,
          id:row.id
        }).then(res=>{
          this.$message({ message: '打卡成功', type: 'success'   })
          this.doQuery()
        })
      },
      
    //查询
      doQuery(){
       WorkCardselect(
          this.query
        ).then(res=>{
           this.tableData=res.data
           this.$message({ message: '查询成功', type: 'success'   });
        })
      },
      //上班
      gowork(){
        let work_shift =new Date()
        WorkCardadd({
          workShift:work_shift,
          name:this.$store.state.userInfo.username,
          employeeId:this.$store.state.userInfo.id
        }).then(res=>{
          this.$message({ message: '打卡成功', type: 'success'   });
          this.doQuery()
        })
      },

      doNew(){
        this.$refs.workCardInfo.dialogVisible = true
        this.$refs.workCardInfo.switch='add'
      },
      doDelete(row){
        WorkCarddel({
          id:row.id
        }).then(res=>{
           this.$message({ message: '删除成功', type: 'success'   })
           this.doQuery()
        })
      },
      //导出Excel
    doExport(){
        import("@/vendor/Export2Excel").then(excel => {

        //表格的表头列表

        const tHeader = [ "编号", "日期","姓名","ID","上班时间","下班时间"];

        //与表头相对应的数据里边的字段

        const filterVal = ["id","createTime","name","employeeId",'workShift',"closingTime" ];

        const list = this.tableData;

        const data = this.formatJson(filterVal, list);

        //这里还是使用export_json_to_excel方法比较好，方便操作数据

        excel.export_json_to_excel(tHeader,data,'考勤上班表');

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
     handleSizeChange: function (size) {
                this.pagesize = size;
             //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
               //点击第几页
        },

    


    },
    //页面渲染 加载
    mounted(){
      WorkCardgetform({}).then(res=>{
        this.tableData=res.data
      })
     

  }
    }
    
</script>

<style lang="less" scoped>
   
        // height: 200px;
        // width: 500px;
        // background-size: contain;
        // background-repeat: no-repeat;
        // background: url("'@/assets/cc.jpg'");
        // font-size: 70px;
        // font-weight: bold;
        // text-align: center;
        // color: transparent;
        // background-clip: text;
        // -webkit-text-fill-color: transparent;
 
   

</style>