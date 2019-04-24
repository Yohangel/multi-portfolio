"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = __importDefault(require("../models/user"));
var config = require("../config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var Joi = require("joi");
exports.getUser = function (req, res) {
    var u = req.params.user;
    user_1.default.findOne({ username: u }, "enabled profile projects skills -_id", function (err, user) {
        if (err)
            return res.status(500).send({ message: "Error en la petición" });
        if (!user)
            return res.status(404).send({ message: "El usuario no existe" });
        res.status(200).send(user);
    });
};
exports.createUser = function (req, res) {
    var user = req.body;
    var result = validateUser(user);
    if (result.error !== null) {
        var errors_1 = [];
        result.error.details.forEach(function (elem) {
            errors_1.push(elem.message);
        });
        res.status(400).end(errors_1.toString());
        return;
    }
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return res.send(500, err);
        }
        user.password = hash;
        user_1.default.create(user, function (err, resp) {
            if (err) {
                return res.send(500, err);
            }
            return res.send(200, resp);
        });
    });
};
exports.loginUser = function (req, res) {
    var u = req.body;
    var result = validateUserLogin(u);
    if (result.error !== null) {
        var errors_2 = [];
        result.error.details.forEach(function (elem) {
            errors_2.push(elem.message);
        });
        res.status(400).end(errors_2.toString());
        return;
    }
    user_1.default.findOne({ username: u.username }, function (err, user) {
        if (err)
            return res.status(500).send({ message: "Error en la petición" });
        if (!user)
            return res.status(404).send({ message: "El usuario no existe" });
        !bcrypt.compare(u.password, user.password).then(function (passCheck) {
            if (!passCheck)
                return res.status(400).send({
                    message: "¡Error al entrar!, por favor, revisa tus datos e intentalo nuevamente."
                });
            var tokenData = {
                id: user._id,
                email: user.email,
                username: user.username
            };
            var token = jwt.sign(tokenData, config.data.SECRET, config.data.TOKEN_OPTIONS);
            res.status(200).send({ message: "ok", token: token });
        });
    });
};
function validateUser(user) {
    var schema = Joi.object().keys({
        email: Joi.string()
            .email()
            .required(),
        username: Joi.string()
            .min(3)
            .required(),
        password: Joi.string()
            .min(7)
            .required(),
        confirmPassword: Joi.string()
            .valid(Joi.ref("password"))
            .required()
            .strict()
    });
    return Joi.validate(user, schema);
}
function validateUserLogin(user) {
    var schema = Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    return Joi.validate(user, schema);
}
