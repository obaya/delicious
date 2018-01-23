<template>
  <el-container id="p_container">
    <el-header id="p_search_header">
      <div class="header_icon"><i class="el-icon-back"></i>|&nbsp;搜索</div>
      <div class="p_header_conntent" @click="search">  
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
  import baseUrl from '../../utils/baseurl.js';
  
  export default {
    name: 'app',
    data() {
         return {
           id:0,
           merchant: [],
           g2_detail: [],
         }
       
    }, 
    methods: {
      search(){
        let that = this;
        let search_input = $('#homesearch')[0];
        search_input.oninput = ()=>{
          console.log(666);
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
          this.id =  _event.target.getAttribute('id')
        }
      },
    
      search_goodsdetail: function(){
        console.log(666)
        this.$router.push({name:'goodsDetail'});
      }
    },



  }
</script>s