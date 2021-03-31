const express = require('express');
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'IP_Project'
});
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Data base connected')
})
const app = express();
app.get('/createdb', (req, res) => {
        let sql = 'CREATE DATABASE IP_Project';
        db.query(sql, (err, result) => {
            if (err)
                throw err;
            console.log(result);
            res.send('Data base created!');
        })
    })
    // app.get('/createTableUser', (req, res) => {
    //     let sql = 'CREATE TABLE users(id INTEGER NOT NULL, name VARCHAR(100) NOT NULL,surname VARCHAR(100) NOT NULL, email VARCHAR(100) PRIMARY KEY, password VARCHAR(100) NOT NULL,adress VARCHAR(300) NOT NULL, phone_number VARCHAR(100) NOT NULL,isolated BOOLEAN DEFAULT FALSE,maxDistanceAccepted DOUBLE(10,3),startHour TIME DEFAULT NULL, finalHour TIME DEFAULT NULL)';
    //     db.query(sql, (err, result) => {
    //         if (err)
    //             throw err;
    //         console.log(result);
    //         res.send('User table created!');
    //     });
    // })
app.get('/addUser1', (req, res) => {
    let user = { id: '1', name: 'Andreea', surname: 'Vina', email: 'vinaandreea27@gmail.com', password: '1234', adress: 'Horpaz', phone_number: '0743887000' };
    let sql = 'INSERT INTO users SET ?';
    let query = db.query(sql, user, (err, result) => {
        if (err)
            throw err;
        console.log(result);
        res.send('New user added!');
    });
})
app.listen('3000', () => {
    console.log("Server connected on port 3000!");
});