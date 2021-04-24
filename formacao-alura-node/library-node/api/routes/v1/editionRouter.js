const router = require("express").Router({ mergeParams: true });
const EditionModel = require("../../model/EditionModel");
const EditionRepository = require("../../repository/EditionRepository");

const { Serializer } = require("../../Serializer");

router.options("/", (req, res) => {
    res.set("Access-Control-Allow-Methods", "GET,POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");

    res.status(204).end();
});

router.get("/", async (req, res, next) => {
    try {
        const editions = await EditionRepository.listByBookId(
            req.params.idBook
        );
        res.send(
            new Serializer(res.getHeader("Content-Type"), "Edition").serialize(
                editions
            )
        );
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const edition = await EditionRepository.add({
            ...req.body,
            book: req.book.id,
        });

        res.send(
            new Serializer(res.getHeader("Content-Type"), "Edition").serialize(
                new EditionModel(edition)
            )
        );
    } catch (error) {
        next(error);
    }
});

router.options("/:idEdition", (req, res) => {
    res.set("Access-Control-Allow-Methods", "GET,PUT");
    res.set("Access-Control-Allow-Headers", "Content-Type");

    res.status(204).end();
});

router.get("/:idEdition", async (req, res, next) => {
    try {
        const edition = await EditionRepository.getById(
            req.book.id,
            res.params.idEdition
        );

        res.send(
            new Serializer(res.getHeader("Content-Type"), "Edition").serialize(
                new EditionModel(edition)
            )
        );
    } catch (error) {
        next(error);
    }
});

router.put("/:idEdition", async (req, res, next) => {
    try {
        const body = req.body;
        const edition = await EditionRepository.getById(
            req.book.id,
            req.params.idEdition
        );

        ["title", "pages"].forEach((field) => {
            edition[field] = body[field];
        });

        await EditionRepository.update(
            req.book.id,
            res.params.idEditio,
            edition
        );

        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

router.options("/:idEdition/add-copies", (req, res) => {
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");

    res.status(204).end();
});

router.post("/:idEdition/add-copies", async (req, res, next) => {
    try {
        const copies = req.body.copies;
        const edition = await EditionRepository.getById(
            req.book.id,
            req.params.idEdition
        );

        await EditionRepository.update(req.book.id, req.params.idEdition, {
            ...edition,
            copies: copies,
        });

        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

module.exports = router;
