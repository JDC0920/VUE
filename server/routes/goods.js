var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');
var db = require('../models/db');

router.get('/list',function (req,res,next) {
    console.log(1111111111);
    // let productType = req.param("productType");
    let goodsModel = Goods.find({});
    goodsModel.exec(function (err,doc) {
        if(err){
            res.json({
                status:'1',
                msg:err.message
            });
        }else{
            res.json({
                status:'0',
                msg:'',
                result:{
                    count:doc.length,
                    list:doc
                }
            });
        }
    })
});
router.get("/list2", function (req,res,next) {
    let productId = req.param("productId");
    let goodsModel = Goods.find({productId:productId});
    goodsModel.exec(function (err,doc) {
        if(err){
            res.json({
                status:'1',
                msg:err.message
            });
        }else{
            res.json({
                status:'0',
                msg:'',
                result:{
                    count:doc.length,
                    list:doc
                }
            });
        }
    })
});
router.post("/addCart", function (req,res,next) {
    var _id = req.body.userId;
    var productId = req.body.productId;
    var productNum = req.body.productNum;
    var User = require('../models/users');
    User.findOne({_id:_id}, function (err,userDoc) {
        if(err){
            res.json({
                status:"1",
                msg:err.message
            })
        }else{
            if(userDoc){
                var goodsItem = '';
                userDoc.cartList.forEach(function (item) {
                    if(item.productId == productId){
                        goodsItem = item;
                        var num=item.productNum*1
                        item.productNum =num + productNum;
                        console.log(item.productNum)
                    }
                });
                if(goodsItem){
                    userDoc.save(function (err2,doc2) {
                        if(err2){
                            res.json({
                                status:"1",
                                msg:'cccccc3'
                            })
                        }else{
                            res.json({
                                status:'0',
                                msg:'你已经成功把商品加入购物车！',
                                result:'suc'
                            })
                        }
                    })
                }else{
                    Goods.findOne({productId:productId}, function (err1,doc) {
                        if(err1){
                            res.json({
                                status:"1",
                                msg:'cccccc2'
                            })
                        }else{
                            if(doc){
                                doc.productNum = productNum;
                                doc.checked = 1;
                                userDoc.cartList.push(doc);
                                userDoc.save(function (err2,doc2) {
                                    if(err2){
                                        res.json({
                                            status:"1",
                                            msg:'cccccc'
                                        })
                                    }else{
                                        res.json({
                                            status:'0',
                                            msg:'你已经成功把商品加入购物车！',
                                            result:'suc'
                                        })
                                    }
                                })
                            }
                        }
                    });
                }
            }
        }
    })
});








module.exports = router;