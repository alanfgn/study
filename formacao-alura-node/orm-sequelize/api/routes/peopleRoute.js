const { Router } = require("express")
const PeopleController = require("../controllers/PeopleController")

const router = Router()

router.get("/people", PeopleController.listActivePeople)
router.get("/people/all", PeopleController.listAllPeople)
router.get("/people/:id", PeopleController.getPerson)
router.get("/people/:id/registers", PeopleController.getOnGoingRegistersPersons)
router.post("/people", PeopleController.savePerson)
router.post("/people/:id/restore", PeopleController.restorePerson)
router.post("/people/:id/cancel", PeopleController.cancelPerson)
router.put("/people/:id", PeopleController.updatePerson)
router.delete("/people/:id", PeopleController.deletePerson)

module.exports = router
