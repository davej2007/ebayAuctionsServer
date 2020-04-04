const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const auctionSchema = new Schema({
    status              : Number,
    category            : {type:Number, default:1},
    auction : {
        dateListed      : [Number],
        description     : String,
        initialPrice    : Number,
        postage         : Number,
        weight          : { type : Number, default : 0 }
    },
    sold : {
        dateSold        : { type : Number, default: 0 },
        auctionNo       : { type : String, default:null },
        price           : { type : Number, default: 0 },
        buyer           : { userName : { type : String, default : null },
                            name : { type : String, default : null },
                            postCode:{ type : String, default : null }
                        }
    },
    paid : {
        paidBy          : { type : String, default : null },
        postage         : { type : Number, default : 0 },
        transactionNo   : { type : String, default : null }
    },
    fees : {
        finalFee        : { type : Number, default : 0 },
        postageFee      : { type : Number, default : 0 },
        paypalFee       : { type : Number, default : 0 }
    },
    courier : {
        company         : { type : String, default : null },
        trackingNo      : { type : String, default : null },
        cost            : { type : Number, default : 0 },
        delivered       : { type : Number, default : null }
    }
});


module.exports = mongoose.model('Auction',auctionSchema);