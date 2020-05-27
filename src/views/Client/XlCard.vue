<!--
 * @Author: your name
 * @Date: 2020-02-16 13:55:30
 * @LastEditTime: 2020-05-14 15:31:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\src\views\Client\WorkCard.vue
 -->
<template>
    <div class="XlCard">
      
       <div class="search-area">
        <el-form :inline="true" :model="query" class="demo-form-inline">
        
          <el-form-item label="id">
            <el-input v-model="query.id"  placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item >
            <el-button type="primary"  icon="el-icon-search" @click="doQuery">查询</el-button>
            <!-- <el-button type="success" icon="el-icon-edit" v-if="!$store.state.adminonnn" @click="doNew">新增</el-button> -->
            <el-button  @click="doExport" icon="el-icon-upload2" >导出</el-button>
            <el-button  @click="doPrint" icon="el-icon-printer">打印</el-button>
          </el-form-item>
        </el-form>
        <el-form style="text-align: center;">
			
        </el-form>
      </div>
  
       <div class="worktable">
		    
            <el-table  :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%" :default-sort = "{prop: 'id', order: 'descending'}">  
                <el-table-column type="selection" width="55"></el-table-column>
				<el-table-column label="序号"  width="70px">
					<template slot-scope="scope"> {{scope.$index+1}}</template>
				</el-table-column>
			    <el-table-column   prop="id"  label="编号" width="150" sortable></el-table-column>
                <el-table-column   prop="createTime" label="日期"  :formatter="formatDate" width="150"  sortable> </el-table-column>
                <el-table-column  prop="name" label="姓名" width="120">  </el-table-column>
                <!-- <el-table-column prop="id" label="ID" width="120"> </el-table-column> -->
                <!-- <el-table-column  prop="dname" label="部门"  width="120px"> </el-table-column> -->
                <el-table-column   label="巡逻" align="center" width="250"   > 
					   <el-table-column   label="上班卡" > <template  slot-scope="scope">
						<el-button type="primary" @click="gowork(scope.row)" >巡逻上班</el-button>
					</template> </el-table-column>
					  <el-table-column prop="onPatrol" label="开始时间" width="180"> </el-table-column>
				 <el-table-column   label="下班卡" > <template  slot-scope="scope">
						<el-button type="primary" @click="endwork(scope.row)" >巡逻下班</el-button>
					</template> </el-table-column>
                <el-table-column  prop="offPatrol"   label="结束时间" width="180"> </el-table-column>
				</el-table-column >
				 <el-table-column label="备注事项" align="center">
                <el-table-column  label="备注"> 
					<template slot-scope="{row}">
						<template v-if="edit">
							<el-input v-model="row.remarks" class="edit-input" size="small" />
						</template>
         				 <span v-else>{{ row.remarks }}</span>
       				 </template>
				</el-table-column>
				 <el-table-column   label="操作" width="100">
					<template slot-scope="{row}">
					<el-button
						v-if="edit"
						type="success"
						size="small"
						icon="el-icon-circle-check-outline"
						@click="confirmEdit(row)"
					>
						Ok
					</el-button>
					<el-button
						v-else
						type="primary"
						size="small"
						icon="el-icon-edit"
						@click="edit=!edit"
					>
						Edit
					</el-button>
					</template>
            	</el-table-column>
				</el-table-column>
        	</el-table>
       </div>
       <div>       
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
       <xl-card-info ref="xlCardInfo"></xl-card-info>
    </div>
</template>

<script>
import XlCardInfo from '../Form/XlCardInfo';
import { XLCardgetform, XLCardselect,XLCardupdate} from '@/http/api.js';

export default {
	components: {
		XlCardInfo
	},
	data() {
		return {
			query: {},
			names: '',
			edit:false,
			primary: 'primary',
			 tableData:[],
      pagesize:10,
      currpage:1,
      currentPage:1, 
		};
		
	},
	methods: {
		
		//修改
		 confirmEdit(row) {
    	 this.edit = false
		XLCardupdate({
			    id:row.id,
				createTime:row.createTime,
				name:row.name,
				onPatrol:row.onPatrol,
				offPatrol:row.offPatrol,
				remarks:row.remarks
		}).then(res=>{
 			this.$message({
       			 message: '修改备注成功！',
       			 type: 'success'
				  })
				this.doQuery()
		}) 
    	},

		//查询
		doQuery() {
	
			
			XLCardselect(
				this.query
			).then(res => {
				this.tableData = res.data;
				this.$message({ message: '查询成功', type: 'success' });
			});
		},
		//新增
		doNew() {
			this.$refs.xlCardInfo.dialogVisible = true;
			this.$refs.xlCardInfo.switch = 'add';
		},
		//上班
		gowork(row){
			let onPatrol= new Date()
			XLCardupdate({
				id:row.id,
				createTime:row.createTime,
				name:row.name,
				onPatrol:onPatrol,
				offPatrol:row.offPatrol
			}).then(res=>{
				this.$message({ message: '打卡成功', type: 'success' })
				this.doQuery()
			})
		},
		endwork(row){
			let offPatrol= new Date()
			XLCardupdate({
				id:row.id,
				createTime:row.createTime,
				name:row.name,
				onPatrol:row.onPatrol,
				offPatrol:offPatrol

			}).then(res=>{
				this.$message({ message: '查询成功', type: 'success' })
				this.doQuery()
			})
		},
		 //导出Excel
    doExport(){
        import("@/vendor/Export2Excel").then(excel => {

        //表格的表头列表

        const tHeader = [ "编号", "日期","姓名","巡逻开始时间","巡逻结束时间","备注"];

        //与表头相对应的数据里边的字段

        const filterVal = ["id","createTime","name","onPatrol",'offPatrol',"remarks" ];

        const list = this.tableData;

        const data = this.formatJson(filterVal, list);

        //这里还是使用export_json_to_excel方法比较好，方便操作数据

        excel.export_json_to_excel(tHeader,data,'巡逻表');

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
	mounted() {
			XLCardgetform({	}).then(res => {
				console.log(res)

				this.tableData = res.data;
			});
		}
};
</script>

<style lang="less" scoped>
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>