"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = __importDefault(require("../models/user"));
var config = require("../config");
var Joi = require("joi");
exports.insertProject = function (req, res) {
    config.getTokenData(req).then(function (token) {
        var userId = token.id;
        var project = req.body;
        var result = validateProject(project);
        if (result.error !== null) {
            var errors_1 = [];
            result.error.details.forEach(function (elem) {
                errors_1.push(elem.message);
            });
            res.status(400).end(errors_1.toString());
            return;
        }
        user_1.default.updateOne({ _id: userId }, { $push: { projects: project } }, function (err, elem) {
            if (err)
                return res.status(500).send({ message: "Error en la petición" });
            if (!elem)
                return res.status(404).send({ message: "Elemento no encontrado." });
            res.status(200).send(elem);
        });
    });
};
exports.updateProject = function (req, res) {
    config.getTokenData(req).then(function (token) {
        var userId = token.id;
        var projectId = req.params.projectId;
        var project = req.body;
        var result = validateProject(project);
        if (result.error !== null) {
            var errors_2 = [];
            result.error.details.forEach(function (elem) {
                errors_2.push(elem.message);
            });
            res.status(400).end(errors_2.toString());
            return;
        }
        user_1.default.updateOne({ _id: userId, "projects._id": projectId }, {
            $set: {
                "projects.$": project
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
exports.deleteProject = function (req, res) {
    config.getTokenData(req).then(function (token) {
        var userId = token.id;
        var projectId = req.params.projectId;
        user_1.default.updateOne({ _id: userId }, { $pull: { projects: { _id: projectId } } }, function (err, elem) {
            if (err)
                return res.status(500).send({ message: "Error en la petición" });
            if (!elem)
                return res.status(404).send({ message: "Elemento no encontrado." });
            res.status(200).send(elem);
        });
    });
};
function validateProject(project) {
    var schema = Joi.object().keys({
        name: Joi.string()
            .min(3)
            .required(),
        main_image: Joi.string().required(),
        description: Joi.string(),
        demo: Joi.string(),
        download: Joi.string(),
        image_one: Joi.string(),
        image_two: Joi.string(),
        image_three: Joi.string(),
        image_four: Joi.string()
    });
    return Joi.validate(project, schema);
}
