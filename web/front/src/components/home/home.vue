<template>
  <div id="p_container"  >
    <goodsDetailmodel v-if="show" :gid="gid"  @increment="a"></goodsDetailmodel>
    <!-- <div id="loading"></div> -->
    <el-header>
      <div class="p_header_conntent" @click="search">  
        <el-input id="homeinput" placeholder="请输入内容" v-model="input10" clearable>
        </el-input>

       <el-button type="primary" icon="el-icon-search" ></el-button>
     </div>
    </el-header>

    <main id="p_main">
       <!-- Carousel -->
       <section>
          <!-- image -->
          <section id="tabPic">
              <ul id="picList" style="transition: 0.5s; transform: translateX(-2250px);">
                  <li v-for="(item, key) in dataset"><img v-bind:src="item.carouselUrl"  alt="" /></li>
              </ul>
              <!-- dot -->
              <section class="picMask">
                  <p>太晚卤菜特价，美味ni知道！</p>
                  <nav>
                    <a></a><a></a class="active"><a></a><a ></a>
                  </nav>
              </section>
              <a href="javascript:;" class="restaurant">蓝湾小吃</a>
          </section>
       </section>

       <!-- body -->
       <section class="introduce-msg">
    <!--      <section class="introduce">
           <p>蓝湾小吃【营业中】</p>
           <p>地址：河南省郑州市金水区农业路71号中州国际饭店</p>
           <p>起价送：￥30元送餐</p>
         </section> -->
         <section class="Order">
           <div class=" Eat" ><img src="../../assets/1.jpg" alt="" @click="Eat"/></div>
           <div class=" Take-out"><img src="../../assets/2.jpg" alt="" @click="Take_out"/></div>
         </section>
       </section>
       <!-- 特价 -->
       <section class="p_characteristic ">
         <h1 class="p_c_title"><img src="../../assets/characteristic.png" alt="" /><p class="mtitle">超值实惠，先点两份</p></h1>
           <el-row >
             <el-col :span="12" v-for="(goodsitem, key) in goods" class="p_c_content">
                <div class="grid-content bg-purple">
                  <div class="p_c_content2" >
                    <img v-bind:src="goodsitem.imgUrl[0]" width="100%" alt="" @click="showgoods" :id="goodsitem.id"/>
                    <p><a class="title" v-text ="goodsitem.title"></a><a class="price" v-text="'￥'+goodsitem.newPrice"></a></p>
                    <p><a class=" sale" v-text="'月售'+goodsitem.sales"></a><a class="add "><i class="el-icon-circle-plus" style="color:#FF4E00;" @click="add" :id="goodsitem.type"></i></a></p>
                  </div>
                </div>
              </el-col>
           </el-row>
        
       </section>
       <!-- 商家推荐 -->
       <section class="p_characteristic p_recommend">
         <h1 class="p_c_title"><img src="../../assets/recommend.png" alt="" /><p class="mtitle">超值实惠，先点两份</p></h1>
           <el-row >
             <el-col :span="12" v-for="(recommenditem, key) in recommend" class="p_c_content">
                <div class="grid-content bg-purple">
                   <div class="p_c_content2" >
                      <img v-bind:src="recommenditem.imgUrl[0]" width="100%" alt="" @click="showgoods" :id="recommenditem.id"/>
                      <p><a class="title" v-text ="recommenditem.title"></a><a class="price" v-text="'￥'+recommenditem.newPrice"></a></p>
                      <p><a class=" sale" v-text="'月售'+recommenditem.sales"></a><a class="add "><i class="el-icon-circle-plus"  @click="add" style="color:#FF4E00;" ss:id="recommenditem.type"></i></a></p>
                    </div>
                </div>
              </el-col>
           </el-row>
       </section>
       
    </main>
     <div id="homefoot" style="height:1.333333rem;position:fixed;"><footermodel color="index"></footermodel></div>
  </div>

</template>

<script>
  import './home.scss'
  import baseUrl from '../../utils/baseurl.js';
  import goodsDetailmodel from '../../components/goodsDetail/goodsDetail.vue';
  import footermodel from '../../components/footer/footer.vue';
  export default {
    name: 'app',
    data () {
      return {
         user_id:'',
         qty:1,
         gid:0,
         input10: '',
         dataset: [],
         goods: [],
         recommend: [],
         show:false,
         
      }
    }, 
    methods: {
      a(){
         this.show=false;
      },
      search: function(){
        this.$router.push({name:'homeSearch'});
      },
      add(e){
        if(e.target.tagName == 'I'){
          var type = '';
          var goods_id = e.target.parentNode.parentNode.parentNode.children[0].id;
          var Take_outcookie = this.Cookie.getCookie('Take_out');
          if(Take_outcookie==='wai'){
            type = 1;
          }else{
            type = 0;
          }

          baseUrl.get({
            url : "/insertCart" ,
            params : {
              type : type,
              goods_id:goods_id,
              user_id:this.user_id,
            },
          }).then((res)=>{
              this.$message({
                  message: '加购成功',
                  type: 'success'
              });
            
          })
        }
      },
      showgoods:function(e){
         if(e.target.nodeName == 'IMG'){
            this.gid = e.target.id;
            this.show = true;
        
         }
      },
      Take_out:function(){
        this.$router.push('classify');
        document.cookie = 'Take_out =' + 'wai' ;

      },
      Eat:function(){
        this.$router.push('classify');
        document.cookie = 'Take_out =' + '' ;
      }


    },
    components: {
      footermodel,
      goodsDetailmodel
    },
    // beforeMount(){
    //   document.onreadystatechange = completeLoading;
    //   function completeLoading() {
    //     if (document.readyState == "complete") {
    //         var loadingMask = document.getElementById('loading');
    //         loadingMask.parentNode.removeChild(loadingMask);
    //     }
    //   }
    // },
    mounted(){
      var CrDate = '';
      var useridcookie = this.Cookie.getCookie('user_id');
      if(useridcookie ===''){
        var Atanisi = Math.floor(Math.random() * 9999);  
        var myDate = new Date();  
        var tm = myDate.getMinutes();         //分  
         if (tm >= 1 && tm <= 9) {  
           tm = "0" + tm;  
        }  
        var tS = myDate.getSeconds();          //秒  
         if (tS >= 1 && tS <= 9) {  
            tS = "0" + tS;  
        }  
        //时间  
        CrDate =tm+ tS+Atanisi;
        var Num = '';
        baseUrl.get({
           url : "/register" ,
           params : {type:0,cardNum:CrDate}
        }).then(function(res){
          Num = res.data.result.insertId;
          this.user_id = Num;
          document.cookie = 'user_id =' + Num ;
          document.cookie = 'cardNum =' + CrDate ;
        }.bind(this));
      }else{
          this.user_id=this.Cookie.getCookie('user_id');
      }



      
    

      //轮播图
      baseUrl.get({
        // url : "/getSlideShow" 
        url : "/getCarousel" 
      }).then(function(res){
    
          this.dataset = res.data;
          function view() {
              return {
                  w: document.documentElement.clientWidth,
                  h: document.documentElement.clientHeight
              };
          }
          //绑定事件
          function bind(obj, ev, fn) { 
              if (obj.addEventListener) {
                  obj.addEventListener(ev, fn, false);
              } else {
                  obj.attachEvent('on' + ev, function() {
                      fn.call(obj);
                  });
              }
          }
               //删除class类名
          function removeClass(obj, sClass) { 
              var aClass = obj.className.split(' ');
              if (!obj.className) return;
              for (var i = 0; i < aClass.length; i++) {
                  if (aClass[i] === sClass) {
                      aClass.splice(i, 1);
                      obj.className = aClass.join(' ');
                      break;
                  }
              }
          }
          //添加class类名
          function addClass(obj, sClass) { 
              var aClass = obj.className.split(' ');
              if (!obj.className) {
                  obj.className = sClass;
                  return;
              }
              for (var i = 0; i < aClass.length; i++) {
                  if (aClass[i] === sClass) return;
              }
              obj.className += ' ' + sClass;
          }
          //属性
          function Carousel(name){  
            this.index = 0;
            this.iX = 0;
            this.iW = view().w;
            this.oTimer = 0;
            this.iStartTouchX = 0;
            this.iStartX = 0;

            // 绑定事件
            this.bindEvent();
          }  
          //方法
          Carousel.prototype={  

            constructor:Carousel,

            //绑定事件 
            bindEvent(){
              this.getDom();
              this.playAuto();
              let that = this;
              //点击(手按下)
              bind(this.oTab,"touchstart",function(e){
                clearInterval(that.oTimer);
                that.oList.style.transition="none";  
                // changedTouches: 涉及当前(引发)事件的触摸点的列表（触摸改变）
                e = e.changedTouches[0];
                that.iStartTouchX = e.pageX;
                that.iStartX = that.iX;
              });
              // 移动
            
              bind(this.oTab,"touchmove",function(e){ 
                e = e.changedTouches[0];
                let iDis = e.pageX - that.iStartTouchX;
                //图片的移动距离差值
                that.iX = that.iStartX + iDis;
                that.oList.style.transform = "translateX(" + that.iX + "px)";
              });
              // 结束（手抬起）
              bind(this.oTab,"touchend",function(){
                that.index = that.iX/that.iW;
                that.index = -Math.round(that.index);
                // 判断运动边界
                if(that.index < 0){
                  that.index = 0;
                }
                if(that.index > that.aNav.length - 1){
                  that.index = that.aNav.length - 1;
                }
                // 切换
                that.slideTab();
                // 自动播放
                that.playAuto();
              });
            },

            //获取节点
            getDom(){
              // 轮播
              this.oTab = document.getElementById("tabPic");
              this.oList = document.getElementById("picList");
              this.aNav = this.oTab.getElementsByTagName("nav")[0].children;
            }, 

            //自动播放
            playAuto(){
              let that = this;
              this.oTimer = setInterval(() => {
                that.index++; 
                that.index = that.index%that.aNav.length;
                
                that.slideTab();
              },2000);
            },

            //切换
            slideTab(){
              // 移动的距离
              this.iX = -this.index*this.iW;
              //this.oList ：ul外层div的宽度
              this.oList.style.transition="0.5s";
              this.oList.style.transform="translateX(" + this.iX + "px)";
              for(let i = 0;i < this.aNav.length;i++){
                removeClass(this.aNav[i],"active");
              }
              addClass(this.aNav[this.index],"active");
            }
          }
          //实例化
          new Carousel();  
      }.bind(this)).then(function(_res){
          baseUrl.get({
            url : "/getGoodList" ,
            params : {impose:9999999}
          }).then(function(_res){
              let recommenddata= [];
              let characteristic = [];
              let res = _res.data.forEach((item,idx)=>{
                if (item.type===0) {
                  characteristic.push(item);
                  this.goods = characteristic.slice(0, 4);
                }else{
                  recommenddata.push(item);
                  this.recommend = recommenddata;
                }
            }) 
          }.bind(this))
      }.bind(this));
    }
  }
</script>