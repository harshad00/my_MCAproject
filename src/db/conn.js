const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/data", {
     useNewUrlParser:true,
     useUnifiedTopology:true,
    //useCreateIndex:true, (Note: in this version not need.)
    
}).then(()=> {
    console.log(`connection successful.`);

}).catch((e)=>{
console.log(e);

})