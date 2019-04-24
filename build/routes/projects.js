"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var projects = require("../controllers/project");
var router = express.Router();
exports.router = router;
router.put("/insert", projects.insertProject);
router.put("/update/:projectId", projects.updateProject);
router.delete("/delete/:projectId", projects.deleteProject);
