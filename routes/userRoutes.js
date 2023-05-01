const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const { UserModel } = require("../models/userSchema");
const app = express();
const UserRouter = express.Router();
UserRouter.use(express.json());

UserRouter.get("/", async (req, res) => {
  try {
    res.send("router");
  } catch (error) {
    console.log(error.message);
  }
});

//register routes
UserRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  
  let user = await UserModel.find({email});
  if(user.length > 0){
    res.send(`user already registered`)
  }else{
    try {
      bcrypt.hash(password, 5, async function (err, hash) {
        const users = new UserModel({
          name,
          email: email,
          password: hash,
        });
        console.log(users);
        await users.save();
        res.send({ message: `Users registered successfully`});
      });
    } catch (error) {
      res.send(error.message);

  }
  
  }
});

//login
UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await UserModel.findOne({ email });
    console.log(user);
    const hashed_password = user?.password;
    if (user){

   

    bcrypt.compare(password, hashed_password, async function (err, result) {
      if (result) {
        const token = jwt.sign({ user_id: user._id }, "miku", {
          expiresIn: "7d",
        });
        console.log(token);
       
        res.send({token,message:"users has login successfully", user_id: user._id });
      } else {
        // res.send("bycrupt",err)
        console.log("password missmathced")
        res.send('password missmathced');
      }
    });
  }else{
    console.log('user not found');
    res.send('user not found');
  }
  } catch (error) {
    console.log("error");
    res.send({ error: `error in login: ${error.message}` });
  }
});


module.exports = {
  UserRouter,
};
