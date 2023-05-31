'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class announcement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  announcement.init({
    serial: DataTypes.INTEGER,
    title: DataTypes.STRING,
    short_description: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    main_image: DataTypes.STRING,
    article_content: DataTypes.STRING,
    article_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'announcement',
  });
  return announcement;
};