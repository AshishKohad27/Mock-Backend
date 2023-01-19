const e = require("express");
const express = require("express");
const userModel = require("../models/user");
const userRoute = express.Router();
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

userRoute.get("/", async (req, res) => {
    res.send("Hello in user Route of Backend");
});

userRoute.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.find({ email });
    console.log('user:', user);
    console.log('password:', password)
    // let hashPassword = await argon2.verify(user.password);
    // console.log('hashPassword:', hashPassword)

    try {
        if (!user) {
            return res.status(401).send({ message: "User with this Email Id not in DataBase " })
        }
        if (user) {
            //exist
            let token = jwt.sign(
                { id: user._id, email },
                "USER_SECRET",
                { expiresIn: "4 days" }
            )
            return res.status(200).send({ message: "Login Successfully", token });
        } else {
            return res.send(401).send({ message: "You Enter Wrong Credential" })
        }
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }

});

userRoute.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    console.log('user:', user);
    // let hash = await argon2.hash(password);
    // console.log('hash:', hash);
    let hash = password

    try {
        if (user) {
            return res.status(400).send({ message: "User with this Email Id Already exist " })
        }
        else {
            console.log("hello")
            let user = new userModel({ email, password: hash });
            await user.save();
            return res.status(200).send({ message: "User Created Successfully", user });
        }
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }

});

module.exports = userRoute;