<template>
    <div class="WorkCard">
      
      <div class="search-area">
        <el-form :inline="true" :model="query" class="demo-form-inline">
          <el-form-item label="日期">
            <el-input v-model="query.dete" placeholder="ID"></el-input>
          </el-form-item>
          <el-form-item label="id">
            <el-input v-model="query.id" placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  icon="el-icon-search" @click="doQuery">查询</el-button>
            <el-button type="success" icon="el-icon-edit" @click="doNew">新增</el-button>
            <el-button  @click="doExport" icon="el-icon-upload2" >导出</el-button>
            <el-button  @click="doPrint" icon="el-icon-printer">打印</el-button>
          </el-form-item>
        </el-form>
      </div>
       <div class="worktable">
            <el-table   :data="tableData"       border   style="width: 100%"  :default-sort = "{prop: 'date', order: 'descending'}">  
              <el-table-column fixed  prop="date"  label="日期" width="150" sortable></el-table-column>
              <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
              <el-table-column prop="province" label="ID"width="120"></el-table-column>
              <el-table-column prop="city" label="部门"  width="120"></el-table-column>
              <el-table-column  prop="上班时间" label="上班时间" width="500" align="conter" style="text-align: center"></el-table-column>
              <el-table-column prop="zip" label="下班时间"   width="500"></el-table-column>
              <el-table-column  fixed="right"  label="操作"  width="200">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="primary"  v-model="dowork" size="80px"  round></el-button>
                  </template>
              </el-table-column>
            </el-table>
       </div>
     

       <div class="pag">
        <el-pagination
        class="lc-pagination"
          background
          layout="prev, pager, next"
          :total="100" 
          >
        </el-pagination>
       </div>
    </div>
</template>

<script>
    export default {
    data() {
      return {
        query:{},
        dowork: '上班'，
        tableData: [{
          date: '2016-05-02',
          name: '老大',
          province: '001',
          city: '北门',
          address: '',
          zip: "2016-03-03"
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }]
      }
    },    
    methods: {
      handleClick(row) {
        console.log(row);
    
      }
    }
  }
    
</script>

<style lang="less" scoped>
    .title{
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
    
    }
   

</style>