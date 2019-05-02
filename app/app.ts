import express = require("express");
import bodyParser = require("body-parser");
import expressJwt = require("express-jwt");
import config = require("./config");
import users = require("./routes/users");
import skills = require("./routes/skills");
import projects = require("./routes/projects");
import profile = require("./routes/profile");
const cors = require("cors");
const path = require("path");
const app: express.Application = express();
const colors = require("colors");
app.use(bodyParser.json());
app.use(cors());
app.use(`${config.data.URL}/users`, users.router);
app.use(
  `${config.data.URL}/skills`,
  expressJwt({ secret: config.data.SECRET }),
  skills.router
);

app.use(
  `${config.data.URL}/projects`,
  expressJwt({ secret: config.data.SECRET }),
  projects.router
);

app.use(
  `${config.data.URL}/profile`,
  expressJwt({ secret: config.data.SECRET }),
  profile.router
);

app.use(express.static(path.join(__dirname, "../public")));
/*
app.all("/*", function(req, res, next) {
  res.sendFile("../public/index.html", { root: __dirname });
});
*/
app.use(function(err: any, req: any, res: any, next: any) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send({ message: "Token invalido" });
  }
  res.status(500).send({
    message:
      " Ocurió un problema inesperado. Por favor intentalo de nuevo más tarde."
  });
});

app.use(function(req, res, next) {
  res.status(404);
  res.sendFile(path.join(path.join(__dirname, "../public"), "404.html"));
  return;
});

config.initDb();

app.listen(config.data.PORT, () => {
  process.stdout.write("\x1Bc");
  console.log(config.serverMessage.INIT);
  // @ts-ignore
  console.log(` Servidor iniciado en el puerto ${config.data.PORT}`.cyan);
  const s = require("fs");
  console.log();
});
