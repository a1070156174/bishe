<!--
 * @Author: your name
 * @Date: 2020-02-13 19:52:25
 * @LastEditTime: 2020-05-06 15:23:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\src\views\layout\Layout.vue
 -->
<template>
   <el-container class="lc-layout">
        <el-header style="padding:0">
            <v-header  :open-nav="openNav" @toggle-open="toggleOpen"  ></v-header>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <menus  :open-nav="openNav" ></menus>
            </el-aside>
            <el-main  class="page-sub-main" >
                <router-view/>
            </el-main>
        </el-container>
         <el-footer height="60px" style="padding:0">
             <v-footer></v-footer>
         </el-footer>
    </el-container>
</template>

<script>
    import Menus from './Menus.vue'
    import VHeader from './Header.vue'
    import VFooter from './Footer.vue'
    export default {
         name: 'TheLayout',
        data () {
            return {
                openNav: true
            }
        },
        components:{Menus,VHeader,VFooter},
          methods: {
             toggleOpen () {
                 this.openNav = !this.openNav
            }
          },

    }

</script>

<style lang="less" scoped>
.lc-layout{
    height: 100%;
    padding: -20px;
}
.page-sub-main {
  color: #666666;
  
  padding: 5px;
}
</style>