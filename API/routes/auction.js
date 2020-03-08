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


router.post('/saveNewAuction', (req,res)=>{
    console.log(req.body);
    if(!req.body.dateListed){
        res.json({ success:false, message: 'No Date Listed Supplied' });
    } else if(!req.body.description){
        res.json({ success:false, message: 'No Description Supplied' });
    } else if(!req.body.initialPrice){
        res.json({ success:false, message: 'No Initial Price Supplied' });
    } else if(!req.body.postagePaid){
        res.json({ success:false, message: 'No Postage Paid Supplied' });
    } else if(!req.body.category){
        res.json({ success:false, message: 'No Category Supplied' });
    } else {
        var auction = new AUCTION({
            status : 1,
            dateListed : req.body.dateListed,
            description : req.body.description,
            initialPrice : req.body.initialPrice,
            postagePaid : req.body.postagePaid,
            category : req.body.category
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