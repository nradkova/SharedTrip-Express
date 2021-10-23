const express=require('express');
const handlebars=require('express-handlebars');
const path=require('path');
const cookieParser = require('cookie-parser');

const logger=require('../middlewares/logger');
const authMiddleware = require('../middlewares/auth');

const expressConfig=(app)=>{
    app.set('views',path.resolve(__dirname,'../views'));
    app.engine('hbs',handlebars({extname:'hbs'}));
    app.set('view engine','hbs');
    app.use('/static',express.static(path.resolve(__dirname,'../static')));
    app.use(express.urlencoded({extended:true}));

    app.use(cookieParser());
    app.use(authMiddleware());

    app.use(logger()); //for test purposes
}

module.exports=expressConfig;