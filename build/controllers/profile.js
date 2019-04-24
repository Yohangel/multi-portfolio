"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = __importDefault(require("../models/user"));
var config = require("../config");
var Joi = require("joi");
exports.updateProfile = function (req, res) {
    config.getTokenData(req).then(function (token) {
        var userId = token.id;
        var profile = req.body;
        var result = validateProfile(profile);
        if (result.error !== null) {
            var errors_1 = [];
            result.error.details.forEach(function (elem) {
                errors_1.push(elem.message);
            });
            res.status(400).end(errors_1.toString());
            return;
        }
        user_1.default.updateOne({ _id: userId }, {
            $set: {
                profile: profile
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
function validateProfile(profile) {
    var schema = Joi.object().keys({
        avatar: Joi.string(),
        bio: Joi.string(),
        website: Joi.string(),
        linkedin: Joi.string(),
        facebook: Joi.string(),
        twitter: Joi.string(),
        instagram: Joi.string()
    });
    return Joi.validate(profile, schema);
}
