<template>
    <div class="side-bar aside-sm">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo  h-100" theme="dark" router unique-opened>
            <el-menu-item index="/index">
                <i class="el-icon-caret-right"></i>首页
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-menu"></i>菜品管理</template>
                <el-menu-item index="/addgoods">添加菜品</el-menu-item>
                <el-menu-item index="/goodslist">菜品列表</el-menu-item>
            </el-submenu>
            <el-menu-item index="/user">
                <i class="el-icon-edit"></i> 用户管理
            </el-menu-item>
            <el-menu-item index="/order">
                <i class="el-icon-edit"></i> 订单管理
            </el-menu-item>
            <el-menu-item index="/echarts">Echarts</el-menu-item>
        </el-menu>
    </div>
</template>
<script>
export default {
    name: 'Sidebar',
    data() {
        return {

        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
