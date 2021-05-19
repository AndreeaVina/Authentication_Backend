const router = require("express").Router();
const express = require("express");
const app = express();
const { checkToken } = require("../../auth/token_validation.js");
const {
    createUser,
    login,
    // getUsers,
    updateAddressUser,
    GmailRegister,
    checkGmailToken,
    logOut,
    deleteUser
} = require("./user.controller");
const { getUserByEmail } = require("./user.service");
router.post("/register", createUser);
// router.get("/", checkToken, getUsers);
// router.get("/:email", getUserByEmail);
router.post("/login", login);
router.patch("/", updateAddressUser);
router.get("/GoogleRegister", GmailRegister);
router.get("/logOut", logOut);
router.post("/GmailRegister", checkGmailToken);
module.exports = router;