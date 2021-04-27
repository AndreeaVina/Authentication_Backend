const pool = require("../../config/database");

module.exports = {
    create: (data, callback) => {
        pool.query(
            `INSERT INTO users (id,name, surname, email, password, adress, phone_number, isolated , maxDistanceAccepted, startHour , finalHour) VALUES (?,?,?,?,?,?,?,?,?,?,?)`, [
                data.id,
                data.name,
                data.surname,
                data.email,
                data.password,
                data.adress,
                data.phone_number,
                data.isolated,
                data.maxDistanceAccepted,
                data.startHour,
                data.finalHour
            ],
            (error, results, fiels) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getUsers: callBack => {
        pool.query(
            `select id,name,surname,email,adress from users`, [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
};