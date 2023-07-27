'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category)
    }
  }
  Product.init({
    productImage: {
      type: DataTypes.STRING,
    },
    productName: {
      type: DataTypes.STRING,
    },
    productPrice: {
      type: DataTypes.INTEGER,
    },
    productDescription: {
      type: DataTypes.STRING,
    },
    isDeleted:{
      type: DataTypes.BOOLEAN,
      defaultValue : false
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};