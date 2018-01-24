<template>
    <div class="eicart">
        <eheader></eheader>
        <div class="container">
          <div class="my">我的</div>
          <ul class="goodslist">
                <li v-for="(obj,index) in goodsdata" class="goods">
                    <img :src="obj.imgUrl" alt="" />
                    <div class="detail">
                        <span>{{obj.title}}</span>
                        <span>￥{{obj.newPrice}}</span>
                    </div>
                    <div class="modified">
                            <i class="el-icon-remove" @click="remove(obj.qty,obj.newPrice,index)"></i>
                            <span class="qty">{{obj.qty}}</span>
                            <i class="el-icon-circle-plus" @click="plus(obj.qty,obj.newPrice,index)"></i>
                    </div>
                     <!-- <el-input-number v-model="item.qty" @change="handleChange" :min="0" :max="99" label="描述文字"></el-input-number> -->
                </li>

          </ul>
          
        </div>
        <div class="buy">
            <div class="sum">总计￥<span>{{total.toFixed(2)}}</span></div>
            <div  @click="suborder" class="buybtn">提交订单</div>
           <!--  <router-link :to="{path:'/eiorder',query:{}}" class="buybtn">提交订单</router-link> -->
         </div>
        <efooter></efooter>
    </div>
</template>
<script type="text/javascript">
    import  './eicart.scss';
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
                qty:0,
                goodsdata:[],
                total:0,
                user_id:59
            }
            
        },
        mounted(){
             baseUrl.get({
                  url:'/getUserCart',
                  params:{
                     user_id:59,
                     type:0,

                  }
             }).then(res=>{
                 // console.log(res);
                 this.goodsdata=res.data;

                 res.data.forEach((item,index)=>{
                     this.total+=item.newPrice*item.qty;
                 })
             })
        },
        methods:{
            remove(qty,price,index){
               console.log(qty,price,index);
               this.goodsdata[index].qty--;
               if(this.goodsdata[index].qty<=0){
                   // this.goodsdata[index].qty=0;
                   

                   baseUrl.get({
                     url:'/deleteUserCartGoods',
                     params:{
                        user_id:59,
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
                    user_id:59,
                    qty:this.goodsdata[index].qty
                  }
               }).then(res=>{
                   console.log('ok');
               })
          },
          suborder(){
               baseUrl.get({
                  url:'/createOrder',
                  params:{
                      user_id:59,
                      tableNum:'',
                      total:this.total,
                      type:1,
                      state:0
                  }
               }).then(res=>{
                    this.goodsdata=[];
                    this.$router.push({path:'/eiorder',query:{user_id:this.user_id}});
                    // console.log(res);
               })
          }
        }
    }

</script>