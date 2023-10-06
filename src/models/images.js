const mongoose = require("mongoose");

const sell_data = new mongoose.Schema({

    ProductName:{
        type:String,
        required:true
    },
    ProductDescription:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    img1:{
        type:String,
        required:true
    }


});

const Sell_Product = new mongoose.model("Sell_product", sell_data);
module.exports = Sell_Product;