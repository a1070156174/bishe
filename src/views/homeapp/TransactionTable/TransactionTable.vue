<!--
 * @Author: your name
 * @Date: 2020-04-27 16:08:21
 * @LastEditTime: 2020-04-27 18:19:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\views\homeapp\TransactionTable\TransactionTable.vue
 -->
<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="标题"  prop="title"  width="150">
      <!-- <template slot-scope="scope">
        {{ scope.row.order_no | orderNoFilter }}
      </template> -->
     
    </el-table-column>
    <el-table-column label="内容" prop="content" align="center" min-width="275" >
      <!-- <template slot-scope="scope">
        {{ scope.row.price | toThousandFilter }}
      </template> -->
    </el-table-column>
    <el-table-column label="时间" width="100" align="center" prop="createTime"  :formatter="formatDate">
      <!-- <template slot-scope="{row}">   
          {{ row.status }}
        </el-tag>
      </template> -->
    </el-table-column>
  </el-table>
</template>

<script>
// import { transactionList } from '@/api/remote-search'
import{Noticegetform} from '@/http/api.js'
export default {
  filters: {
    // statusFilter(status) {
    //   const statusMap = {
    //     success: 'success',
    //     pending: 'danger'
    //   }
    //   return statusMap[status]
    // },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    //时间格式化
     formatDate(value){
      
          this.value1= new Date(value.createTime);//value.createdTime是prop绑定的字段名称
          let dateValue = this.$moment(this.value1).format("YYYY-MM-DD ");//$moment专门转化时间的插件（使用时需要下载引入）
          return dateValue
      },
      //表格渲染
    fetchData() {
      Noticegetform().then(response => {
        this.list = response.data.slice(0, 8)
      })
    }
  }
}
</script>
