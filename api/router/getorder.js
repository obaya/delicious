var db = require('../db/db')

module.exports = {
    register: function(app){
        app.get('/getorder', function(req, res){
            // var date = req.query.date;
            // var page = req.query.page * 1;
            // var limit = req.query.limit * 1;
            console.log(333);
            var sql = `
            select
                
                *
            from
                user_id`
            db.select(sql, function(data){
                res.send(data);
            })
        })
    
    }
}