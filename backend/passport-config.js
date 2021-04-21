const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const mysql = require('mysql')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ip_project'
});
db.connect((err) => {
    if (err) {
        throw err;
    }
})

function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async(email, password, done) => {
        // const user = db.query("SELECT *from users where email = '" + email + "'", function(err, result, field) {
        //         if (result.length === 0) {
        //             return done(null, false, { message: 'No user with that email' })
        //         }
        //     })
        const user = getUserByEmail(email)
        if (user == null) {
            return done(null, false, { message: 'No user with that email' })
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Password incorrect' })
            }
        } catch (e) {
            return done(e)
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
}

module.exports = initialize