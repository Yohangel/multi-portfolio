"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var jwt = require("jsonwebtoken");
var config = require("../config");
var router = express.Router();
exports.router = router;
router.use(function timeLog(req, res, next) {
    console.log("Time:", Date.now());
    next();
});
router.get("/", function (req, res) {
    res.send("Users works");
});
router.post("/login", function (req, res) {
    var user = req.body.user;
    if (user.name == "test" && user.password == "123") {
        var token = jwt.sign({ user: user.name }, config.data.SECRET);
        res.send(token);
    }
    else {
        res.status(401).end("Usuario incorrecto");
    }
});
