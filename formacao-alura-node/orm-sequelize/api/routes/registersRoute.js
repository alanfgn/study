const { Router } = require("express")
const RegistersController = require("../controllers/RegistersController")

const router = Router()

router.get("/registers", RegistersController.listRegisters)
router.get("/registers/:classId/classes", RegistersController.listClassesRegisters)

module.exports = router
