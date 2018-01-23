<template>
    <div class="evaStar">
        <ul class="star">
            <li v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" @click="stars(index)" track-by="index"></li><!--性能优化 track-by 数据不改变时不会重新渲染-->
        </ul>
    </div>
</template>

 


<script>
export default{
    data(){
        return{
            score: 0,
        }
    },
    computed:{ //计算属性
        itemClasses(){
            let result = []; // 返回的是一个数组,用来遍历输出星星
            let score = Math.floor(this.score * 2 ) / 2; // 计算所有星星的数量
            let hasDecimal = score % 1 !== 0; // 非整数星星判断
            let integer = Math.floor(score); // 整数星星判断
            for(let i=0;i<integer;i++){ // 整数星星使用on
                result.push("on"); // 一个整数星星就push一个CLS_ON到数组
            }
            if(hasDecimal){ // 非整数星星使用half
                result.push("half"); // 类似

            } 
            while(result.length < 5){// 余下的用无星星补全,使用off
                result.push("off");
            }
            return result;
        }
    },
    methods:{
        stars:function(index){
            this.score = index + 1;
            // 将评分传给父组件
            this.$emit('getStart',index)
        }
    }

}
</script>

 



<style>
    .evaStar{
        padding-top: .34rem;
    }
    .star{
        font-size: 0;
    }
    .star-item{
        display: inline-block;
        background-repeat: no-repeat;
        width: .6rem;
        height: .6rem;
        margin-left: .27rem;
        background-size: 100%;
    }
    .star-item.on{
        background-image: url(../../assets/img/star_on.png);
    }
    /*.star-item.half{
    background-image: url(../assets/images/half.png);
    }*/
    .star-item.off{
        background-image: url(../../assets/img/star_off.png);
    }
</style>