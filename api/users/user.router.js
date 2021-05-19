const router = require("express").Router();
const express = require("express");
const app = express();
const { checkToken } = require("../../auth/token_validation.js");
const {
    createUser,
    login,
    // getUsers,
    update,
    googleLogIn,
    checkGmailToken,
    logOut,
    deleteUser
} = require("./user.controller");
const { getUserByEmail } = require("./user.service");
router.post("/", createUser);
// router.get("/", checkToken, getUsers);
// router.get("/:email", getUserByEmail);
router.post("/login", login);
router.patch("/update", update);
router.get("/GoogleLogIn", googleLogIn);
router.get("/logOut", logOut);
router.post("/GoogleLogIn", checkGmailToken);
module.exports = router;
