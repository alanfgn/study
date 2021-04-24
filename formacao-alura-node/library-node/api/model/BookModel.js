class BookModel {
    constructor({ id, title, author, createdAt, updatedAt }) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = BookModel;
