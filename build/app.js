"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var config = require("./config");
var users = require("./routes/users");
var app = express();
app.use(express.static("public"));
app.use(bodyParser.json());
/*app.use(
  expressJwt({ secret: config.data.SECRET }).unless({ path: ["/login"] })
);
*/
app.use(config.data.URL + "/users", users.router);
app.listen(config.data.PORT, function () {
    console.log("Servidor iniciado en el puerto " + config.data.PORT);
});
