<template>
  <el-container id="p_container" class='homeSearch_detail'>
     <goodsDetailmodel v-if="show" :gid="gid"  @increment="a"></goodsDetailmodel>
    <el-header id="p_search_header">
      <div class="header_icon"><i class="el-icon-back" @click='backs' ></i>|&nbsp;搜索</div>
      <div @click="search">  
        <input id="homesearch" placeholder="请输入内容"  clearable>
        </input>
       <el-button type="primary" icon="el-icon-search" class="p_search_btn" @click=" search_goodsdetail"></el-button>
     </div>
    </el-header>
    <el-main>
      <div class="item_list" @click.prevent="goodslist">  
        <p class="goodsitem" v-for="(merchantitem, key) in merchant" :id="merchantitem.id" v-text ="merchantitem.title"></p>
      </div>     
     
    </el-main>

  </el-container>     
           
</template>
<script>
  import $ from 'jquery'
  import './homesearch.scss'
  import goodsDetailmodel from '../../components/goodsDetail/goodsDetail.vue';
  import baseUrl from '../../utils/baseurl.js';
  export default {
    name: 'app',
    data() {
      return {
        gid:0,
        merchant: [],
        g2_detail: [],
        show:false,
      }
       
    }, 
    methods: {
      backs:function(){
        this.$router.push({name:'home'})
      },
      search(){
        let that = this;
        let search_input = $('#homesearch')[0];
        search_input.oninput = ()=>{
          let keyword = search_input.value;
          // console.log(keyword);
          baseUrl.get({
            url : "/getLikeSearchGoods",
            params : {keyword:keyword} 
          }).then((res)=>{
            that.merchant= res.data;
          })
        }
      },
      goodslist(_event){
        let search_input = $('#homesearch')[0];
        search_input.value = "";
        if(_event.target.tagName == 'P'){
          search_input.value = _event.target.innerText;
          this.gid =  _event.target.getAttribute('id')
        }
      },
      a(){
         this.show=false;
      },
      search_goodsdetail: function(){
   
        this.show = true;
      },

    },
    components: {
        goodsDetailmodel
      },

  }
</script> 