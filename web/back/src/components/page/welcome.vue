<template>
    <div class="welcome">
        <div class="addgoods_top">Declious</div>
        <div>
            <el-button type="text" size="large">今日订单量</el-button>
            <el-button type="primary" size="medium">{{order.orderQtyNow}}</el-button>
            <el-button type="text" size="large">昨日订单量</el-button>
            <el-button type="success" size="medium">{{order.orderQtyPrev}}</el-button>
            <el-button type="text" size="large">同比增长</el-button>
            <el-button type="warning"  size="large">{{order.orderQtyGrowth}}</el-button>
        </div>
        <div>
            <el-button type="text" size="large">今日营业额</el-button>
            <el-button type="primary" size="medium">{{order.orderSumNow}}</el-button>
            <el-button type="text" size="large">昨日营业额</el-button>
            <el-button type="success" size="medium">{{order.orderSumPrev}}</el-button>
            <el-button type="text" size="large">同比增长</el-button>
            <el-button type="warning"  size="large">{{order.orderSumGrowth}}</el-button>
        </div>
        <div>
            <el-button type="text" size="large">今日新增用户</el-button>
            <el-button type="danger" size="medium" round>{{user.userQtyToday}}</el-button>
            <el-button type="text" size="large">累积用户量</el-button>
            <el-button type="success" size="large" round>{{user.userQtyTotal}}</el-button>
        </div>
        <div>
            <el-button type="text" size="large">累积满意</el-button>
            <el-button type="success" size="medium" round>{{comment.commentQtyTrue}}</el-button>
            <el-button type="text" size="large">累积不满意</el-button>
            <el-button type="danger" size="large" round>{{comment.commentQtyFalse}}</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                total_rows: 0,
                order: {
                    orderQtyNow: 1, 
                    orderQtyPrev: 0, 
                    orderQtyGrowth:'',
                    orderSumNow:1,
                    orderSumPrev:0,
                    orderSumGrowth:'',
                },
                user:{
                    userQtyToday:0,
                    userQtyTotal:0
                },
                comment:{
                    commentQtyTrue:0,
                    commentQtyFalse:0
                },
            };
        },
        beforeMount(){
        },
        mounted(){
            this.refresh();
        },
        methods:{
            refresh(){
                var self = this;
                this.loadingStart();

                //获取注册用户量
                this.$http.get('http://10.3.136.27:88/getRegQty').then(res => {
                    //console.log(res.data);

                    var date = (new Date()).getDate();
                    var len = res.data.length;
                    for(let i=0;i<len;i++){
                        if(res.data[i].days.substr(6,2)==date){
                            self.user.userQtyToday = res.data[i].qty;
                            break;
                        }else{
                            self.user.userQtyToday = 0;
                        }
                    }
                    res.data.forEach(function(item){
                        self.user.userQtyTotal += item.qty*1;
                    })

                    this.loadingEnd();
                });
                
                //获取订单量
                this.$http.get('http://10.3.136.27:88/getGoodsStatus').then(res => {
                    //console.log(res.data);

                    var date = (new Date()).getDate();
                    var len = res.data.length;
                    for(let i=0;i<len;i++){
                        if(res.data[i].days.substr(6,2)==date){
                            self.order.orderQtyNow = res.data[i].qty;
                            self.order.orderSumNow = res.data[i].countPrice;
                            break;
                        }else{
                            self.order.orderQtyNow = 1;
                        }
                    }
                    for(let i=0;i<len;i++){
                        if(res.data[i].days.substr(6,2)==(date-1)){
                            self.order.orderQtyPrev = res.data[i].qty;
                            self.order.orderSumPrev = res.data[i].countPrice;
                            break;
                        }else{
                            self.order.orderQtyPrev = 1;
                        }
                    }
                    self.order.orderQtyGrowth = ((self.order.orderQtyNow*1 - self.order.orderQtyPrev*1)
                                                /self.order.orderQtyNow);
                    self.order.orderQtyGrowth = self.order.orderQtyGrowth.toFixed(2)*100 + '%';    
                                            
                    self.order.orderSumGrowth = ((self.order.orderSumNow*1 - self.order.orderSumPrev*1)
                                                /self.order.orderSumNow);
                    self.order.orderSumGrowth = self.order.orderSumGrowth.toFixed(2)*100 + '%';
                })

                //获取满意
                this.$http.get('http://10.3.136.27:88/getGoodsGrade').then(res => {
                    //console.log(res.data);

                    var temp = 'count(*)';
                    res.data.forEach(function(item){
                        self.comment.commentQtyTrue += item[temp]*1;
                    })
                })

                //获取不满意
                this.$http.get('http://10.3.136.27:88/getGoodsGrade?option=1').then(res => {
                    //console.log(res.data);
                    
                    var temp = 'count(*)';
                    res.data.forEach(function(item){
                        self.comment.commentQtyFalse += item[temp]*1;
                    })
                })
            },
        }
    }
</script>

<style>
    .el-row {
    margin-bottom: 20px;
    &:last-child {
    margin-bottom: 0;
    }
    }
    .el-col {
    border-radius: 4px;
    }
    .bg-purple-dark {
    background: #99a9bf;
    }
    .bg-purple {
    background: #d3dce6;
    }
    .bg-purple-light {
    background: #e5e9f2;
    }
    .grid-content {
    border-radius: 4px;
    min-height: 36px;
    }
    .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
    }

</style>