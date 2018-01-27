<template>
    <div class="addgoods">
        <div class="updategoods_top">更新商品</div>
        <el-form ref="form" :model="form" label-width="80px" class="addform">
            <el-form-item label="小图链接">
                <el-input v-model="form.minImg" @focus="focus($event)" required="true"></el-input>
            </el-form-item>
            <el-form-item label="大图链接">
                <el-input v-model="form.maxImg" @focus="focus($event)"></el-input>
            </el-form-item>
            <el-form-item label="菜名">
                <el-input v-model="form.title" @focus="focus($event)"></el-input>
            </el-form-item>
            <el-form-item label="库存">
                <el-input v-model="form.inventory" @focus="focus($event)"></el-input>
            </el-form-item>
            <el-form-item label="商品类型">
                <el-select v-model="form.type" placeholder="请选择商品类型">
                    <el-option label="无折扣" value="0"></el-option>
                    <el-option label="特价菜品" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="现价">
                <el-input v-model="form.newPrice" @focus="focus($event)"></el-input>
            </el-form-item>
            <el-form-item label="原价">
                <el-input v-model="form.oldPrice" @focus="focus($event)"></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
                <el-radio-group v-model="form.classify">
                    <el-radio label="特色粥品"></el-radio>
                    <el-radio label="小吃主食"></el-radio>
                    <el-radio label="爽口凉菜"></el-radio>
                    <el-radio label="面类"></el-radio>
                    <el-radio label="单人精彩套餐" checked></el-radio>
                    <el-radio label="精选热菜"></el-radio>
                    <el-radio label="果拼果汁"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">更新商品</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data:function(){
            return {
                form:{
                    minImg:'',
                    maxImg:'',
                    title: '',
                    inventory:'',
                    type:'',
                    newPrice:'',
                    oldPrice:'',
                    classify:''
                }
            }
        },
        methods: {
            onSubmit(){
                var url = this.IpPort + '/updateGoods';
                var data = this.form;
                var urlStr = this.urlDecode(url,data);
                console.log(urlStr);

                this.$http.get(urlStr).then(res=>{
                    console.log(urlStr);
                    if(res.data.status==='ok'){
                        this.open2();
                    }else{
                        this.open4();
                    }
                })
            },
            focus(event) {
                //input框获取焦点后选中文字
                event.currentTarget.select();
            }
            
        },
        beforeCreate(){
            this.loadingStart();
        },
        beforeMount(){
            this.loadingEnd();

            //处理this.form
            var currentGoods = this.$route.params.currentGoods;
            this.form = JSON.parse(JSON.stringify(currentGoods));
            this.form.minImg = this.form.imgUrl[0];
            this.form.maxImg = this.form.imgUrl[1];
            
            this.form.type = this.form.type==='无折扣' ? 0 : 1 ;
            this.form.discount = this.form.discount.length>2 
                ? this.form.discount.slice(0,2)/10 
                : this.form.discount ;

            this.form.newPrice = this.form.newPrice.slice(1,3);
            this.form.oldPrice = this.form.oldPrice.slice(1,3);

            delete(this.form['imgUrl']);
            console.log(this.form);
        }
    }
</script>