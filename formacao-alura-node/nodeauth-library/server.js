require("dotenv").config();

const app = require("./app");
const port = 3000;
require("./database");
require("./redis/blocklist-access-token");
require("./redis/allowlist-refresh-token");

app.use((req, res, next) => {
  res.set({
    "Content-Type": "application/json",
  });

  next();
});

const routes = require("./rotas");
routes(app);

app.listen(port, () => console.log("A API está funcionando!"));
