const jwt_decode = require('jwt-decode');
const {
    create,
    getUserByEmail,
    getUsers,
    updateAddress,
    updatePhone,
    createGmailAccount,
    deleteUser
} = require("./user.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');
const e = require("express");
const CLIENT_ID = "623756543687-q8iv24tqqlii2kj876pfqkle5uqjstsp.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);
const jwt_decode = require('jwt-decode');

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        if (body.password1 != body.password2) {
            return res.status(500).json({
                success: 0,
                message: "Database connection errror"
            });
        }
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection errror"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    login: (req, res) => {
        const body = req.body;
        getUserByEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results.email }, process.env.secretKey, {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "login successfully",
                    token: jsontoken
                });
            } else {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
        });
    },
    googleLogIn: (req, res) => {
        res.render('loginGoogle.ejs');
    },
    logOut: (req, res) => {
        res.clearCookie('session-token');
        res.redirect('/loginGoogle.ejs')

    },
    checkGmailToken: (req, res) => {
        var token = req.body.token;
        console.log(token);
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: CLIENT_ID,
            });
            // const payload = ticket.getPayload();
            // const userid = payload['sub'];

            // console.log(payload);
        }
        verify()
            .then(() => {
                res.cookie('session-token', token);
                var decoded = jwt_decode(token);
                console.log(decoded);
                const respo = {};
                respo.id = 34567;
                respo.name = decoded.given_name;
                respo.surname = decoded.family_name;
                respo.email = decoded.email;
                createGmailAccount(respo, (err, results) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection errror"
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        data: results
                    });
                });
                // res.send('tokenul este valid')
                //res.redirect(); pagina furnizata de Ecaterina
            })
            .catch(res.send("Token invalid"));
    },
    updateAddressUser: (req, res) => {
        var body = req.body;
        //var token = req.body.token;
        //var decoded = jwt_decode(token);
        body.id = 34567
        console.log(body)
        updateAddress(body, (err, results) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: err.message
                })
            }
            else {
                return res.json({
                    success: 1,
                    message: "updated successfully"
                })
            }
        });
    },
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record Not Found"
                });
            }
            return res.json({
                success: 1,
                message: "user deleted successfully"
            });
        });
    }
};