<template>
    <div class="y-order">
        <div class="o-header">
            <i class="el-icon-arrow-left"></i>
            <span>我的订单</span>
            <i></i>
        </div>

        <div class="o-state">
            <div class="jindu">
                <i class="el-icon-success"></i>
                <div></div>
                <i class="el-icon-success"></i>
                <div></div>
                <i class="el-icon-success"></i>
            </div>
            <div class="shuoming">
                <p>等待处理</p>
                <p>已确认</p>
                <p>已完成</p>
            </div>
        </div>

        <div class="o-infor">
            <div class="onumber">
                <span>订单号：</span>
                <span>4567890789</span>
            </div>
            <div class="otime">
                <span>下单时间：</span>
                <span>2018-01-17 12:54:06</span>
            </div>
        </div>

        <div class="o-list">
            <ul class="food-list">
                <li class="one-list">
                    <div class="food-name">葱花饼</div>
                    <div>
                        <span><span>2</span>份</span>
                        <span>&times;</span>
                        <span class="red"><span>￥</span>5</span>
                    </div>
                    <div class="red"><span>￥</span>10</div>
                </li>
            </ul>
            <div class="ototal">
                <span>
                    合计：
                    <span class="red"><span>2</span>份</span>
                </span>
                <span>
                    订单金额：
                    <span class="red">￥<span>10</span></span>
                </span>
            </div>
            <div class="opaytype">
                <div>支付类型：现金(<span class="red">已支付</span>)</div>
            </div>
        </div>

        <div class="o-pjia">
            <div class="pjiaBtn">
            我要点评
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import './y_myorder.scss';
    export default{

    }

</script>