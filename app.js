const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')

const uuid = require('uuid/v4')
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const UserModel = require('./server/models').User
const routes = require('./server/routes')

const env = process.env.NODE_ENV || 'development'

/**Passport==local=== */

passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    async (email, password, done) => {
        try {

            let user = await UserModel.findOne({
                where: {
                    email
                }
            })

            if (email === user.email) {

                try {

                    const isPasswordMatched = await UserModel.isPasswordMatched(password, user.password)

                    if (isPasswordMatched) {
                        return done(null, user)
                    }

                } catch (err) {
                    console.log('err', err)
                    return done(null, false, {
                        message: 'Internal error occurred.'
                    });
                }
            }

            return done(null, false, {
                message: 'Incorrect username or password.'
            });

        } catch (err) {
            console.log('err', err)
            return done(null, false, {
                message: 'Internal error occurred.'
            });
        }
    }
));

//Passport local 

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
    // console.log('Inside serializeUser callback. User id is save to the session file store here')
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {

    try {
        let user = await UserModel.findByPk(id)

        if (user) return done(null, user)

        return done(null, false)

    } catch (err) {
        console.log('error occurred', err)
        return done(null, false)
    }
});


const app = express();

app.use(helmet())

// compress responses
app.use(compression())

if (env === 'development') app.use(logger('dev'));

app.use(cors({
    //   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    //   credentials: true
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use(session({
    genid: (req) => {
        console.log('Inside session middleware genid function')
        console.log(`Request object sessionID from client: ${req.sessionID}`)
        return uuid() // use UUIDs for session IDs
    },
    store: new FileStore(),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());


app.post('/login', (req, res, next) => {

    console.log('Inside POST /login callback')
    passport.authenticate('local', (err, user, info) => {

        if (err) {
            return res.send('Invalid username or password')
        }

        req.login(user, (err) => {
            if (err) {
                return res.send('Invalid username or password')
            }

            return res.send('You were authenticated & logged in!\n');
        })
    })(req, res, next);

})

app.get('/', (req, res) => {
    res.send(`You got home page!\n`)
})

app.get('/accounts', (req, res) => {
    if (req.isAuthenticated()) {
        res.send('welcome =>' + req.user.email)
    } else {
        res.redirect('/')
    }
})


routes(app);

app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;