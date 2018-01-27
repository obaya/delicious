<template>
   <div class="toorder">
        <eheader></eheader>
        <div class="container">
            <p class="tip">友情提示:为使用极速配送服务,送餐地址请按照规则填写 市+区+小区+楼层+门牌号 如: 上海市长宁区文洋大厦A栋5楼</p>
        <ul class="information">
            <li><input type="text" placeholder="配送地址" v-model="side"/></li>
            <li><input type="text" placeholder="联系人" v-model="username"/></li>
            <li><input type="text" placeholder="手机号码" v-model="phoneNumber"/></li>
            <li><input type="text" placeholder="给店铺留言" v-model="leaveword"/></li>
            <li><span class="weixin">支付方式</span></li>
            <li><span class="weixin">微信支付</span></li>
            <!-- <li><span class="weixin">支付宝支付</span></li> -->
            <!-- <li><span class="weixin">现金支付</span></li> -->
        </ul>
        <h1 class="oramount">订单金额:<span>￥{{this.total}}</span></h1>
        <input type="button" value="提交订单" class="sub" @click="suborder"/>
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
            efooter,
         
        },
        data(){
            return {
                 phoneNumber:'',
                 total:0,
                 leaveword:'',
                 side:'',
                 id:'',
                 user_id:'',
                 username:''
            }
        },
        methods:{
            suborder(){
                localStorage.setItem("phoneNumber",this.phoneNumber);
               var cardNum = this.Cookie.getCookie('cardNum')
                baseUrl.get({
                     url:'/updateUser',
                     params:{
                        id:this.$route.query.user_id,
                        type:1,
                        phoneNum:this.phoneNumber,
                        leaveword:this.leaveword,
                        side:this.side,
                        userName:this.username,
                        cardNum:cardNum,



                     } 
                }).then((res)=>{
                   
                      baseUrl.get({
                        url:'/updateOrderState',
                        params:{
                            id:this.id,
                            
                            state:2,
                        }
                      })
                       this.$router.push({path:'/yorder'});
                })
            }
           
        },
        mounted:function(){
          
            var res = baseUrl.get({
              url : "/getUserOrder",
              params : {user_id:this.$route.query.user_id},
            }).then(res=>{
                var i=res.data.length-1;
               this.id=res.data[i].id;
               this.total=res.data[i].total;
              
            })
  
        }
     }
</script>