const EditionTable = require("../database/tables/EditionTable");
const BusinessError = require("../error/BusinessError");
const NotFoundBusinessError = require("../error/NotFoundBusinessError");

module.exports = {
    validate(edition) {
        ["title", "type"].forEach((rf) => {
            if (typeof edition[rf] !== "string" || edition[rf].length === 0) {
                throw new BusinessError(`Field ${rf} is invalid!`);
            }
        });

        ["pages", "book", "copies"].forEach((rf) => {
            if (typeof edition[rf] !== "number" || edition[rf] < 1) {
                throw new BusinessError(`Field ${rf} is invalid!`);
            }
        });
    },
    async listByBookId(bookId) {
        return await EditionTable.findAll({
            raw: true,
            where: {
                book: bookId,
            },
        });
    },
    async add(edition) {
        this.validate(edition);
        console.log(edition)
        return await EditionTable.create(edition);
    },
    async getById(bookId, editionId) {
        const edition = await EditionTable.findOne({ raw: true,
            where: { id: editionId, book: bookId },
        });

        if (!edition) {
            throw new NotFoundBusinessError("Edition not found");
        }

        return edition;
    },
    async update(bookId, editionId, edition) {
        this.validate(edition);

        return await EditionTable.update(edition, { raw: true,
            where: { id: editionId, book: bookId },
        });
    },
    async delete(bookId, editionId) {
        await this.getById(bookId, editionId);

        return await EditionTable.destroy({
            where: { id: editionId, book: bookId },
        });
    },
};
