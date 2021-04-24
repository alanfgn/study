const customExpress = require("./config/customExpress")
const myConection = require("./infra/conexao")
const MyTables = require("./infra/tables")


myConection.connect(error => {
    
    if(error) {
        console.error(error)
        return
    }
    
    MyTables.init(myConection)
    const app = customExpress()
    app.listen(3000, () => console.log("On na porta 3000"))
    
})
