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
                    <div class="modified">
                        <i class="el-icon-remove"></i>
                        <span>0</span>
                        <i class="el-icon-circle-plus"></i>
                    </div>
                </li>
          </ul>
          
        </div>
        <div class="buy">
            <div class="sum">总计<span>￥99.00</span></div>
            <div class="buybtn">提交订单</div>
        </div>
        <efooter></efooter>
    </div>
</template>
<script type="text/javascript">
    import  './tocart.scss';
    import eheader from '../header/eheader.vue';
    import efooter from '../footer/efooter.vue'
    export default{
        components:{
            eheader,
            efooter
        }
    }

</script>