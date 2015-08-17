//Se importa el modelo para poder acceder a la base de datos
var models = require('../models/models.js');

//GET /quizes/:quizid/comments/new
//renderiza el formulario para la pregunta de id quizid
exports.new = function(req, res) {
  res.render('comments/new.ejs', {quizid: req.params.quizId, errors: []});
};


//POST /quizes/:quizid/comments
//se construye registro para la tabla Comment, se valida y se introduce en la BD.
exports.create = function(req, res) {
  var comment = models.Comment.build(
      { texto: req.body.comment.texto,
        QuizId: req.params.quizId
        });

  comment
  .validate()
  .then(
    function(err){
      if (err) {
        res.render('comments/new.ejs', {comment: comment, errors: err.errors});
      } else {
        comment // save: guarda en DB campo texto de comment
        .save()
        .then( function(){ res.redirect('/quizes/'+req.params.quizId)})
      }      // res.redirect: Redirección HTTP a lista de preguntas
    }
  ).catch(function(error){next(error)});

};
