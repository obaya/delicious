
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
        // getOrder:function(req,res,field){

        //     var para =  req.query[field];
        //     if(!para){
        //        return  res.send({status:0,mess:`${field}参数不能为空`});       
        //     }
        //     var sql = `select * from dc_order where ${field} = ${user_id}`;
        //     mysql.select(sql,function(err,rows,result){
        //             if(err){
        //             return    res.send({status:0,mess:err});
        //             }else{
        //              return   res.send(JSON.stringify(rows));
        //             }
        //     });
        // },
        init:function(app){
            // 获取轮播图数据
        
            app.get("/getUserOrder",function(req,res){
       

          
                    var user_id =  req.query.user_id;
                    if(!user_id){
                       return  res.send({status:0,mess:'user_id参数不能为空'});       
                    }
                    var sql = `select * from dc_order where user_id = ${user_id}`;
                    mysql.select(sql,function(err,rows,result){
                            if(err){
                            return    res.send({status:0,mess:err});
                            }else{
                             return   res.send(JSON.stringify(rows));
                            }
                    });
                
                       
            });
            app.get("/getUserOrderA",function(req,res){
                  var   phoneNum =    req.query.phoneNum;
                  if(!phoneNum){
                    return  res.send({status:0,mess:'phoneNum参数不能为空'});     
                  }
                  ///phone NUm 改为id
                  var sql = `SELECT * FROM dc_user as a INNER JOIN dc_order as b on a.id = b.user_id where a.id = ${phoneNum}
                  `;
                  mysql.select(sql,function(err,rows,result){
                    if(err){
                    return    res.send({status:0,mess:err});
                    }else{
                            //获取订单数
                            var len = 0;
                        
                            for(var item in rows){
                                var goods_json = rows[item].goods_json = JSON.parse(rows[item].goods_json);
                                        //获取请求的次数
                                   for(var _item in goods_json){
                                        len++;
                                        
                                   }
                            }
                            for(var item in rows){
                                 for (var _item  in rows[item]['goods_json']){
                                       var goods_id =  rows[item]['goods_json'][ _item]['goods_id'];
                                       var sql = `select title,imgUrl,newPrice,oldPrice from dc_goods where id = ${goods_id}`;
                                      (function(item,_item){ mysql.select(sql,function(err,_rows,result){
                                          
                                                if(err){
                                                return    res.send({status:0,mess:err});
                                                 }else{
                                                        console.log(_rows);
                                                         for(var tem  in _rows[0]){
                                                              
                                                                rows[item]['goods_json'][ _item][tem] = _rows[0][tem];
                                                         }
                                                        
                                                        len--;
                                                        if(!len){
                                                                return   res.send(JSON.stringify(rows));

                                                        }
                             
                                                }
                                       });})(item,_item)
                                        
                                 }
                            }
                          
                           
                               
                          
     
                    }})
                  

            })
        }
   
}