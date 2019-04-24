import express = require("express");
import jwt = require("jsonwebtoken");
import config = require("../config");

const projects = require("../controllers/project");
const router = express.Router();

router.put("/insert", projects.insertProject);
router.put("/update/:projectId", projects.updateProject);
router.delete("/delete/:projectId", projects.deleteProject);

export { router };
