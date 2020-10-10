const express = require("express");
const router = express.Router();

const User = require("../models/User");
const UserSession = require("../models/UserSession");
const Skill = require("../models/Skill");
const Product = require("../models/Product");

//returns 20 skills 
router.get("get-skills/", async (req, res) => {
    //get the form data
    const { query } = req;
    const { page } = query;
    const limit = 20;

    //get the skills
    const skills = await Skill.getAll({
        offset: (page - 1) * limit,
        limit: limit,
    })

    return res.status(200).send({
        success: true,
        message: "Skills fetched.",
        skills: skills,
    })

})

//add skill api
router.post("add-skill/", async (req, res) => {
    //get the form data
    const { body } = req;
    const { name, description, imageURL, token } = body;

    //get a user by token
    const session = UserSession.getByPk(token);

    //check if session is valid
    if (!session || session.isDeleted) {
        return res.status(401).send({
            success: false,
            message: "Invalid session."
        })
    }

    //get the user
    const user = User.findByPk(session.userID);

    //check if the user exists
    if (!user) {
        return res.status(401).send({
            success: false,
            message: "Invalid session."
        })
    }

    //check if the user is an admin
    if (!user.isAdmin) {
        return res.status(401).send({
            success: false,
            message: "User is not an admin."
        })
    }

    //check if the skill with this name exists
    const skill = await Skill.findOne({ where: { name: name } });

    if (skill) {
        return res.status(401).send({
            success: false,
            message: "This skill already exists."
        })
    }

    //create a new skill
    await Skill.create({ name: name, description: description, imageURL: imageURL });

    return res.status(200).send({
        success: false,
        message: "Skill added."
    })

})

//remove a skill
router.post("remove-skill/", async (req, res) => {
    //get the form data
    const { body } = req;
    const { skillID, token } = body;

    //get a user by token
    const session = UserSession.getByPk(token);

    //check if session is valid
    if (!session || session.isDeleted) {
        return res.status(401).send({
            success: false,
            message: "Invalid session."
        })
    }

    //get the user
    const user = User.findByPk(session.userID);

    //check if the user exists
    if (!user) {
        return res.status(401).send({
            success: false,
            message: "Invalid session."
        })
    }

    //check if the user is an admin
    if (!user.isAdmin) {
        return res.status(401).send({
            success: false,
            message: "User is not an admin."
        })
    }

    //check if the skill with this name exists
    const skill = await Skill.findByPk(skillID);

    if (!skill) {
        return res.status(404).send({
            success: false,
            message: "This skill does not exist."
        })
    }

    await skill.destroy();

    return res.status(200).send({
        success: false,
        message: "Skill added."
    })

})

//edit skill
router.post("edit-skill/", async (req, res) => {
    //get the form data
    const { body } = req;
    const { skillID, name, description, imageURL, token } = body;

    //get a user by token
    const session = UserSession.getByPk(token);

    //check if session is valid
    if (!session || session.isDeleted) {
        return res.status(401).send({
            success: false,
            message: "Invalid session."
        })
    }

    //get the user
    const user = User.findByPk(session.userID);

    //check if the user exists
    if (!user) {
        return res.status(401).send({
            success: false,
            message: "Invalid session."
        })
    }

    //check if the user is an admin
    if (!user.isAdmin) {
        return res.status(401).send({
            success: false,
            message: "User is not an admin."
        })
    }

    //check if the skill with this name exists
    const skill = await Skill.findByPk(skillID);

    if (!skill) {
        return res.status(404).send({
            success: false,
            message: "This skill does not exist."
        })
    }

    if (name) {
        skill.name = name;
    }
    if (description) {
        skill.description = description;
    }
    if (imageURL) {
        skill.imageURL = imageURL;
    }

    await skill.save();

    return res.status(200).send({
        success: false,
        message: "Skill added."
    })

})

//add resource


//remove resource


//edit resource


//popular resources

