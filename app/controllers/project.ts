import User from "../models/user";
import config = require("../config");
const Joi = require("joi");

exports.insertProject = function(req: any, res: any) {
  config.getTokenData(req).then((token: any) => {
    const userId = token.id;
    const project = req.body;
    const result = validateProject(project);
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
      { $push: { projects: project } },
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

exports.updateProject = function(req: any, res: any) {
  config.getTokenData(req).then((token: any) => {
    const userId = token.id;
    const projectId = req.params.projectId;
    const project = req.body;
    const result = validateProject(project);
    if (result.error !== null) {
      const errors: any = [];
      result.error.details.forEach((elem: any) => {
        errors.push(elem.message);
      });
      res.status(400).end(errors.toString());
      return;
    }
    User.updateOne(
      { _id: userId, "projects._id": projectId },
      {
        $set: {
          "projects.$": project
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

exports.deleteProject = function(req: any, res: any) {
  config.getTokenData(req).then((token: any) => {
    const userId = token.id;
    const projectId = req.params.projectId;
    User.updateOne(
      { _id: userId },
      { $pull: { projects: { _id: projectId } } },
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

function validateProject(project: any) {
  const schema = Joi.object().keys({
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
