const { Router } = require("express")
const ClassesController = require("../controllers/ClassesController")

const router = Router()

router.get("/classes", ClassesController.listClasses)
router.get("/classes/lotation", ClassesController.listLotationClasses)

module.exports = router
