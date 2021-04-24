const ContentTypeBusinessError = require("./error/ContentTypeBusinessError");
const jsontoxml = require("jsontoxml");
const pluralize = require("pluralize");

class Serializer {
    constructor(contentType, type) {
        this.contentType = contentType;
        this.type = type;
    }

    json(data) {
        return JSON.stringify(data);
    }

    xml(data) {
        if (Array.isArray(data)) {
            return jsontoxml({
                [pluralize(this.type)]: data.map((d) => {
                    return { [this.type]: d };
                }),
            });
        } else {
            return jsontoxml({ [this.type]: data });
        }
    }

    serialize(data) {
        if (this.contentType === "application/json") {
            return this.json(data);
        }

        if (this.contentType === "application/xml") {
            return this.xml(data);
        }

        throw new ContentTypeBusinessError(
            `Content Type ${this.contentType} not suported`
        );
    }
}

module.exports = {
    Serializer,
    aceptedFormats: ["application/json", "application/xml", "*/*"],
};
