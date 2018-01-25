<template>
    <div class="y-mine">
        <div class="m-top">
            <div class="m-img"></div>
            <div class="m-information">
                <div><span>卡号：</span><span>{{cardNum}}</span></div>
                <div><span>手机号：</span><span>{{phoneNum}}</span></div>
            </div>
        </div>
        <div class="m-center">
            <ul>
                <li @click="toMyOrder">
                    <i class="el-icon-document"></i>
                    <span>我的订单</span>
                    <i class="el-icon-arrow-right"></i>
                </li>
                <li class="lastli" @click="toAddress">
                    <i class="el-icon-location-outline"></i>
                    <span>收货地址</span>
                    <i class="el-icon-arrow-right"></i>
                </li>
            </ul>
            <ul>
                <li>
                    <i class="el-icon-tickets"></i>
                    <span>优惠券</span>
                    <i class="el-icon-arrow-right"></i>
                </li>
                <li class="lastli" @click="contactUs">
                    <i class="el-icon-phone-outline"></i>
                    <span>联系我们</span>
                    <i class="el-icon-arrow-right"></i>
                </li>
            </ul>
        </div>
        <div class="m-bottom">
            <foooter></foooter>
        </div>
    </div>
</template>
<script type="text/javascript">
    import './y_mine.scss';
    import foooter from '../footer/footer.vue'
    import baseUrl from '../../utils/baseurl.js'
    export default{
        data(){
            return {
                cardNum:'',
                phoneNum:'',
                user_id:1
            }
        },
        methods:{
            toMyOrder(){
                this.$router.push({name:'yorder'})

            },
            toAddress(){
                this.$router.push({name:'address'})
            },

            // element弹窗
            contactUs() {
                const h = this.$createElement;
                this.$msgbox({
                    message: h('p', { style: 'height:1.066667rem;padding-top:0.266667rem' }, [
                        h('span', { style: 'font-size:0.4rem;margin-top:0.133333rem' }, '联系我们： '),
                        h('i', { style: 'color: teal;font-size:0.4rem' }, '021-56788888')
                    ]),
                    showCancelButton: true,
                    confirmButtonText: '呼叫', 
                    cancelButtonText: '取消',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '呼叫中...';
                            setTimeout(() => {
                                done();
                            setTimeout(() => {
                                instance.confirmButtonLoading = false;
                            }, 300);
                            }, 3000);
                        } else {
                            done();
                        }
                    }
                })
            },
        },
        mounted(){
            var self = this;
            localStorage.setItem('user_id',this.user_id)

            // 发请求获取手机号卡号写入头部
            // 拿取存在cookie中的userid
            // this.user_id=document.cookie.split('=')[1]
            baseUrl.get({
                url:"/getUserOrderA",
                // params:{phoneNum:user_id}
                params:{phoneNum:this.user_id}

                
            }).then(function(res){
                self.cardNum = res.data[0].cardNum
                self.phoneNum = res.data[0].phoneNum
            })
        },
        components:{
            foooter,
        }
    }

</script>
