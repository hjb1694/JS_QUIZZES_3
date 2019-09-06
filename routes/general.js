const router = require('express').Router();


router.get('/', (req, res) => res.render('index', {title : 'Home', userLoggedIn : req.session.loggedIn}));

router.use(['*','/notFound'], (req, res) => res.render('notFound', {title : 'Not Found', userLoggedIn : req.session.loggedIn}));


module.exports = router;