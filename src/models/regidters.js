const mongoose = require("mongoose");

const useregister = new mongoose.Schema({
      uname:{
        type:String
        // required:true
      },
      mail:{
        type:String
        // required:true
      },
      password:{ 
        type:String
      },
      cpassword:{
        type:String
      },
      address:{
        type:String
      },
      city:{
        type:String
      },
      contact:{
        type:String
      }
     
      });

// collection 

const Register = new mongoose.model("Register", useregister);
module.exports = Register;