'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  profiles.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fullName: DataTypes.STRING,
    instaId: DataTypes.STRING,
    twitter:{
      type:DataTypes.STRING,
      allowNull: true,
    },
    email:{
      type:DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'profiles',
  });
  return profiles;
};