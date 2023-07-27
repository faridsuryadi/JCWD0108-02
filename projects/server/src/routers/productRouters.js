const productControllers = require('../controllers/productControllers')
const router = require('express').Router()

router.get("/",productControllers.getProduct)
router.post("/",productControllers.addProduct)
router.patch("/:id",productControllers.editProduct)
router.delete("/:id",productControllers.deleteProduct)

module.exports = router