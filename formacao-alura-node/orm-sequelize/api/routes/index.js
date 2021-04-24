const bodyParser = require("body-parser")
const people = require("./peopleRoute")
const registers = require("./registersRoute")
const classes = require("./classesRouter")

module.exports = app => {
    app.use(bodyParser.json())
    app.use(people)
    app.use(registers)
    app.use(classes)
    app.get("/", (req, res) => res.send("Hello!"))
}