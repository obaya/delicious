<template>
    <div class="block paging">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="params.impose" layout="total,prev, pager, next" :total="total"></el-pagination>
    </div>
</template>
<script>
    export default{
        data() {
            return {
                currentPage1: 1,
                currentPage2: 2,
                currentPage3: 3,
                currentPage4: 4,
                currentPage5: 5,
                total:0,
                params:this.Params
            }
        },
        mounted(){
            //商品总数目
            var url = this.IpPort + '/getGoodListCount'
            this.$http.get(url).then(res=>{
                this.total = res.data
            })
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                //分页操作, val为当前页数
                var url = this.IpPort + '/getGoodList'
                this.Params.skip = (val-1)*this.Params.impose;
                var urlStr = this.urlDecode(url,this.Params);

                this.refresh(urlStr);
            },
            refresh:function(urlStr){
                this.$emit('refresh',urlStr);
            }
        }
    }
</script>