const express = require("express");
const userRoute = express.Router();

userRoute.get("/", async (req, res) => {
    res.send("Hello in user Route of Backend");
});

userRoute.post("/login", async (req, res) => {
    res.send("Login or SignIn")
});

userRoute.post("/signup", async (req, res) => {
    res.send("signup")
});

module.exports = userRoute;