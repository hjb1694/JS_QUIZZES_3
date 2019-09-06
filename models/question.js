'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    quizId: DataTypes.INTEGER,
    questionContent: DataTypes.TEXT,
    correctAnswer: DataTypes.INTEGER
  }, {});
  Question.associate = function(models) {
    Question.belongsTo(models.Quiz);
    Question.hasMany(models.Answer);
  };
  return Question;
};