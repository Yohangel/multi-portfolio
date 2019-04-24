import User from "../models/user";
import config = require("../config");
const Joi = require("joi");

exports.insertSkill = function(req, res) {
  config.getTokenData(req).then((res: any) => {
    const userId = res.id;
    const skill = req.body;
    const result = validateSkill(skill);
    if (result.error !== null) {
      const errors: any = [];
      result.error.details.forEach(elem => {
        errors.push(elem.message);
      });
      res.status(400).end(errors.toString());
      return;
    }
    User.updateOne(
      { _id: userId },
      { $push: { skills: skill } },
      (err, elem) => {
        if (err)
          return res.status(500).send({ message: "Error en la petición" });
        if (!elem)
          return res.status(404).send({ message: "Usuario no encontrado." });
        res.status(200).send(elem);
      }
    );
  });
};

exports.updateSkill = function(req, res) {
  config.getTokenData(req).then((res: any) => {
    const userId = res.id;
    const skillId = req.params.skillId;
    const skill = req.body;
    const result = validateSkill(skill);
    if (result.error !== null) {
      const errors: any = [];
      result.error.details.forEach(elem => {
        errors.push(elem.message);
      });
      res.status(400).end(errors.toString());
      return;
    }
    User.updateOne(
      { _id: userId, "skills._id": skillId },
      {
        $set: {
          "skills.$": skill
        }
      },
      (err, elem) => {
        console.log("elem", elem);
        console.log("skill", skill);
        if (err)
          return res.status(500).send({ message: "Error en la petición" });
        if (!elem)
          return res.status(404).send({ message: "Usuario no encontrado." });
        res.status(200).send(elem);
      }
    );
  });
};

exports.deleteSkill = function(req, res) {
  config.getTokenData(req).then((res: any) => {
    const userId = res.id;
    const skillId = req.params.skillId;
    User.update(
      { _id: userId },
      { $pull: { skills: { _id: skillId } } },
      (err, elem) => {
        if (err)
          return res.status(500).send({ message: "Error en la petición" });
        if (!elem)
          return res.status(404).send({ message: "Usuario no encontrado." });
        res.status(200).send(elem);
      }
    );
  });
};

function validateSkill(skill: any) {
  const schema = Joi.object().keys({
    name: Joi.string()
      .min(3)
      .required(),
    percent: Joi.number().required(),
    color: Joi.string()
  });
  return Joi.validate(skill, schema);
}
