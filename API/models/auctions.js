const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const auctionSchema = new Schema({
    status : Number,
    dateListed : Number,
    description : String,
    initialPrice : Number,
    postagePaid : Number,
    category : {type:Number, default:1},
    weight : {type:Number, default:0},
    dateSold : {type:Number, default:0},
    pricePaid : {type:Number, default:0},
    buyer : {name:{type:String, default:null}, postCode:{type:String, default:null}},
    courier : {company:{type:String, default:null}, trackingNo:{type:String, default:null}, cost:{type:Number, default:0}}
});


module.exports = mongoose.model('Auction',auctionSchema);