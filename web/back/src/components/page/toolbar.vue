<template>
    <div class="toolbar">
        <form @submit.prevent="submit_form" class="search">
            <el-input :placeholder="placeholder" v-model="formValue"></el-input>
        </form>
        <div class="toolbar_right">
            <el-button type="primary" size="small" icon="edit" @click="refresh">刷新</el-button>
            <el-button type="primary" size="small" icon="plus" @click="toaddgoods">添加数据</el-button>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default{
        data(){
            return {
                formValue: '',
                placeholder: '请输入菜名...'
            }
        },
        computed: {
            valueIsNull () {
                return this.formValue.trim() === ''
            }
        },
        beforeMount(){
            
        },
        methods: {
            submit_form() {

                if(!this.valueIsNull){
                    var params = {keyword:this.formValue};
                    var url = this.IpPort + '/getLikeSearchGoods';
                    var urlStr = this.urlDecode(url,params);
                    console.log(urlStr);
                    this.$emit('refresh',urlStr);
                    //!this.valueIsNull && this.$emit('refresh',urlStr)

                    this.open2();
                    return;
                }
                this.open101();
                return false;
            },
            toaddgoods:function(){
                //跳转
                this.$router.push({name:'addgoods'});
            },
            refresh:function(){
                var params = this.Params;
                var url = this.IpPort + '/getGoodList'
                var urlStr = this.urlDecode(url,params);

                this.$emit('refresh',urlStr);
            }
        }
    }
</script>
