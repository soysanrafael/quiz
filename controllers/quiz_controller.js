//Se importa el modelo para poder acceder a la base de datos
var models = require('../models/models.js');


// Autoload - factoriza el código si ruta incluye :quizId
// Autoload :id
exports.loadId = function(req, res, next, quizId) {
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
  if(req.query.search){
    var search = ("%"+req.query.search+"%").replace(/\s+/g,"%");
    models.Quiz.findAll({where: ["pregunta LIKE ?", search]}).then(
      function(quizes) {
        res.render('quizes/index.ejs', {quizes: quizes, errors: []});
      }
    ).catch(function(error){next(error)});
  }else{
    models.Quiz.findAll().then(
      function(quizes) {
        res.render('quizes/index.ejs', {quizes: quizes, errors: []});
      }
    ).catch(function(error){next(error)});
  }

};

// GET /quizes/:id
exports.show = function(req, res) {
  res.render('quizes/show', { quiz: req.quiz, errors: []});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  var resultado = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta) {
    resultado = 'Correcto';
  }
  res.render(
    'quizes/answer',
    { quiz: req.quiz,
      respuesta: resultado,
      errors: []
    }
  );
};

  //GET /quizes/new
  exports.new = function(req, res){
  //Creamos un objeto Quiz que le pasaremos al formulario para que escriba
  //los values de las cajas de texto
  //NOTA: Quizás sería mejor ponerlo directamente en la vista del formulario
    var quiz = models.Quiz.build(
			   {pregunta: 'Pregunta', respuesta: 'Respuesta'}
       );
    res.render('quizes/new', {quiz: quiz, errors: []});
  };

  //POST /quizes/create
  exports.create = function(req, res) {
    //Creamos un objeto Quiz con los datos recuperados del formulario
    var quiz = models.Quiz.build(req.body.quiz);

    //Se guarda en la base de datos los campos pregunta y respuesta de quiz, y se
    //redirecciona a la lista de preguntas
    quiz.validate().then(function(err){
      if (err) {
        res.render('quizes/new', {quiz: quiz, errors: err.errors});
      } else {
        quiz.save({fields: ["pregunta", "respuesta"]})
          .then( function(){ res.redirect('/quizes')})
      }
    }).catch(function(error){next(error)});
  };

  //GET /quizes/:id/edit
  exports.edit = function(req, res){
    var quiz = req.quiz;
    res.render('quizes/edit', {quiz: quiz, errors: []});
  };

  //POST /quizes/:id
  exports.update = function(req, res) {
    req.quiz.pregunta = req.body.quiz.pregunta;
    req.quiz.respuesta = req.body.quiz.respuesta;

    //Se guarda en la base de datos los campos pregunta y respuesta de quiz, y se
    //redirecciona a la lista de preguntas
    req.quiz.validate().then(function(err){
      if (err) {
        res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
      } else {
        req.quiz.save( {fields: ["pregunta", "respuesta"]})
          .then( function(){ res.redirect('/quizes');});
      }
    })
  };

  // DELETE /quizes/:id
  exports.destroy = function(req, res) {
    req.quiz.destroy().then( function() {
      res.redirect('/quizes');
    }).catch(function(error){next(error)});
  };
