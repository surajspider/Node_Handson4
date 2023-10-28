const array = []; // assume as a database

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const secret_key = "suraj";

const regfun = (req, res) => {
    // return res.send("Register success");
    const data = req.body;
    console.log(data);
    const details = array.find((item) => {
        if (item.email === data.email)
            return item;
    });
    if (details) {
        return res.send({ msg: "user already registered!" })
    }
    else {
        const hashpassword = bcrypt.hashSync(data.password, 10); //generate some random string, symbols, number as a password
        console.log(hashpassword);
        // const saltround = bcrypt.genSaltSync(2);
        // console.log("salround", saltround);
        const tempobj = {
            email: data.email,
            password: hashpassword,
            contact: data.contact,
            address: data.address
        }

        array.push(tempobj);
        const token = jwt.sign({ useremail: data.email }, secret_key, { expiresIn: "360000" });
        console.log("token:", token);
        res.send({ msg: "User Registered Successfully!", token: token });
        console.log(array);
    }
}

const logfun = (req, res) => {
    const logindata = req.body;
    // console.log("logindetails", logindata);
    const detail = array.find(item => {
        if (item.email === logindata.email)
            return item;
    });
    if (detail) {
        const validate = bcrypt.compareSync(logindata.password, detail.password);
        if (validate) {
            const token = jwt.sign({ useremail: logindata.email }, secret_key, { expiresIn: "360000" });
            console.log("token:", token);
            return res.send({ msg: "User logged in Successfully!", token: token });
        }
        else {
            return res.send({ msg: "User Password is wrong!!" })
        }
        // const data = detail.password;
        // if (data === logindata.password) {
        //     return res.send({ msg: 'User logged in successfully' });
        // } else {
        //     console.log('Password is incorrect. Please enter the correct password.');
        //     return res.send({ msg: "Password incorrect" })
        // }
    } else {
        console.log('Email is not registered. Please provide a valid email.');
        return res.send({ msg: "Incorrect email" });
    }
};


module.exports = { regfun, logfun, secret_key };