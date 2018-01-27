<template>
    <div>
        <search v-on:refresh="refresh"></search>
        <el-table :data="dataset" border style="width: 100%" highlight-current-row>
            <el-table-column fixed type="selection" width="55"></el-table-column>
            <el-table-column fixed label="操作" width="180">
                <template scope="props">  
                    <el-button type="info" size="small" icon="edit" @click="updategoods(props.row)">修改</el-button>
                    <el-button type="danger" size="small" icon="delete" @click="del_goods(props.row)">删除</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="id" label="菜编号" width="100" sortable resizable show-overflow-tooltip></el-table-column>
            <el-table-column prop="title" label="菜名" width="200" resizable show-overflow-tooltip></el-table-column>
            <el-table-column prop="inventory" label="库存" width="100" sortable resizable show-overflow-tooltip></el-table-column>
            <el-table-column prop="sales" label="销量" width="100" sortable resizable show-overflow-tooltip></el-table-column>
            <el-table-column prop="type" label="类型" width="100" sortable resizable show-overflow-tooltip></el-table-column>
            <el-table-column prop="newPrice" label="现价" width="100" sortable resizable show-overflow-tooltip></el-table-column>
            <el-table-column prop="oldPrice" label="原价" width="100" sortable resizable show-overflow-tooltip></el-table-column>
            <el-table-column prop="classify" label="分类" width="100" resizable show-overflow-tooltip></el-table-column>
            <el-table-column prop="discount" label="折扣" width="100" sortable resizable show-overflow-tooltip></el-table-column>
            <el-table-column prop="create_at" label="添加时间" width="150" sortable resizable show-overflow-tooltip></el-table-column>
            <el-table-column prop="update_at" label="最后更新时间" width="150" sortable resizable show-overflow-tooltip></el-table-column>
        </el-table>
        <paging v-on:refresh="refresh"></paging>
    </div>
</template>

<script>
import search from './toolbar.vue'
import paging from './paging.vue'
import updategoods from './updategoods.vue'

export default {
    data(){
        return {
            dataset: [],
            filter: {
                create_at: function(_date){
                    var date = new Date(_date);
                    var y = date.getFullYear();
                    var M = date.getMonth() + 1;
                    var d = date.getDate();
                    return `${y}-${M}-${d}`;                        
                },
                update_at: function(_date){
                    var date = new Date(_date);
                    var y = date.getFullYear();
                    var M = date.getMonth() + 1;
                    var d = date.getDate();
                    return `${y}-${M}-${d}`;                        
                },
                newPrice: function(_price){
                    return ('￥' + parseFloat(_price).toFixed(2));
                },
                oldPrice: function(_price){
                    return ('￥' + parseFloat(_price).toFixed(2));
                }
            }
        }
    },
    components:{
        search,
        paging,
        updategoods
    },
    beforeMount(){
        var params = this.Params;
        var url = this.IpPort + '/getGoodList';
        var urlStr = this.urlDecode(url,params);
        this.refresh(urlStr);
    },
    mounted(){

    },
    methods:{
        refresh(_urlStr){

            //生成页面
            this.loadingStart();

            this.$http.get(_urlStr).then(res=>{
                res.data.forEach(item=>{
                    item.newPrice = '￥' + item.newPrice;
                    item.oldPrice = '￥' + item.oldPrice;
                    item.create_at = item.create_at.slice(0,10);
                    item.update_at = item.update_at.slice(0,10);
                    item.discount = item.discount * 10 + '折';
                    item.type = item.type==0 ? '无折扣' : '特价菜品';
                })
                this.dataset = res.data;
                console.log(this.dataset);

                this.loadingEnd();
            });
        },
        //单个删除
        del_goods(_item){
            this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var goodsId = _item.id;
                var url = this.IpPort + '/deleteGoods';

                this.$http.get(url + '?id=' + goodsId).then(res=>{
                    console.log(res);
                })

                //删除后刷新页面
                var params = this.Params;
                var url2 = this.IpPort + '/getGoodList'
                var urlStr = this.urlDecode(url2,params)
                this.refresh(urlStr);
            })
            .catch(()=>{
                console.log('取消删除');
            })
        }, 
        //更新商品
        updategoods(_item){
            this.$router.push({name:'updategoods',params:{currentGoods:_item}});
        }
    }
}
</script>
