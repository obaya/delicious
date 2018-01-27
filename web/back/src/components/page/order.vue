<template>
    <el-table :data="dataset" style="width: 100%" class="orderTable" highlight-current-row>
        <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="订单ID"><span>{{ props.row.id}}</span></el-form-item>
                    <el-form-item label="用户ID"><span>{{ props.row.user_id }}</span></el-form-item>
                    <el-form-item label="流水号"><span>{{ props.row.orderNum }}</span></el-form-item>
                    <el-form-item label="订单号"><span>{{ props.row.serial }}</span></el-form-item>
                    <el-form-item label="商品"><span>{{ props.row.title }}</span></el-form-item>
                    <el-form-item label="商品分类"><span>{{ props.row.classify}}</span></el-form-item>
                    <el-form-item label="商品原价"><span>{{ props.row.oldPrice}}</span></el-form-item>
                    <el-form-item label="商品现价"><span>{{ props.row.newPrice}}</span></el-form-item>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
                <template scope="props">  
                    <el-button type="danger" size="small" icon="delete" @click="del_order(props.row)">删除</el-button>
                </template>
            </el-table-column>
        <el-table-column label="订单状态" prop="state" sortable></el-table-column>
        <el-table-column label="订单类型" prop="type"></el-table-column>
        <el-table-column label="支付方式" prop="method"></el-table-column>
        <el-table-column label="订单总价" prop="total" sortable></el-table-column>
    </el-table>
</template>

<script>

export default {
    data:function(){
        return {
            dataset:[],
            
        }
    },
    beforeCreate(){
        this.loadingStart();
    },
    beforeMount(){
        this.refresh();
    },
    methods:{
        filter(){
            //格式化数据
            this.dataset.forEach(function(item){
                if(item.state==0){
                    item.state = '待处理'
                }else if(item.state==1){
                    item.state = '已确定'
                }else if(item.state==2){
                    item.state = '已完成'
                } 
                item.total = '￥' + item.total;
                item.type = item.type==0? '堂食单' : '外卖单' ;
                item.method = item.method==0? '现金支付' : '在线支付';
            })
        },
        //生成页面
        refresh(){
            var params = {
                method:'common',
                limit:100,
                orderby:'create_at',
                pattem:'asc'
            }
            var url = this.IpPort + '/getOrderList';
            var urlStr = this.urlDecode(url,params);
            console.log(urlStr);

            //生成页面
            this.$http.get(urlStr).then(res=>{

                this.dataset = res.data;
                this.filter();
                console.log(this.dataset,url);
                var self = this;

                this.loadingEnd();

                //根据goods_json里的商品ID获取商品详情
                var goodsId = [];
                var goods_json = [];
                for(var i=0;i<this.dataset.length;i++){
                    goods_json = JSON.parse(this.dataset[i].goods_json);
                    goodsId[i] = [];
                    for(var j=0;j<goods_json.length;j++){
                        goodsId[i][j] = goods_json[j].goods_id;
                    }
                }
                console.log(goodsId);

                //事件委托,发送请求
                var table = document.querySelector('.el-table__body-wrapper');
                table.onclick = function(e){
                    e = e || window.event;
                    var target = e.targe || e.srcElement;

                    var cond1 = target.classList.contains("el-icon-arrow-right");
                    var cond2 = target.classList.contains("el-table__expand-icon");

                    var idx;
                    var currentTr ;

                    if( cond1 || cond2 ){
                        if(cond1) currentTr = target.parentNode.parentNode.parentNode.parentNode;
                        if(cond2) currentTr = target.parentNode.parentNode.parentNode;

                        idx = currentTr.rowIndex;

                        for(let i=0;i<goodsId[idx].length;i++){
                            var url2 = self.IpPort + '/getGoodsInfo?id=' + goodsId[idx][i];

                            self.$http.get(url2).then(response=>{
                                self.dataset[idx].title = response.data[i].title;
                                self.dataset[idx].newPrice = response.data[i].newPrice;
                                self.dataset[idx].oldPrice = response.data[i].oldPrice;
                                self.dataset[idx].classify = response.data[i].classify;
                            });
                        }
                    }
                }

                //给背景色
                //var timer = setTimeout(function(){

                    //var rows = document.querySelectorAll('.el-table__row');
                    //for(let i=0;i<self.dataset.length;i++){
                        //if(self.dataset[i].state=='待处理'){
                            //rows[i].classList.add('active_row');
                        //}
                    //}
                //},20)

            })
        },
        //单个删除
        del_order(_item){
            this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var orderId = _item.id;
                var url = this.IpPort + '/deleteOrder';
                console.log(url);
                this.$http.get(url + '?id=' + orderId).then(res=>{
                    console.log(res);
                })
                this.refresh();
            })
            .catch(()=>{
                console.log('取消删除');
            })
        }
    }
}
</script>

<style>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>
