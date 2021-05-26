const jwt_decode = require('jwt-decode');
const {
    create,
    getUserByEmail,
    getUsers,
    updateAddress,
    updatePhone,
    createGmailAccount,
    deleteUser,
    updateMaxDistance,
    getAllUsers,
    updateStartHour,
    updateSurname,
    updateName,
    getInfoUser
} = require("./user.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');
const e = require("express");
const { checkToken } = require('../../auth/token_validation');
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
                message: results
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
                    message: "invalid email",
                    token: "",
                    username: ""
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
                    message: "invalid password",
                    token: "",
                    username: ""
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
                        message: token
                    });
                });
                // res.send('tokenul este valid')
                //res.redirect(); pagina furnizata de Ecaterina
            })
            .catch((error) => {
                return res.status(500).json({
                    success: 0,
                    message: "token invalid"
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
                        message: results
                    });
                });
                // res.send('tokenul este valid')
                //res.redirect(); pagina furnizata de Ecaterina
            })
            .catch((error) => {
                return res.status(500).json({
                    success: 0,
                    message: "token invalid"
                });
            })
    },
    // checkLoggedIn: (req, res) => {
    //     console.log(req.headers.authorization.split(" ")[1])
    //     var body = req.body
    //     var decoded = jwt_decode(req.headers.authorization.split(" ")[1])
    //     if (decoded.jti) {
    //         return res.status(200).json({
    //             success: 1,
    //             data: "valid token"
    //         });
    //     }
    //     let token = req.get("authorization");
    //     if (token) {
    //         // Remove Bearer from string
    //         token = token.slice(7);
    //         jwt_decode.verify(token, process.env.secretKey, (err, decoded) => {
    //             if (err) {
    //                 return res.json({
    //                     success: 0,
    //                     message: "Invalid Token..."
    //                 });
    //             } else {
    //                 req.decoded = decoded;
    //                 next();
    //             }
    //         });
    //     } else {
    //         return res.json({
    //             success: 0,
    //             message: "Access Denied! Unauthorized User"
    //         });
    //     }

    // },
    update: (req, res) => {
        console.log(req.headers.authorization.split(" ")[1])
        var body = req.body
        res.json({
            success: true
        })
        var decoded = jwt_decode(req.headers.authorization.split(" ")[1])
        body.id = decoded.results.id;
        if (body.surname != undefined) {
            updateSurname(body, (err, results) => {
                if (err) {
                    res.json({
                        success: 0,
                        message: err.message
                    })
                }
            })
        }
        if (body.name != undefined) {
            updateName(body, (err, results) => {
                if (err) {
                    res.json({
                        success: 0,
                        message: err.message
                    })
                }
            })
        }
        if (body.address != undefined) {
            updateAddress(body, (err, results) => {
                if (err) {
                    res.json({
                        success: 0,
                        message: err.message
                    })
                }
            })
        }
        if (body.phone_number != undefined) {
            updatePhone(body, (err, results) => {
                if (err) {
                    res.json({
                        success: 0,
                        message: err.message
                    })
                }
            })
        }
        if (body.maxDistanceAccepted != undefined) {
            updateMaxDistance(body, (err, results) => {
                if (err) {
                    res.json({
                        success: 0,
                        message: err.message
                    })
                }
            })
        }
        if (body.startHour != undefined) {
            updateStartHour(body, (err, results) => {
                if (err) {
                    res.json({
                        success: 0,
                        message: err.message
                    })
                }
            })
        }
        if (body.finalHour != undefined) {
            updateFinalHour(body, (err, results) => {
                if (err) {
                    res.json({
                        success: 0,
                        message: err.message
                    })
                }
            })
        }


        return res
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
    },
    getUsers: (req, res) => {
        const data = req.body;
        getAllUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "no users found"
                });
            }
            return res.json({
                success: 1,
                message: results
            });
        });
    },
    getInfoUser: (req, res) => {
        console.log(req.headers.authorization.split(" ")[1])
        var body = req.body
        var decoded = jwt_decode(req.headers.authorization.split(" ")[1])
        body.id = decoded.results.id;
        getInfoUser(body.id, (err, results) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: 0,
                    message: err.message
                })
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record Not Found"
                });
            }
            results.password = undefined
            results.id = undefined
            return res.json({
                success: 1,
                message: results
            })
        })
    }
};