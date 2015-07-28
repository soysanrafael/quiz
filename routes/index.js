var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index.ejs', { title: 'Quiz' });
});
/* GET author page */
router.get('/author', function(req, res) {
  res.render('author.ejs');
});
/* GET question page. */
router.get('/quizes/question', quizController.question);
/* GET answer page. */
router.get('/quizes/answer', quizController.answer);

module.exports = router;
