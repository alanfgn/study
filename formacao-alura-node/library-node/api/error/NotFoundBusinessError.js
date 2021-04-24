const BusinessError = require("./BusinessError");

class NotFoundBusinessError extends BusinessError {
    constructor(message) {
        super(message);
        this.name = "NotFoundBusinessError";
        this.idErro = 1;
    }
}

module.exports = NotFoundBusinessError;
