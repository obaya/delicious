<template>
    <div>
        <eheader></eheader>
        <div class="container">
          <div class="my">我的</div>
          <ul class="goodslist">
                <li v-for="" class="goods">
                    <img src="http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114" alt="" />
                    <div class="detail">
                        <span>清汤面</span>
                        <span>￥5.00</span>
                    </div>
                    <!-- <div class="modified">
                        <i class="el-icon-remove" @click="remove"></i>
                        <span>{{qty}}</span>
                        <i class="el-icon-circle-plus" @click="plus"></i>
                    </div> -->
                     <el-input-number v-model="qty" @change="handleChange" :min="0" :max="99" label="描述文字"></el-input-number>
                </li>

          </ul>
          
        </div>
        <div class="buy">
            <div class="sum">总计￥<span>{{money}}</span></div>
            <!-- <div  @click="subbtn" class="buybtn">提交订单</div> -->
            <router-link :to="{path:'/eiorder',query:{money:money}}" class="buybtn">提交订单</router-link>
         </div>
        <efooter></efooter>
    </div>
</template>
<script type="text/javascript">
    import  './eicart.scss';
    import eheader from '../header/eheader.vue';
    import efooter from '../footer/footer.vue'
    export default{
        components:{
            eheader,
            efooter
        },
        data(){
            return {
                qty:0
            }
            
        },
        methods:{
        remove(){
         if(this.qty>0){
            this.qty-=1;
         }
          
        },
        plus(){
            this.qty+=1;
        }
    }
    }

</script>