const express = require('express');
const router  = express.Router();
const AUCTION = require('../models/auctions');

router.get('/test', (req,res) =>{
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
module.exports = router;