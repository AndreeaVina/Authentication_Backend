const pool = require("../../config/database");

module.exports = {
    getAllUsers: (callback) => {
        pool.query(
            `SELECT *FROM users`, [],
            (error, results, fiels) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    create: (data, callback) => {
        pool.query(
            `INSERT INTO users (name, surname, userName,email, password, address, phone_number, isolated , maxDistanceAccepted, startHour , finalHour) VALUES (?,?,?,?,?,?,?,?,?,?,?)`, [
                data.name,
                data.surname,
                data.userName,
                data.email,
                data.password1,
                data.address,
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
            `INSERT INTO users (id,name, surname, email) VALUES (?,?,?,?)`, [
                data.id,
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
    },
    updateMaxDistance: (data, callBack) => {
        pool.query(
            `update users set maxDistanceAccepted = ? where id=?`, [
                data.maxDistanceAccepted,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },
    updateStartHour: (data, callBack) => {
        pool.query(
            `update users set startHour = ? where id=?`, [
                data.startHour,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },
    updateFinalHour: (data, callBack) => {
        pool.query(
            `update users set finalHour = ? where id=?`, [
                data.finalHour,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },
    updateSurname: (data, callBack) => {
        pool.query(
            `update users set surname = ? where id=?`, [
                data.surname,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },
    updateName: (data, callBack) => {
        pool.query(
            `update users set name = ? where id=?`, [
                data.name,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },
};