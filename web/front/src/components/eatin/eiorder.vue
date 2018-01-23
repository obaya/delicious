<template>
   <div>
        <eheader></eheader>
        <div class="container">
        <ul class="site">
            <li><input type="text" placeholder="桌台号:"/></li>
            <li><input type="text" placeholder="给餐厅留言"/></li>
            <li><span class="weixin">支付方式</span></li>
            <li><span class="weixin">微信支付</span></li>
            <li><span class="weixin">支付宝支付</span></li>
            <li><span class="weixin">现金支付</span></li>
        </ul>
        <h1 class="oramount">订单金额:<span>￥33.30</span></h1>
        <input type="button" value="提交订单" class="sub"/>
        </div>
        <efooter></efooter>
    </div>
          
</template>
<script type="text/javascript">
     import eheader from '../header/eheader.vue';
     import './eiorder.scss';
     import efooter from '../footer/footer.vue'
     export default{
        components:{
            eheader,
            efooter
        },
        
     }
</script>