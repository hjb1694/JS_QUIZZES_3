const router = require('express').Router();
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const sequelize = require('sequelize');

const User = require('../models').User;


const isLoggedIn = require('../middleware/isLoggedIn');


/*
@route GET /user/register
*/
router.get('/register', isLoggedIn, (req, res) => res.render('register', {title : 'Register'}));

/*
@route POST /user/register
*/

router.post('/register', isLoggedIn, [
    check('name').trim().isLength({min:2}),
    check('email').trim().isEmail(), 
    check('password').isLength({min:8})
], (req, res) => {

    const {name, email, password} = req.body;

    const validationErrors = validationResult(req);

    if(!validationErrors.isEmpty()) return res.status(422).json({error : 'There was an issue processing your request. [Validation]'});   
    
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    User.findOne({
        where : {
            email
        }
    })
    .then(user => {

        if(user) return res.json({error : 'This email address already exists!'});

        User.create({
            name, 
            email, 
            password : hashedPassword
        })
        .then(result => {

            req.session.loggedIn = true;
            
            res.json({okMsg : 'User Account Created'});

        })
        .catch(e => {
            console.log(e);
            res.json({error : 'There was an error processing your request.'});
        });

    })
    .catch(e => {
        res.json({error : 'There was an error processing your request.'});
        console.log(e);
    });
});


/*
@route GET /user/login
*/
router.get('/login', isLoggedIn, (req, res) => {

    res.render('login', {title : 'login'});

});

/*
@route POST /user/login
*/
router.post('/login', isLoggedIn, (req, res) => {

    const {email, password} = req.body;

    User.findOne({
        where : {
            email
        }
    })
    .then(result => {
        if(!result){
            return res.json({error : 'The credentials you entered do not exist or are invalid'});
        }

        const {email : dbemail, password : dbpassword} = result.dataValues;


        const compared = bcrypt.compareSync(password, dbpassword);

        if(!compared){
            return res.json({error : 'The credentials you entered do not exist or are invalid'});
        }

        req.session.loggedIn = true;

        res.json({okMsg : 'Login success!'});


    })
    .catch(e => {
        console.log(e);
        res.json({error : 'There was an error processing your request.'});
    });


});



/*
@route GET /user/logout
*/

router.get('/logout', (req, res) => {

    req.session.destroy();

    res.redirect('/');

});


module.exports = router;