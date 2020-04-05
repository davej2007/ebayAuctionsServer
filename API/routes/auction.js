const express = require('express');
const router  = express.Router();
const AUCTION = require('../models/auctions');

router.get('/test', (req,res) =>{
    res.json({message:'from API / Auth route'});
});

router.get('/getAuctionInfo', (req,res)=>{
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
router.post('/updateSoldByID', (req,res)=>{
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
                    // update auction.sale
                    auction.status = 2;
                    console.log('Sold On : ',new Date(req.body.dateSold));
                    auction.sold = {
                        dateSold:req.body.dateSold,
                        auctionNo:req.body.auction,
                        price:req.body.price,
                        buyer : {userName:req.body.userName, postCode:req.body.postCode}
                    }
                    auction.fees.finalFee = req.body.finalFee;
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
router.post('/updatePaidByID', (req,res)=>{
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
                    // update auction.sale
                    auction.status = 3;
                    auction.paid = {
                        paidBy          : req.body.paidBy,
                        transactionNo   : req.body.paypalTransaction,
                        postage         : req.body.postagePaid
                    };
                    if (req.body.paypalFee != null ) auction.fees.paypalFee = req.body.paypalFee;
                    if (req.body.buyerName != null ) auction.sold.buyer.name = req.body.buyerName;
                    if (req.body.buyerPostCode != null )auction.sold.buyer.postCode = req.body.buyerPostCode
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
router.post('/updatePostByID', (req,res)=>{
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
                    // update auction.courier
                    auction.status = 4;
                    auction.courier = {
                        company         : req.body.company,
                        trackingNo      : req.body.trackingNo,
                        cost            : req.body.courierCost
                    }
                    auction.sold.buyer.name = req.body.name;
                    auction.sold.buyer.postCode = req.body.postCode
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
router.post('/updateDeliveryByID', (req,res)=>{
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
                    // update auction.courier
                    auction.status = 5;
                    auction.courier.delivered = req.body.date
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
router.post('/updateFeesByID', (req,res)=>{
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
                    // update auction.fees
                    if(req.body.finalFee != null ) auction.fees.finalFee = req.body.finalFee;
                    if(req.body.postageFee != null ) auction.fees.postageFee = req.body.postageFee;
                    if(req.body.paypalFee != null ) auction.fees.paypalFee = req.body.paypalFee;
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
router.post('/updateAuctionbyID', (req,res)=>{
    if(req.body.auction._id == undefined){
        res.json({ success:false, message: 'No ID Supplied' });
    } else {
        AUCTION.findById(req.body.auction._id).exec(function(err,auction){
            if (err) {
                res.status(401).send({ message: 'DB Error : ' + err });
            } else {
                if (!auction){
                    res.json({ success:false, message:'Auctions Not Found.' });
                } else {
                    // update auction
                    console.log(req.body.auction)
                    auction.status = req.body.auction.status;
                    auction.category = req.body.auction.category;
                    auction.auction = { dateListed      : req.body.auction.auction.dateListed,
                                        description     : req.body.auction.auction.description,
                                        initialPrice    : req.body.auction.auction.initialPrice,
                                        postage         : req.body.auction.auction.postage,
                                        weight          : req.body.auction.auction.weight };
                    auction.sold = {    dateSold        : req.body.auction.sold.dateSold,
                                        auctionNo       : req.body.auction.sold.auctionNo,
                                        price           : req.body.auction.sold.price,
                                        buyer           : { userName : req.body.auction.sold.buyer.userName,
                                                            name     : req.body.auction.sold.buyer.name,
                                                            postCode : req.body.auction.sold.buyer.postCode }};
                    auction.paid = {    paidBy          : req.body.auction.paid.paidBy,
                                        postage         : req.body.auction.paid.postage,
                                        transactionNo   : req.body.auction.paid.transactionNo };
                    auction.fees = {    finalFee        : req.body.auction.fees.finalFee,
                                        postageFee      : req.body.auction.fees.postageFee,
                                        paypalFee       : req.body.auction.fees.paypalFee };
                    auction.courier ={  company         : req.body.auction.courier.company,
                                        trackingNo      : req.body.auction.courier.trackingNo,
                                        cost            : req.body.auction.courier.cost,
                                        delivered       : req.body.auction.courier.delivered };
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
router.post('/findEbayAuction', (req,res)=>{
    if(req.body.auction == undefined){
        res.json({ success:false, message: 'No Auction Number Supplied' });
    } else {
        AUCTION.findOne({'sold.auctionNo' : req.body.auction}).exec(function(err,auction){
            if (err) {
                res.status(401).send({ message: 'DB Error : ' + err });
            } else {
                if (!auction){
                    res.json({ success:false, message:'Auctions Number Not Found.' });
                } else {
                    res.json({ success:true, message:'Auctions Found.', auction });
                }
            }
        })
    }
});
router.post('/saveNewAuction', (req,res)=>{
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
});
router.post('/convertFees', (req,res)=>{
    AUCTION.find().exec(function(err,auctions){
        if (err){
            res.status(401).json(err);
        } else {
            auctions.forEach(entry => {
                entry.fees = undefined;
            entry.save((err)=>{
                if(err) {
                    console.log(err);
                }else{
                    console.log(entry)
                        }            })
            })
            
        }
    })
})
module.exports = router;