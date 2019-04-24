"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = __importDefault(require("../models/user"));
var Joi = require("joi");
function getUser(req, res) {
    var userId = req.params.id;
    user_1.default.findById(userId, function (err, user) {
        if (err)
            return res.status(500).send({ message: "Error en la petición" });
        if (!user)
            return res.status(404).send({ message: "El usuario no existe" });
        res.status(200).send(user);
    });
}
function createUser(req, res) {
    var user = req.body.user;
    var result = validateUser(user);
    if (result.error !== null) {
        res.status(400).end(result.error);
        return;
    }
    user_1.default.create(user, function (err, res) {
        if (err)
            res.status(400).send(err);
        console.log("user: " + user.username + " inserted!");
    });
}
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
