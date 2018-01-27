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
            app.get("/insertCart",function(req,res){
                        var goods_id =  req.query.goods_id;
                        var user_id = req.query.user_id;
                        if(!goods_id || !user_id){
                          return   res.send(JSON.stringify({status:"no",mess:"goods_id 和 user_id 必须存在"}));             
                        }else{
                            var qty = req.query.qty?req.query.qty:1;
                            var type = req.query.type? req.query.type:0;
                            var tableNum = req.query.tableNum?req.query.tableNum:0;
                            var querySql = `select * from dc_card where goods_id = ${goods_id} and user_id = ${user_id} `;
                            mysql.select(querySql,function(err,data){
                                    if(err){
                                             return   res.send({status:0,mess:err});
                                        
                                    }else{
                                        if(!data.length){
                                            //不存在则插入数据
                                            var sql = `insert into dc_card (goods_id,user_id,qty,type,tableNum) values(${goods_id},${user_id},${qty},${type},${tableNum});`;
                                            mysql.insert(sql,function(err,result){
                                            return   res.send({status:'ok',mess:'插入成功'});
                                            })
                                        }else{
                                            var sql = `UPDATE dc_card set qty=? where goods_id =? and user_id =?`;
                                            arr = [parseInt(data[0].qty)+parseInt(qty),goods_id,user_id];
                                            mysql.update(sql,arr,function(err,result){
                                                console.log(result);
                                            return    res.send({status:'ok',mess:'更新成功'});
                                                
                                            })
                                        }
                                    }
                            });
                        }
    

                        
                        

                       
            });

            app.get('/createOrder',function(req,res){
                var user_id = req.query.user_id;
                if(!user_id){
                   return res.send({status:0,mess:'user_id 必须存在'});
                }
                var tableNum = req.query.tableNum?req.query.tableNum:0;
                var method = req.query.method?req.query.method:0;
                var total =req.query.total?req.query.total:0;
                // if(!tableNum || !method  || !total ){
                //   return   res.send({status:0,mess:'tableNum(座位号)method(支付方式) total(总数) 三个参数必须存在'});                    
                // }
                // 订单类型(堂食 或 外卖,默认堂食)
                var type = req.query.type?req.query.type:0;
           
                //订单状态 默认为0
                var state = 0;
                //流水号
                var serial = parseInt(Math.random()*(10000-1000+1)+100,10);
                //订单号
                var orderNum ='#'+ parseInt(Math.random()*(1000000000-10000000+1)+10000000,10);
            
                
                
                var sql =`select * from dc_card where user_id = ${user_id}`;
                console.log(sql);
                
                mysql.select(sql,function(err,rows,result){
                        if(!rows.length){
                         return   res.send({status:0,mess:'购物车为空不可以生成订单'});
                        }else{
                        
                           type = rows[0].type;
                           var goods_json = JSON.stringify(rows);
                            
                        var sql = `insert into dc_order (user_id,goods_json,total,type,tableNum,orderNum,state,serial,method) values (${user_id},'${goods_json}',${total},${type},${tableNum},'${orderNum}',${state},${serial},${method})`;
                       console.log(sql);
                        mysql.insert(sql,function(err,result){
                              var sql = `delete  from dc_card  where user_id = ${user_id}`;
                              mysql.delete(sql,function(err,result){
                                 return    res.send({status:'ok',mess:'插入成功'});     
                              })
                        })
                    }
                })
                    
            });


            app.get('/getUserCart',function(req,res){
                    var user_id =  req.query.user_id;
                    if(!user_id){
                       return res.send({status:0,mess:'user_id参数不能为空'});       
                    }
                    var type =  req.query.type? req.query.type:0;
                    
                    var sql = `select a.id,a.goods_id,a.user_id,a.qty,a.type,a.tableNum,a.create_at,a.update_at,b.imgUrl,b.title,b.inventory,b.sales,b.sales,b.type,b.newPrice,b.oldPrice,b.classify,b.discount as goodsType  from dc_card as a  INNER JOIN dc_goods as b on a.goods_id = b.id where a.user_id =  ${user_id} and a.type = ${type}  `;
                    mysql.select(sql,function(err,rows,result){
                            if(err){
                             return   res.send({status:0,mess:err});
                            }else{
                            return    res.send(JSON.stringify(rows));
                            }
                    });
                
            });
            

            app.get('/updateCartQty',function(req,res){
                    var id =  req.query.id;
                
                    var goods_id =  req.query.goods_id;
                    var user_id =  req.query.user_id;
                    var qty=  req.query.qty;
                    console.log(id,goods_id,user_id,qty);
                    if(!id || !goods_id || !user_id || !qty){
                      return  res.send({status:0,mess:"参数id goods_id user_id qty 必须同时存在"});
                    }else{
                       

                var sql = `UPDATE dc_card set qty=? where id=? and  goods_id=? and user_id=? `;
                arr = [qty,id,goods_id,user_id];
                mysql.update(sql,arr,function(err,result){
                    if(err){
                        return   res.send({status:0,mess:err});

                    }else{
                        return  res.send({status:'ok',mess:'更新成功'});
                        
                    }
                    
                })
            }
            })
            app.get('/deleteUserCartGoods',function(req,res){
                var user_id =  req.query.user_id;  
                var goods_id =  req.query.goods_id;
                
                if(!goods_id || !user_id  ){
                    return   res.send({status:0,mess:'用户id(user_id)和商品id(goods_id) 必须存在'});
                }

                var sql = `delete from dc_card where user_id=${user_id} and goods_id=${goods_id}`;
                mysql.delete(sql,function(err,result){
                    if(err){
                        return   res.send({status:0,mess:err});

                    }else{
                        return  res.send({status:'ok',mess:'删除成功'});
                        
                    }
                })



            })            
                
            app.get('/clearUserCart',function(req,res){
                var user_id =  req.query.user_id;  
                var type =  req.query.type;  
                
                if(!user_id || !type){
                    return   res.send({status:0,mess:'用户id(user_id) 和类型(type)参数必须存在 必须存在'});
                }

                
                var sql = `delete from dc_card where user_id=${user_id} and type=${type}`;
                mysql.delete(sql,function(err,result){
                    if(err){
                        return   res.send({status:0,mess:err});

                    }else{
                        return  res.send({status:'ok',mess:'删除成功'});
                        
                    }
                })
              



        })            
          
              
            
               
            
        }
}