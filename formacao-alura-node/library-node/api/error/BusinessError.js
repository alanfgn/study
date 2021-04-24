class BusinessError extends Error {
    constructor(message) {
        super(message);
        this.name = "BusinessError";
        this.idErro = 0;
    }
}

module.exports = BusinessError
