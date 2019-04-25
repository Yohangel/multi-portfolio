"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = __importDefault(require("../models/user"));
var config = require("../config");
var Joi = require("joi");
exports.insertSkill = function (req, res) {
    config.getTokenData(req).then(function (token) {
        var userId = token.id;
        var skill = req.body;
        var result = validateSkill(skill);
        if (result.error !== null) {
            var errors_1 = [];
            result.error.details.forEach(function (elem) {
                errors_1.push(elem.message);
            });
            res.status(400).end(errors_1.toString());
            return;
        }
        user_1.default.updateOne({ _id: userId }, { $push: { skills: skill } }, function (err, elem) {
            if (err)
                return res.status(500).send({ message: "Error en la petición" });
            if (!elem)
                return res.status(404).send({ message: "Elemento no encontrado." });
            res.status(200).send(elem);
        });
    });
};
exports.updateSkill = function (req, res) {
    config.getTokenData(req).then(function (token) {
        var userId = token.id;
        var skillId = req.params.skillId;
        var skill = req.body;
        var result = validateSkill(skill);
        if (result.error !== null) {
            var errors_2 = [];
            result.error.details.forEach(function (elem) {
                errors_2.push(elem.message);
            });
            res.status(400).end(errors_2.toString());
            return;
        }
        user_1.default.updateOne({ _id: userId, "skills._id": skillId }, {
            $set: {
                "skills.$": skill
            }
        }, function (err, elem) {
            if (err)
                return res.status(500).send({ message: "Error en la petición" });
            if (!elem)
                return res.status(404).send({ message: "Elemento no encontrado." });
            res.status(200).send(elem);
        });
    });
};
exports.deleteSkill = function (req, res) {
    config.getTokenData(req).then(function (token) {
        var userId = token.id;
        var skillId = req.params.skillId;
        user_1.default.updateOne({ _id: userId }, { $pull: { skills: { _id: skillId } } }, function (err, elem) {
            if (err)
                return res.status(500).send({ message: "Error en la petición" });
            if (!elem)
                return res.status(404).send({ message: "Elemento no encontrado." });
            res.status(200).send(elem);
        });
    });
};
function validateSkill(skill) {
    var schema = Joi.object().keys({
        name: Joi.string()
            .min(3)
            .required(),
        percent: Joi.number().required(),
        color: Joi.string()
    });
    return Joi.validate(skill, schema);
}
