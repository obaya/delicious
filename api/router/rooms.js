var db = require('../db/db')

module.exports = {
    register: function(app){
        app.get('/getschedule', function(req, res){
            // var date = req.query.date;
            // var page = req.query.page * 1;
            // var limit = req.query.limit * 1;
            var sql = `
            select
                
                *
            from
                user`
            db.select(sql, function(data){
                res.send(data);
            })
        })
        app.post('/book', function(req, res){})
    }
}