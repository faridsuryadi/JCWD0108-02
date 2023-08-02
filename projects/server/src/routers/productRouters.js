const productControllers = require('../controllers/productControllers')
const router = require('express').Router()
const { multerUpload } = require('../middleware/multer')


router.get("/",productControllers.getProduct)
router.post("/",multerUpload('./public','Product').single('productImage'),productControllers.addProduct)
router.patch("/:id",multerUpload('./public','Product').single('productImage'),productControllers.editProduct)
router.delete("/:id",productControllers.deleteProduct)

module.exports = router