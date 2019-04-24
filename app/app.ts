import express = require("express");
import bodyParser = require("body-parser");
import expressJwt = require("express-jwt");

import config = require("./config");
import users = require("./routes/users");
import skills = require("./routes/skills");
const app: express.Application = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send({ message: "Token invalido" });
  }
});

app.use(`${config.data.URL}/users`, users.router);
app.use(
  `${config.data.URL}/skills`,
  expressJwt({ secret: config.data.SECRET }),
  skills.router
);

config.initDb();

app.listen(config.data.PORT, () => {
  console.log(`Servidor iniciado en el puerto ${config.data.PORT}`);
});
