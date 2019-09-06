const router = require('express').Router();


router.get('/', (req, res) => res.render('index', {title : 'Home'}));

router.use(['*','/notFound'], (req, res) => res.render('notFound', {title : 'Not Found'}));


module.exports = router;