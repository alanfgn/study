class EditionModel {
    constructor({ 
        id,
        title,
        type,
        pages,
        copies,
        book,
        createdAt,
        updatedAt,

     }) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.pages = pages;
        this.copies = copies;
        this.book = book;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = EditionModel;
