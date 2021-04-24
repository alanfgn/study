const models = [
    require("./tables/BookTable"),
    require("./tables/EditionTable"),
];

async function createTables() {
    for (let contador = 0; contador < models.length; contador++) {
        const model = models[contador];
        await model
            .sync()
            .then(() => console.log(`Table Created`))
            .catch(console.log);
    }
}

createTables();
