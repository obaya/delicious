<template>
    <div class="y-address">
        <div class="a-header">
            <i class="el-icon-arrow-left" @click="back"></i>
            <span>常用地址</span>
            <i class="el-icon-plus" @click="addAddress"></i>
        </div>
        <div class="a-address-info">
            <ul>
                <li class="a-address-lists">
                    <div><i class="el-icon-circle-check"></i></div>
                    <div class="a-info">
                        <div class="a-info-top">
                            <span class="name" v-text="name"></span>
                            <span class="telephone">13578675436</span>
                        </div>
                        <div class="a-info-address"  v-text="address">上海市长宁区</div>
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
                // phoneNum:''
                userid:0
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
                var parmas = $(e.target).parent().prev()
                console.log(parmas)
                this.$router.push({name:'editaddress',query:{id:this.userid,phoneNum:'1365012344',name:this.name,address:this.address}})
                

            },
        },
        mounted(){
            var self = this;
            baseUrl.get({
                url:"/getUserInfoA",
                params:{phoneNum:'1365012344'}
            }).then(function(res){
                console.log(res.data[0])
                self.name = res.data[0].userName;
                self.address = res.data[0].side;
                self.userid = res.data[0].id;
            });
        }
    }

</script>
