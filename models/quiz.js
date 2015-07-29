/**
* El fichero quiz.js es parte del modelo (directorio models) y define la
* estructura de la tabla de quizes con 2 campos (tipo string):
*     -- pregunta : DataType.STRING
*     -- respuesta : DataType.STRING
*/
module.exports = function(sequelize, DataTypes) {
  // A sequelize.define se le pasan dos argumentos:
  //    -- El nombre de la tabla
  //    -- Un objeto con los campos de la tabla
  return sequelize.define(
    'Quiz',
    { pregunta: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Pregunta"}}
      },
      respuesta: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Respuesta"}}
      }
    }
  );
}
