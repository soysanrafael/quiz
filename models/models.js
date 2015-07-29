/**
* Se contruye e inicializa la base de datos (las tablas solo se inicializan en
* caso de estar vacias) a partir del modelo quiz.js.
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
