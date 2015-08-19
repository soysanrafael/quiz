var models = require('../models/models.js');
var sequelize = require('sequelize');

exports.stats = function(req, res) {

  var statistics = {};

  models.Quiz.count()
  .then(function(a) {
    statistics.quizesNumber = a;
    return models.Comment.countPublished();
  })
  .then(function(b) {
    statistics.publishedCommentsNumber = b;
    return models.Comment.countQuizesCommented();
  })
  .then(function(c) {
    statistics.commentedQuizes = c
  })
  .then(function() {
    statistics.commentsAverage = statistics.publishedCommentsNumber / statistics.quizesNumber;
    statistics.quizesNotCommented = statistics.quizesNumber - statistics.publishedCommentsNumber;
    res.render('quizes/statistics', {statistics: statistics, errors: []});
  })
}
