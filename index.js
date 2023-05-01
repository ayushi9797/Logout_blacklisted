const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { connections } = require("./config/db");
const { UserRouter } = require("./routes/userRoutes");
const { authentication } = require("./middleware/auth.middleware");
const { stringify } = require("querystring");

const app = express();
app.use(cors());
app.use("/", UserRouter);

app.use(authentication);
// authentication
app.get("/animal", async (req, res) => {
  res.send('aninmal ');
});

// logout route
app.get("/logout", async (req, res) => {
  //get token from headers
  const token = req.headers.authorization;
  console.log(token);

  // getting all blacklisted token in an array
  const blacklistToken = JSON.parse(
    fs.readFileSync("./blacklist.json", "utf-8")
  );

  blacklistToken.push(token);
  console.log("jsonToekn :", blacklistToken);
  // updating blacklist.json for token
  fs.writeFileSync("./blacklist.json", JSON.stringify(blacklistToken));
  res.send(`user Logout successfully`);
});

app.listen(process.env.port, async () => {
  try {
    await connections;
    console.log(`app is running on port ${process.env.port} `);
  } catch (error) {
    console.log({ error: `error in connection with port ${process.env.port}` });
  }
});
