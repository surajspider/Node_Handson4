const express = require("express");
const userrouter = require("./Router/userrouter");
const app = express();
const cors = require("cors");
const auth = require("./middleware/auth");
// const jwt = require("jsonwebtoken");
// const secret_key = "suraj";

//const token=jwt.sign({useremail:data.email}, secret_key);
//console.log(token);

// const bodyparser = require("body-parser");
// app.use(bodyparser());
app.use(cors({
    origin: "*"
}))

app.use(express.json()); //---->used as a body parser - inbuild in express

app.get("/", auth, (req, res) => {
    res.send("This is home page");
    console.log("Home page");
})

app.use("/api", userrouter);

app.listen(5000, () => {
    try {
        console.log("Application is running on port 5000");
    }
    catch (err) {
        console.log("error", err);
    }
})