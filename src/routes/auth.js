const express = require('express');
const router = express.Router();

const User = require("../models/User");
const UserSession = require("../models/UserSession");

const {
    validatePassword,
    generateHash,
} = require("../util/encryption");

//login using email and password
router.post("login/", async (req, res) => {
    //get form data
    const { body } = req;
    let { email, password } = body;
    email = email.toLowerCase();

    //check if the fields are not empty
    if (!email || !password) {
        return res.status(401).send({
            success: false,
            message: "No fields can be empty",
        })
    }

    //check if a user with this email exists
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
        return res.status(404).send({
            success: false,
            message: "User not found.",
        });
    }

    //check if the password is correct
    if (!validatePassword(password, user.password)) {
        return res.status(401).send({
            success: false,
            message: "Incorrect password.",
        });
    }

    //create a user session
    const newUserSession = await UserSession.create({
        userId: user.id,
    });

    //return the new session token
    return res.status(200).send({
        success: true,
        message: "Signed in",
        token: newUserSession.id,
    });
})

//signup using email, password, and name
router.post("signup/", async (req, res) => {
    //get the form data
    const { body } = req;
    let { email, password, password2, name } = body;
    email = email.toLowerCase();

    if (!email || !password || !password2 || !name) {
        return res.status(401).send({
            success: false,
            message: "No fields can be empty."
        });
    }

    //check if the two passwords match
    if (password !== password2) {
        return res.status(401).send({
            success: false,
            message: "Passwords need to match."
        });
    }

    const user = await User.findOne({ where: { email: email } });
    if (user) {
        return res.status(401).send({
            success: false,
            message: "The user with this email already exists."
        });
    }

    //create a new user
    await User.create({
        email: email,
        password: generateHash(password),
        name: name,
    })

    return res.status(200).send({
        success: true,
        message: "Account created",
    })

})

//sets the user session to be invalid
router.get("logout/", async (req, res) => {
    //get the form data
    const { query } = req;
    const { token } = query;

    //get the session
    const session = await UserSession.findByPk(token);

    //if the session does not exist 
    if (!session || session.isDeleted) {
        return res.status(401).send({
            success: false,
            message: "Invalid session."
        })
    }

    //set the session to deleted
    session.isDeleted = true;
    await session.save();

    return res.status(200).send({
        success: true,
        message: "Logged out."
    })

})