const mongoose = require("mongoose");

const pay_user = new mongoose.Schema({

    pinNo:{
        type:String,
         required:true
    },
    exe:{
        type:String,
        // required:true
    },
    cvv:{
        type:Number,
         required:true
    }

});

const pay = new mongoose.model("pay", pay_user);
module.exports = pay;