const db = require("../models")
const product = db.Product
const category = db.Category
const {Op, Sequelize, where} = require('sequelize')

module.exports = {
  getProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const page = +req.query.page || 1;
      const limit = +req.query.limit || 10;
      const offset = (page - 1) * limit;
      const search = req.query.search;
      const catId = +req.query.catId;
      const sortField = req.query.sortField || 'productName'; 
  
      const condition = {};

      const sortingField = sortField.endsWith('DESC') ? sortField.slice(0, -4) : sortField;
      const sortOrder = sortField.endsWith('DESC') ? 'DESC' : 'ASC';
  
      if (search) {
        condition[Op.or] = [{ productName: { [Op.like]: `%${search}%` } }];
      }
  
      if (catId) {
        condition.CategoryId = catId;
      }
  
      const result = await product.findAll({
        include: [
          {
            model: category,
            attributes: { exclude: ['createdAt', 'updatedAt', 'isDeleted'] },
          },
        ],
        attributes: [
          'id',
          'productName',
          'productImage',
          'productDescription',
          'productPrice',
          'CategoryId',
          'isDeleted',
        ],
        where: condition,
        subQuery: false,
        offset,
        limit,
        order: [[sortingField, sortOrder]], // Adding sorting order here
      });
  
      const total = await product.count({ where: condition });
  
      res.status(200).send({
        totalPage: Math.ceil(total / limit),
        currentPage: page,
        totalProduct: total,
        result,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
  
      
    addProduct: async(req,res)=>{
        try {
            const {productName, productPrice, productDescription, CategoryId} = req.body
            const productImage = req.file.filename
            const result = await product.create({productImage, productName, productPrice, productDescription, CategoryId})
            res.status(200).send("Success to add product")
        } catch (error) {
            res.status(400).send({error, msg:"Failed to add product"})
        }
    },
    editProduct: async (req, res) => {
        try {
            const id = req.params.id;
            const updateFields = {};
            console.log(req.file);
            if (req.file) {
              console.log('image', req.file.filename);
              updateFields.productImage = req.file.filename;
            }
            if (req.body.productName) {
                updateFields.productName = req.body.productName;
            }
            if (req.body.productPrice) {
                const parsedProductPrice = parseInt(req.body.productPrice);
                if (Number.isInteger(parsedProductPrice)) {
                    updateFields.productPrice = parsedProductPrice;
                }
            }
            if (req.body.productDescription) {
                updateFields.productDescription = req.body.productDescription;
            }
            if (req.body.Category) {
                updateFields.CategoryId = req.body.CategoryId;
            }
            const result = await product.update(updateFields, {
                where: { id: id }
            });
            console.log(updateFields);
            res.status(200).send({msg: "Success to edit product" });
        } catch (error) {
          console.log(error);
            res.status(400).send({ error, msg: "Failed to edit product" });
        }
    },
    deleteProduct: async(req,res)=>{
        try {
          const id = req.params.id
            const result = await product.findOne(
              {where:
                {id:id}
              }
            )
            console.log(req.params.id);
            console.log(result);
            if(result.isDeleted == false){
            await product.update(
                {isDeleted : true},
                {where:{id:id}}
                )
                res.status(200).send("Success to deactivate product")
              }
              if(result.isDeleted == true) 
              {await product.update(
                {isDeleted : false},
                {where:{id:id}}
                )
                res.status(200).send("Success to activate product")
              }
        } catch (error) {
            res.status(400).send("Failed to delete product")
            console.log(error);
        }
    },

}