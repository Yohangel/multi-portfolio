"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var colors = require("colors");
var serverMessage = {
    INIT: "\n   _____         _   ___     _ _        _____     _ _   _                 \n  |  _  |___ ___| |_|  _|___| |_|___   |     |_ _| | |_|_|_ _ ___ ___ ___ \n  |   __| . |  _|  _|  _| . | | | . |  | | | | | | |  _| | | |_ -| -_|  _|\n  |__|  |___|_| |_| |_| |___|_|_|___|  |_|_|_|___|_|_| |_|___|___|___|_| v1.0 \n                                                                        \n  By: Yohangel Ramos\n  " // rectangles AsciiSignature
};
exports.serverMessage = serverMessage;
var data = {
    PORT: 3000,
    URL: "/api",
    SECRET: "th1s_notk3i_",
    TOKEN_OPTIONS: {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    }
};
exports.data = data;
function initDb() {
    var mongoose = require("mongoose");
    var DB = "mongodb://localhost:27017/portfolio";
    var response = false;
    mongoose.connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
    var db = mongoose.connection;
    // @ts-ignore
    db.on("error", console.error.bind(console, " error de conexión:".red));
    db.once("open", function () {
        response = true;
        // @ts-ignore
        console.log(" Conectado a la DB".green);
    });
    return response;
}
exports.initDb = initDb;
function getTokenData(req) {
    return new Promise(function (resolve, reject) {
        var token = getToken(req);
        if (!token)
            reject(false);
        jwt.verify(token, data.SECRET, function (err, decoded) {
            if (err)
                return reject(false);
            resolve(decoded);
        });
    });
}
exports.getTokenData = getTokenData;
var getToken = function fromHeaderOrQuerystring(req) {
    if (req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer") {
        return req.headers.authorization.split(" ")[1];
    }
    else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
};
