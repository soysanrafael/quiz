//Se importa el modelo para poder acceder a la base de datos
var models = require('../models/models.js');


// Autoload - factoriza el código si ruta incluye :quizId
// Autoload :id
exports.load = function(req, res, next, quizId) {
  models.Quiz.find({
            where: {
                id: Number(quizId)
            }
        }).then(function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else{next(new Error('No existe quizId=' + quizId))}
    }
  ).catch(function(error){next(error)});
};

// GET /quizes
exports.index = function(req, res)
{
  models.Quiz.findAll().then(
    function(quizes) {
      res.render('quizes/index.ejs', {quizes: quizes, errors: []});
    }
  ).catch(function(error){next(error)});
};

// GET /quizes/:id
exports.show = function(req, res) {
  res.render('quizes/show', { quiz: req.quiz });
};

/*
exports.show = function(req, res)
{
  var options = {};
  if(req.quiz){
    options.where = {id: req.quiz.Id}
  }

  models.Quiz.findAll(options).then
  (
    function(quiz)
    {
      res.render('quizes/show', { quiz: req.quiz });
    }
  )
};
*/

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  var resultado = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta) {
    resultado = 'Correcto';
  }
  res.render(
    'quizes/answer',
    { quiz: req.quiz,
      respuesta: resultado
    }
  );
};
