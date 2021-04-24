const router = require("express").Router();
const BookRepository = require("../../repository/BookRepository");
const BookModel = require("../../model/BookModel");
const { Serializer } = require("../../Serializer");
const routerEditions = require("./editionRouter");

router.options("/", (req, res) => {
    res.set("Access-Control-Allow-Methods", "GET,POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    
    res.status(204).end();
});

router.get("/", async (req, res, next) => {
    try {
        const books = await BookRepository.list();

        res.status(200).send(
            new Serializer(res.getHeader("Content-Type"), "Book").serialize(
                books
            )
        );
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { title, author, type } = req.body;

        const book = await BookRepository.add(
            new BookModel({
                title,
                author,
                type,
            })
        );

        res.set("ETag", book.version);
        res.set("Last-Modified", new Date(book.updatedAt).getTime());
        res.set("Location", `/api/books/${book.id}`);

        res.status(201).send(
            new Serializer(res.getHeader("Content-Type"), "Book").serialize(
                new BookModel(book)
            )
        );
    } catch (error) {
        next(error);
    }
});

router.options("/:id", (req, res) => {
    res.set("Access-Control-Allow-Methods", "GET,PUT,DELETE");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    
    res.status(204).end();
});

router.get("/:id", async (req, res, next) => {
    try {
        const book = await BookRepository.getById(req.params.id);

        res.set("ETag", book.version);
        res.set("Last-Modified", new Date(book.updatedAt).getTime());

        res.status(200).send(
            new Serializer(res.getHeader("Content-Type"), "Book").serialize(
                new BookModel(book)
            )
        );
    } catch (error) {
        next(error);
    }
});

router.head("/:id", async (req, res, next) => {
    try {
        const book = await BookRepository.getById(req.params.id);
        console.log("aaaaaa", book);
        res.set("ETag", book.version);
        res.set("Last-Modified", new Date(book.updatedAt).getTime());

        res.status(202).end();
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const body = req.body;
        const book = await BookRepository.getById(req.params.id);
        const fields = ["title", "author"];

        fields.map((f) => {
            book[f] = body[f];
        });

        const newBook = await BookRepository.update(
            req.params.id,
            new BookModel(book)
        );

        res.set("ETag", book.version);
        res.set("Last-Modified", new Date(book.updatedAt).getTime());
        res.set("Location", `/api/books/${book.id}`);

        res.status(200).send(
            new Serializer(res.getHeader("Content-Type"), "Book").serialize(
                new BookModel(newBook)
            )
        );
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        await BookRepository.delete(req.params.id);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

const verifyBook = async (req, res, next) => {
    try {
        req.book = await BookRepository.getById(req.params.idBook);
        next();
    } catch (error) {
        next(error);
    }
};

router.use("/:idBook/editions", verifyBook, routerEditions);

module.exports = router;
