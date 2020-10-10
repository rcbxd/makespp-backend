const express = require('express');
const router = express.Router();

//login using email and password
router.post("login/", (req, res) => {
    //login
})

//signup using email, password, and name
router.post("signup/", (req, res) => {
    //signup
})

//sets the user session to be invalid
router.get("logout/", (req, res) => {
    //logout
})