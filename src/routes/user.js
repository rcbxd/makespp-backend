const express = require('express');
const router = express.Router();

//returns the user object from the database found by the token
router.get("user-by-token/", (req, res) => {
    //get user by token
})

//returns the user object from the database found by the id
router.get("user-by-id/", (req, res) => {
    //get user by id
})

//sets the profile picture to a new one
router.post("set-profile-picture/", (req, res) => {
    //set profile picture
})

//sends a verification link to an email
router.get("send-verification-link/", (req, res) => {
    //send a verification link to email
})

//verifies an email
router.get("verify-email/", (req, res) => {
    //verify email by link
})

//password change
router.post("change-password/", (req, res) => {
    //change password
})

//deletes the profile
router.get("delete-profile/", (req, res) => {
    //deletes the profile
})