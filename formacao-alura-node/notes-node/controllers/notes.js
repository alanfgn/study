const Notes = require("../models/notes");
const NumbersFact = require("../models/numbersApi");

module.exports = (app) => {
    app.get("/notes", async (req, res) => {
        try {
            res.send(await Notes.list());
        } catch (error) {
            res.status(400).send(error);
        }
    });

    app.post("/note/", async (req, res) => {
        try {
            res.send(await Notes.add(req.body));
        } catch (error) {
            res.status(400).send(error);
        }
    });

    app.get("/note/:id", async (req, res) => {
        try {
            const note = await Notes.get(req.params.id);
            res.send({...note, fact: await NumbersFact.getFactAboutId(req.params.id)});
        } catch (error) {
            res.status(400).send(error);
        }
    });

    app.put("/note/:id", async (req, res) => {
        try {
            res.send(await Notes.update(req.params.id, req.body));
        } catch (error) {
            res.status(400).send(error);
        }
    });

    app.delete("/note/:id", async (req, res) => {
        try {
            res.send(await Notes.remove(req.params.id));
        } catch (error) {
            res.status(400).send(error);
        }
    });
};
