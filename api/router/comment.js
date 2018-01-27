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
        
            app.get("/insertComment",function(req,res){
       

                var user_id =  req.query.user_id;
                var goods_id =  req.query.goods_id;
                var grade=  req.query.grade;
                var comment =  req.query.comment;
                if(!user_id  || !goods_id ||!grade|| !comment  ){
                    return res.send({status:0,mess:'user_id goods_id grade comment 都不能为空'});       

                }
                
                
                
                var sql = `insert into dc_comment(user_id,goods_id,grade,comment) VALUES(${user_id},${goods_id},${grade},'${comment}')`;
                console.log(sql);
                mysql.insert(sql,function(err,result){
                        if(err){
                             return res.send({status:0,mess:err});
                        }else{
                            return res.send({status:'ok',mess:'添加评论成功'});
                            };
                });

         
                
                       
            });


            app.get('/getComment',function(req,res){
                    // var goods_id =  req.query.goods_id;
                    // if(!goods_id){
                    // return res.send({status:0,mess:'goods_id参数不能为空'});       
                    // }
                    var sql = `select a.id,a.user_id,a.goods_id,a.grade,a.comment,a.create_at,a.update_at,b.type,b.phoneNum,b.userName,b.leaveword,b.cardNum,b.side,c.imgUrl,c.title,c.newPrice from dc_comment as a INNER JOIN dc_user as b on a.user_id = b.id  INNER JOIN dc_goods as c on a.goods_id = c.id order BY create_at desc`;

                    mysql.select(sql,function(err,rows,result){
                        if(err){
                            return   res.send({status:0,mess:err});
                           }else{
                           return    res.send(JSON.stringify(rows));
                           }
                    })
            })

    



        }
   
}