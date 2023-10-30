const { regfun, logfun } = require("../Controller/usercontroller");
const auth = require("../middleware/auth");

const userrouter = require("express").Router();

userrouter.post("/register", regfun);
userrouter.post("/login", logfun);

userrouter.get("/", auth, (req, res) => {
    console.log("homepage api")
    res.send("api home page");
})
module.exports = userrouter;