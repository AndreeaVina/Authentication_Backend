const pool = require("../../config/database");

module.exports = {
    create: (data, callback) => {
        pool.query(
            `INSERT INTO users (name, surname, email, password, adress, phone_number, isolated , maxDistanceAccepted, startHour , finalHour) VALUES (?,?,?,?,?,?,?,?,?,?)`, [
                data.name,
                data.surname,
                data.email,
                data.password1,
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
    createGmailAccount: (data, callback) => {
        pool.query(
            `INSERT INTO users (name, surname, email) VALUES (?,?,?)`, [
                data.name,
                data.surname,
                data.email,
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
    },
    updateAddress: (data, callback) => {
        pool.query(
            `update users set address = ? where id= ?`, [
                data.address,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    callback(error);
                }
                return callback(null, results)
            }
        );
    },
    updatePhone: (data, callback) => {
        pool.query(
            `update users set phone_number = ? where id= ?`, [
                data.phone_number,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    callback(error);
                }
                return callback(null, results)
            }
        );
    },
    updateIsolated: (data, callBack) => {
        pool.query(
            `update users set isolated = ? where id= ?`, [
                data.isolated,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getUserByEmail: (email, callBack) => {
        pool.query(
            `select * from users where email = ?`, [email],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getUserById: (id, callBack) => {
        pool.query(
            `select * from users where id = ?`, [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }
};