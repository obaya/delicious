<template>
    <div class="y-edit-address">
        <div class="edit-header">
            <i class="el-icon-arrow-left" @click="back"></i>
            <span>编辑地址</span>
            <i></i>
        </div>
        <div class="edit-info">
            <ul>
                <li v-for="(val,key) in addressDate" class="forappend">
                    <input type="text"  style="border: 0px;outline:none;font-size:0.5rem;color:#666;" :placeholder="val" :value="val" :v-model="addressDate[key]"/>
                    <i class="el-icon-circle-close" @click="clearContant($event)" ></i>
                </li>
            </ul>
            <div class="save-btn">
                <el-button type="primary" style="width:100%;height:100%;text-align:center;font-size:0.533333rem" @click="saveAddress">保存</el-button>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import $ from 'jquery';
    import './y_edit_address.scss';
    import baseUrl from '../../utils/baseurl.js'
    export default{
        data() {
            return {
                id:'',
                name: '',
                address: '',
                phoneNum: '',
                addressDate:{
                    name:'收货人',
                    address:'收货地址',
                    phoneNum:'联系电话'
                }
            }
        },
        methods: {

            back(){
                this.$router.go(-1)
            },
            clearContant(e){
                $(e.target).prev().val('')
            },
            saveAddress(){
                var self = this;
                var text = []
                for(var i=0;i<$('input').length;i++){
                    text.push($('input').eq(i).val())
                }
                baseUrl.get({
                    url:"/updateUserInfo",
                    params:{
                        id:this.$route.query.id,
                        userName:text[0],
                        side:text[1],
                        phoneNum:text[2],
                    }
                }).then(function(res){
                    console.log(res)
                    if(res.data.mess == '修改成功'){
                        self.open2();
                    }
                });
            },
            open2() {
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
            },
        },
        mounted(){
            if(this.$route.query.id){
                this.addressDate.name = this.$route.query.name;
                this.addressDate.address = this.$route.query.address;
                this.addressDate.phoneNum = this.$route.query.phoneNum;
            }

        }  
        
    }

</script>