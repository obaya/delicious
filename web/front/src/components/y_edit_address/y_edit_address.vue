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
               <!--  <li>
                    <input type="text"  style="border: 0px;outline:none;font-size:0.5rem;color:#666;" placeholder="收货地址" v-model="address"/>
                    <i class="el-icon-circle-close"></i>
                </li>
                <li>
                    <input type="text"  style="border: 0px;outline:none;font-size:0.5rem;color:#666;" placeholder="联系电话" v-model="phoneNo"/>
                    <i class="el-icon-circle-close"></i>
                </li> -->
            </ul>
            <div class="save-btn">
                <el-button type="primary" style="width:100%;height:100%;text-align:center;font-size:0.533333rem">保存</el-button>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import $ from 'jquery';
    import './y_edit_address.scss';
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
            }
        }   
        
    }

</script>
