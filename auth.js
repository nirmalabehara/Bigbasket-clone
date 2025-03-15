const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Signup Page
router.get("/signup", (req, res) => {
    res.render("signup");
});

// Signup Logic
router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.redirect("/products");
});

// Login Page
router.get("/login", (req, res) => {
    res.render("login");
});

// Login Logic
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
        req.session.user = user;
        res.redirect("/products");
    } else {
        res.send("Invalid credentials");
    }
});

// Logout
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
});

module.exports = router;
