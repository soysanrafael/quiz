/**
* Se contruye e inicializa la base de datos (las tablas solo se inicializan en
* caso de estar vacias) a partir de los modelos quiz.js y comment.js
*/

var path = require('path');
// Cargar Modelo ORM. Será con lo que construiremos nuestro modelo

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

var Sequelize = require('sequelize');
// Usar BBDD SQLite. El objeto sequelize es nuestra base de datos
// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd,
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true      // solo Postgres
  }
);

// Importar definicion de la tabla Quiz
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);

// Importar definicion de la tabla Comment
var comment_path = path.join(__dirname,'comment');
var Comment = sequelize.import(comment_path);

/**
* Se definen las relaciones entre ambas tablas
* Quiz<--1-----------N-->Comment
*
*  La relación de tipo 1-a-N entre Quiz y Comment se define en models.js con
*    -Comment.belongsTo(Quiz), indica que un comment pertenece a un quiz.
*    -Quiz.hasMany(Comment), indica que un quiz puede tener muchos comments.
*
*  La relación añade la columna “QuizId” en la tabla “Comment” que contiene
*  la clave externa (foreign key), que indica el quiz asociado al comentario.
*
*  Ver documentación: http://docs.sequelizejs.com/en/latest/api/associations/
*                     http://docs.sequelizejs.com/en/latest/docs/associations/
*/
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

// exportar tabla Quiz para que sea accesible desde otros sitios de la aplicacion
exports.Quiz = Quiz;
exports.Comment = Comment;

// sequelize.sync() inicializa tabla Quiz
sequelize.sync().then(function() {
  // then(..), que es un callback, ejecuta el manejador una vez creada la tabla
  Quiz.count().then(function (count){
    if(count === 0){   // la tabla se inicializa solo si está vacía
      Quiz.create({pregunta: 'Capital de Italia', respuesta: 'Roma', categoria: 'geografia'});
      Quiz.create({pregunta: 'Capital de Portugal', respuesta: 'Lisboa', categoria: 'geografia'});
      Quiz.create({pregunta: 'En qué deporte se usa tiza', respuesta: 'billar', categoria: 'deporte'});
      Quiz.create({pregunta: 'Color de la pelota de hockey sobre césped', respuesta: 'blanca', categoria: 'deporte'});
      Quiz.create({pregunta: 'Cómo se transmiten más rápidamente las ondas sonoras, a través del agua o del aire', respuesta: 'agua', categoria: 'ciencia'});
      Quiz.create({pregunta: 'Cuántos años tarda la luz en recorrer 9 460 730 472 580,8 km', respuesta: '1', categoria: 'ciencia'});
      Quiz.create({pregunta: 'Director ejecutivo de SpaceX', respuesta: 'Elon Musk', categoria: 'tecnologia'});
      Quiz.create({pregunta: 'Cuántos bits hay en un byte', respuesta: '8', categoria: 'tecnologia'});
      Quiz.create({pregunta: 'Cuál es el ojo defectuoso de Popeye', respuesta: 'derecho', categoria: 'otro'});
      Quiz.create({pregunta: 'Qué instrumento musical tiene nombre y forma geométricos', respuesta: 'triángulo', categoria: 'otro'})
        .then(function(){console.log('Base de datos (tabla quiz) inicializada')});
    }
  });
});
