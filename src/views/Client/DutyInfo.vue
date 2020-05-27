<template>
  <div class="DutyInfo">
     <div class="search-area">
       <el-form :inline="true" :model="query" class="demo-form-inline"  :default-sort = "{prop: 'dutydate', order: 'descending'}">
        <!-- <el-form-item label="员工ID">
          <el-input v-model="query.user" placeholder="ID"></el-input>
        </el-form-item> -->
         <el-form-item label="员工姓名">
          <el-input v-model="query.user" placeholder="姓名"></el-input>
        </el-form-item>
         <el-form-item label="员工部门">
          <el-select v-model="query.door" placeholder="请选择">
             <el-option v-for="item in department" :key="item.id" :label="item.name"  :value="item.id" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  icon="el-icon-search" @click="doQuery">查询</el-button>
          <el-button type="success" icon="el-icon-edit" @click="doNew"  v-if="isAdmin" >新增</el-button>
          <el-button  @click="doExport" icon="el-icon-upload2" >导出</el-button>
          <el-button  @click="doPrint" v-print="'#table-area'"  icon="el-icon-printer">打印</el-button>
        </el-form-item>
      </el-form>
     </div>
     <div class="table-area">
   <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%"  :default-sort = "{prop: 'dutyDate', order: 'descending'}"  id="table-area"  stripe border>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="序号"  width="70px">
          <template slot-scope="scope"> {{scope.$index+1}}</template>
       </el-table-column>
        <el-table-column prop="id" label="编号" width="130" sortable></el-table-column>
        <el-table-column  prop="dutyDate" sortable   :formatter="formatDate"  label="日期" width="180"></el-table-column>
        <el-table-column  prop="door" label="部门" width="180"></el-table-column>
        <el-table-column  prop="bossname" label="值班队长" width="180"></el-table-column>
        <el-table-column prop="user"   label="值班人员" ></el-table-column>
        <el-table-column  label="操作" width="300">
          <!-- <el-button type="text">查看</el-button>
          <el-button type="text">修改</el-button>
          <el-button type="text">删除</el-button> -->
          <template slot-scope="scope">
            <!-- <el-button size="mini" round @click="doCheck(scope.row)" >查看</el-button> -->
            <el-button size="mini" round type="success"  @click="doCheck(scope.row)"  v-if="isAdmin"  >修改</el-button>&nbsp;&nbsp;
            <el-popconfirm :title="'是否确定删除'+scope.row.id+'？' " @onConfirm="doDelete(scope.row)"  >
              <el-button  slot="reference" size="mini" round type="danger"  v-if="isAdmin" >删除</el-button>
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
        <duty-form ref="dutyForm"> </duty-form>
  </div>
</template>

<script>
import DutyForm from '../Form/DutyForm'
import{DutyInfogetform,DutyInfodel, DutyInfoselect,getdepartment} from'@/http/api.js'
export default {
  name: 'Home',
  components:{
      DutyForm
  },
  data() {
    return {
   
      query:{
        user:'',
        status:''
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
       console.log('查询事件')
       DutyInfoselect(this.query).then(res=>{
        console.log('查询成功')
        this.tableData=res.data
        this.$message({message:'恭喜你！查询成功',type:'success'})
       
       })
      
    },
    doNew(){
     this.$refs.dutyForm.dialogVisible = true
     this.$refs.dutyForm.switch = 'add'
     
     
    },
    //时间格式化
  formatDate(value){
  
      this.value1= new Date(value.dutyDate);//value.createdTime是prop绑定的字段名称
      let dateValue = this.$moment(this.value1).format("YYYY-MM-DD ");//$moment专门转化时间的插件（使用时需要下载引入）
      return dateValue
  },
   //导出Excel
    doExport(){
        import("@/vendor/Export2Excel").then(excel => {

        //表格的表头列表

        const tHeader = [ "编号", "日期","部门","值班队长","人员"];

        //与表头相对应的数据里边的字段

        const filterVal = ["id","dutyDate","door","bossname",'user' ];

        const list = this.tableData;

        const data = this.formatJson(filterVal, list);

        //这里还是使用export_json_to_excel方法比较好，方便操作数据

        excel.export_json_to_excel(tHeader,data,'值班表');

      });
    },
     formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => { return v[j]}));
      },
      //打印
    doPrint(){
      
    },
    doCheck(row){   
      this.$refs.dutyForm.dialogVisible = true
      let form = Object.assign({},row) 
      form.user = JSON.parse( form.user )
      this.$refs.dutyForm.form = form
      this.$refs.dutyForm.switch = 'update'
    },
    doDelete(row){
      console.log('删除事件')
      DutyInfodel({
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
  computed:{
    isAdmin(){
      return this.$store.state.role===0
    }
  },
   mounted() {   
      // if(this.$store.state.role==='admin'){
      //   this.isadmin=false
      // }else{
      //   this.isadmin=true
      // }
       
      DutyInfogetform({
        //发送的data
      }).then(res=>{ //成功后回调
      console.log("页面加载成功")
        this.tableData=res.data
    
        
        // this.tableData.forEach((item,i)=>{
        //   console.log("遍历name数组并加,")
        //   item.name =  item.name.join(',')
          
        // })
        console.log(this.tableData)
      })
      
       //部门查询
    getdepartment({

     }).then(res=>{
    
       this.department=res.data
      this.$refs.dutyForm.department=res.data
     })
      
    }
}
</script>
