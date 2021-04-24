const router = require("express").Router();
const BookRepository = require("../../repository/BookRepository");
const BookModel = require("../../model/BookModel");
const { Serializer } = require("../../Serializer");

router.options("/", (req, res) => {
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Access-Control-Allow-Headers", "Content-Type");

    res.status(204).end();
});

router.get("/", async (req, res, next) => {
    try {
        const books = await BookRepository.list();

        res.status(200).send(
            new Serializer(res.getHeader("Content-Type"), "Book").serialize(
                books.map((book) => {
                    return {
                        id: book.id,
                        title: book.title,
                        author: book.author,
                    };
                })
            )
        );
    } catch (error) {
        next(error);
    }
});

module.exports = router;
