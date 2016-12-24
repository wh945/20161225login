var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var querystring = require('querystring');
app.set('view engine','ejs');
app.set('views',path.resolve('views'));
app.use(express.static(path.join(__dirname,'/public')));
var users = [];
users.push({username:'zfpx',password:'123456'});
//注册
app.get('/signup',function (req,res) {
    res.render('signup',{title:'注册'});
    /*  res.sendFile('./views/signup.ejs',{root:__dirname});*/
});
app.post('/signup',function (req,res) {
    var str = '';
    req.on('data',function (data) {
        str += data;
    });
    req.on('end',function () {
        var obj = querystring.parse(str);
        users.push(obj);
        res.end();
    });
    res.redirect('/signin');
});
//登录
app.get('/signin',function (req,res) {
    res.render('signin',{title:'登录'});
    /*res.sendFile('./views/signin',{root:__dirname});*/
});
app.post('/signin',function (req,res) {
    var str = '';
    req.on('data',function (data) {
        str += data;
    });
    req.on('end',function () {
        var obj = querystring.parse(str);
        console.log(obj.username);
        console.log(users);
        /*users.forEach(function (item,index) {
            if (item.username==obj.username&&item.password==obj.password){
                res.redirect('/welcome');
            }else {
                res.redirect('/signup');
            }
        });*/
        var flag = users.find(function (item) {
            return (item.username==obj.username&&item.password==obj.password);
        });
        flag ? res.redirect('/welcome') : res.redirect('/signup');
    });
});
//欢迎页
app.get('/welcome',function (req,res) {
    res.end('welcome')
});
app.listen(7788);