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
            app.get("/register",function(req,res){
                var type = req.query.type?req.query.type:0;
                var phoneNum = req.query.phoneNum?req.query.phoneNum:0;
                var userName =req.query.userName;
                var leaveword =req.query.leaveWord;
                var coupon =req.query.coupon?req.query.coupon:0;
                var cardNum =req.query.cardNum?req.query.cardNum:0;
                var side =req.query.side;
                if(phoneNum==0 &&  cardNum==0){
                   return  res.send({result:'no',mess:'phoneNum 和 cardNum必须存在与一个'});    
                }else if(!phoneNum &&  cardNum){
                    var _sql = `select * from dc_user where  cardNum = ${cardNum}`;
                    
                }else if(phoneNum &&  !cardNum){
                    var _sql = `select * from dc_user where  phoneNum = ${phoneNum}`;
                    
                }else{
                     var _sql = `select * from dc_user where phoneNum = ${phoneNum} or cardNum = ${cardNum}`;
                    
                }
                console.log(_sql);
                   mysql.select(_sql,function(err,rows){
                            if(err){
                                  res.send({result:'no',mess:err});
                                  return false;
                            }
                            if(!rows.length){
                                var sql =  `insert into dc_user(type,phoneNum,userName,leaveword,coupon,cardNum,side) VALUES (${type},${phoneNum},'${userName}','${leaveword}',${coupon},${cardNum},'${side}')`
                                mysql.insert(sql,function(err,result){
                                            if(err){
                                                res.send({result:'no',mess:err});
                                            }else{
                                                res.send({result:'ok',mess:'注册成功',result:result});
                                                return false;
                                            }
                                })
                            }else{

                               res.send({result:'no',mess:'手机号或者卡号已经存在'});
                               return false;
                                
                            }
                   })

                        

                       
            });

            app.get("/getUserInfoA",function(req,res){
                var   phoneNum =    req.query.phoneNum;
                if(!phoneNum){
                  return  res.send({status:0,mess:'phoneNum参数不能为空'});     
                }
                // id 被更改了
                var sql = `SELECT * FROM dc_user where id = ${phoneNum}`;
                mysql.select(sql,function(err,rows,result){
                  if(err){
                  return    res.send({status:0,mess:err});
                  }else{
                   return   res.send(JSON.stringify(rows));
                  }})
        
            });
            
            app.get("/updateUserInfo",function(req,res){
                var  id = req.query.id;
                var  phoneNum = req.query.phoneNum;
                var  userName = req.query.userName;
                var  side = req.query.side;
                    console.log(side);
                
                if(!id){
                  return  res.send({status:0,mess:'修改的用户id不能为空'});     
                }

                var sql =  `update dc_user set phoneNum=?,userName=?,side=? where id = ?`;

                var arr = [phoneNum,userName,side,id];
                mysql.update(sql,arr,function(err,result){
                    if(err){
                        return res.send({status:0,mess:err});     
                    }else{
                        return res.send({status:'ok',mess:'修改成功'});
                    }
                })

 
            });         
  
  
        
          
        }
}