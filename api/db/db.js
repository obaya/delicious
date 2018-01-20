var mysql = require('mysql');

var db = mysql.createPool({
    connectionLimit: 10,
    host: "10.3.136.47",
    user: 'root',
    password: '',
    database: 'test',
    multipleStatements: true
})

module.exports = {
    select: function(_sql, _callback){
        db.query(_sql, function(error, results, fields){
            if(error){
                _callback({status: false, error: error})
            } else {
                _callback({status: true, data: {results, fields}});
            }
            
        })
    },
    insert: function(){},
    delete: function(){},
    update: function(){}
}