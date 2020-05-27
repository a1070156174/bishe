<!--
 * @Author: your name
 * @Date: 2020-02-15 16:42:37
 * @LastEditTime: 2020-03-12 19:01:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\src\views\Client\MonitorVideo.vue
 -->
<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="北门监控" name="first">
        <div class="demo-image__placeholder">
         <a class="block" v-for="image in images" :key="image" :style="{backgroundImage:'url('+image+')'}" ></a> 
        </div>
    </el-tab-pane>
    <el-tab-pane label="南门监控" name="second">
        <div>
            <div class="blockDiv">
                <a class="block" v-for="image in images" :key="image" :style="{backgroundImage:'url('+image+')'}" ></a> 
            </div>
        </div>
    </el-tab-pane>
    <el-tab-pane label="东门监控" name="third">
        <div>
            <div class="blockDiv">
                 <a class="block" v-for="image2 in images2" :key="image2" :style="{backgroundImage:'url('+image2+')'}" ></a> 
            </div>
        </div>
    </el-tab-pane>
    <el-tab-pane label="西门监控" name="fourth">
        <div>
            <div class="blockDiv">
                 <a class="block" v-for="image2 in images2" :key="image2" :style="{backgroundImage:'url('+image2+')'}" ></a> 
            </div>
        </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>

  export default {
    data() {
      return {
        activeName: 'first',
        images:[
            require('@/assets/0.jpg'),
            require('@/assets/1.jpg'),
            require('@/assets/2.jpg'),
            require('@/assets/4.jpg'),
            require('@/assets/6.jpg'),
            require('@/assets/7.jpg'),
            require('@/assets/8.jpg'),
            require('@/assets/9.jpg'),
            require('@/assets/10.jpg'),
            require('@/assets/11.jpg'),
            require('@/assets/12.jpg'),
            require('@/assets/13.jpg'),
        ],
         images2:[
            require('@/assets/14.jpg'),
            require('@/assets/15.jpg'),
            require('@/assets/16.jpg'),
            require('@/assets/17.jpg'),
            require('@/assets/19.gif'),
            require('@/assets/20.gif'),
            require('@/assets/21.jpg'),
            require('@/assets/22.jpg'),
            require('@/assets/23.gif'),
            require('@/assets/24.jpg'),
            require('@/assets/25.jpg'),
         
        ]
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
    created(){
        console.log("AAAAA",)
    }
  };

</script>
<style lang="less" scoped>
.blockDiv{
    width: 100%;
    display:flex;
    flex-wrap: wrap;
}
.block{
    width: calc(calc(100% / 3) - 10px);
    margin:5px;
    height:300px;
    box-sizing: border-box;
    border:2px  solid #000;
    display: inline-block;
    background-position: center center;
    background-size: auto 100%;
    background-repeat: no-repeat;
}


</style>
