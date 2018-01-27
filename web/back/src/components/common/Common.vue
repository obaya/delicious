<script>
    exports.install = function (Vue, options) {

        //全局变量
        //Ip + Port
        Vue.prototype.IpPort = 'http://10.3.136.27:88'

        //请求商品参数
        Vue.prototype.Params = {impose:10,order:'asc',skip:0}

        //全局方法
        //object =>url string
        Vue.prototype.urlDecode = function(_url,_data){
            _url += (_url.indexOf("?") != -1) ? "" : "?";
            for(var k in _data) {
                _url += ((_url.indexOf("=") != -1) ? "&" : "") + k + "=" + encodeURI(_data[k]);
            }
            return _url;
        }

        //loading
        var loading = document.createElement('div');
        Vue.prototype.loadingStart = function(){
            loading.classList.add('loading');
            document.body.appendChild(loading);
        }
        Vue.prototype.loadingEnd = function(){
            loading.classList.remove('loading');
        }

        //消息提示
        Vue.prototype.open2 = function(){
            this.$message({
                message: '恭喜你，成功操作',
                type: 'success'
            });
        }
        Vue.prototype.open100 = function(){
            this.$message({
                message: '恭喜你，登录成功',
                type: 'success'
            });
        }
        Vue.prototype.open101 = function(){
            this.$message.error('关键词不能为空');
        }
        Vue.prototype.open4 = function(){
            this.$message.error('错了哦');
        }


        
    };
</script>