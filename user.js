'use strict';
const {
  Model,
  DataTypes,
  Sequelize
} = require('sequelize');
module.exports = (sequelize) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define associations here
    }
  }
  user.init({
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
      allowNull:false
    } ,
    role: DataTypes.STRING,
    username: DataTypes.STRING,
    nama: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,  // Define 'createdAt' as DATE type
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),  // Automatically set to the current timestamp when a new record is created
    },
    updatedAt: {
      type: DataTypes.DATE,  // Define 'updatedAt' as DATE type
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),  // Automatically set to the current timestamp when a new record is created
    }
  }, {
    sequelize,
    modelName: 'user',
    timestamps: true,  // Automatically manage 'createdAt' and 'updatedAt'
  });
  return user;
};
