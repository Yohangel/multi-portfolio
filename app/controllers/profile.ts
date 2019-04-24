import User from "../models/user";
import config = require("../config");
const Joi = require("joi");

exports.updateProfile = function(req: any, res: any) {
  config.getTokenData(req).then((token: any) => {
    const userId = token.id;
    const profile = req.body;
    const result = validateProfile(profile);
    if (result.error !== null) {
      const errors: any = [];
      result.error.details.forEach((elem: any) => {
        errors.push(elem.message);
      });
      res.status(400).end(errors.toString());
      return;
    }
    User.updateOne(
      { _id: userId },
      {
        $set: {
          profile: profile
        }
      },
      (err: any, elem: any) => {
        if (err)
          return res.status(500).send({ message: "Error en la petición" });
        if (!elem)
          return res.status(404).send({ message: "Elemento no encontrado." });
        res.status(200).send(elem);
      }
    );
  });
};

function validateProfile(profile: any) {
  const schema = Joi.object().keys({
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
