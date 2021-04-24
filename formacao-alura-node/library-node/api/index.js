const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const bookRouterV1 = require("./routes/v1/booksRouter");
const bookRouterV2 = require("./routes/v2/booksRouter");
const BusinessError = require("./error/BusinessError");
const NotFoundBusinessError = require("./error/NotFoundBusinessError");
const ContentTypeBusinessError = require("./error/ContentTypeBusinessError");
const { aceptedFormats } = require("./Serializer");

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
    let format = req.header("Accept");
    if (format !== "*/*" && aceptedFormats.indexOf(format) === -1) {
        res.status(406).end();
        return;
    }

    res.set('X-Powered-By', 'alanfgn')
    res.setHeader('Content-Type', format === "*/*" ? "application/json" : format)
    next()
});

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    next()
})

app.use("/api/v1/books", bookRouterV1);
app.use("/api/v2/books", bookRouterV2);

app.use((error, req, res, next) => {
    let status = 500;

    if (error instanceof BusinessError) {
        status = 400;
    }

    if (error instanceof NotFoundBusinessError) {
        status = 404;
    }

    if (error instanceof ContentTypeBusinessError) {
        status = 406;
    }

    res.status(status).json({
        message: error.message,
    });
});

app.listen(config.get("api.port"), () =>
    console.log(`On na porta ${config.get("api.port")}`)
);
