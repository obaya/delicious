<template>
    <div class="y-address">
        <div class="a-header">
            <i class="el-icon-arrow-left" @click="back"></i>
            <span>常用地址</span>
            <i class="el-icon-plus" @click="addAddress"></i>
        </div>
        <div class="a-address-info">
            <ul v-if="phoneNum == ''? false : true">
                <li class="a-address-lists" >
                    <div><i class="el-icon-circle-check"></i></div>
                    <div class="a-info">
                        <div class="a-info-top">
                            <span class="name" v-text="name"></span>
                            <span class="telephone">{{phoneNum}}</span>
                        </div>
                        <div class="a-info-address"  v-text="address"></div>
                    </div>
                    <div><i class="el-icon-edit" @click="editAddress($event)"></i></div>
                </li>
                
            </ul>
        </div>
    </div>
</template>
<script type="text/javascript">
    import $ from 'jquery'
    import './y_address.scss';
    import baseUrl from '../../utils/baseurl.js'
    export default{
        data() {
            return {
                name:'',
                address:'',
                phoneNum:'',
                user_id:''
            }
        },
        methods:{
            back(){
                this.$router.go(-1)
            },
            addAddress(){
                this.$router.push('editAddress')
            },
            editAddress(e){
                this.$router.push({name:'editaddress',query:{id:this.user_id,phoneNum:this.phoneNum,name:this.name,address:this.address}})
                

            },
        },
        mounted(){
            this.user_id=this.Cookie.getCookie('user_id')

            var self = this;

            baseUrl.get({
                url:"/getUserInfoA",
                params:{phoneNum:this.user_id}
            }).then(function(res){
                self.name = res.data[res.data.length-1].userName;
                self.address = res.data[res.data.length-1].side;
                self.user_id = res.data[res.data.length-1].id;
                self.phoneNum = res.data[res.data.length-1].phoneNum;
            });
        }
    }

</script>
