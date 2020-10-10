const express = require('express');
const router = express.Router();

const User = require("../models/User");
const UserSession = require("../models/UserSession");
const EmailVerificationCode = require("../models/EmailVerificationCode");

//returns the user object from the database found by the token
router.get("user-by-token/", async (req, res) => {
    //get the form data
    const { query } = req;
    const { token } = query;

    //get the session
    const session = await UserSession.findByPk(token);

    //check if the user is logged in
    if (!session || session.isDeleted) {
        return res.status(401).send({
            success: false,
            message: "Invalid session"
        })
    }

    //get user with the session userID
    const user = await User.findByPk(session.userID);

    if (!user) {
        return res.status(401).send({
            success: false,
            message: "Invalid token"
        })
    }

    //return the user
    return res.status(200).send({
        success: true,
        message: "User fetched.",
        user: user,
    })

})

//returns the user object from the database found by the id
router.get("user-by-id/", async (req, res) => {
    //get the form data
    const { query } = req;
    const { id } = query;

    //get user with the session userID
    const user = await User.findByPk(id);

    if (!user) {
        return res.status(401).send({
            success: false,
            message: "Invalid token"
        })
    }

    //return the user
    return res.status(200).send({
        success: true,
        message: "User fetched.",
        user: user,
    })
})

//returns whether the token is valid or not
router.get("verify-token/", async (req, res) => {
    //get the form data
    const { query } = req;
    const { token } = query;

    //get the session
    const session = await UserSession.getByPk(token);

    //check if it is valid
    if (!session || session.isDeleted) {
        return res.status(401).send({
            success: false,
            message: "Invalid."
        })
    }

    return res.status(200).send({
        success: true,
        message: "Valid."
    })

})

//sets the profile picture to a new one
router.post("set-profile-picture/", async (req, res) => {
    //set profile picture
})

//sends a verification link to an email
router.get("send-verification-link/", async (req, res) => {
    //send a verification link to email
})

//verifies an email
router.get("verify-email/", async (req, res) => {
    //verify email by link
})

//password change
router.post("change-password/", async (req, res) => {
    //change password
})

//deletes the profile
router.get("delete-profile/", async (req, res) => {
    //deletes the profile
})