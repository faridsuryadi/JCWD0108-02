const categoryControllers = require('../controllers/categoryControllers')
const router = require('express').Router()

router.get("/",categoryControllers.getCategory)
router.post("/",categoryControllers.addCategory)
router.patch("/:id",categoryControllers.editCategory)
router.delete("/:id",categoryControllers.deleteCategory)

module.exports = router