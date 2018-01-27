
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
        getList(table,req,res){
            var method = req.query.method?req.query.method:'common';
            var limit =  req.query.limit?req.query.limit:10;
            var skip =  req.query.skip?req.query.skip:0;
            var like =  req.query.like;
            var orderby =  req.query.orderby?req.query.orderby:"create_at";
            var pettem =  req.query.pettem?req.query.pettem:"desc";
            var start =    req.query.start;
            var end =    req.query.end;
            

            var sql = `select * from  ${table} `;
            switch(method){
                case "between":
                if(!start || !end){
                    return res.send({status:0,mess:"区间模式start 和 end 参数必须存在"});             
                }
                sql+= `where create_at between '${start}' and '${end}'`;
                break
                case "like":
                if(!like){
                    return res.send({status:0,mess:"模糊模式like必须存在`"});             
                }
                sql+= `where create_at like '%${like}%'`;
                break
            }
            sql += ` ORDER BY ${orderby} ${pettem} limit ${skip},${limit}`;
            mysql.select(sql,function(err,rows,result){
                    if(err){
                        return res.send({status:0,mess:err});           
                    }else{
                        return res.send(JSON.stringify(rows));            
                    }
            })
        },
        init:function(app){
    
            
            app.get("/insertGoods",function(req,res){
            
                        var minImg =  req.query.minImg;
                        var maxImg =  req.query.maxImg;
                        var title =  req.query.title;
                        var inventory =  req.query.inventory?req.query.inventory:1;
                        var sales =  req.query.sales?req.query.sales:0;
                        var type =  req.query.type?req.query.type:0;
                        var newPrice =  req.query.newPrice;
                        var oldPrice =  req.query.oldPrice;
                        var classify=  req.query.classify;
                        var discount =  req.query.discount?req.query.discount:1;
                        
                        
                        
                        var sql = `insert into dc_goods(ImgUrl,title,inventory,sales,type,newPrice,oldPrice,classify,discount) VALUES('${minImg+";"+maxImg}',"${title}",${inventory},${sales},${type},${newPrice},${oldPrice},'${classify}',${discount})`;
                        mysql.insert(sql,function(err,result){
                                if(err){
                                     return res.send({status:0,mess:err});
                                }else{
                                    return res.send({status:'ok',mess:'添加商品成功'});
                                    };
                        });
                    
                       
            });
            app.get("/updateGoods",function(req,res){
                var id  = req.query.id;
                if(!id){
                    return res.send({status:0,mess:"更新的商品id必须存在"});     
                }
                var minImg =  req.query.minImg;
                var maxImg =  req.query.maxImg;
                var title =  req.query.title;
                var inventory =  req.query.inventory?req.query.inventory:1;
                var sales =  req.query.sales?req.query.sales:0;
                var type =  req.query.type?req.query.type:0;
                var newPrice =  req.query.newPrice;
                var oldPrice =  req.query.oldPrice;
                var classify=  req.query.classify;
                var discount =  req.query.discount?req.query.discount:1;


                var sql = `update dc_goods SET imgUrl=?,title = ?,inventory = ?,sales=?,type=?,newPrice=?,oldPrice=?,classify=?,discount=? where id = ?`
                var arr = [minImg+";"+maxImg,title,inventory,sales,type,newPrice,oldPrice,classify,discount,id];
                mysql.update(sql,arr,function(err,result){
                        if(err){
                            return res.send({status:0,mess:err});     
                        }else{
                            return res.send({status:'ok',mess:'修改成功'});
                        }
                })
            });
            app.get('/deleteGoods',function(req,res){
                var id  = req.query.id;
                if(!id){
                    return res.send({status:0,mess:"删除的商品的id必须存在"});     
                }
                var sql = `delete from dc_goods where id = ${id}`;
                mysql.delete(sql,function(err,result){
                    if(err){
                        return res.send({status:0,mess:err});     
                    }else{
                        return res.send({status:'ok',mess:'删除商品成功'});
                    }
                })
            });


            app.get('/getRegQty',function(req,res){
                    var sql  =  `select DATE_FORMAT(create_at,'%Y%m%d') days,count(*) qty  from dc_user group by days`;  
                    mysql.select(sql,function(err,rows,result){
                                if(err){
                                         return res.send({status:0,mess:err});           
                                }else{
                                        return res.send(JSON.stringify(rows));
                       
                                }

                    });
            });
            app.get('/getGoodsStatus',function(req,res){
                var sql  =  `select DATE_FORMAT(create_at,'%Y%m%d') days,count(*) qty,sum(total) countPrice  from dc_order where state = 2 group by days  ;`;  
                mysql.select(sql,function(err,rows,result){
                            if(err){
                                     return res.send({status:0,mess:err});           
                            }else{
                                    return res.send(JSON.stringify(rows));
                   
                            }

                });
            });
            app.get('/getUserList',function(req,res){
                   this.getList('dc_user',req,res)


            }.bind(this));
            app.get('/updateUser',function(req,res){
                    var id = req.query.id;
                    if(!id){
                        return res.send({status:0,mess:"要更新的用户id必须存在"});                    
                    }
                    var type = req.query.type?req.query.type:0;
                    var phoneNum =  req.query.phoneNum
                    var userName =  req.query.userName;
                    var leaveword =  req.query.leaveword?req.query.leaveword:'什么都没有留下';
                    var coupon =  req.query.coupon?req.query.coupon:0;
                    var cardNum =  req.query.cardNum;
                    var side =    req.query.side;

                    var sql =  `update dc_user set type=?,phoneNum=?,userName=?,leaveword=?,coupon=?,cardNum=?,side=? where id = ?`;

                    var arr = [type,phoneNum,userName,leaveword,coupon,cardNum,side,id];
                    console.log(sql);
                    mysql.update(sql,arr,function(err,result){
                        if(err){
                            return res.send({status:0,mess:err});     
                        }else{
                            return res.send({status:'ok',mess:'修改成功'});
                        }
                    })


            });
            app.get('/deleteUser',function(req,res){
                var id = req.query.id;
                if(!id){
                    return res.send({status:0,mess:"要删除的用户id必须存在"});                    
                }

                var str = `delete from dc_user where id = ${id}`;

                mysql.delete(str,function(err,result){
                    if(err){
                        return res.send({status:0,mess:err});     
                    }else{
                        return res.send({status:'ok',mess:'删除成功'});
                    }
                });
            });

            app.get("/getOrderList",function(req,res){
                this.getList('dc_order',req,res)

            }.bind(this));
            app.get('/updateOrder',function(req,res){
                var id = req.query.id;
                if(!id){
                    return res.send({status:0,mess:"要更新的订单id必须存在"});                    
                }
                var user_id = req.query.user_id
                
                var goods_json = req.query.goods_json
                var total =  req.query.total;
                var type =  req.query.type;
                var tableNum =  req.query.tableNum;
                var orderNum =  req.query.orderNum;
                var state=  req.query.state;
                var serial =    req.query.serial;
                var method =    req.query.method;
                

                var sql =  `update dc_order set user_id=?,goods_json=?,total=?,type=?,tableNum=?,orderNum=?,state=?,serial=?,method=? where id = ?`;

                var arr = [user_id, goods_json,total,type,tableNum,orderNum,state,serial,method,id];
                
                mysql.update(sql,arr,function(err,result){
                    if(err){
                        return res.send({status:0,mess:err});     
                    }else{
                        return res.send({status:'ok',mess:'修改成功'});
                    }
                })
            });
            app.get('/updateOrderState',function(req,res){
                var id = req.query.id;
                if(!id){
                    return res.send({status:0,mess:"要更新的订单id必须存在"});                    
                }
           
                var state=  req.query.state;
       

                var sql =  `update dc_order set state=? where id = ?`;

                var arr = [state,id];
                
                mysql.update(sql,arr,function(err,result){
                    if(err){
                        return res.send({status:0,mess:err});     
                    }else{
                        return res.send({status:'ok',mess:'修改成功'});
                    }
                })
            });
            app.get('/deleteOrder',function(req,res){
                var id = req.query.id;
                if(!id){
                    return res.send({status:0,mess:"要更新的订单id必须存在"});                    
                }

                var sql =  `delete from  dc_order where id = ${id}`;
  
                mysql.delete(sql,function(err,result){
                    if(err){
                        return res.send({status:0,mess:err});     
                    }else{
                        return res.send({status:'ok',mess:'删除订单成功'});
                    }
                })
            });
            app.get('/getGoodsGrade',function(req,res){
                        var option =  req.query.option?req.query.option:'sf';
                    
                     option = option=='sf'?'grade>=3':'grade<3';
                var sql =    ` select count(*),DATE_FORMAT(b.create_at,'%Y%m%d') as commentDate from dc_user as a INNER JOIN dc_comment as b on a.id = b.user_id and ${option} GROUP BY DATE_FORMAT(b.create_at,'%Y%m%d')`
       
                mysql.select(sql,function(err,rows,result){
                    if(err){
                             return res.send({status:0,mess:err});           
                    }else{
                            return res.send(JSON.stringify(rows));
           
                    }

            })

            })





        }
}