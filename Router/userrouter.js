const { regfun, logfun } = require("../Controller/usercontroller");
const auth = require("../middleware/auth");

const userrouter = require("express").Router();

userrouter.get("/", auth, (req, res) => {
    console.log("homepage api")
    res.send("api home page");
})
userrouter.post("/register", regfun);
userrouter.post("/login", logfun);

module.exports = userrouter;