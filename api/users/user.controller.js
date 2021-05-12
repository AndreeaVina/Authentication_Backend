const {
    create,
    getUserByEmail,
    getUsers,
    updateAdress,
    updatePhone,
    deleteUser
} = require("./user.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = "623756543687-q8iv24tqqlii2kj876pfqkle5uqjstsp.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

module.exports = {
    createUser: (req, res) => {
        const { body } = req;
        body.id = Math.random() * 1000;
        console.log(body);
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
            const payload = ticket.getPayload();
            const userid = payload['sub'];

            console.log(payload);
        }
        verify()
            .then(() => {
                res.cookie('session-token', token);
                res.send('tokenul este valid')
            })
            .catch(console.error);
    },
    updateUsers: (req, res) => {
        var body = req.body;
        if (body.adress != undefined)
            updateAdress(body, (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }
                return res.json({
                    success: 1,
                    message: "updated successfully"
                });
            });
        if (body.phone_number != undefined)
            updatePhone(body, (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }
                return res.json({
                    success: 1,
                    message: "updated successfully"
                });
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