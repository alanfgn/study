const BooksTable = require("../database/tables/BookTable");
const BusinessError = require("../error/BusinessError");
const NotFoundBusinessError = require("../error/NotFoundBusinessError");

module.exports = {
    validate(book) {
        ["title", "author"].forEach((rf) => {
            if (typeof book[rf] !== "string" || book[rf].length === 0) {
                throw new BusinessError(`Field ${rf} is invalid!`);
            }
        });
    },
    async list() {
        return await BooksTable.findAll({ raw: true });
    },
    async add(book) {
        this.validate(book);
        return await BooksTable.create(book);
    },
    async getById(id) {
        const book = await BooksTable.findOne({
            where: { id: id },
        });

        if (!book) {
            throw new NotFoundBusinessError("Book not found");
        }

        return book;
    },
    async update(id, book) {
        this.validate(book);

        return await BooksTable.update(book, {
            where: { id: id },
        });
    },
    async delete(id) {
        await this.getById(id);

        return await BooksTable.destroy({
            where: { id: id },
        });
    },
};
