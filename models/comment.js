/**
* El fichero comment.js es parte del modelo (directorio models) y define la
* estructura de la tabla de comment con 1 campo1 (tipo string):
*     -- texto : DataType.STRING
*/
module.exports = function(sequelize, DataTypes) {
  // A sequelize.define se le pasan dos argumentos:
  //    -- El nombre de la tabla
  //    -- Un objeto con los campos de la tabla
  return sequelize.define(
  	'Comment',
    { texto: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Comentario"}}
      }
    }
  );
}
