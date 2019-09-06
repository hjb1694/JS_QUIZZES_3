'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    questionId: DataTypes.INTEGER,
    answerNumber: DataTypes.INTEGER,
    answerContent: DataTypes.TEXT
  }, {});
  Answer.associate = function(models) {
    // associations can be defined here
    Answer.belongsTo(models.Question);
  };
  return Answer;
};