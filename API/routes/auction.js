const express = require('express');
const router  = express.Router();
const AUCTION = require('../models/auctions');
const config = require('../config/database');

router.get('/test', (req,res) =>{
    res.json({message:'from API / Auth route'});
});

router.post('/getAuctionInfo', (req,res)=>{
    AUCTION.find().exec(function(err,auctions){
        if (err) {
            res.json({ success:false, message:'DB Error : ' + err });
        } else {
            if (!auctions){
                res.json({ success:false, message:'Auctions Not Found.' });
            } else {
                res.json({ success:true, auctions});
            }
        }
    });
});
router.post('/getAuctionByID', (req,res)=>{
    if(req.body.id == undefined){
        res.json({ success:false, message: 'No ID Supplied' });
    } else {
        AUCTION.findById(req.body.id).exec(function(err,auction){
            if (err) {
                res.status(401).send({ message: 'DB Error : ' + err });
            } else {
                if (!auction){
                    res.json({ success:false, message:'Auctions Not Found.' });
                } else {
                    res.json({ success:true, auction});
                }
            }
        });
    }
});
router.post('/updateReListByID', (req,res)=>{
    console.log(req.body.id, req.body.date);
    if(req.body.id == undefined){
        res.json({ success:false, message: 'No ID Supplied' });
    } else {
        AUCTION.findById(req.body.id).exec(function(err,auction){
            if (err) {
                res.status(401).send({ message: 'DB Error : ' + err });
            } else {
                if (!auction){
                    res.json({ success:false, message:'Auctions Not Found.' });
                } else {
                    if (req.body.date===null || req.body.date === undefined){
                        auction.status = 0;
                    } else {
                        auction.status = 1;
                        auction.auction.dateListed.push(req.body.date)
                    }
                    auction.save((err)=>{
                        if (err) {
                            res.status(401).send({ message: 'DB Error : ' + err });
                        } else {
                            res.json({ success:true, message :'Auction Updated ......', auction });
                        }
                    });
                }
            }
        });
    }
});

router.post('/saveNewAuction', (req,res)=>{
    console.log(req.body);
    if(!req.body.dateListed){
        res.json({ success:false, message: 'No Date Listed Supplied' });
    } else if(!req.body.description){
        res.json({ success:false, message: 'No Description Supplied' });
    } else if(!req.body.initialPrice){
        res.json({ success:false, message: 'No Initial Price Supplied' });
    } else if(req.body.postagePaid == undefined){
        res.json({ success:false, message: 'No Postage Paid Supplied' });
    } else if(req.body.category == undefined){
        res.json({ success:false, message: 'No Category Supplied' });
    } else {
        var auction = new AUCTION({
            status : 1,
            category : req.body.category,
            auction : {
                dateListed : [req.body.dateListed],
                description : req.body.description,
                initialPrice : req.body.initialPrice,
                postage : req.body.postagePaid,
                weight : req.body.weight
            }
        })
        auction.save((err)=>{
            if (err) {
                res.status(401).send({ message: 'DB Error : ' + err });
            } else {
                res.json({ success:true, message :'New Auction Created ......', auction });
            }
        });
    }
})
module.exports = router;