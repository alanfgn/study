const BusinessError = require("./BusinessError");

class ContentTypeBusinessError extends BusinessError {
    constructor(message) {
        super(message);
        this.name = "ContentTypeBusinessError";
        this.idErro = 2;
    }
}

module.exports = ContentTypeBusinessError;
