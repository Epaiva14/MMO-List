'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  game.init({
    serial: DataTypes.STRING,
    title: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    status: DataTypes.STRING,
    short_description: DataTypes.STRING,
    game_url: DataTypes.STRING,
    genre: DataTypes.STRING,
    platform: DataTypes.STRING,
    publisher: DataTypes.STRING,
    developer: DataTypes.STRING,
    release_date: DataTypes.DATEONLY,
    system_os: DataTypes.STRING,
    system_processor: DataTypes.STRING,
    system_graphics: DataTypes.STRING,
    system_storage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'game',
  });
  return game;
};