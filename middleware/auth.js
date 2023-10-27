const jwt = require("jsonwebtoken")
const secret_key = "suraj";
const auth = (req, res, next) => {
    const BearerToken = req.headers["authorization"];
    // console.log(BearerToken)
    if (BearerToken) {
        const token = BearerToken.split(" ")[1];
        const validate = jwt.verify(token, secret_key);
        if (validate) {
            next();
        }
        else {
            console.log("User not Authorized!");
        }
        // return res.send({ msg: "user not authorized" });
    }
    else {
        // return res.send({ msg: "user not allowed" })
        console.log("User not Authorized");
    }
}

module.exports = auth;