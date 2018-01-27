<template>
    <el-form label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <h3 class="title">系统登录</h3>
        <el-form-item >
            <el-input type="text" auto-complete="off" placeholder="账号为: admin" class="username"></el-input>
            </el-form-item>
        <el-form-item>
            <el-input type="password" auto-complete="off" placeholder="密码为: admin" class="password"></el-input>
        </el-form-item>
        <el-checkbox checked class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click="toindex">登录</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    export default{
        data(){
            return {
                
            }
        },
        methods: {
            toindex:function(){

                var username = document.querySelector('.username input');
                var _username = username.value;
                var password = document.querySelector('.password input');
                var _password = password.value;

                
                if(_username==="admin" && _password==="admin"){
                    this.open100();
                    this.$router.push({name:'index'})
                }else{
                    this.$alert("账号密码都为: admin");
                }
            }
        }
    }
</script>
<style>
    .login-container{
        border-radius: 5px;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
</style>