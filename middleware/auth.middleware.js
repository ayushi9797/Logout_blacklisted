const jwt = require("jsonwebtoken");
const fs = require("fs");
const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    // console.log(token);
    // getting token from blacklist.json
    let allBlacklistedToken = fs.readFileSync("./blacklist.json", "utf8");
    // if blacklist token then send it again 
    if(allBlacklistedToken.includes(token)){
     res.send(`token is blacklisted login again`);
    }
    else{
    const decoded = jwt.verify(token, "miku");
    if (decoded) {
      req.body.user_id = decoded.user_id;
        console.log(decoded);
        console.log(req.body);
      next();
    } else {
      res.send("login again");
    }
  }
  } catch (error) {
    res.send(error.message);
  }
  
};

module.exports = {
  authentication,
};
