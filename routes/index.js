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

/* GET search page */
router.get('/search', function(req, res) {
  res.render('search.ejs');
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.loadId);  // autoload :quizId

// Definición de rutas de /quizes
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

module.exports = router;
