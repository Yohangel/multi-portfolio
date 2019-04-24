"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var skills = require("../controllers/skills");
var router = express.Router();
exports.router = router;
router.put("/insert", skills.insertSkill);
router.put("/update/:skillId", skills.updateSkill);
router.delete("/delete/:skillId", skills.deleteSkill);
