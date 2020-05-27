<template>
  <div class="Equipment">
     <div class="search-area">
       <el-form :inline="true" :model="query" class="demo-form-inline">
        <el-form-item label="设备ID">
          <el-input v-model="query.id" placeholder="ID"></el-input>
        </el-form-item>
         <el-form-item label="设备">
          <el-input v-model="query.name" placeholder="设备"></el-input>
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
    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%"  :default-sort = "{prop: 'sid', order: 'descending'}" id="table-area" stripe border>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="序号"  width="70px">
          <template slot-scope="scope"> {{scope.$index+1}}</template>
        </el-table-column>
        <!-- <el-table-column  prop="sid" label="编号" width="180"></el-table-column> -->
        <el-table-column  prop="id"  sortable label="ID" width="180"></el-table-column>
        <el-table-column  prop="name" label="设备名" width="180"></el-table-column>
        <el-table-column  prop="num" label="数量" width="180"></el-table-column>
        <el-table-column  prop="status" label="状态" width="180"></el-table-column>
        <el-table-column  prop="door" label="所属门岗" width="180"></el-table-column>
        <el-table-column  prop="remarks" label="备注" ></el-table-column>
        <el-table-column  label="操作" width="300">
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
      <equipment-info ref="equipmentInfo"></equipment-info>
  </div>
</template>

<script>
import EquipmentInfo from '../Form/EquipmentInfo'
import {Equipmentgetform,Equipmentselect,Equipmentdel,getdepartment} from '@/http/api.js'
export default {
  name: 'Home',
  components:{
    EquipmentInfo
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
     Equipmentselect({
       id:this.query.id,
       name:this.query.name
     }).then(res=>{
       console.log('查询成功！')
       this.tableData=res.data
       this.$message({message:'恭喜你！查询成功',type:'success'})
     })
    },
    //新增
    doNew(){
      this.$refs.equipmentInfo.dialogVisible = true
      this.$refs.equipmentInfo.switch='add'
     
    },
   //导出Excel
    doExport(){
        import("@/vendor/Export2Excel").then(excel => {

        //表格的表头列表

        const tHeader = ["编号", "设备","数量","状态","门岗","备注"];

        //与表头相对应的数据里边的字段

        const filterVal = ["id","name","num","status","door", "remarks"];

        const list = this.tableData;

        const data = this.formatJson(filterVal, list);

        //这里还是使用export_json_to_excel方法比较好，方便操作数据

        excel.export_json_to_excel(tHeader,data,'设备表');

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
      this.$refs.equipmentInfo.dialogVisible = true
      this.$refs.equipmentInfo.equipment = row
      this.$refs.equipmentInfo.switch='update'
    },
    //删除
    doDelete(row){
      console.log('删除事件！')
      Equipmentdel({
        id:row.id
      }).then(res=>{
        console.log('删除成功！')
        this.$message({showClose: true, message: '删除'+row.sname+'成功！', type: 'success' })
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
  //页面渲染
  mounted(){
  console.log('页面加载')
  Equipmentgetform({

  }).then(res=>{
    this.tableData=res.data
    console.log('页面加载成功！')
  })

  //部门查询
  getdepartment({

  }).then(res=>{
      this.$refs.equipmentInfo.department=res.data
  })

  }
}
</script>
