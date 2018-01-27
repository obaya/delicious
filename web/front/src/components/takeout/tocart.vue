<template>
    <div class="tocart">
        <eheader></eheader>
        <div class="container">
          <div class="my">我的</div>
          <ul class="goodslist">
                <li class="goods" v-for="(obj, index) in goodsdata" :key="index">
                    <img :src="obj.imgUrl" alt="" />
                    <div class="detail">
                        <span>{{obj.title}}</span>
                        <span>￥{{obj.newPrice}}</span>
                        <i v-show="false">{{array[index]=obj.newPrice}}</i>
                    </div>
                        <div class="modified">
                            <i class="el-icon-remove" @click="remove(obj.qty,obj.newPrice,index)"></i>
                            <span class="qty">{{obj.qty}}</span>
                            <i class="el-icon-circle-plus" @click="plus(obj.qty,obj.newPrice,index)"></i>
                        </div>
                         <!-- <el-input-number v-model="" @change="handleChange" :min="0" :max="99" label="描述文字" ></el-input-number> -->

                </li>
                 

          </ul>
          
        </div>
        <div class="buy">
            <div class="sum">总计￥<span>{{total.toFixed(2)}}</span></div>
            <div  class="buybtn" @click="suborder" v-show="show">提交订单</div>
            <!-- <router-link :to="{path:'/toorder',query:{}}" class="buybtn" @c lick="suborder">提交订单</router-link> -->
        </div>
        <efooter color="cart"></efooter>
    </div>
</template>
<script type="text/javascript">
    import  './tocart.scss';
    import eheader from '../header/eheader.vue';
    import efooter from '../footer/footer.vue';
    import baseUrl from '../../utils/baseurl.js';
    export default{
        components:{
            eheader,
            efooter
        },
        data(){
            return {
               total:0,
               money:0,
               goodsdata:[],
               array:[],
               user_id:'',
               show:false
               
            }
        },
         created: function () {
            // console.log(this.Cookie);
              this.user_id=this.Cookie.getCookie('user_id');

        },
        mounted:function(){
            var res = baseUrl.get({
              url : "/getUserCart",
              params : {user_id:this.user_id,type:1},
            }).then(res=>{
              // 这里获取返回的结果
              if(res.data.length > 0){
                  this.show = true
                    this.goodsdata=res.data;
                    res.data.forEach((item,index)=>{
                        this.total+=item.newPrice*item.qty;
                    });
                }    
            })
  
        },
        methods:{
            
          remove(qty,price,index){

               this.goodsdata[index].qty--;
               // console.log(this.goodsdata[index]);
               if(this.goodsdata[index].qty<=0){
                   // this.goodsdata[index].qty=0;
                   

                   baseUrl.get({
                     url:'/deleteUserCartGoods',
                     params:{
                        user_id:this.user_id,
                        goods_id:this.goodsdata[index].goods_id
                     }
                   }).then(res=>{
                      // console.log(res);
                      this.goodsdata.splice(index,1);
                   })
               }
               this.total=0;
               this.goodsdata.forEach((item,index)=>{
                        this.total+=item.newPrice*item.qty;
                    });
                this.updatecart(index);
          },
          plus(qty,price,index){
              
              this.goodsdata[index].qty++;
              this.total=0;
               this.goodsdata.forEach((item,index)=>{
                        this.total+=item.newPrice*item.qty;
                    });
               this.updatecart(index);

          },
          updatecart(index){
              baseUrl.get({
                  url:'/updateCartQty',
                  params:{
                    id:this.goodsdata[index].id,
                    goods_id:this.goodsdata[index].goods_id,
                    user_id:this.user_id,
                    qty:this.goodsdata[index].qty
                  }
               }).then(res=>{
               })
          },
          suborder(){
               baseUrl.get({
                  url:'/createOrder',
                  params:{
                      user_id:this.user_id,
                      tableNum:'',
                      total:this.total,
                      type:1,
                      state:2
                  }
               }).then(res=>{
                    this.goodsdata=[];
                    this.$router.push({path:'/toorder',query:{user_id:this.user_id}});
                    // console.log(res);
               })
          }

            
        }
}

</script>