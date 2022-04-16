const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
const fast2sms = require('fast-two-sms');
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());


mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("DB is connected .......");
  })
  .catch((err) => {
    console.log(err);
  });

const UserSchema = new mongoose.Schema({
name: {
    type: String,
},
gender:{
    type:String,
},
mobile: {
    type: Number,
},
});  
const UserDetails = mongoose.model("UserDetails", UserSchema);


const borrowSchema = new mongoose.Schema({
    mobile: {
      type: Number,
    },
    amount: {
      type: Number,
    },
    reason: {
      type: String,
    },
    duration: {
      type: String,
    },
    upiId: {
      type: String,
    }
  });

  const borrowDetails = mongoose.model("borrowDetails", borrowSchema);



async function Saveuserdata(userdata) {
    const newuser = new UserDetails(userdata);
    const result = await newuser.save();
    return result;
  }

  app.post("/signupPage", (req, res) => {
    const Newuser = req.body;
    if (!Newuser.name || Newuser.name === "") res.send({ message: "Please enter Name" });
    else if (!Newuser.gender || Newuser.gender === "") res.send({ message: "Please select Gender" });
    else if (!Newuser.mobile || Newuser.mobile.length<10)res.send({message: "Please enter correct Mobile Number"})
    else {
      UserDetails.findOne({ mobile: Newuser.mobile }, (err, user) => {
        if (user) {
          res.send({ message: "User Already Registered" });
        }
        else {
          try {
           

          var currOtp = 1000 + Math.floor(Math.random() * 9000);
        // var currOtp=1020;
             
          var options = {authorization : `${process.env.AuthKey}`, message : `please enter OTP ${currOtp} to access your account`, numbers : [Newuser.mobile]}
          fast2sms.sendMessage(options);
            
            res.send({ OTP: currOtp });
          } catch (err) {
            res.send({ message: `Error : ${err}` });
          }
        }
      });
    }
  });


  app.post("/login", (req, res) => {
    const Newuser = req.body;
    if (!Newuser.mobile || Newuser.mobile.length<10)res.send({message: "Please enter correct Mobile Number"})
    else {
      UserDetails.findOne({ mobile: Newuser.mobile }, (err, user) => {
        if (!user) {
          res.send({ message: "User Not Registered" });
        }
        else {
          try {

          var currOtp = 1000 + Math.floor(Math.random() * 9000);
        // var currOtp=1020;
             
          var options = {authorization : `${process.env.AuthKey}` , message : `please enter OTP ${currOtp} to access your account`, numbers : [Newuser.mobile]}
          fast2sms.sendMessage(options);
            
            res.send({ OTP: currOtp });
          } catch (err) {
            res.send({ message: `Error : ${err}` });
          }
        }
      });
    }
  });


  async function Saveborrowdata(NewborrowRequest) {
    const newrequest = new borrowDetails(NewborrowRequest);
    const result = await newrequest.save();
    return result;
  }

  app.post("/borrow-request", async (req, res) => {
    const NewborrowRequest = req.body;
    Saveborrowdata(NewborrowRequest);
    res.send("");
    // }
  });

  app.post("/allrequests", async (req, res) => {
    borrowDetails.find({ mobile: parseInt(req.body.header,10) }, (err, requests) => {
      console.log(requests);
      res.send(requests);
    });
  });
  


  app.post("/verify", async (req, res) => {
    const Rbody = req.body;
    // // console.log("code = ", code, usercode);
    if (Rbody.otp == Rbody.userotp) {
        UserDetails.findOne({ mobile: Rbody.mobile },async (err, user) => {
            if (!user) {
                await Saveuserdata({ name: Rbody.name, gender: Rbody.gender, mobile:Rbody.mobile });
            }
      
      res.send({ Isverify: true });
    })
}
    else {
      res.send({ Isverify: false });
    }
  });

  if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'));
  }
  
  app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });



app.listen(process.env.PORT || 3001, () => {
    console.log(`PORT ${3001} is running ......`);
  });