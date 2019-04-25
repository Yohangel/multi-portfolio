"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var expressJwt = require("express-jwt");
var config = require("./config");
var users = require("./routes/users");
var skills = require("./routes/skills");
var projects = require("./routes/projects");
var profile = require("./routes/profile");
var path = require("path");
var app = express();
var colors = require("colors");
app.use(bodyParser.json());
app.use(config.data.URL + "/users", users.router);
app.use(config.data.URL + "/skills", expressJwt({ secret: config.data.SECRET }), skills.router);
app.use(config.data.URL + "/projects", expressJwt({ secret: config.data.SECRET }), projects.router);
app.use(config.data.URL + "/profile", expressJwt({ secret: config.data.SECRET }), profile.router);
app.use(express.static(path.join(__dirname, "../public")));
/*
app.all("/*", function(req, res, next) {
  res.sendFile("../public/index.html", { root: __dirname });
});
*/
app.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        res.status(401).send({ message: "Token invalido" });
    }
    res.status(500).send({
        message: " Ocurió un problema inesperado. Por favor intentalo de nuevo más tarde."
    });
});
app.use(function (req, res, next) {
    res.status(404);
    res.sendFile(path.join(path.join(__dirname, "../public"), "404.html"));
    return;
});
config.initDb();
app.listen(config.data.PORT, function () {
    process.stdout.write("\x1Bc");
    console.log(config.serverMessage.INIT);
    // @ts-ignore
    console.log((" Servidor iniciado en el puerto " + config.data.PORT).cyan);
    var s = require("fs");
    console.log();
});
