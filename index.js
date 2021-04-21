if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
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
    console.log('Data base connected')
})

const initializePassport = require('./passport-config')
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

const users = []

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        var i = req.body.izolat
        if (i == "true") i = "1"
        else i = "0"
        db.query("INSERT INTO users (id, name, surname, email, password, adress, phone_number, 	isolated , maxDistanceAccepted, startHour , finalHour) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
            [Date.now().toString(), req.body.name, req.body.surname, req.body.email, hashedPassword, req.body.adress, req.body.phone, i, req.body.distanta, req.body.oraStart, req.body.oraFinal])
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: hashedPassword,
            adress: req.body.adress,
            phone: req.body.phone,
            isolated: i,
            maxDistanceAccepted: req.body.distanta,
            startHour: req.body.oraStart,
            finalHour: req.body.oraFinal
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
})

app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

//de aici e nou
const jwt = require('jsonwebtoken')
var tkn=null;

app.use(express.json())

const posts = [
{
    username: 'Tony',
    title: 'post1'
},
{
    username: 'Tom',
    title: 'post2'
},
{
    username: 'mama',
    title: 'post special pentru mama'
}
]

app.get('/posts', authenticateToken, (req, res)=> {
    res.json(posts.filter(post => post.username === req.user.name))
})

app.post('/login2', (req,res) =>{
    const username = req.body.username
    const user = { name: username }
    
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)   
    tkn=null
    tkn = accessToken
    console.log({La_creare:tkn})
    res.json({tokenulNostru : tkn})

})


function authenticateToken(req, res, next) {
    res.json({Authorization: 'Bearer ', tkn})
     const str1='Bearer'
     const str2=tkn
    //const authHeader = req.headers['Authorization']
    console.log({La_venire_inca : str1})
    //const token = authHeader && authHeader.split(' ')[1]
    
    if(tkn==null) return res.sendStatus(401)
    

    const token=str1.concat(' ', str2)
    console.log({La_venire_maisi : token})

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
        if(err) return res.sendStatus(403)
        req.user=user
        next()
    })
}


app.listen(3000)