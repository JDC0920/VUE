var express = require('express');
var router = express.Router();
var User = require('../models/users');
var fs =require('fs');
var multiparty = require('multiparty');

/* GET users listing. */
router.get('/userName', function(req, res, next) {
  res.json({
      status:'0',
      msg:'',
      result:{
        userName:req.session.userName,
          userId:req.session._id
      }
  })
});
//注册
router.post('/reg',function (req,res,next) {
    var userName = req.body.userName;
    var phone = req.body.phone;
    var passWord = req.body.passWord;
    console.log(userName,phone,passWord)
    User.findOne({userName:userName},function (error,doc) {
        if(doc){
          return res.json({
              status:'1',
              msg:'用户名已存在'
          });
        }else {
          User.create({
              userName:userName,
              phone:phone,
              passWord:passWord
          },function (error,doc) {
              if(error){
                  return res.json({
                      status:'1',
                      msg:'用户名创建失败'
                  })
              }else {
                  return res.json({
                      status:'0',
                      msg:''
                  })
              }
          })
        }
    })
});
//登录
router.post('/login',function (req,res,next) {
    User.findOne({userName:req.body.userName},function (error,doc) {
        if(!doc){
          return res.json({
              status:'1',
              msg:'用户名不存在'
          });
        }else {
          if(req.body.passWord == doc.passWord){
            req.session.userId = doc._id;
            req.session.userName = doc.userName;
            return res.json({
                status:'0',
                msg:'',
                result:{
                  userName:doc.userName,
                    userId:doc._id
                }
            });
          }else {
            return res.json({
                status:'1',
                msg:'密码错误'
            })
          }
        }
    })
});
//登出
router.post('logout',function (req,res,next) {
    req.session.userName= '';
    req.session.userId= '';
    return res.json({
        status:'0',
        msg:''
    })
});
//查询当前用户的购物车数据
router.get('cartList',function (req,res,next) {
    var _id = req.session.userId;
    if(_id){
        User.findOne({_id:_id},function (err,doc) {
            if(err){
                res.json({
                    status:'1',
                    msg:err.messgae,
                    result:''
                });
            }else {
                if(doc){
                    res.json({
                        status:'0',
                        msg:'',
                        result:{
                            list:doc.cartList,
                            userName:req.session.userName,
                            userId:req.session.userId
                        }
                    });
                }
            }
        })
    }else {
        res.json({
            status:'1',
            msg:'未登录',
            result:''
        })
    }
});
//购物车删除
router.post('cartDel',function (req,res,next) {
    var _id = req.body.userId;
    var productId = req.body.productId;
    User.update({
        _id:_id
    },{
        $pull:{
            'cartList':{
                'productId':productId
            }
        }
    },function (err,doc) {
        if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:''
            })
        }else {
            res.json({
                status:'0',
                msg:'删除成功',
                result:'suc'
            })
        }
    })
})


module.exports = router;
