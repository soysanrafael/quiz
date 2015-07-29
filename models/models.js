/**
* Se contruye e inicializa la base de datos (las tablas solo se inicializan en
* caso de estar vacias) a partir del modelo quiz.js.
*/

var path = require('path');
// Cargar Modelo ORM. Será con lo que construiremos nuestro modelo
var Sequelize = require('sequelize');
// Usar BBDD SQLite. El objeto sequelize es nuestra base de datos
var sequelize = new Sequelize(
  null,  //DB_name
  null,  //user
  null,  //pwd
  { dialect:  "sqlite",
    storage:  "quiz.sqlite"
  }
);
// Ahora añadimos a la base de datos (objeto sequelize) la tabla Quiz
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);
// exportar tabla Quiz para que sea accesible desde otros sitios de la aplicacion
exports.Quiz = Quiz;

// sequelize.sync() inicializa tabla Quiz
sequelize.sync().then(function() {
  // then(..), que es un callback, ejecuta el manejador una vez creada la tabla
  Quiz.count().then(function (count){
    if(count === 0) {   // la tabla se inicializa solo si está vacía
            Quiz.create(
                {pregunta: '¿Cuál es la capital de Italia?', respuesta: 'Roma'}
            ).then(function(){console.log('Base de datos (tabla quiz) inicializada')});
    }
  });
});
