<template>
    <el-table :data="dataset" border style="width: 100%" class="user_table" highlight-current-row>
        <el-table-column prop="userName" label="用户昵称" width="150"></el-table-column>
        <el-table-column prop="cardNum" label="账号" width="150"></el-table-column>
        <el-table-column prop="side" label="地址" width="150"></el-table-column>
        <el-table-column prop="phoneNum" label="手机号码" width="150"></el-table-column>
        <el-table-column prop="create_at" label="注册时间" sortable></el-table-column>
    </el-table>
</template>
<script>
    export default {
        data(){
            return{
                dataset:[]
            }
        },
        methods:{

        },
        beforeMount(){
            var params = {limit:1000,order:'asc'};
            var url = this.IpPort + '/getUserList';
            var urlStr = this.urlDecode(url,params);
            console.log(urlStr);

            this.loadingStart();

            //生成页面
            this.$http.get(urlStr).then(res=>{
                this.dataset = res.data;
                
                this.dataset.forEach(function(item){
                    item.create_at = item.create_at.slice(0,10);
                })
                console.log(this.dataset);
            })

            this.loadingEnd();
        }
    }
</script>
<style>
    
</style>
