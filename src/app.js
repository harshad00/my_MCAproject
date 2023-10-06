
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const app = express();
const hbs = require("hbs");
const fs = require("fs");
const nodemailer = require("nodemailer");
require("./db/conn");
const Sell_Product = require("./models/images");
const Register = require("./models/regidters");
const Pay_product = require("./models/pay");
const { log } = require("console");
const multer = require("multer");
const port = process.env.PORT || 3005;
const templetes_path = path.join(__dirname, "../templetes/views");
const partials_path = path.join(__dirname, "../templetes/partials");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(templetes_path));
app.use('/uploads', express.static('uploads'));
app.set("view engine", "hbs");
app.set("views", templetes_path);
app.use(methodOverride('_method'));
hbs.registerPartials(partials_path);

// console.log( path.join(__dirname, "../public")); //? show a path.

/** ================================================================================= 
  - - - - -  //todo:- For give a Hoem page.
 ====================================================================================*/

app.get("/", (req, res) => {
  res.render("index");
});

/** ================================================================================= 
  - - - - -  //todo:- for give a login page.
 ====================================================================================*/

app.get("/login", (req, res) => {
  res.render("login");
});

/** ================================================================================= 
  - - - - - //todo:- for give a admin page.
 ====================================================================================*/

app.get("/admin", (req, res) => {
  res.render("admin");
});
/** ================================================================================= 
  - - - - -  //todo:-For give data in database and cheack to user is valid or not.
 ====================================================================================*/
app.post("/login", async (req, res) => {
  try {
    const email = req.body.mail;
    const password = req.body.password;
    const admin = "admin1@ggh.in";
    const usermail = await Register.findOne({ mail: email });
    //  res.send(usermail.user);
    // console.log(usermail.password);

    if (usermail.password === password && admin === email) {
      res.status(201).render("admin");
    } else if (usermail.password === password) {
      res.status(201).render("login_user");
    } else {
      res.send("Password is incorrect");
    }
    // console.log(`${email} and password is ${password}`);
  } catch (error) {
    res.status(400).send("invalid Email");
  }
});
/** ================================================================================= 
  - - - - -         //todo:- for give a register page
 ====================================================================================*/
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/userdata", (req, res) => {
  Register.find({})
    .then((x) => {
      res.render("userdata", { x });
      // res.send(x);
      // console.log(x);
    }).catch((y) => {
      console.log(y);
    })
});
/** ================================================================================= 
  - - - - -          //todo:- For aboutus page.
 ====================================================================================*/


 app.post("/register", async (req, res) => {
  try {
    const password = req.body.pasword;
    const cpassword = req.body.cpasword;

    if (password === cpassword) {
      const registerdata = new Register({
        uname: req.body.uname,
        mail: req.body.mail,
        password: req.body.password,
        cpassword: req.body.cpassword,
        address: req.body.address,
        city: req.body.city,
        contact: req.body.contact,
      });
      // console.log(registerdata);
      const registred = await registerdata.save();
      // res.status(201).render(login);
      res.render("login");
    } else {
      res.send("password are not matching.");
    }
  } catch (error) {
    // res.status(400).send(error);
    res.render("errorpage");
  }
  //  res.render("register");
});
/** ================================================================================= 
  - - - - -          //todo:- For edit data to mongodb database page.
 ====================================================================================*/

 app.get("/updatedata",(req, res) => {
 
    res.render("updatedata");
    
});
 app.get("/updatedata/:uname",(req, res) => {
  Register.findOne({uname:req.params.uname})
  .then((x) => {
    res.render("updatedata", { x });
    // res.send(x);
    // console.log(x);
  })
  .catch((y) => {
    console.log(y);
  })
});
 app.post("/updatedata/:uname",(req,res) => {
    
    console.log(req.params.uname);
    Register.findOneAndUpdate({uname:req.params.uname},{

      $set:{
        uname: req.body.uname,
        mail: req.body.mail,
        password: req.body.password,
        cpassword: req.body.cpassword,
        address: req.body.address,
        city: req.body.city,
        contact: req.body.contact

      }
    })
   .then(result =>{
    res.render("updatedata_success");
    });
   });
      
  //  success updet
  app.get("/updatedata_success",(req,res)=>{

    res.render("updatedata_success");
  })
    
  
  


 

/** ================================================================================= 
  - - - - -          //todo:- For delete data to mongodb database page.
 ====================================================================================*/

 app.get(`/delete_data/:uname`, express.json(), (req,res) => {
  const name_delete = req.body.uname;
  Register.deleteOne({Register:name_delete })
    .then(() => {
      console.log(`delete ${name_delete}`);
      res.redirect('back');
    }).catch((y) => {
      console.log(y);
    })
 })
/** ================================================================================= 
  - - - - -          //todo:- For aboutus page.
 ====================================================================================*/
app.get("/about", (req, res) => {
  res.render("about");
});

/** ================================================================================= 
  - - - - -           //todo:-For Products  Pagise
 ====================================================================================*/
app.get("/book", (req, res) => {
  res.render("book");
});
app.get("/car", (req, res) => {
  res.render("car");
});
app.get("/phones", (req, res) => {
  res.render("phones");
});
app.get("/furniture", (req, res) => {
  res.render("furniture");
});
/** ================================================================================= 
  - - - - -          // todo:- For Sell-foem get the form.
 ====================================================================================*/
app.get("/sell-form", (req, res) => {
  res.render("sell-form");
});
/** ================================================================================= 
  - - - - -           //! Storage data using multer methods.
 ====================================================================================*/

// const upload = multer({dest :"uploads/"});
const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});
const upload = multer({ storage: Storage });
// module.exports= upload;

/** ================================================================================= 
  - - - - -           //todo:- for sell post the form data
 ====================================================================================*/
app.post("/sell", upload.single("img1"), async (req, res) => {
  // console.log(req.file);
  console.log(req.file.path);
  try {
    const imgdata = new Sell_Product({
      ProductName: req.body.ProductName,
      ProductDescription: req.body.ProductDescription,
      price:req.body.price,
      img1: req.file.path,
    });
    //  console.log(registerdata);
    const registred = await imgdata.save();
    res.status(201).render(index);
    // res.render("login_user");
  } catch (error) {
    res.status(400).send(error);
  }
  //  res.render("register");
});
/*================================================================================= 
  - - - - -           //todo:- For ERROR404  page.
 ====================================================================================*/
app.get("/errorpege", (req, res) => {
  res.render("errorpage");
});
/** ================================================================================= 
  - - - - -         //todo:- user login succssfully than redirect this page.
 ====================================================================================*/
app.get("/login_user", (req, res) => {
  // res.render("login_user");
  Sell_Product.find({})
    .then((sell) => {
      res.render("login_user", { sell });
      //  res.send(x);
      console.log(sell);
    })
    .catch((y) => {
      console.log(y);
    })

    // user data show 
       console.log( Register.findOne({mail}));
     

    
    
});
/** ================================================================================= 
  - - - - -         //todo:-  show a product which in database.
 ====================================================================================*/
app.post("/login_user", (req, res) => {
  res.render("login_user");
});
/** ================================================================================= 
  - - - - -         //todo:- paymain 
 ====================================================================================*/
 app.get("/pay_form",(req,res) => {
  res.render("pay_form");
});


  app.post("/pay_form", async (req, res) => {
    // console.log(req.file);
    
    try {
      const Pay_pro = new Pay_product({
         pinNo:req.body.pinNo,
         exe:req.body.Date,
         cvv:req.body.cvv,
      });
      //  console.log(registerdata);
      const pay = await  Pay_pro.save();
      // res.status(201).render(index);
      res.render("paymentSuccessful.hbs");
      // res.render("login_user");
    } catch (error) {
      res.status(400).send(error);
    }
    //  res.render("register");
  });
   
  /* ================================================================================= 
  - - - - -         //todo:- payment successful page
 ====================================================================================*/

app.get("/paymentSuccessful",(req,es)=>{
  res.render("paymentSuccessful");
})

/** ================================================================================= 
  - - - - -         //todo:- for cheacking server is running or not.
 ====================================================================================*/
app.listen(port, () => {
  console.log(`server is running at port no ${port}`);
});
