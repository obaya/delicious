<template>
    <div class="y-order">
        <div class="o-header">
            <i class="el-icon-arrow-left" @click="back"></i>
            <span>我的订单</span>
            <i></i>
        </div>

        <div class="o-state">
            <div class="jindu">
                <i class="el-icon-success active"></i>
                <div :class="{active:state>=1}"></div>
                <i :class="['el-icon-success',{active:state>=1}]"></i>
                <div :class="{active:state==2}"></div>
                <i :class="['el-icon-success',{active:state==2}]"></i>
            </div>
            <div class="shuoming">  
                <p>待处理</p>
                <p>已确认</p>
                <p>已完成</p>
            </div>
        </div>

        <div class="o-infor">
            <div class="onumber">
                <span>订单号：</span>
                <span v-text="orderNum"></span>
            </div>
            <div class="otime">
                <span>下单时间：</span>
                <span v-text="createTime"></span>
            </div>
        </div>

        <div class="o-list">

            <ul class="food-list" >
                <li class="one-list" v-for="(value,idx) in orderList">
                    <div class="food-name" v-text="value.title"></div>
                    <div>
                        <span><span v-text="value.qty"></span>份</span>
                        <span>&times;</span>
                        <span class="red">￥<span  v-text="value.newPrice"></span></span>
                    </div>
                    <div  class="red">￥<span  v-text="value.newPrice*value.qty"></span></div>
                </li>
            </ul>

            <div class="ototal">
                <span>
                    合计：
                    <span  class="red"><span >{{totalQty}}</span>份</span>
                </span>
                <span>
                    订单金额：
                    <span class="red">￥<span>{{totalAmount}}</span></span>
                </span>
            </div>
            <div class="opaytype">
                <div>支付状态：(<span  class="red" >{{hadPay}}</span>)</div>
            </div>
        </div>

        <div class="o-pjia">
            <div v-show="state==2" class="pjiaBtn" @click="toEvaluate">
            我要点评
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import './y_myorder.scss';
    import baseUrl from '../../utils/baseurl.js'
    export default{
        data(){
            return {
                orderList:[],
                orderNum:'',
                createTime:'',
                orderState:'',
                payType:'',
                state:0,
                totalQty:0,
                totalAmount:0,
                phoneNum:'',
                user_id:'',
                hadPay:'待支付'

            }
        },
        methods:{
            back(){
                this.$router.go(-1)
                
            },
            toEvaluate(){
                this.$router.push({name:'evaluate'})
            },
            toMyTime(_time) {
                // 2018-01-24T01:19:06.000Z
                return _time.substr(0,19).replace('T',' ')
            }
        },
        mounted(){
            // 拿取存在cookie中的useridb
            this.user_id=document.cookie.split('=')[1]
            this.user_id=localStorage.getItem('user_id')

            var self = this;
            baseUrl.get({
                url:"/getUserOrderA",
                // params:{phoneNum:user_id}
                params:{phoneNum:this.user_id}
                
            }).then(function(res){
                
                self.orderList=res.data[0].goods_json
               
                self.orderNum = res.data[0].orderNum;
                // 下单时间
                self.createTime = self.toMyTime(res.data[0].create_at);



                self.orderState = res.data[0].state;
                self.payType = res.data[0].type;
                self.state = res.data[0].state;

                for(var i=0;i<self.orderList.length;i++){
                    self.totalQty += (self.orderList[i].qty)*1;
                    self.totalAmount += self.orderList[i].newPrice*self.orderList[i].qty;
                }
                if(self.orderState == 2){
                    self.hadPay = "已支付"
                }
            });
        }
    }

</script>