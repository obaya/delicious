const mysql  = require('../db/mysql');
mysql.init(
    {
        host:"127.0.0.1",
        root:"root",
        password:"",
        port:"3306",
        database:"dc"
    }
)

module.exports = {
        init:function(app){
            // 获取轮播图数据
            app.get("/getCarousel",function(req,res){
                     
          var querySql = `select b.title,a.carouselUrl,a.goods_id as id FROM  dc_carousel as a   INNER JOIN dc_goods as b on  a.goods_id = b.id `;
                            mysql.select(querySql,function(err,rows){
                                    if(err){
                                             return   res.send({status:0,mess:err});
                                        
                                    }else{
                                        return    res.send(JSON.stringify(rows));
    
                                    }
                            });
                        }
    

                        
                        

                       
            );

       
        
          
              
            
               
            
        }
}