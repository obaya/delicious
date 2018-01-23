<template>
    <div class="y-edit-address">
        <div class="edit-header">
            <i class="el-icon-arrow-left" @click="back"></i>
            <span>编辑地址</span>
            <i></i>
        </div>
        <div class="edit-info">
            <ul>
                <li v-for="(value,key) in addressDate">
                    <input type="text"  style="border: 0px;outline:none;font-size:0.5rem;color:#666;" :placeholder="value" />
                    <i class="el-icon-circle-close" @click="clearContant($event)"></i>
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
                name: '',
                address: '',
                phoneNo: '',
                input2: '',
                addressDate:{
                    name:'收货人',
                    address:'收货地址',
                    phoneNo:'联系电话'
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
                baseUrl.get({
                    url:"/updateUserInfo",
                    params:{
                        id:this.$route.query.id,
                        userName:this.$route.query.name,
                        side:this.$route.query.address,
                        phoneNum:this.$route.query.phoneNum
                    }
                }).then(function(res){
                    console.log(res)
                });
            }
        },
        mounted(){
            console.log(this.$route.query.id)
            if(this.$route.query.name){
                this.addressDate.name = this.$route.query.name;
                this.addressDate.address = this.$route.query.address;
                this.addressDate.phoneNo = this.$route.query.phoneNum;
                
            }

        }  
        
    }

</script>
<!-- http://127.0.0.1:88/updateUserInfo?id=8&userName=%E6%96%B0%E7%9A%84%E5%90%8D%E5%AD%97&side=%E5%B9%BF%E5%B7%9E%E5%8C%97%E4%BA%AC&phoneNum=1221
黄育平 12:19:35
id//参数  userName side phoneNum -->