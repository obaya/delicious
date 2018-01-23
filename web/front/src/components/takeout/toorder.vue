<template>
   <div>
        <eheader></eheader>
        <div class="container">
            <p class="tip">友情提示:为使用极速配送服务,送餐地址请按照规则填写 市+区+小区+楼层+门牌号 如: 上海市长宁区文洋大厦A栋5楼</p>
        <ul class="information">
            <li><input type="text" placeholder="配送地址"/></li>
            <li><input type="text" placeholder="联系人"/></li>
            <li><input type="text" placeholder="手机号码"/></li>
            <li><input type="text" placeholder="给店铺留言"/></li>
            <li><span class="weixin">支付方式</span></li>
            <li><span class="weixin">微信支付</span></li>
            <!-- <li><span class="weixin">支付宝支付</span></li> -->
            <!-- <li><span class="weixin">现金支付</span></li> -->
        </ul>
        <h1 class="oramount">订单金额:<span>￥{{this.$route.query.money}}</span></h1>
        <input type="button" value="提交订单" class="sub"/>
        <div class="fill"></div>
        </div>
        <efooter></efooter>
    </div>
          
</template>
<script type="text/javascript">
     import eheader from '../header/eheader.vue';
     import './toorder.scss';
     import efooter from '../footer/footer.vue';
     import baseUrl from '../../utils/baseurl.js';
     export default{
        components:{
            eheader,
            efooter
        },
        data(){
            return {
                 
            }
        },
        methods:{
           
        },
        mounted:function(){
            
            var res = baseUrl.get({
              url : "/createOrder",
              params : {user_id:2},
            }).then(function(res){
              // 这里获取返回的结果
                // console.log(res.data)
                res.data.forEach(function(item,index){
                     var data=JSON.parse(item.goods_json);
                     var id=data[0].goods_id;
                     baseUrl.get({
                         url:"/getGoodList",
                         params:{}
                     })
                })
            })
  
        }
     }
</script>