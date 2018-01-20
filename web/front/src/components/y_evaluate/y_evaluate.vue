<template>
    <div class="y-evaluate">
        <div class="e-header">
            <i class="el-icon-arrow-left"></i>
            <span>评价</span>
            <i></i>
        </div>
        <ul class="eva-lists">
            <li class="eva-list">
                <div class="eva-left">
                    <div class="goods-pic"><img src="../../assets/img/mpic1.png" alt="" /></div>
                    <div class="goods-name">红烧鲫鱼</div>
                </div>
                <div class="eva-right">
                    <div class="starts">
                        <ul id = "pingStar">
                            <li rel = "1"></li>
                            <li rel = "2"></li>
                            <li rel = "3"></li>
                            <li rel = "4"></li>
                            <li rel = "5"></li>
                        </ul>
                        <input type="hidden" value="" id = "startP" />
                        
                    </div>
                    <div class="eva-words">
                        <el-input
                          type="textarea"
                          :rows="5"
                          placeholder="点评一下吧，您的意见很重要哦"
                          v-model="textarea">
                        </el-input>
                    </div>
                </div>
            </li>
        </ul>
        <div class="o-pjia">
            <div class="pjiaBtn">
            提交评价
            </div>
        </div>
        
        
    </div>
</template>
<script type="text/javascript">
    import $ from 'jquery'; 
    import '../../assets/libs/pingfen.js'
    import './y_evaluate.scss';
    export default{
        data() {
            return {
                textarea: ''
            }
        }
    }

</script>