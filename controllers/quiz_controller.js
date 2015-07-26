// GET /quizes/question
exports.question = function(req, res){
    res.render('quizes/question.ejs',{pregunta: '¿Cuál es la capital de Italia?'});
};

// GET /quizes/answer
exports.answer = function(req, res){
    if(req.query.respuesta === 'Roma' || req.query.respuesta === 'roma'){
        res.render('quizes/answer.ejs',{respuesta: 'Respuesta correcta'});
    } else {
        res.render('quizes/answer.ejs',{respuesta: 'Respuesta incorrecta'});
    }
    
};