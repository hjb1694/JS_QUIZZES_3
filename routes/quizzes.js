const router = require('express').Router();
const path = require('path');
const Sequelize = require('sequelize');

//Models 
const Question = require('../models').Question;
const Answer = require('../models').Answer;
const Quiz = require('../models').Quiz;


const loggedInFalse = require('../middleware/loggedInFalse');


const getQuizItems = (quizId, attributes)=> {

    return Question.findAll({
        attributes,
        where : {
            quizId
        }, 
        include : [{
            model : Answer, 
            attributes : ['answerNumber','answerContent'],
            where : {questionId : Sequelize.col('question.id')}
        }]
    });

}


/*
@route GET /quiz/
*/
router.get('/', loggedInFalse, (req, res) => {
    
    Quiz.findAll({
        attributes : ['id','name','description']
    })
    .then(quizzes => {
        res.render('allQuizzes', {
            title : 'All Quizzes', 
            quizzes
        });
    })
    .catch(e => {

        console.log(e);

    })

});


/*
@route GET /quiz/:id
*/
router.get('/:id', loggedInFalse, (req, res) => {

    getQuizItems(req.params.id, ['id', 'questionContent'])
    .then(items => {

        if(!items.length){
            return res.redirect('/notFound');
        }

        res.render('quiz', {
            title : `Quiz ${req.params.id}`,
            items, 
            quizId : req.params.id
        });

    }).catch(e => {
        console.log(e);
    });

});


/*
@route POST /quizResult
*/
router.post('/quizResult', loggedInFalse, (req,res) => {

    getQuizItems(req.body.quizId, ['id', 'questionContent', 'correctAnswer'])
    .then(items => {

        const results = items.map(item => {

            let result = new Object();
            result.question = item.questionContent;
            result.possibleAnswers = item.Answers;
            result.correctAnswer = item.Answers.find(answer => {
                return answer.answerNumber == item.correctAnswer;
            }).answerContent;
            result.userAnswer = item.Answers.find(answer => {
                return answer.answerNumber == req.body[item.id];
            }).answerContent;

            if(item.correctAnswer != Number(req.body[item.id]) ){
                result.score = 'incorrect';
            }else{
                result.score = 'correct';
            }

            return result;

        });

        res.render('quizResults', {
            title : 'Quiz Results',
            results
        });
        

    }).catch(e => {

        console.log(e);

    });
});

module.exports = router;