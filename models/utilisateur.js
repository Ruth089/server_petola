'use strict';
const bcrypt = require("bcrypt");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Utilisateur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.Utilisateur.hasMany(models.Abonnement);

      models.Utilisateur.hasMany(models.Utilisateur);

    }
  };
  Utilisateur.init({
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    pwd: DataTypes.STRING,
    pseudonom: DataTypes.STRING,
    
  }, 
  {
    hooks: {
      afterValidate: (Utilisateur, options) => {
        Utilisateur.pwd = bcrypt.hashSync(Utilisateur.pwd, 8);
      }
    },
    sequelize
  }
  ,
  {
    sequelize,
    modelName: 'Utilisateur',
  });
  return Utilisateur;
};