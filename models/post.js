'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.post.belongsTo(models.user)
    }
  }
  post.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    comments: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};
