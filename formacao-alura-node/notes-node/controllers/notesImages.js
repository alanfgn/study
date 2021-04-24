const NotesImages = require("../models/notesImages");
const fs = require("fs");
const path = require("path");

module.exports = (app) => {
    const mockpth = "./assets/52z.jpg";

    app.post("/note/:id/images", async (req, res) => {
        try {
            const noteImage = req.body;

            if (["jpg", "jpeg", "png"].indexOf(path.extname(noteImage.name).substring(1)) === -1) {
                throw "Formato não compatível";
            }

            const imagePath = `./assets/img/${req.params.id}-${noteImage.name}`;
            fs.createReadStream(mockpth)
                .pipe(fs.createWriteStream(imagePath))
                .on("finish", async () => {
                    NotesImages.add(req.params.id, imagePath)
                        .then((ntimg) => {
                            res.status(200).send(ntimg);
                        })
                        .catch((error) => {
                            res.status(400).send(error);
                        });
                });
        } catch (error) {
            res.status(400).send(error);
        }
    });
};
