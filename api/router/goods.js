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



            app.get('/getGoodsInfo',function(req,res){
                    var id =  req.query.id;
                    if(!id){
                       return res.send({status:0,mess:'id参数不能为空'});       
                    }
                    var sql = `select * from dc_goods where id=${id} `;
                    mysql.select(sql,function(err,rows,result){
                            if(err){
                             return   res.send({status:0,mess:err});
                            }else{
                            return    res.send(JSON.stringify(rows));
                            }
                    });
                
            });
                
        
          
              
            
               
            
        }
}