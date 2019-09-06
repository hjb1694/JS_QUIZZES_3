'use strict';
module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define('Quiz', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Quiz.associate = function(models) {
    // associations can be defined here
    Quiz.hasMany(models.Question);
  };
  return Quiz;
};