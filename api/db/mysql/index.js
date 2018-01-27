const mysql = require('mysql');

module.exports = {
    init(option){
        // 数据库配置项
        this.ct = mysql.createConnection({
            host:option.host,
            user:option.root,
            password:option.password,
            port:option.port,
            database:option.database
        });
        //链接数据库
        this.ct.connect(function(err){
            if(err){
                  console.log(err);
                  return
            }
            console.log('链接成功')
        })
    },
    select(sql,fn){
        this.ct.query(sql,function(err,rows,fields){
            fn(err,rows,fields);
        })
    },
    update(sql,arr,fn){
        this.ct.query(sql,arr,function(err,result){
            fn(err,result);
        })
    },
    delete(sql,fn){
        this.select(sql,fn);                
    },
    insert(sql,fn){
        this.select(sql,fn);        
    }
}