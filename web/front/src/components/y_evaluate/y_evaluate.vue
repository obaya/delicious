<template>
    <div class="y-evaluate">
        <div class="e-header">
            <i class="el-icon-arrow-left" @click="back"></i>
            <span>评价</span>
            <i></i>
        </div>
        <ul class="eva-lists">
            <li class="eva-list" v-for="(value,idx) in orderList">
                <div class="eva-left">
                    <div class="goods-pic"><img style="width:2.3rem;height:2.1rem" :src=imgurl[idx] alt="" /></div>
                    <div class="goods-name" v-text="value.title"></div>
                </div>
                <div class="eva-right">
                    <div class="evaStar">
                        <star @getStart.once="getStart"></star>
                    </div>
                    <div class="eva-words">
                        <el-input style="font-size:0.4rem"
                          type="textarea"
                          :rows="3"
                          placeholder="点评一下吧，您的意见很重要哦"
                          v-model="comment[idx]">
                        </el-input>
                    </div>
                </div>
            </li>
        </ul>
        <div class="o-pjia">
            <div class="pjiaBtn" @click="saveEva" v-if="tijiao">
            提交评价
            </div>
            <div class="pjiaBtn" @click="toHome" v-if="fanhui">
            返回首页
            </div>
        </div>
        
        
    </div>
</template>
<script type="text/javascript">
    import $ from 'jquery'
    import star from '../y_star/y_star.vue'
    import './y_evaluate.scss';
    import baseUrl from '../../utils/baseurl.js'

    export default{
        data() {
            return {
                orderList:[],
                user_id:'',
                goodsId:[],
                grade:[],
                comment: [],
                alertShow:false,
                imgurl:[],
                phoneNum:'',
                tijiao:true,
                fanhui:false
            }
        },
        methods:{
            getStart(idx){
                this.grade.push(idx+1)
            },
            back(){
                this.$router.go(-1)
            },
            toHome(){
                this.$router.push('/')
            },
            // 通过user_id将该用户的订单菜品渲染在页面，再将user_id，goodsId，菜品，评论写入数据库
            saveEva(){
                if(this.grade.length < this.orderList.length || this.comment.length  < this.orderList.length){
                    this.open1()
                }else{
                    for(var i=0;i<this.orderList.length;i++){
                        var data = {
                            user_id:this.user_id,
                            goods_id:this.goodsId[i],
                            grade:this.grade[i],
                            comment:this.comment[i]
                        }
                        this.subEva(data)
                        this.open2()
                    } 
                    
                }
            },
            subEva(data){
                var self = this;
                baseUrl.get({
                    url:"/insertComment",
                    params:data
                }).then(function(res){
                    if(res.data.status == 'ok'){
                       
                        self.tijiao = false;
                        self.fanhui = true;
                    }
                })
            },
            open1() {
                this.$message({
                    message: '您还没有打分哦',
                });
            },
            open2() {
                this.$message({
                    message: '已提交评论',
                    type: 'success'
                });
            },

        },
        mounted(){
            this.user_id=localStorage.getItem('user_id')
            var self = this;
            baseUrl.get({
                url:"/getUserOrderA",
                params:{phoneNum:this.user_id}
            }).then(function(res){
                self.orderList=res.data[res.data.length-1].goods_json

                for(var i=0;i<self.orderList.length;i++){
                    self.imgurl.push(self.orderList[i].imgUrl.split(';')[0]);
                    self.goodsId.push(self.orderList[i].goods_id)
                    self.user_id = res.data[res.data.length-1].user_id
                }
            });
        },
        components:{
            star:star
        }
    }

</script>