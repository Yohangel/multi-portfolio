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
var app = express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        res.status(401).send({ message: "Token invalido" });
    }
});
app.use(config.data.URL + "/users", users.router);
app.use(config.data.URL + "/skills", expressJwt({ secret: config.data.SECRET }), skills.router);
app.use(config.data.URL + "/projects", expressJwt({ secret: config.data.SECRET }), projects.router);
app.use(config.data.URL + "/profile", expressJwt({ secret: config.data.SECRET }), profile.router);
config.initDb();
app.listen(config.data.PORT, function () {
    console.log("Servidor iniciado en el puerto " + config.data.PORT);
});
