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

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        console.log(body)
        if (body.password1 != body.password2) {
            return res.status(500).json({
                success: 0,
                message: "passwords don't match"
            });
        }
        const salt = genSaltSync(10);
        body.password1 = hashSync(body.password1, salt);
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
                    data: "invalid email"
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ results }, process.env.secretKey, {
                    expiresIn: "24h"
                });
                return res.json({
                    success: 1,
                    message: "login successfully",
                    username: results.userName,
                    token: jsontoken
                });
            } else {
                return res.json({
                    success: 0,
                    data: "invalid password"
                });
            }
        });
    },
    GmailRegister: (req, res) => {
        res.render('loginGoogle.ejs');
    },
    logOut: (req, res) => {
        res.clearCookie('session-token');
        res.redirect('/loginGoogle.ejs')

    },
    endPointList: (req, res) => {
        var body = req.body;
        var decoded = jwt_decode(body.token);
        getUserById(decoded.id, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid id" //endpoint validare
                });
            }

            //cred ca am putea sa bagam inca un if in fiecare if si sa returnam un res.status in cazul in care nu exista din datele cerute in baza de date
            if (decoded.name) {
                res.name = results.name;
            }
            if (decoded.surname) {
                res.surname = results.surname;
            }
            if (decoded.email) {
                res.email = results.email;
            }
            if (decoded.adress) {
                res.adress = results.adress;
            }
            if (decoded.phone_number) {
                res.phone_number = results.phone_number;
            }
            if (decoded.isolated) {
                res.isolated = results.isolated;
            }
            if (decoded.maxDistanceAccepted) {
                res.maxDistanceAccepted = results.maxDistanceAccepted;
            }
            if (decoded.startHour) {
                res.startHour = results.startHour;
            }
            if (decoded.finalHour) {
                res.finalHour = results.finalHour;
            }
            //endpoint cu lista de cereri

        });

    },
    GmailLogIn: (req, res) => {
        var token = req.body.token;
        console.log(token);
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: CLIENT_ID,
            });
        }
        verify()
            .then(() => {
                res.cookie('session-token', token);
                var decoded = jwt_decode(token);
                console.log(decoded);
                getUserByEmail(decoded.email, (err, results) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection errror"
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        data: token
                    });
                });
                // res.send('tokenul este valid')
                //res.redirect(); pagina furnizata de Ecaterina
            })
            .catch((error) => {
                return res.status(500).json({
                    success: 0,
                    data: "token invalid"
                });
            })

    },
    checkGmailToken: (req, res) => {
        var token = req.body.token;
        console.log(token);
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: CLIENT_ID,
            });

        }
        verify()
            .then(() => {
                res.cookie('session-token', token);
                var decoded = jwt_decode(token);
                console.log(decoded);
                const respo = {};
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
            .catch((error) => {
                return res.status(500).json({
                    success: 0,
                    data: "token invalid"
                });
            })
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
            } else {
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