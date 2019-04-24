import User from "../models/user";
import config = require("../config");
import jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");

exports.getUser = function(req, res) {
  const u = req.params.user;
  User.findOne(
    { username: u },
    "enabled profile projects skills -_id",
    (err, user) => {
      if (err) return res.status(500).send({ message: "Error en la petición" });
      if (!user)
        return res.status(404).send({ message: "El usuario no existe" });
      res.status(200).send(user);
    }
  );
};

exports.createUser = function(req, res) {
  const user = req.body;
  const result = validateUser(user);
  if (result.error !== null) {
    const errors: any = [];
    result.error.details.forEach(elem => {
      errors.push(elem.message);
    });
    res.status(400).end(errors.toString());
    return;
  }
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      console.log(err);
      return res.send(500, err);
    }
    user.password = hash;
    User.create(user, (err, resp) => {
      if (err) {
        return res.send(500, err);
      }
      return res.send(200, resp);
    });
  });
};

exports.loginUser = function(req, res) {
  const u = req.body;
  const result = validateUserLogin(u);
  if (result.error !== null) {
    const errors: any = [];
    result.error.details.forEach(elem => {
      errors.push(elem.message);
    });
    res.status(400).end(errors.toString());
    return;
  }
  User.findOne({ username: u.username }, (err, user) => {
    if (err) return res.status(500).send({ message: "Error en la petición" });
    if (!user) return res.status(404).send({ message: "El usuario no existe" });
    !bcrypt.compare(u.password, user.password).then(passCheck => {
      if (!passCheck)
        return res.status(400).send({
          message:
            "¡Error al entrar!, por favor, revisa tus datos e intentalo nuevamente."
        });
      const tokenData = {
        id: user._id,
        email: user.email,
        username: user.username
      };
      const token = jwt.sign(
        tokenData,
        config.data.SECRET,
        config.data.TOKEN_OPTIONS
      );
      res.status(200).send({ message: "ok", token: token });
    });
  });
};

function validateUser(user: any) {
  const schema = Joi.object().keys({
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

function validateUserLogin(user: any) {
  const schema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()
  });
  return Joi.validate(user, schema);
}
