const express = require("express");
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ip_project'
});

app.post('/register', async(req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    var i = req.body.izolat
    if (i == "true") i = "1"
    else i = "0"
    db.query("INSERT INTO users (id, name, surname, email, password, adress, phone_number, 	isolated , maxDistanceAccepted, startHour , finalHour) VALUES (?,?,?,?,?,?,?,?,?,?,?)", [Date.now().toString(), req.body.name, req.body.surname, req.body.email, hashedPassword, req.body.address, req.body.phoneNumber, i, req.body.distanta, req.body.oraStart, req.body.oraFinal]);
})
app.listen(8000, () => {
    console.log("running server");
})