const express = require('express');
const path = require('path');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
require('dotenv').config();


const app = express();


const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, 'public')));


const sessionStore = new MySQLStore({
    host : process.env.DB_HOST,
    port : process.env.DB_PORT, 
    user : process.env.DB_USER, 
    password : process.env.DB_PASS, 
    database : process.env.DB_NAME
});

app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false, 
    saveUninitialized : true, 
    store : sessionStore
}));


//Load in routers 
const generalRouter = require('./routes/general');
const quizzesRouter = require('./routes/quizzes');
const userRouter = require('./routes/user');

//Use routers
app.use('/user', userRouter);
app.use('/quiz', quizzesRouter);
app.use(generalRouter);


app.listen(PORT, HOST, () => console.log(`Listening on port ${PORT} on ${HOST}!`));

