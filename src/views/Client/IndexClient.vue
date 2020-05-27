<template  >
  <div class="IndexClient">
     <div class="search-area">
       <el-form :inline="true" :model="query" class="demo-form-inline">
        <el-form-item label="员工ID">
          <el-input v-model="query.id" placeholder="ID"></el-input>
        </el-form-item>
         <el-form-item label="员工姓名">
          <el-input v-model="query.name" placeholder="姓名"></el-input>
        </el-form-item>
         <!-- <el-form-item label="员工部门">
          <el-select v-model="query.status" clearable placeholder="请选择">
             <el-option v-for="item in department" :key="item.id" :label="item.name"  :value="item.id" ></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary"  icon="el-icon-search" @click="doQuery">查询</el-button>
          <el-button type="success" icon="el-icon-edit" @click="doNew"  v-if="isAdmin">新增</el-button>
          <el-button  @click="doExport" icon="el-icon-upload2" >导出</el-button>
          <el-button  @click="doPrint"  v-print="'#table-area'"  icon="el-icon-printer">打印</el-button>
        </el-form-item>
      </el-form>
     </div>
     <div class="table-area"  >
       <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%"  id="table-area"   :default-sort = "{prop: 'id', order: 'descending'}"  stripe border>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="序号"  width="70px">
          <template slot-scope="scope"> {{scope.$index+1}}</template>
       </el-table-column>
        <el-table-column  prop="id" label="ID"   width="180" sortable></el-table-column>
        <el-table-column  prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="department" label="部门" ></el-table-column>
        <el-table-column prop="post" label="岗位" ></el-table-column>
         <el-table-column prop="phone" label="电话" ></el-table-column>
         <el-table-column prop="age" label="年龄" ></el-table-column>
        <el-table-column  label="操作" width="300">
          <template slot-scope="scope">
            <el-button size="mini" round @click="doCheck(scope.row)">查看</el-button>
            <el-button size="mini" round type="success"  @click="doupdate(scope.row)" v-if="isAdmin">修改</el-button>&nbsp;&nbsp;
            <el-popconfirm :title="'是否确定删除'+scope.row.name+'？'" @onConfirm="doDelete(scope.row)">
              <el-button  slot="reference" size="mini" round type="danger" v-if="isAdmin"  >删除</el-button>
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
     <index-info ref="indexInfo"></index-info>
  </div>
</template>

<script>
import IndexInfo from '../Form/IndexInfo';
import {IndexClientgetform,IndexClientselect,IndexClientadd,IndexClientdel,IndexClientupdate,getdepartment} from'@/http/api.js';
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components:{
    IndexInfo
  },
  data() {
    return {
      department:[],
      query:{
        user:'',
        name:"",
        status:''
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
          IndexClientselect({ 
          id:this.query.id,
          name:this.query.name ,
         
    }).then( res=> {
            console.log('查询成功')
            this.tableData=res.data
            this.$message({message:'恭喜你！查询成功',type:'success'})
            
        }) 
      console.log("查询内容：",this.query)
         
    },
    //新增按钮
    doNew(){    
    
      this.$refs.indexInfo.dialogVisible = true
      this.$refs.indexInfo.tabledisabled = false
      this.$refs.indexInfo.switch = 'add'
    },
  
    //修改按钮
    doupdate(row){
      this.$refs.indexInfo.switch = 'update'
      this.$refs.indexInfo.dialogVisible = true
      this.$refs.indexInfo.tabledisabled = false
      this.$refs.indexInfo.form = row
    },
    //查看按钮
    doCheck(row){

      this.$refs.indexInfo.dialogVisible = true
      this.$refs.indexInfo.tabledisabled = true
      this.$refs.indexInfo.form = row



    },
    //删除按钮
    doDelete(row){
      console.log('删除事件')
      IndexClientdel({
        id:row.id
      }).then(res=>{
        console.log('删除成功')
        this.$message({message:'恭喜你！删除成功',type:'success'})
        this.doQuery()
      })
    },
     doExport(){
        import("@/vendor/Export2Excel").then(excel => {

        //表格的表头列表

        const tHeader = [ "ID","姓名","部门","岗位","电话","年龄","面貌","地址" ,"邮箱",'微信'];

        //与表头相对应的数据里边的字段

        const filterVal = ["id","name","department","post", 'phone','age','face','address','email','wechat'];

        const list = this.tableData;

        const data = this.formatJson(filterVal, list);

        //这里还是使用export_json_to_excel方法比较好，方便操作数据

        excel.export_json_to_excel(tHeader,data,'个人信息表');

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
  mounted(){
    //页面渲染加载
    //用token 请求头 发送请求 让后台解析token识别用户信息 并返回值
    
 IndexClientgetform({ 
    }).then( res=> {
       console.log(res)
            this.tableData=res.data
            console.log(res)   
        }) 
    
   
   //部门查询
    getdepartment({

     }).then(res=>{
       this.department=res.data
     })
          
  },
}
</script>
