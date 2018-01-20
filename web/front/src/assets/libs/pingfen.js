window.onload = function(){
    var s = document.getElementById("pingStar"),
        n = s.getElementsByTagName("li"),
        input = document.getElementById("startP");//保存所选值
    clearAll = function(){
        for(var i = 0;i < n.length;i++){
            n[i].className = "";
        }
    }
    for(var i = 0;i < n.length;i++){
        n[i].onclick = function(){
            var q = this.getAttribute("rel");
            clearAll();
            input.value = q;
            for(var i = 0;i < q;i++){
                n[i].className = "on";
            }
        }
    }
}

            
       