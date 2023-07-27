const db = require("../models")
const product = db.Product
const category = db.Category
const {Op, Sequelize, where} = require('sequelize')

module.exports = {
    getProduct: async(req,res)=>{
        try {
            const page = +req.query.page || 1
            const limit = +req.query.limit||10;
            const offset = (page - 1) * limit;
            const search = req.query.search
            const catId = +req.query.catId 
            const sort = req.query.sort || 'DESC'
            const sortBy = req.query.sortBy || `createdAt`
            const condition = { isDeleted: false }
            if (search) {
                condition[Op.or] = [{
                    productName: {[Op.like]: `%${search}%`}
                }]
            }
            if (catId) {
                condition.CategoryId = catId
            }
            const result = await product.findAll({include:[{model:category,attributes:{exclude:['createdAt',"updatedAt","isDeleted"]}}],attributes:["productName","productImage","productDescription","productPrice","CategoryId"],where:condition, subQuery:false})
            const total = await product.count({where:condition})
            res.status(200).send({
            totalPage: Math.ceil(total/limit),
            currentPage: page,
            totalProduct: total,
            result
        })
        } catch (error) {
            res.status(400).send(error)
        }
    },
    addProduct: async(req,res)=>{
        try {
            const {productImage, productName, productPrice, productDescription, Category} = req.body
            const result = await product.create({productImage, productName, productPrice, productDescription, CategoryId:Category})
            res.status(200).send("Success to add product")
        } catch (error) {
            res.status(400).send({error, msg:"Failed to add product"})
        }
    },
    editProduct: async (req, res) => {
        try {
            const id = req.params.id;
            const updateFields = {};
            if (req.body.productImage) {
                updateFields.productImage = req.body.productImage;
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
                updateFields.CategoryId = req.body.Category;
            }
            const result = await product.update(updateFields, {
                where: { id: id }
            });
            res.status(200).send({msg: "Success to edit product" });
        } catch (error) {
            res.status(400).send({ error, msg: "Failed to edit product" });
        }
    },
    deleteProduct: async(req,res)=>{
        try {
            const id = req.params.id
            const result = await product.update(
                {isDeleted : true},
                {where:{id:id}}
            )
            res.status(200).send("Success to delete product")
        } catch (error) {
            res.status(400).send("Failed to delete product")
        }
    },

}