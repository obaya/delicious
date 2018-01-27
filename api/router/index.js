var express = require('express');
var app = express();
var main = require('./main.js');
var car = require('./car.js');
var user = require('./user.js');
var back = require('./back.js');
var order = require('./order.js');
var goods = require('./goods.js');
var comment = require('./comment.js');
var carousel = require('./carousel.js');









var bp = require('body-parser');

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
    });

app.use(bp.urlencoded({extended: false}));
module.exports = {
     start(port){
            main.init(app);
            car.init(app);
            user.init(app);
            back.init(app);
            order.init(app);
            goods.init(app);
            comment.init(app);
            carousel.init(app);
            app.listen(port);
     }
}