<template>
   <div class="eiorder">
        <eheader></eheader>
        <div class="container">
        <ul class="site">
            <li><input type="text" placeholder="桌台号:" v-model="tableNum"/></li>
            <li><input type="text" placeholder="给餐厅留言" v-model="leaveword"/></li>
            <li><span class="weixin">支付方式</span></li>
            <li><span class="weixin">微信支付</span></li>
            <li><span class="weixin">支付宝支付</span></li>
            <li><span class="weixin">现金支付</span></li>
        </ul>
        <h1 class="oramount">订单金额:<span>￥{{this.total}}</span></h1>
        <input type="button" value="提交订单" class="sub" @click="suborder"/>
        </div>
        <efooter></efooter>
    </div>
          
</template>
<script type="text/javascript">
     import eheader from '../header/eheader.vue';
     import './eiorder.scss';
     import efooter from '../footer/footer.vue';
     import baseUrl from '../../utils/baseurl.js';
     export default{
        components:{
            eheader,
            efooter
        },
        data(){
            return{
                tableNum:'',
                leaveword:'',
                total:0,
            }
        },
        methods:{
            suborder(){
                var cardNum = this.Cookie.getCookie('cardNum')
                baseUrl.get({
                     url:'/updateUser',
                     params:{
                        id:this.$route.query.user_id,
                        type:0,
                        leaveword:this.leaveword,
                        cardNum:cardNum

                     }
                }).then((res)=>{
                      baseUrl.get({
                        url:'/updateOrderState',
                        params:{
                            id:this.id,
                            tableNum:this.tableNum,
                            state:2,
                        }
                      })
                      this.$router.push({name:'yorder'})
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