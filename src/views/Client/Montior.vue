<!--
 * @Author: your name
 * @Date: 2020-02-15 15:04:15
 * @LastEditTime: 2020-05-14 16:24:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\views\Client\Notice.vue
 -->
<template>
  <div class="Montior">
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
     <div class="table-area">
       <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"style="width: 100%"  :default-sort = "{prop: 'nid', order: 'descending'}" id="table-area" stripe border>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="序号"  width="70px">
          <template slot-scope="scope"> {{scope.$index+1}}</template>
       </el-table-column>
        <el-table-column  prop="id" label="编号" sortable width="150"></el-table-column>
        <el-table-column prop="name" label="设备名字" width="150" ></el-table-column>
        <el-table-column  prop="time" label="购买日期" width="180"></el-table-column>
        <el-table-column  prop="door" label="所属门岗" ></el-table-column>
        <el-table-column  prop="person" label="负责人" ></el-table-column>
        <el-table-column  prop="status" label="状态 " ></el-table-column>
        <el-table-column prop="open" label="开关" width="150" >
          <template slot-scope="scope">
           <el-switch v-model="scope.row.open" active-text="开" inactive-text="关" active-value="true"  inactive-value="flash" @change="ChangeSwitch($event,scope.row,scope.row.id)" > </el-switch>
          </template>
        </el-table-column>
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
    <montior-info ref="montiorInfo"></montior-info>
  </div>
</template>

<script>
import MontiorInfo from '../Form/MontiorInfo'
import {Montiorgetform,Montiorselect,Montiordel,Montiorswitchupdate} from '@/http/api.js'
export default {
  name: 'Home',
  components:{
MontiorInfo
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
     Montiorselect(this.query).then(res=>{
        console.log('恭喜你！查询成功')
        this.$message({message:'恭喜你！查询成功',type:'success'})
        this.tableData=res.data
      }) 
    },
    //新增
    doNew(){
       this.$refs.montiorInfo.dialogVisible = true
       this.$refs.montiorInfo.switch='add'
    },
     //导出Excel
    doExport(){
        import("@/vendor/Export2Excel").then(excel => {

        //表格的表头列表

        const tHeader = [ "编号","设备名", "时间","门岗","负责人","状态","开关"];

        //与表头相对应的数据里边的字段

        const filterVal = ["id","name","time","door",'person',"status" ,"open"];

        const list = this.tableData;

        const data = this.formatJson(filterVal, list);

        //这里还是使用export_json_to_excel方法比较好，方便操作数据

        excel.export_json_to_excel(tHeader,data,'监控设备表');

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
       this.$refs.montiorInfo.dialogVisible = true
       this.$refs.montiorInfo.montior= row
       this.$refs.montiorInfo.switch='update'
    },
    //删除
    doDelete(row){
      console.log('删除事件')
     Montiordel(
      {
        id:row.id
      }  
      ).then(res=>{
        console.log('删除成功')
        this.$message({message:'恭喜你！删除成功',type:'success'})
        this.doQuery()
      })
    },
    //开关
     ChangeSwitch(data,row,mid){
        console.log('开关事件')
        console.log(data)
        console.log(row)
        console.log(mid)
        Montiorswitchupdate({
          open: data,
          id:row.id
        }).then(res=>{
    
          this.query()
        
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
   Montiorgetform({
      
    }).then(res=>{
      this.tableData=res.data
      console.log('页面加载成功')
    })
  }
}
</script>
