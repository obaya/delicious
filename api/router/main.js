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
            app.get("/getSlideShow",function(req,res){
                        var num =  req.query.number;
                        var sql = `select id,imgUrl,title from dc_goods order BY sales desc limit ${num?num:4}`;
                        mysql.select(sql,function(err,rows,fields){
                           if(err){
                                return res.send({status:0,mess:err});
                            
                           }else{
                                for(item in  rows){
                                    rows[item]['imgUrl'] = rows[item]['imgUrl'].split(';');
                                }
                                res.send(JSON.stringify(rows));
                           }

                        })
                       
            });
            // 获取商品列表
            app.get("/getGoodList",function(req,res){
                var _impose =  req.query.impose?req.query.impose:8; //只显示8条数据
                var _skip   =  req.query.skip?req.query.skip:0;   // 跳过0条数据
                var _order =  req.query.order?req.query.order:'desc';  //默认是降序
                var _field =  req.query.field?req.query.field:'create_at';   //默认是以create_at          
                var sql =  `select * from dc_goods order BY  ${_field} ${_order} limit ${_skip},${_impose}`;
                mysql.select(sql,function(err,rows,fields){
                        if(err){
                           return res.send({status:0,mess:err});
                            
                        }else{
                            for(item in  rows){
                                rows[item]['imgUrl'] = rows[item]['imgUrl'].split(';');
                             }
                            res.send(JSON.stringify(rows)); 
                        }
                        

               })
            });
            app.get("/getGoodListCount",function(req,res){
                    var sql = `select count(*) from dc_goods`;
                    mysql.select(sql,function(err,rows,fields){
                        if(err){
                            return res.send({status:0,mess:err});
                            
                        }else{
                           return res.send(JSON.stringify(rows[0]['count(*)']));       
                        }
                    });
            });
            app.get("/getClassifyGoods",function(req,res){
                var num =  req.query.number;
                var sql = `SELECT  * FROM dc_goods`;
                mysql.select(sql,function(err,rows,fields){
                     var len = rows.length;
                     console.log(len);
                     for(item in  rows){
                        rows[item]['imgUrl'] = rows[item]['imgUrl'].split(';');
                         var sql = `SELECT  grade,comment FROM dc_comment  where goods_id = ${rows[item]['id']} `;
                        (function(item){ 
                         mysql.select(sql,function(err,_rows,fields){
                                if(err){
                                     return res.send({status:0,mess:err});
                                    
                                }else{
                                    rows[item]['comment'] = _rows;
                                    if(len-- == 1){                   
                                       return res.send(JSON.stringify(rows));
                                    }
                                }
 
                         }) })(item)

                     }
          
              
                })
               
            });

            app.get('/getLikeSearchGoods',function(req,res){
                var keyword = req.query.keyword;
                 if(!keyword)
                 {
                  return res.send({status:0,mess:'keyword,关键字不能为空'}); 
                 }else{

                 var sql = `select id,title,imgUrl,create_at,update_at from dc_goods where title like'%${keyword}%'`;
                 console.log(sql);
                 
                 mysql.select(sql,function(err,rows,fields){
                            if(err){
                                console.log(err);
                                return res.send({status:0,mess:err});
                            }else{
                                return res.send(JSON.stringify(rows));
                            }
                 })
                }
            })


        }
}